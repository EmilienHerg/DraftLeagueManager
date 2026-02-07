<?php

namespace App\Http\Controllers;

use App\Http\Responses\ErrorResponse;
use App\Http\Responses\SuccessResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'pseudo' => ['required', 'string', 'max:50'],
            'email' => ['required', 'string', 'email', 'max:191', Rule::unique('users')],
            'password' => ['required', 'confirmed', Password::defaults()]
        ]);

        $user = User::create([
            'pseudo' => $request->pseudo,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        Auth::login($user);
        // return new SuccessResponse(200, 'Utilisateur enregistré', $user)->send();
        return response()->json([
            'status' => 200,
            'message' => 'Utilisateur enregistré',
            'data' => $user
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return new SuccessResponse(200, 'Utilisateur connecté')->send();
        }

        return new ErrorResponse(401, 'Credentials invalides')->send();
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // redirect

    }
}
