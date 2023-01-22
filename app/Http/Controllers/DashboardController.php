<?php

namespace App\Http\Controllers;

use Database\Factories\UserFactory;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as Response;
use Mockery\Exception;

class DashboardController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function index(Request $request): Response
    {
        $email = json_decode($request->user())->email;
        $body = $this->getCustomerDetails($email);
        if (array_key_exists('customerid', $body)) {
            $domains = $this->getCustomerDomains($body['customerid']);

            $domainsResponse = array();
            foreach ($domains as $domain) {
                if ($domain != $domains['recsonpage'] || $domain != $domains['recsindb']) {
                    $tmp = array('name' => $domain['entity.description'],
                        'registeredOn' => $domain['orders.creationtime'],
                        'expiresOn' => $domain['orders.endtime'],
                        'status' => $domain['entity.currentstatus'],
                        'privacyProtection' =>
                            !array_key_exists('orders.privacyprotection', $domain)
                                ? false : $domain['orders.privacyprotection']);
                    $domainsResponse[] = $tmp;
                }
            }
        }

        return Inertia::render('Dashboard', [
            'domains' => $domainsResponse ?? null
        ]);
    }

    protected function getCustomerDetails(string $email): array
    {
        return Http::get($_ENV['DOMAIN_CP_API'] . '/customers/details.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'username' => $email
        ])->json();
    }

    protected function getCustomerDomains($customerId): array
    {
        return Http::get($_ENV['DOMAIN_CP_API'] . '/domains/search.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'no-of-records' => 10,
            'page-no' => 1,
            'customer-id' => $customerId,
        ])->json();
    }
}
