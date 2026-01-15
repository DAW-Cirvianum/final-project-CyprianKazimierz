<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        'doors',
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
public function liked()
{
    return $this->belongsToMany(User::class, 'likes')
                ->withTimestamps();
}
 public function comments() {
        return $this->hasMany(Comment::class);
    }

    
public function user()
{
    return $this->belongsTo(User::class);
}

public function images()
{
    return $this->hasMany(PostImage::class);
}

//delete images form storage on delete
protected static function booted()
{
    static::deleting(function ($post) {

        foreach ($post->images as $image) {

            // No borrar la imagen por defecto
            if ($image->path !== 'posts_images/noImage.png') {
                Storage::disk('public')->delete($image->path);
            }
        }

        // borrar registros de la BD
        $post->images()->delete();
    });
}


}
