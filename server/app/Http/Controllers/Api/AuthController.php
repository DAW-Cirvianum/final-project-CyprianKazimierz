<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Carbon\Carbon;
use OpenApi\Annotations as OA;

/**
* @OA\Info(title="API users", version="1.0")
*
* @OA\Server(url="http://localhost")
*/
class AuthController extends Controller
{
  /**
     * Register a new user (mínimo Swagger)
     * 
     * @OA\Post(
     *     path="/api/register",
     *     tags={"Auth"},
     *     summary="Crea un usuario",
     *     @OA\Response(response=201, description="Usuario creado"),
     *     @OA\Response(response=422, description="Error de validación")
     * )
     */
public function register(Request $request)
    {
        //Validate data
        $validate = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:25'],
            'surname' => ['required', 'string', 'max:25'],
            'username' => ['required', 'string', 'max:25', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'born_date' => ['required', 'string', 'max:10'],
            'avatar' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
            'role' => ['required', 'string', 'in:admin,user']
        ]);

        //if validation fails we return an error
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        //if pass the validation we get the data
        $data = $validate->validated();
        $path = null;

        //if avatar file exists we save it else we get default img
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
        } else {
            $path = "avatars/default.png";
        }

        $user = User::create([
            'name' => $data['name'],
            'surname' => $data['surname'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'born_date' => $data['born_date'],
            'avatar' => $path,
            'role' => $data['role'] ?? "user"
        ]);

        $user->sendEmailVerificationNotification();

        return response()->json([
            'status' => true,
            'message' => "New user has been created",
            'user' => $user,
        ], 201);
    }

   /**
     * Login user (mínimo Swagger)
     * 
     * @OA\Post(
     *     path="/api/login",
     *     tags={"Auth"},
     *     summary="Inicia sesión",
     *     @OA\Response(response=200, description="Login correcto"),
     *     @OA\Response(response=401, description="Usuario no encontrado")
     * )
     */
    public function login(Request $request)
    {
        //validate data
        $validate = Validator::make($request->all(), [
            'login' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6'],

        ]);

        //if validate fails return with the problem
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Error Validation login",
                'error' => $validate->errors()
            ], 422);
        }
        
        //store user if he send a email we search in te bbdd with email else with username
        $user = null;
        if (filter_var($request->login, FILTER_VALIDATE_EMAIL)) {
            $user = User::where('email', $request->login)->first();
        } else {
            $user = User::where('username', $request->login)->first();
        }

        //if user not found or error return error
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "User not found"
            ], 401);
        }
        //if the password stored is diferent that he type reutrn error,
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => "The password does not match"
            ], 400);
        }

        //if user does not verify his mail we send an error
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'status' => false,
                'message' => 'Account not verified'
            ], 403);
        }

        //else generate token wit time expiration of 10 min
        $token = $user->createToken('api-token',['*']);
        $token->accessToken->expires_at = Carbon::now()->addMinutes(10);
        $token->accessToken->save();

        $plainTextToken = $token->plainTextToken;

        return response()->json([
            'status' => true,
            'token' => $plainTextToken,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'username' => $user->username,
                'email' => $user->email,
                'born_date' => $user->born_date,
                'avatar' => asset('storage/' . $user->avatar),
                'role'=>$user->role
            ]
        ], 200);
    }
   
    /**
     * Logout user (mínimo Swagger)
     * 
     * @OA\Post(
     *     path="/api/logout",
     *     tags={"Auth"},
     *     summary="Cierra sesión",
     *     @OA\Response(response=200, description="Logout correcto"),
     *     @OA\Response(response=401, description="No autenticado")
     * )
     */
    public function logout(Request $request)
    {
        //get the user logged
        $user = $request->user();

        //if fails 
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        //delete the token
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    /**
 * Update authenticated user's profile
 *
 * @OA\Put(
 *     path="/api/profile",
 *     summary="Update user's profile",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="surname", type="string"),
 *             @OA\Property(property="username", type="string"),
 *             @OA\Property(property="email", type="string", format="email"),
 *             @OA\Property(property="password", type="string", format="password"),
 *             @OA\Property(property="password_confirmation", type="string", format="password"),
 *             @OA\Property(property="born_date", type="string", format="date"),
 *             @OA\Property(property="avatar", type="string", format="binary")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Profile updated"),
 *     @OA\Response(response=422, description="Validation error")
 * )
 */
    public function profile(Request $request)
    {
        //get user
        $user = $request->user();

        //validate data
        $validate = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:25'],
            'surname' => ['required', 'string', 'max:25'],
            'username' => ['required', 'string', 'max:25', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'],
            'born_date' => ['required', 'string', 'max:10'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);
        //if validate fails we return an error
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        //if user send a password we hashed it
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        //if avatar is send we save it else if there isn't the avatar we get the default
        $path = null;
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        } else if (!$user->avatar) {
            $user->avatar = "avatars/default.png";
        }


        //We get the data valdiated and we update the user in the bbdd
        $validated = $validate->validated();
        $user->update(
            collect($validated)->except(['avatar', 'password'])->toArray()
        );

        //generate token
        $token = $user->createToken('api-token',['*']);
        $token->accessToken->expires_at = Carbon::now()->addMinutes(10);
        $token->accessToken->save();
        $plainTextToken = $token->plainTextToken;

        return response()->json([
            'status' => true,
            'token' => $plainTextToken,
            'user' => [
                'name' => $user->name,
                'surname' => $user->surname,
                'username' => $user->username,
                'email' => $user->email,
                'born_date' => $user->born_date,
                'avatar' => asset('storage/' . $user->avatar),
            ]
        ], 200);
    }

    /**
 * Complete user's profile with optional fields
 *
 * @OA\Put(
 *     path="/api/complete-profile",
 *     summary="Complete user's profile",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string"),
 *             @OA\Property(property="surname", type="string"),
 *             @OA\Property(property="born_date", type="string", format="date"),
 *             @OA\Property(property="avatar", type="string", format="binary")
 *         )
 *     ),
 *     @OA\Response(response=200, description="Profile completed"),
 *     @OA\Response(response=422, description="Validation error")
 * )
 */
    public function completeProfile(Request $request)
    {
        //get the user
        $user = $request->user();

        //validate data
        $validate = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:25'],
            'surname' => ['sometimes', 'string', 'max:25'],
            'born_date' => ['sometimes', 'string', 'max:10'],
            'avatar' => ['sometimes', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);
        //if fails return error
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        //get validated data
        $validated = $validate->validated();

        //if send avatar whe store it
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        //update the user in bbdd
        $user->update($validated);

        $token = $user->createToken('api-token',['*']);
        $token->accessToken->expires_at = Carbon::now()->addMinutes(10);
        $token->accessToken->save();

        $plainTextToken = $token->plainTextToken;


        return response()->json([
            'status' => true,
            'token' => $plainTextToken,
            'user' => [
                'name' => $user->name,
                'surname' => $user->surname,
                'username' => $user->username,
                'email' => $user->email,
                'born_date' => $user->born_date,
                'avatar' => $user->avatar
                    ? asset('storage/' . $user->avatar)
                    : null,
            ]
        ], 200);
    }

   
}
