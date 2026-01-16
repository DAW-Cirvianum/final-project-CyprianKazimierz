@php
use Illuminate\Support\Str;
@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users</title>
    @vite('resources/css/app.css')
</head>

<body class="antialiased min-h-screen bg-gray-100">

    <header class="bg-black text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <a href="{{ route('admin.dashboard') }}" class="hover:text-gray-300">
                ← Go back
            </a>

            <a href="{{ route('admin.users.create') }}"
                class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold">
                + Create User
            </a>
        </div>
    </header>

    <main class="container mx-auto p-6">

        <div class="bg-white shadow-md rounded-lg overflow-x-auto">
            @if (session('success'))
            <p class="mb-4 rounded bg-green-100 border border-green-400 text-green-700 px-4 py-3">
                {{ session('success') }}
            </p>
            @endif

            @if (session('error'))
            <p class="mb-4 rounded bg-red-100 border border-red-400 text-red-700 px-4 py-3">
                {{ session('error') }}
            </p>
            @endif
            
            <table class="min-w-full border border-gray-200">
                <thead class="bg-gray-800 text-white">
                    <tr>
                        <th class="px-4 py-3 text-left">Avatar</th>
                        <th class="px-4 py-3 text-left">Name</th>
                        <th class="px-4 py-3 text-left">Surname</th>
                        <th class="px-4 py-3 text-left">Email</th>
                        <th class="px-4 py-3 text-left">Username</th>
                        <th class="px-4 py-3 text-left">Born date</th>
                        <th class="px-4 py-3 text-left">Role</th>
                        <th class="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-200">
                    @forelse ($users as $user)
                    <tr class="hover:bg-gray-50">

                        <td class="px-4 py-2">
                            <img
                                src="{{ Str::startsWith($user->avatar, ['http://', 'https://'])
            ? $user->avatar
            : "http://localhost/storage/".$user->avatar }}"
                                alt="Avatar"
                                class="w-12 h-12 rounded-full object-cover">
                        </td>
                        <td class="px-4 py-2">{{ $user->name }}</td>
                        <td class="px-4 py-2">{{ $user->surname ?? '-' }}</td>
                        <td class="px-4 py-2">{{ $user->email }}</td>
                        <td class="px-4 py-2">{{ $user->username }}</td>
                        <td class="px-4 py-2">
                            {{ $user->born_date ?? '-' }}
                        </td>

                        <td class="px-4 py-2">
                            <span class="px-2 py-1 rounded text-xs font-semibold
                                    {{ $user->role === 'admin' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700' }}">
                                {{ ucfirst($user->role) }}
                            </span>
                        </td>


                        <td class="px-4 py-2 text-center space-x-2">

                            <a href="{{ route('admin.users.edit', $user->id) }}"
                                class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                                Edit
                            </a>

                            <form action="{{ route('admin.users.destroy', $user->id) }}"
                                method="POST"
                                class="inline-block"
                                onsubmit="return confirm('Are you sure?')">
                                @csrf
                                @method('DELETE')
                                <button
                                    type="submit"
                                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                                    Delete
                                </button>
                            </form>
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="8" class="text-center py-6 text-gray-500">
                            No users found.
                        </td>
                    </tr>
                    @endforelse
                </tbody>
            </table>
        </div>

    </main>

</body>

</html>