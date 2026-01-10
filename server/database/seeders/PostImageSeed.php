<?php

namespace Database\Seeders;

use App\Models\PostImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostImageSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            [
                'post_id'=>1,
                'path'=>"posts_images/audiA3.png",
                'is_main'=>true,
            ],
            [
                'post_id'=>1,
                'path'=>'posts_images/audiA3_2.png'
            ],
            [
                'post_id'=>2,
                'path'=>'posts_images/corsaOpel.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>3,
                'path'=>'posts_images/seatAteca.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>4,
                'path'=>'posts_images/seatIbiza.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>5,
                'path'=>'posts_images/volkswagenGolf.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>6,
                'path'=>'posts_images/jeepCompass.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>7,
                'path'=>'posts_images/bmw1.png',
                'is_main'=>true,
            ],
            [
                'post_id'=>8,
                'path'=>'posts_images/fordFocus.png',
                'is_main'=>true,
            ]
            ];

            foreach($images as $image){
                PostImage::updateOrCreate([
                    'post_id'=> $image['post_id'],
                    'path'=> $image['path']
                ],[
                    'is_main'=> $image['is_main'] ?? false,
                    'order'=>0
                ]);
            }
    }
}
