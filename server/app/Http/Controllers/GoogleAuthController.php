<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to Google’s OAuth page.
     */
     public function redirect()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    /**
     * Function to return the user from google
     * Summary of callback
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->user();
        } catch (Throwable $e) {
            return redirect("http://localhost:5175/google-callback?error=oauth");
        }

        // Buscar o crear usuario
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'surname' => null,
                'username' => explode('@', $googleUser->getEmail())[0],
                'password' => bcrypt(Str::random(16)),
                'born_date'=> null,
                'avatar'=>$googleUser->avatar ?? "avatars/default.png"
            ]
        );
        $user->markEmailAsVerified();

       
        $token = $user->createToken('api-token',['*']);
        $token->accessToken->expires_at = Carbon::now()->addMinutes(10);
        $token->accessToken->save();

        $plainTextToken = $token->plainTextToken;

        return redirect(
            "http://localhost:5175/google-callback?token={$plainTextToken}"
        );
    }
}
