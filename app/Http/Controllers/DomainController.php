<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    function index(Request $request, string $domain): Response
    {

        $domainDetails = $this->getDomainDetails($domain);

        return Inertia::render('Domain/Domain', [
            'domain' => $domainDetails
        ]);
    }

    function getARecords(Request $request, string $domain): Response
    {
        $aRecords = $this->getDomainARecords('A', $domain);
        unset($aRecords['recsonpage']);
        unset($aRecords['recsindb']);

        return Inertia::render('Domain/ARecords', [
            'domain' => $domain,
            'records' => $aRecords,
        ]);
    }

    function postARecord(Request $request, string $domain): RedirectResponse
    {
        Http::asForm()->post($_ENV['DOMAIN_CP_API'] . '/dns/manage/add-ipv4-record.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'domain-name' => $domain,
            'host' => 'test',
            'value' => '100.100.100.100'
        ]);

        return redirect()->route('domain.a-records', [
            'domain' => $domain
        ]);
    }

    protected function getDomainDetails(string $domain): array
    {
        return Http::get($_ENV['DOMAIN_CP_API'] . '/domains/details-by-name.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'domain-name' => $domain,
            'options' => 'All'
        ])->json();
    }

    protected function getDomainARecords(string $type, string $domain): array
    {
        return Http::get($_ENV['DOMAIN_CP_API'] . '/dns/manage/search-records.json', [
            'auth-userid' => $_ENV['DOMAIN_CP_ID'],
            'api-key' => $_ENV['DOMAIN_CP_KEY'],
            'domain-name' => $domain,
            'type' => $type,
            'no-of-records' => 20,
            'page-no' => 1
        ])->json();
    }
}
