<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RecoveryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("/register",[AuthController::class,'register']);
Route::post("/login",[AuthController::class,'login']);
Route::get('/email/verify/{id}/{hash}',[RecoveryController::class,'verifyEmail'])->name('verification.verify');

Route::middleware('auth:sanctum')->group(function (){
    Route::post("/logout",[AuthController::class,'logout']);
    Route::put("/profile",[AuthController::class,'profile']);
});
