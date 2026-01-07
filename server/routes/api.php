<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\RecoveryController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Sing in and sing up
Route::post("/register",[AuthController::class,'register']);
Route::post("/login",[AuthController::class,'login']);
//mail verification
Route::get('/email/verify/{id}/{hash}',[RecoveryController::class,'verifyEmail'])->name('verification.verify');
//google sing in / sing up
Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);
//posts all
Route::get("/cars",[PostController::class,'index']);
Route::get("/details/{post}", [PostController::class,'details']);

//Auth routes with token
Route::middleware('auth:sanctum')->group(function (){
    Route::post("/logout",[AuthController::class,'logout']);
    Route::put("/profile",[AuthController::class,'profile']);
    Route::get("/user",function(Request $request){
        return response()->json([
        'user' => $request->user()
    ]);
    });
    Route::patch("/completProfile",[AuthController::class,'completeProfile']);
    Route::post("/log",[LogController::class,'add']);
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post("/toggle/{post}", [FavoriteController::class, 'toggle']);
    Route::get('/likes', [LikeController::class, 'index']);
    Route::post("/toggleLikes/{post}", [LikeController::class, 'toggle']);
});
