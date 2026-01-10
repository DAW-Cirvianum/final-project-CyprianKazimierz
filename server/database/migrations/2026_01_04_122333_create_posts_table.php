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
            $table->string("title");
            $table->text("description");
            $table->integer("km");
            $table->string("mark");
            $table->string("model");
            $table->enum("motor",['manual','automatic']);
            $table->integer("year");
            $table->string("location");
            $table->string("color");
            $table->decimal("price",8,2);
            $table->string("bodywork");
            $table->string("fuel");
            $table->tinyInteger("doors");
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
