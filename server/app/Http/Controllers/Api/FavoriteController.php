<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        return response()->json(
            $request->user()
                ->favorites()
                ->pluck('post_id')
        );
    }

    public function toggle(Request $request, Post $post)
    {
        $user = $request->user();

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
