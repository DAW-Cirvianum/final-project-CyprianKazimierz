<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        $comments = $post->comments()
            ->with('user:id,name,avatar') 
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }

    public function saveComment(Request $request, Post $post){
          $request->validate([
            'txt' => 'required|string|max:255',
        ]);

        $comment = $post->comments()->create([
            'txt' => $request->txt,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Comment created',
            'comment'=>$comment->load('user:id,name,avatar')
        ], 201);
    }

    public function deleteComment(Request $request, Comment $comment){
        if ($comment->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $comment->delete();

        return response()->json([
            'message' => 'Comment deleted'
        ]);
    }
}
