<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/inscription', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/inscription', [AuthController::class, 'register']);

Route::get('/login', [AuthController::class, 'showLogionForm'])->name('login');
Route::post('/login', [AuthController::class], 'login');
