<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    @vite('resources/css/app.css') {{-- Importa Tailwind --}}
</head>

<body class="antialiased min-h-screen bg-gray-100">

    {{-- Header --}}
    <header class="bg-black text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <p class="text-2xl font-bold">Hi {{ $user->name }}</p>
        </div>
    </header>

    <div class="flex min-h-[calc(100vh-64px)]"> 
        {{-- Sidebar --}}
        <aside class="bg-gray-800 text-white w-64 p-4">
            <ul class="space-y-2">
                <li><a href="{{ url("/posts") }}" class="hover:text-gray-300">Posts</a></li>
                <li><a href="{{ url("/users") }}" class="hover:text-gray-300">Users</a></li>
            </ul>
        </aside>

        {{-- Main content --}}
        <main class="flex-1 p-6 bg-gray-100">
            <h1 class="text-3xl font-bold mb-4">Dashboard Content</h1>
            <p>Wellcome to your administration panel.</p>
        </main>
    </div>

</body>

</html>
