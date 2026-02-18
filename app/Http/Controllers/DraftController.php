<?php

namespace App\Http\Controllers;

use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse as SuccessResponse;
use App\Models\Draft;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class DraftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllDrafts()
    {
        try {
            $user = Auth::user();
            $drafts = Draft::where('user_id', $user->id)->get();

            return new SuccessResponse(200, 'Drafts récupérées avec succès', $drafts)->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, 'Erreur lors de la recherche des drafts')->send();
        }
    }

    public function getDraftById(int $id)
    {
        try {
            $draft = Draft::find($id);
            if (!$draft) {
                return new ErrorResponse(404, 'Draft non trouvée')->send();
            }

            return new SuccessResponse(200, 'Draft trouvée', $draft)->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, 'Erreur lors de la recherche de la draft')->send();
        }
    }

    public function getDraftByToken(string $token)
    {
        try {
            $draft = Draft::where('token', '=', $token)->first();
            if (!$draft) {
                return new ErrorResponse(404, 'Draft non trouvée')->send();
            }

            return new SuccessResponse(200, 'Draft trouvée', $draft)->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, 'Erreur lors de la recherche de la draft')->send();
        }
    }

    /**
     * Création d'une draft
     */
    public function createDraft(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return new ErrorResponse(401, 'Authentification requise')->send();
            }

            $request->validate([
                'name' => 'required|string|max:50',
                'pokemonNb' => 'required|integer|min:1',
                'pointsNb' => 'required|integer|min:1'
            ]);


            $draft = Draft::create([
                'name' => $request->name,
                'token' => Str::random(16),
                'pokemonNb' => $request->pokemonNb,
                'pointsNb' => $request->pointsNb,
                'user_id' => $user->id
            ]);

            return new SuccessResponse(200, 'Draft crée avec succès', $draft)->send();
        } catch (\Exception $e) {
            return new ErrorResponse(500, 'Erreur lors la création de la draft')->send();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
