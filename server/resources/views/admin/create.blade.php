<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create User</title>
    @vite('resources/css/app.css') 
</head>

<body class="antialiased min-h-screen bg-gray-100">

    <header class="bg-black text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('admin.dashboard') }}" class="hover:text-gray-300">
                ← Go Home
            </a>
        </div>
    </header>

    <div class="flex min-h-[calc(100vh-64px)]"> 
        <aside class="bg-gray-800 text-white w-64 p-4">
            <ul class="space-y-2">
                <li><a href="{{ route("admin.posts") }}" class="hover:text-gray-300">Posts</a></li>
                <li><a href="{{ route("admin.users") }}" class="hover:text-gray-300">Users</a></li>
            </ul>
        </aside>

        
       <main class="flex-1 p-6 bg-gray-100">
    <h1 class="text-3xl text-center font-bold mb-6">Create User</h1>

    <div class="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
        <div class="mb-4">
            <label for="name" class="block text-gray-700 font-semibold mb-1">Name</label>
            <input type="text" id="name" name="name" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="surname" class="block text-gray-700 font-semibold mb-1">Surname</label>
            <input type="text" id="surname" name="surname" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="username" class="block text-gray-700 font-semibold mb-1">Username</label>
            <input type="text" id="username" name="username" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="email" class="block text-gray-700 font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email"
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="born_date" class="block text-gray-700 font-semibold mb-1">Born Date</label>
            <input type="date" id="born_date" name="born_date" 
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="avatar" class="block text-gray-700 font-semibold mb-1">Avatar</label>
            <input type="file" id="avatar" name="avatar"
                   class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>

        <div class="mb-4">
            <label for="role" class="block text-gray-700 font-semibold mb-1">Role</label>
            <select id="role" name="role"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Admin</option>
                <option value="user" >User</option>
            </select>
        </div>
        <div class="mt-6 text-right">
            <button type="button"
                    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                Create
            </button>
        </div>
    </div>
</main>

    </div>

</body>

</html>
