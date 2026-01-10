<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
         $posts = Post::with([
            'user:id,name,avatar',
            'images:id,post_id,path,is_main'
        ])
        ->latest()
        ->paginate(5);

        return response()->json($posts);
    }

    public function details(Post $post)
    {
         return response()->json(
            $post->load([
                'user:id,name,avatar',
                'images:id,post_id,path,is_main',
            ])
        );
    }

    public function delete(Request $request,Post $post){
          if ($post->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 403);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }

    public function add(Request $request){
         $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'km' => 'required|integer|min:0',
        'mark' => 'required|string|max:100',
        'model' => 'required|string|max:100',
        'motor' => 'required|in:Manual,Automatic',
        'year' => 'required|integer|min:1980',
        'location' => 'required|string|max:100',
        'color' => 'required|string|max:50',
        'price' => 'required|numeric|min:0',
        'bodywork' => 'required|string|max:50',
        'fuel' => 'required|string|max:50',
        'doors' => 'required|integer|min:1|max:5',
        'images' => 'nullable|array|max:4',
'images.*' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',

    ]);

    // Crear post
    $post = Post::create([
        'title' => $request->title,
        'description' => $request->description,
        'km' => $request->km,
        'mark' => $request->mark,
        'model' => $request->model,
        'motor' => $request->motor,
        'year' => $request->year,
        'location' => $request->location,
        'color' => $request->color,
        'price' => $request->price,
        'bodywork' => $request->bodywork,
        'fuel' => $request->fuel,
        'doors' => $request->doors,
        'user_id' => $request->user()->id,
    ]);

    // Guardar imágenes (máx 4)
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $index => $image) {
            $path = $image->store('posts_images', 'public');

            $post->images()->create([
                'path' => $path,
                'is_main' => $index === 0,
                'order' => $index,
            ]);
        }
    }

    return response()->json([
        'message' => 'Post created successfully',
        'post' => $post->load('images'),
    ], 201);
    }
}
