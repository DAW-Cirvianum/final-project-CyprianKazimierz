<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Logs",
 *     description="Endpoints de autenticación"
 * )
 */
class LogController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/log",
     *     summary="Store a new log in the database",
     *     tags={"Logs"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"status","message"},
     *             @OA\Property(property="status", type="integer", description="Status code of the log", minimum=0, maximum=255, example=200),
     *             @OA\Property(property="message", type="string", description="Log message", example="User created a new post")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Log created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=true),
     *             @OA\Property(property="message", type="string", example="Log has been created")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Validation error"),
     *             @OA\Property(property="error", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
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
