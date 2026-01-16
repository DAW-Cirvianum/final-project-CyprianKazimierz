<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Likes",
 *     description="Endpoints de autenticación"
 * )
 */
class LikeController extends Controller
{
 /**
     * @OA\Get(
     *     path="/api/likes",
     *     summary="Get all liked post IDs of authenticated user",
     *     tags={"Likes"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of liked post IDs",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
public function index(Request $request)
{
    return response()->json(
        $request->user()
            ->likes()
            ->pluck('post_id')
    );
}

 /**
     * @OA\Post(
     *     path="/api/toggleLikes/{post}",
     *     summary="Toggle like status of a post for authenticated user",
     *     tags={"Likes"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         description="ID of the post to toggle like",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Like status toggled",
     *         @OA\JsonContent(
     *             @OA\Property(property="liked", type="boolean", example=true),
     *             @OA\Property(property="likes_count", type="integer", example=5)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
public function toggle(Request $request, Post $post)
    {
        //get the user
        $user = $request->user();
        // in the likes in the post the user exists eliminate else we add
        if ($user->likes()->where('post_id', $post->id)->exists()) {
            $user->likes()->detach($post->id);
            $liked = false;
        } else {
            $user->likes()->attach($post->id);
            $liked = true;
        }

        return response()->json([
            'liked' => $liked,
            'likes_count' => $post->liked()->count()
        ]);
    }
}
