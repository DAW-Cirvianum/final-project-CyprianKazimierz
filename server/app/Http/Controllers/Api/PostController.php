<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Tag(
 *     name="Posts",
 *     description="Endpoints relacionados con posts"
 * )
 */
class PostController extends Controller
{
/**
     * List posts paginated
     * 
     * @OA\Get(
     *     path="/api/posts",
     *     summary="Get all posts paginated",
     *     tags={"Posts"},
     *     @OA\Response(
     *         response=200,
     *         description="List of posts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Post"))
     *     )
     * )
     */
public function index()
    {
         $posts = Post::with([
            'user:id,name,avatar',
            'images:id,post_id,path,is_main'
        ])
        ->withCount('liked')
        ->latest()
        ->paginate(5);

        return response()->json($posts);
    }

    /**
     * Get post details
     * 
     * @OA\Get(
     *     path="/api/details/{post}",
     *     summary="Get a post by ID",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Post details",
     *         @OA\JsonContent(ref="#/components/schemas/Post")
     *     )
     * )
     */
    public function details(Post $post)
    {
         return response()->json(
            $post->load([
                'user:id,name,avatar',
                'images:id,post_id,path,is_main',
            ])
        );
    }

    /**
     * Delete post
     * 
     * @OA\Delete(
     *     path="/api/posts/delete/{post}",
     *     summary="Delete a post",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Post deleted"
     *     )
     * )
     */
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

       /**
     * Edit post
     * 
     * @OA\Put(
     *     path="/api/editPost/{post}",
     *     summary="Edit a post",
     *     tags={"Posts"},
     *     @OA\Parameter(
     *         name="post",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Post updated"
     *     )
     * )
     */
    public function editPost(Request $request, Post $post)
{
    //valdiate data
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'km' => 'required|integer|min:0|max:999999',
        'mark' => 'required|string|max:100',
        'model' => 'required|string|max:100',
        'motor' => 'required|in:manual,automatic',
        'year' => 'required|integer|min:1980|max:' . date('Y'),
        'location' => 'required|string|max:100',
        'color' => 'required|string|max:50',
        'price' => 'required|numeric|min:0|max:999999.99',
        'bodywork' => 'required|string|max:50',
        'fuel' => 'required|string|max:50',
        'doors' => 'required|integer|min:1|max:5',
        'new_images' => 'nullable|array|max:4',
        'new_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
        'existing_images' => 'nullable|string',
    ]);

    // Update post
    $post->update($request->except(['new_images', 'existing_images']));

    $existingIds = collect(json_decode($request->existing_images ?? '[]'));

    // delete images that delet in frontend
 foreach ($post->images as $image) {

    if ($image->path === 'posts_images/noImage.png') {
        // solo eliminar relación (registro en BD)
        $image->delete();
        continue;
    }

    if (!Storage::disk('public')->exists($image->path)) {
        // eliminar solo de BD
        $image->delete();
        continue;
    }

    if (!$existingIds->contains($image->id)) {
        Storage::disk('public')->delete($image->path);
        $image->delete();
    }
}
    //if there uploaded we save them
    if ($request->hasFile('new_images')) {
        $order = $post->images()->count();

        foreach ($request->file('new_images') as $image) {
            $path = $image->store('posts_images', 'public');

            $post->images()->create([
                'path' => $path,
                'is_main' => false,
                'order' => $order++,
            ]);
        }
    }

    //In other case if there are not images we save default img
    if ($post->images()->count() === 0) {
        $post->images()->create([
            'path' => 'posts_images/noImage.png',
            'is_main' => true,
            'order' => 0,
        ]);
    }
    
    $post->images()->update(['is_main' => false]);
    $post->images()->orderBy('order')->first()?->update(['is_main' => true]);

    return response()->json([
        'message' => 'Post updated successfully',
        'post' => $post->load('images'),
    ]);
}

  /**
     * Filter posts
     * 
     * @OA\Get(
     *     path="/api/filterPosts",
     *     summary="Filter posts by various criteria",
     *     tags={"Posts"},
     *     @OA\Parameter(name="minPrice", in="query", required=false, @OA\Schema(type="number")),
     *     @OA\Parameter(name="maxPrice", in="query", required=false, @OA\Schema(type="number")),
     *     @OA\Response(
     *         response=200,
     *         description="Filtered posts",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Post"))
     *     )
     * )
     */
public function filterPost(Request $request){
     $query = Post::query();

     if ($request->filled('minPrice')) {
        $query->where('price', '>=', $request->minPrice);
    }

    if ($request->filled('maxPrice')) {
        $query->where('price', '<=', $request->maxPrice);
    }

    if ($request->filled('minKM')) {
        $query->where('km', '>=', $request->minKM);
    }

    if ($request->filled('maxKM')) {
        $query->where('km', '<=', $request->maxKM);
    }

    if ($request->filled('mark')) {
       $query->where('mark', 'like', '%' . trim($request->mark) . '%');
    }

    if ($request->filled('model')) {
        $query->where('model', 'like', '%' . $request->model . '%');
    }

    if ($request->filled('since')) {
        $query->where('year', '>=', $request->since);
    }

    if ($request->filled('to')) {
        $query->where('year', '<=', $request->to);
    }

    if ($request->filled('doors')) {
        $query->where('doors', $request->doors);
    }

    if ($request->filled('motor')) {
        $query->where('motor', $request->motor);
    }

    if ($request->filled('location')) {
        $query->where('location', $request->location);
    }

    if ($request->filled('color')) {
        $query->where('color', $request->color);
    }

    if ($request->filled('bodywork')) {
        $query->where('bodywork', $request->bodywork);
    }

    if ($request->filled('fuel')) {
        $query->where('fuel', $request->fuel);
    }

    return response()->json(
        $query
            ->with('images')
            ->withCount('liked')
            ->orderBy('created_at', 'desc')
            ->paginate(5)
    );

}

/**
 * Create new post
 * 
 * @OA\Post(
 *     path="/api/posts",
 *     summary="Create a new post",
 *     tags={"Posts"},
 *     security={{"sanctum":{}}},
 *     @OA\Response(
 *         response=201,
 *         description="Post created successfully"
 *     )
 * )
 */
public function add(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'description' => 'required|string|max:255',
        'km' => 'required|integer|min:0|max:999999',
        'mark' => 'required|string|max:100',
        'model' => 'required|string|max:100',
        'motor' => 'required|in:manual,automatic',
        'year' => 'required|integer|min:1980|max:' . date('Y'),
        'location' => 'required|string|max:100',
        'color' => 'required|string|max:50',
        'price' => 'required|numeric|min:0|max:999999.99',
        'bodywork' => 'required|string|max:50',
        'fuel' => 'required|string|max:50',
        'doors' => 'required|integer|min:1|max:5',
        'images' => 'nullable|array|max:4',
        'images.*' => 'image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    $post = Post::create([
        'user_id' => $request->user()->id,
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
    ]);

    if ($request->hasFile('images')) {
        $order = 0;

        foreach ($request->file('images') as $image) {
            $path = $image->store('posts_images', 'public');

            $post->images()->create([
                'path' => $path,
                'is_main' => $order === 0,
                'order' => $order++,
            ]);
        }
    }

    if ($post->images()->count() === 0) {
        $post->images()->create([
            'path' => 'posts_images/noImage.png',
            'is_main' => true,
            'order' => 0,
        ]);
    }

    return response()->json([
        'message' => 'Post created successfully',
        'post' => $post->load([
            'images:id,post_id,path,is_main',
            'user:id,name,avatar'
        ])
    ], 201);
}

//Admin
/**
 * Summary of getPosts
 * @return \Illuminate\Contracts\View\View
 */
public function getPosts(){
      $posts = Post::with([
            'user:id,name,avatar',
            'images:id,post_id,path,is_main'
        ])
        ->latest()->get();
        return view('admin.posts', compact('posts'));
}

/**
 * Summary of deleteAdmin
 * @param Post $post
 * @return \Illuminate\Http\RedirectResponse
 */
public function deleteAdmin(Post $post){
    $post->delete();
    return redirect()->back()->with('success', 'Post deleted successfully!');
}

}