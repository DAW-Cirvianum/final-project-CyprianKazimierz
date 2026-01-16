<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;
/**
* @OA\Info(title="API mail", version="1.0")
*
* @OA\Server(url="http://localhost")
*/
class RecoveryController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/email/verify/{id}/{hash}",
     *     summary="Verifica el correo electrónico del usuario",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="hash",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response=302, description="Redirige al login tras verificar el correo"),
     *     @OA\Response(response=400, description="Enlace de verificación inválido")
     * )
     */
    public function verifyEmail(Request $request)
    {
        $id = $request->route('id');
        $hash = $request->route('hash');
        $user = User::findOrFail($id);

        $userHash = sha1($user->getEmailForVerification());
        if (!hash_equals($hash, $userHash)) {
            return response()->json([
                'message' => "Invalid verification link"
            ], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => "Email already verificated"]);
        }

        $user->markEmailAsVerified();

        return redirect('http://localhost:5175/home/login');
    }
}
