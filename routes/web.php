<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DomainController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/domain/{domain}', [DomainController::class, 'index'])->name('domain');
    Route::get('/domain/{domain}/a', [DomainController::class, 'getARecords'])->name('domain.a-records');

    Route::post('/domain/{domain}/a', [DomainController::class, 'postARecord']);
});
