<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
/**
 * Function to get All likes of users of the posts
 * Summary of index
 * @param Request $request
 * @return \Illuminate\Http\JsonResponse
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
 * Function to toggle the likes of user
 * Summary of toggle
 * @param Request $request
 * @param Post $post
 * @return \Illuminate\Http\JsonResponse
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
            'liked' => $liked
        ]);
    }
}
