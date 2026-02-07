<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;

class ErrorResponse
{
    public int $code;
    public string $message;
    public $data;

    public function __construct(int $code = 200, string $message, $data = null)
    {
        $this->code = $code;
        $this->message = $message;
        $this->data = $data;
    }

    public function send(): JsonResponse
    {
        return response()->json([
            'code' => $this->code,
            'success' => false,
            'message' => $this->message,
            'data' => $this->data
        ]);
    }
}
