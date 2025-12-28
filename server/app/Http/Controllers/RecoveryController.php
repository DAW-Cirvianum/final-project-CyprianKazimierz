<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RecoveryController extends Controller
{
     public function verifyEmail(Request $request){
        $id = $request->route('id');
        $hash = $request->route('hash');
        $user = User::findOrFail($id);

        $userHash = sha1($user->getEmailForVerification());
        if(!hash_equals($hash,$userHash)){
            return response()->json([
                'message'=>"Invalid verification link"
            ],400);
        }

        if($user->hasVerifiedEmail()){
            return response()->json(['message'=>"Email already verificated"]);
        }

        $user->markEmailAsVerified();

        return redirect('http://localhost:5175/home/login');

    }
}
