<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
/**
 * Function to get the comments
 * Summary of index
 * @param Post $post
 * @return \Illuminate\Http\JsonResponse
 */
public function index(Post $post)
    {
        $comments = $post->comments()
            ->with('user:id,name,avatar') 
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($comments);
    }

    /**
     * Function to add comment
     * Summary of saveComment
     * @param Request $request
     * @param Post $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveComment(Request $request, Post $post){
        //validate data
          $request->validate([
            'txt' => 'required|string|max:255',
        ]);
        //create comment
        $comment = $post->comments()->create([
            'txt' => $request->txt,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Comment created',
            'comment'=>$comment->load('user:id,name,avatar')
        ], 201);
    }

    /**
     * Function to delete comment
     * Summary of deleteComment
     * @param Request $request
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
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
