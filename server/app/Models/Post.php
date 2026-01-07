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
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image_path
            ? asset('storage/' . $this->image_path)
            : null;
    }

    public function favoritedBy()
{
    return $this->belongsToMany(User::class, 'favorites')
                ->withTimestamps();
}

}
