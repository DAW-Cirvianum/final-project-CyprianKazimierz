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

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //Check passed data
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

        //if pass the validation we sotre it
        $data = $validate->validated();
        $path = null;

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
        } else {
            $path = "avatars/default.png";
        }

        $user = null;
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

    public function login(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'login' => ['required', 'string'],
            'password' => ['required', 'string', 'min:6'],

        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Error Validation login",
                'error' => $validate->errors()
            ], 422);
        }

        $loginWith = '';
        $user = null;
        if (filter_var($request->login, FILTER_VALIDATE_EMAIL)) {
            $loginWith = 'email';
            $user = User::where('email', $request->login)->first();
        } else {
            $loginWith = 'username';
            $user = User::where('username', $request->login)->first();
        }

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => "User not found"
            ], 401);
        }
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => false,
                'message' => "The password does not match"
            ], 400);
        }

        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'status' => false,
                'message' => 'Account not verified'
            ], 403);
        }


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
    public function logout(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated'
            ], 401);
        }

        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'Logged out successfully'
        ]);
    }

    public function profile(Request $request)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:25'],
            'surname' => ['required', 'string', 'max:25'],
            'username' => ['required', 'string', 'max:25', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable', 'string', 'min:6', 'confirmed'],
            'born_date' => ['required', 'string', 'max:10'],
            'avatar' => ['nullable', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }


        $path = null;

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $path;
        } else if (!$user->avatar) {
            $user->avatar = "avatars/default.png";
        }
        //update data
        $validated = $validate->validated();

        $user->update(
            collect($validated)->except(['avatar', 'password'])->toArray()
        );


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

    public function completeProfile(Request $request)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), [
            'name' => ['sometimes', 'string', 'max:25'],
            'surname' => ['sometimes', 'string', 'max:25'],
            'born_date' => ['sometimes', 'string', 'max:10'],
            'avatar' => ['sometimes', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        $validated = $validate->validated();

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        $user->update($validated);

        return response()->json([
            'status' => true,
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
    //api
    public function getUsers(){
        
    }
}
