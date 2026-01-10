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
            'title'=>"Selling my Audi",
            'description'=>"Selling my Audi, very low consume, few km, and new brake pads",
            'km'=>130000,
            'mark'=>"Audi",
            'model'=>"A3",
            'motor'=>"Manual",
            'year'=>2013,
            'location'=>"Albacete",
            'color'=>"Black",
            'price'=>12999.00,
            'bodywork'=>"Coupe",
            'fuel'=>"Disel",
            'doors'=>4,
            'user_id'=>3
            ],
            [
            'title'=>"Selling my Opel Corsa, i have one meore",
            'description'=>"Selling my Opel Corsa, very low consume, few km, and new brake pads",
            'km'=>80000,
            'mark'=>"Opel",
            'model'=>"Corsa",
            'motor'=>"Manual",
            'year'=>2008,
            'location'=>"Ourense",
            'color'=>"Gray",
            'price'=>8999.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Gasoline",
            'doors'=>2,
            'user_id'=>2
            ],
            [
            'title'=>"Selling my Seat Ateca",
            'description'=>"Selling my Seat Ateca, very low consume, few km, and new brake pads,
            aaaa aaaaa aa aaaaaaaaa aaaaaaaa aaaaaa aaaaaaaa aaaaaaaaaaaa aaaaa
            aaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa
            aaaaa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaa aaaaaaaaaa aaaaaa  aaaaaa",
            'km'=>124000,
            'mark'=>"Seat",
            'model'=>"Ateca",
            'motor'=>"Manual",
            'year'=>2018,
            'location'=>"Barcelona",
            'color'=>"Blue",
            'price'=>8999.00,
            'bodywork'=>"Suv",
            'fuel'=>"Gasoline",
            'doors'=>4,
            'user_id'=>2
            ],
            [
            'title'=>"Selling my Seat Ibiza, i have one meore",
            'description'=>"Selling my Seat Ibiza, very low consume, few km, and new brake pads, ITech",
            'km'=>210000,
            'mark'=>"Seat",
            'model'=>"Ibiza",
            'motor'=>"Manual",
            'year'=>2015,
            'location'=>"Sevilla",
            'color'=>"Red",
            'price'=>7800.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Disel",
            'doors'=>4,
            'user_id'=>5
            ],[
            'title'=>"Selling my Volkswagen Gols, i have one meore",
            'description'=>"Selling my Volkswagen Golf, very low consume, few km, and new brake pads, ITech",
            'km'=>210000,
            'mark'=>"Volkswagen",
            'model'=>"Golf",
            'motor'=>"Manual",
            'year'=>2014,
            'location'=>"Bilbao",
            'color'=>"Withe",
            'price'=>14000.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Gasoline",
            'doors'=>4,
            'user_id'=>4
            ],
            [
            'title'=>"Selling my Jeep Compass, i have one meore",
            'description'=>"Selling my Jeep Compass, very low consume, few km, and new brake pads, ITech",
            'km'=>97000,
            'mark'=>"Jeep",
            'model'=>"Compass",
            'motor'=>"Automatic",
            'year'=>2017,
            'location'=>"Tarragona",
            'color'=>"Black",
            'price'=>14500.00,
            'bodywork'=>"PickUp",
            'fuel'=>"Electic",
            'doors'=>4,
            'user_id'=>4
            ],
            [
            'title'=>"Selling my BMW serie 1, i have one meore",
            'description'=>"Selling my BMW SERIE 1, very low consume, few km, and new brake pads, ITech",
            'km'=>250000,
            'mark'=>"BMW",
            'model'=>"SERIE 1",
            'motor'=>"Manual",
            'year'=>2015,
            'location'=>"Barcelona",
            'color'=>"Red",
            'price'=>9400.00,
            'bodywork'=>"Coupe",
            'fuel'=>"Disel",
            'doors'=>2,
            'user_id'=>3
            ],
            [
            'title'=>"Selling my Ford Focus, i have one meore",
            'description'=>"Selling my Ford Focus, very low consume, few km, and new brake pads, ITech",
            'km'=>91515,
            'mark'=>"Ford",
            'model'=>"Focus",
            'motor'=>"Manual",
            'year'=>2021,
            'location'=>"MADRID",
            'color'=>"White",
            'price'=>17900.00,
            'bodywork'=>"Berlina",
            'fuel'=>"Hibrid",
            'doors'=>4,
            'user_id'=>2
        ]
        
            ];

            foreach($posts as $post){
                 Post::updateOrCreate($post);
            }
       
    }
}
