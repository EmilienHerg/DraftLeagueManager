<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DraftController;
use App\Http\Controllers\PokemonController;
use App\Http\Responses\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/phpinfo', function() { phpinfo(); });

Route::get('/', function () {
    return new SuccessResponse(200, "API is running")->send();
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'getUser']);

    Route::get('/draft/{id}', [DraftController::class, 'getDraftById']);
    Route::get('/drafts', [DraftController::class, 'getAllDrafts']);
    Route::post('/draft', [DraftController::class, 'createDraft']);

    Route::get('/pokemon/{type}', [PokemonController::class, 'getPokemonByType']);
});
