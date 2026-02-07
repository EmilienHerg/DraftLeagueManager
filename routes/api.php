<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DraftController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('/', function () {
    return "Racine";
});

Route::post('/getAllDrafts', [DraftController::class, 'getAll']);

// Route::middleware('web')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
// });

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function() {
//         return Auth::user();
//     });
//     Route::resource('drafts', DraftController::class); // rajouter ->except('show') pour d'autres ressources
// });

Route::get('/token', function (Request $request) {
    $token = $request->session()->token();

    $token = csrf_token();

    return $token;
});


// //<?php

// use App\Http\Controllers\AuthController;
// use App\Http\Controllers\DraftController;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return "Racine";
// });
// Route::post('/register', [AuthController::class, 'register']);

// Route::get('/login', [AuthController::class, 'showLoginForm']);
// Route::post('/login', [AuthController::class, 'login']);

// Route::middleware(['auth'])->group(function () {
//     Route::get('/user', function() {
//         return Auth::user();
//     });
//     Route::resource('drafts', DraftController::class); // rajouter ->except('show') pour d'autres ressources
// });

// Route::get('/token', function (Request $request) {
//     $token = $request->session()->token();
 
//     $token = csrf_token();
 
//     return $token;
// });
