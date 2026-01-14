<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    /**
     * Function to store log in db
     * Summary of add
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {   
        //get user
        $user = $request->user();

        //validate data
        $validate = Validator::make($request->all(), [
            'status'  => ['required', 'integer', 'between:0,255'],
            'message' => ['required', 'string'],
        ]);
        //if fails return error
        if ($validate->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation error',
                'error' => $validate->errors()
            ], 422);
        }
        //get valdiated data
        $validated = $validate->validated();
        //create log with the data
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
