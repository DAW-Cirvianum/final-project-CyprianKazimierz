<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
            'image_path'=>"posts_images/audiA3.png",
            'title'=>"Selling my Audi",
            'description'=>"Selling my Audi, very low consume, few km, and new brake pads",
            'km'=>130000,
            'mark'=>"Audi",
            'model'=>"A3",
            'motor'=>"manual",
            'year'=>2013,
            'location'=>"Vic",
            'color'=>"black",
            'price'=>12999.00,
            'bodywork'=>"Coupe",
            'fuel'=>"Disel",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/corsaOpel.png",
            'title'=>"Selling my Opel Corsa, i have one meore",
            'description'=>"Selling my Opel Corsa, very low consume, few km, and new brake pads",
            'km'=>80000,
            'mark'=>"Opel",
            'model'=>"Corsa",
            'motor'=>"manual",
            'year'=>2008,
            'location'=>"Lleida",
            'color'=>"Gray",
            'price'=>8999.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Gasoline",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/seatAteca.png",
            'title'=>"Selling my Seat Ateca",
            'description'=>"Selling my Seat Ateca, very low consume, few km, and new brake pads",
            'km'=>124000,
            'mark'=>"Seat",
            'model'=>"Ateca",
            'motor'=>"manual",
            'year'=>2018,
            'location'=>"Barcelona",
            'color'=>"Blue",
            'price'=>8999.00,
            'bodywork'=>"Suv",
            'fuel'=>"Gasoline",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/seatIbiza.png",
            'title'=>"Selling my Seat Ibiza, i have one meore",
            'description'=>"Selling my Seat Ibiza, very low consume, few km, and new brake pads, ITech",
            'km'=>210000,
            'mark'=>"Seat",
            'model'=>"Ibiza",
            'motor'=>"manual",
            'year'=>2015,
            'location'=>"Castellón",
            'color'=>"Red",
            'price'=>7800.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Disel",
            'user_id'=>null
            ],[
            'image_path'=>"posts_images/volkswagenGolf.png",
            'title'=>"Selling my Volkswagen Gols, i have one meore",
            'description'=>"Selling my Volkswagen Golf, very low consume, few km, and new brake pads, ITech",
            'km'=>210000,
            'mark'=>"Volkswagen",
            'model'=>"Golf",
            'motor'=>"manual",
            'year'=>2014,
            'location'=>"Cantabria",
            'color'=>"Withe",
            'price'=>14000.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Gasoline",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/jeepCompass.png",
            'title'=>"Selling my Jeep Compass, i have one meore",
            'description'=>"Selling my Jeep Compass, very low consume, few km, and new brake pads, ITech",
            'km'=>97000,
            'mark'=>"Jeep",
            'model'=>"Compass",
            'motor'=>"Automatic",
            'year'=>2017,
            'location'=>"Tenerife",
            'color'=>"Black",
            'price'=>14500.00,
            'bodywork'=>"pick Up",
            'fuel'=>"Electic",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/bmw1.png",
            'title'=>"Selling my BMW serie 1, i have one meore",
            'description'=>"Selling my BMW SERIE 1, very low consume, few km, and new brake pads, ITech",
            'km'=>250000,
            'mark'=>"BMW",
            'model'=>"SERIE 1",
            'motor'=>"manual",
            'year'=>2015,
            'location'=>"Barcelona",
            'color'=>"Red",
            'price'=>9400.00,
            'bodywork'=>"Coupe",
            'fuel'=>"Disel",
            'user_id'=>null
            ],
            [
            'image_path'=>"posts_images/fordFocus.png",
            'title'=>"Selling my Ford Focus, i have one meore",
            'description'=>"Selling my Ford Focus, very low consume, few km, and new brake pads, ITech",
            'km'=>91515,
            'mark'=>"Ford",
            'model'=>"Focus",
            'motor'=>"manual",
            'year'=>2021,
            'location'=>"Madrid",
            'color'=>"White",
            'price'=>17900.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Hibrid",
            'user_id'=>null
        ]
        
            ];

            foreach($posts as $post){
                 Post::updateOrCreate($post);
            }
       
    }
}
