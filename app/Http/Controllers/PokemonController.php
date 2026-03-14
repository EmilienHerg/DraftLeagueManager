<?php

namespace App\Http\Controllers;

use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse;
use App\Models\Pokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokemonController extends Controller
{

    public function fillPokemonDatabase()
    {
        try {
            $url = env('POKEAPI_URL') . "pokemon?limit=1500";
            $response = Http::get($url);
            $json = $response->json();
            $pokemonArray = $json['results'];

            foreach ($pokemonArray as $index => $pokemon) {
                Pokemon::updateOrCreate([
                    'id' => $index + 1,
                    'name' => $pokemon['name']
                ]);
            }

            return new SuccessResponse(200, 'Liste de tous les Pokémon', $response->json())->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, "Erreur lors du chargement des données des Pokemon", $e->getMessage())->send();
        }
    }

    public function getPokemonByType(string $type)
    {
        try {
            $url = env('POKEAPI_URL') . "type/" . $type;
            $response = Http::get($url);
            return new SuccessResponse(200, 'Pokemon par type récupérés', $response->json())->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, "Erreur lors du chargement des données des Pokemon", $e->getMessage())->send();
        }
    }

    public function getAllPokemon() {}

    public function getPokemonDetails(string $name)
    {
        try {
            $url = env('POKEAPI_URL') . "pokemon/" . $name;
            $response = Http::get($url);
            return new SuccessResponse(200, 'Informations du Pokémon récupérées', $response->json())->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, "Erreur lors du chargement des données des Pokemon", $e->getMessage())->send();
        }
    }
}
