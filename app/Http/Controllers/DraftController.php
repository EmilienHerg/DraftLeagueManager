<?php

namespace App\Http\Controllers;

use App\Http\Responses\SuccessResponse as SuccessResponse;
use App\Models\Draft;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DraftController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAll()
    {
        $drafts = Draft::all();
        return new SuccessResponse(200, 'Drafts récupérées avec succès', $drafts)->send();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'pokemonNb' => 'required|integer|min:1',
            'pointsNb' => 'required|integer|min:1'
        ]);

        $user = Auth::user();
        $draft = Draft::create([
            ...$validated,
            'user_id' => $user->id()
        ]);

        return new SuccessResponse(200, 'Draft crée avec succès', $draft)->send();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
