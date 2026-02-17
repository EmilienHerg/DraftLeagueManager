<?php

namespace App\Http\Controllers;

use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{
    public function getPokemonByType(string $type)
    {
        try {

            $url = "https://pokeapi.co/api/v2/";
            $response = Http::get($url . 'type/' . $type);

            return new SuccessResponse(200, 'Pokemon par type récupérés', $response->json())->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, "Erreur lors du chargement des données des Pokemon", $e->getMessage())->send();
        }
    }
}
