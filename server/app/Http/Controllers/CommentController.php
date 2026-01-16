<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Comments",
 *     description="Endpoints de autenticación"
 * )
 */
class CommentController extends Controller
{
 /**
     * @OA\Get(
     *     path="/api/posts/{post}/comments",
     *     summary="Get all comments of a post",
     *     tags={"Comments"},
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         description="ID of the post",
     *         required=true,
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of comments",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="txt", type="string", example="This is a comment"),
     *                 @OA\Property(property="user", type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="John Doe"),
     *                     @OA\Property(property="avatar", type="string", example="/storage/avatars/default.png")
     *                 ),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2026-01-16T10:00:00Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Post not found"
     *     )
     * )
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
     * @OA\Post(
     *     path="/api/posts/{post}/comments",
     *     summary="Add a comment to a post",
     *     tags={"Comments"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="postId",
     *         in="path",
     *         required=true,
     *         description="ID of the post",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"txt"},
     *             @OA\Property(property="txt", type="string", example="This is my comment")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Comment created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Comment created"),
     *             @OA\Property(property="comment", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="txt", type="string", example="This is my comment"),
     *                 @OA\Property(property="user", type="object",
     *                     @OA\Property(property="id", type="integer", example=1),
     *                     @OA\Property(property="name", type="string", example="John Doe"),
     *                     @OA\Property(property="avatar", type="string", example="/storage/avatars/default.png")
     *                 ),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2026-01-16T10:00:00Z")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
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
     * @OA\Delete(
     *     path="/api/comments/{comment}",
     *     summary="Delete a comment by the authenticated user",
     *     tags={"Comments"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(
     *         name="commentId",
     *         in="path",
     *         required=true,
     *         description="ID of the comment to delete",
     *         @OA\Schema(type="integer", example=1)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Comment deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Comment deleted")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
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
