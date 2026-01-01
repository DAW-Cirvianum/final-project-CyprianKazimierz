<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    public function add(Request $request)
    {   
        $user = $request->user();
        $validate = Validator::make($request->all(), [
            'status'  => ['required', 'integer', 'between:0,255'],
            'message' => ['required', 'string'],
        ]);

        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }

        $validated = $validate->validated();

        Log::create([
            'status'=>$validated['status'],
            'message'=>$validated['message'],
            'user_id'=>$user?->id
        ]);

        return response()->json([
            'status' => true,
            'message' => "Log has been created",
        ], 201);
    }
}
