<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function index(Request $request)
{
    return response()->json(
        $request->user()
            ->likes()
            ->pluck('post_id')
    );
}

    public function toggle(Request $request, Post $post)
    {
        $user = $request->user();

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
