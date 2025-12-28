<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        if(!User::where('email','admin@cirvianum.cat')->exists() || !User::where('username','admin')->exists()){
        User::factory()->create([
            'name' => 'admin',
            'surname'=>'Laravel',
            'username'=>'admin',
            'email' => 'admin@cirvianum.cat',
            'password'=>Hash::make("112233"),
            'born_date'=>"18/12/2025",
            'avatar'=>"avatars/default.png",
            'role'=>"admin"
        ]);
        }
    }
}
