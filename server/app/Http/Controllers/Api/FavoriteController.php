<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Favorites",
 *     description="Endpoints de autenticación"
 * )
 */
class FavoriteController extends Controller
{
  /**
     * @OA\Get(
     *     path="/api/favorites",
     *     summary="Get all favorite post IDs of authenticated user",
     *     tags={"Favorites"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of favorite post IDs",
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
                ->favorites()
                ->pluck('post_id')
        );
    }

   
    /**
     * @OA\Post(
     *     path="/api/toggle/{post}",
     *     summary="Toggle favorite status of a post for authenticated user",
     *     tags={"Favorites"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         description="ID of the post to toggle favorite",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Favorite status toggled",
     *         @OA\JsonContent(
     *             @OA\Property(property="favorited", type="boolean", example=true)
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
        //get user
        $user = $request->user();
        //if favorites user_id exists eliminate id else we add id
        if ($user->favorites()->where('post_id', $post->id)->exists()) {
            $user->favorites()->detach($post->id);
            $favorited = false;
        } else {
            $user->favorites()->attach($post->id);
            $favorited = true;
        }

        return response()->json([
            'favorited' => $favorited
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/favorites/posts",
     *     summary="Get full details of favorite posts of authenticated user",
     *     tags={"Favorites"},
     *     security={{"sanctum":{}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of favorite posts",
     *         @OA\JsonContent(
     *             @OA\Property(
     *                 property="favoritePosts",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="title", type="string", example="Sample post"),
     *                     @OA\Property(property="user", type="object",
     *                         @OA\Property(property="id", type="integer", example=1),
     *                         @OA\Property(property="name", type="string", example="John Doe"),
     *                         @OA\Property(property="avatar", type="string", example="/storage/avatars/default.png")
     *                     ),
     *                     @OA\Property(property="images", type="array",
     *                         @OA\Items(
     *                             @OA\Property(property="id", type="integer", example=1),
     *                             @OA\Property(property="post_id", type="integer", example=1),
     *                             @OA\Property(property="path", type="string", example="/storage/posts/image1.png"),
     *                             @OA\Property(property="is_main", type="boolean", example=true)
     *                         )
     *                     ),
     *                     @OA\Property(property="liked_count", type="integer", example=5)
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function favoritePosts(Request $request){
         $user = $request->user();

    $favPosts = $user->favorites()
        ->with([
            'user:id,name,avatar',
            'images:id,post_id,path,is_main',
        ])
        ->withCount('liked')
        ->latest()
        ->get();

    return response()->json([
        'favoritePosts' => $favPosts
    ]);
    }
}
