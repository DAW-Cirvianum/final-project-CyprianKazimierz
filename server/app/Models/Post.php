<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $fillable = [
        'image_path',
        'title',
        'description',
        'km',
        'mark',
        'model',
        'motor',
        'year',
        'location',
        'color',
        'price',
        'bodywork',
        'fuel',
        'user_id'
    ];
}
