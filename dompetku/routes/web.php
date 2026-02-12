<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController; // Panggil controllernya

// Route buat halaman utama (Dashboard)
Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Route buat nyimpen data (dipanggil pas klik tombol submit)
Route::post('/transaction', [DashboardController::class, 'store'])->name('transaction.store');