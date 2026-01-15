<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

//default route
Route::get('/', function () {
   return redirect("http://localhost:5175");
});

//From frontend login if it is admin
Route::get('/admin/login-bridge', function (Request $request) {
    $user = \Laravel\Sanctum\PersonalAccessToken::findToken($request->token)?->tokenable;

    if (!$user || $user->role !== 'admin') {
        abort(403);
    }

    Auth::login($user);

    return redirect('/admin/dashboard');
});

//Routes to show blade
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->
group(function () {
    Route::get('/dashboard', function (Request $request) {
         $user = $request->user();
        return view('admin.dashboard', compact('user'));
    })->name('dashboard');
    Route::get('/posts',[PostController::class,'getPosts'])->name('posts');
    Route::get('/users',[AuthController::class,'getUsers'])->name("users");
    Route::get('/admin/posts/delete/{post}', [PostController::class, 'deleteAdmin'])->name('posts.delete');

});
