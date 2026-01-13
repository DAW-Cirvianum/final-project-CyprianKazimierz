<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
   return redirect("http://localhost:5175");
});



Route::get('/admin/login-bridge', function (Request $request) {
    $user = \Laravel\Sanctum\PersonalAccessToken::findToken($request->token)?->tokenable;

    if (!$user || $user->role !== 'admin') {
        abort(403);
    }

    Auth::login($user);

    return redirect('/admin/dashboard');
});


Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function (Request $request) {
         $user = $request->user();
        return view('admin.dashboard', compact('user'));
    });
    Route::get('/posts',[PostController::class,'getPosts']);
    Route::get('/users',[AuthController::class,'getUsers']);
});
