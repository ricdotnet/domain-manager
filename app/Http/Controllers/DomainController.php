<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Inertia\Response;

class DomainController extends Controller
{
    function index(Request $request, string $slug): Response
    {

        $domainDetails = $this->getDomainDetails($slug);

        return Inertia::render('Domain', [
            'domain' => $domainDetails
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
 }
