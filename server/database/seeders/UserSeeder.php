<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
         
        if(!User::where('email','admin@cirvianum.cat')->exists() || !User::where('username','admin')->exists()){
        User::factory()->create([
            'name' => 'admin',
            'surname'=>'Laravel',
            'username'=>'admin',
            'email' => 'admin@cirvianum.cat',
            'password'=>Hash::make("112233"),
            'born_date'=>"2025-12-18",
            'avatar'=>"avatars/default.png",
            'role'=>"admin"
        ]);
        User::factory(4)->create();
        }
        
    }
}
