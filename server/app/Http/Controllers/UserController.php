<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
     public function getUsers(){
        $users = User::all();
        return view('admin.user',compact('users'));
    }

    public function create(){
        return view('admin.create');
    }

    public function edit(User $user){
        return view('admin.edit',compact('user'));

    }

    public function destroy(User $user){

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        if (
            $user->avatar &&
            !str_starts_with($user->avatar, 'http') || $user->avatar && !Str::contains($user->avatar,"default.png")
        ) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->tokens()->delete();

        $user->delete();

        return $this->getUsers()->with('success', 'User deleted successfully.');
    }
}
