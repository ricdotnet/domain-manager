<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response as Response;

class DashboardController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function index(): Response
    {
        $body = $this->getCustomerDetails();
        $domains = $this->getCustomerDomains($body['customerid']);

        $domainsResponse = array();
        foreach ($domains as $domain) {
            if ($domain != $domains['recsonpage'] || $domain != $domains['recsindb']) {
                $tmp = array('name' => $domain['entity.description'],
                    'renew' => $domain['orders.endtime']);
                $domainsResponse[] = $tmp;
            }
        }

        return Inertia::render('Dashboard', [
            'domains' => $domainsResponse
        ]);
    }

    protected function getCustomerDetails(): array
    {
        return Http::get($_ENV['DOMAIN_CP_API'] . '/customers/details.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'username' => 'client@email'
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
