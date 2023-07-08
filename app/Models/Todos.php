<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    use HasFactory;
    
    // The table name
    protected $table = 'todo';
    
    // The attributes that are mass assignable
    protected $fillable = [
        'title',
        'category',
        'labels',
        'done',
        'deleted',
        'date'
    ];
    
    // The attributes that should be cast to native types
    protected $casts = [
        'labels' => 'array',
        'done' => 'boolean',
        'deleted' => 'boolean',
        'date' => 'date'
    ];
}
