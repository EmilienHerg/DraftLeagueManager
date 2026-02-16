<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DraftController;
use App\Http\Responses\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return new SuccessResponse(200, "API is running")->send();
});

Route::post('/register', [AuthController::class, 'register']);

Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/user', [AuthController::class, 'getUser']);

    Route::post('/getAllDrafts', [DraftController::class, 'getAll']);
});

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
