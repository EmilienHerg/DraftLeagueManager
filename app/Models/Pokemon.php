<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pokemon extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];

    public function drafts(): BelongsToMany
    {
        return $this->belongsToMany(Draft::class);
    }
}
