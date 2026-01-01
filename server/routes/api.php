<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LogController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\RecoveryController;
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
});
