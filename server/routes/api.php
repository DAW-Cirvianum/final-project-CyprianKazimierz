<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\CommentController;
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
Route::get("/posts",[PostController::class,'index']);
Route::get("/details/{post}", [PostController::class,'details']);


//get all comments
Route::get("/posts/{post}/comments",[CommentController::class,'index']);


//Auth routes with token
Route::middleware('auth:sanctum')->group(function (){
    //user
    Route::post("/logout",[AuthController::class,'logout']);
    Route::put("/profile",[AuthController::class,'profile']);
    Route::get("/user",function(Request $request){
        return response()->json([
        'user' => $request->user()
    ]);
    });
    Route::patch("/completProfile",[AuthController::class,'completeProfile']);

    //log
    Route::post("/log",[LogController::class,'add']);
    //post and favorite or like
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post("/toggle/{post}", [FavoriteController::class, 'toggle']);
    Route::get('/likes', [LikeController::class, 'index']);
    Route::post("/toggleLikes/{post}", [LikeController::class, 'toggle']);
    Route::delete("/posts/delete/{post}",[PostController::class,'delete']);
    Route::post("/posts",[PostController::class,'add']);
    Route::patch('/editPost/{post}',[PostController::class,'editPost']);

    //comments
    Route::post("/posts/{post}/comments",[CommentController::class,'saveComment']);
    Route::delete("/comments/{comment}",[CommentController::class,'deleteComment']);
});
