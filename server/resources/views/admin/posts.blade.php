<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Posts</title>
    @vite('resources/css/app.css')
</head>

<body class="antialiased min-h-screen bg-gray-100">

    <header class="bg-black text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('admin.dashboard') }}" class="hover:text-gray-300">Go back</a>
        </div>
    </header>

    <div class="flex min-h-[calc(100vh-64px)]">
        <aside class="bg-gray-800 text-white w-64 p-4">
            <ul class="space-y-2">

            </ul>
        </aside>

        <main class="flex-1 p-6 bg-gray-100">
            <div class="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
                @forelse ($posts as $post)
                <div class="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full p-4">
                    <h2 class="text-3xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {{ $post->title }}
                    </h2>

                    <p class="text-red-600 text-3xl font-semibold">
                        {{ $post->price }} €
                    </p>

                    <div class="mt-4 text-lg text-gray-500 flex flex-row justify-between items-center">
                        <span>
                            {{ $post->location }} - {{ $post->year }} - {{ $post->km }}km - {{ $post->fuel }}
                        </span>
                    </div>


                    <div class="flex justify-end gap-2 mt-4">
                        <a href="#NoFunciona"
                            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Edit
                        </a>

                        <a href="{{ route('admin.posts.delete', $post->id) }}"
                            onclick="return confirm('Are you sure you want to delete this post?');"
                            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                            Delete
                        </a>

                    </div>

                </div>
                @empty
                <p class="text-gray-500">No posts found.</p>
                @endforelse
            </div>
        </main>
    </div>

</body>

</html>