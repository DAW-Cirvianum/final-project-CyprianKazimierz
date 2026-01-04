<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string("image_path");
            $table->string("title");
            $table->text("description");
            $table->int("km");
            $table->string("mark");
            $table->string("model");
            $table->string("motor");
            $table->int("year");
            $table->string("location");
            $table->string("color");
            $table->decimal("price",8,2);
            //falta crear migracio relacio amb usuari
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
