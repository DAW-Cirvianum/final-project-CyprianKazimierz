<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Function to get all id of favorites post of the user
     * Summary of index
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
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
     * Function to switch value if is favorite or not
     * Summary of toggle
     * @param Request $request
     * @param Post $post
     * @return \Illuminate\Http\JsonResponse
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
}
