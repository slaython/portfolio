<?php

namespace App\Http\Middleware;

use Closure;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TokenExpiry
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Defina o tempo de expiração do token em minutos
        $tokenExpiryMinutes = 60;

        // Obter o token do usuário autenticado
        $token = $request->user()->currentAccessToken();

        if ($token) {
            $tokenCreated = Carbon::parse($token->created_at);
            $tokenExpiresAt = $tokenCreated->addMinutes($tokenExpiryMinutes);

            // Verificar se o token expirou
            if (Carbon::now()->greaterThan($tokenExpiresAt)) {
                // Revogar o token expirado
                $token->delete();
                return response()->json(['message' => 'Token expirado'], 401);
            }
        }

        return $next($request);
    }
}
