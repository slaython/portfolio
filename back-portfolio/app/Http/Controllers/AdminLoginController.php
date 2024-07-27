<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuarios;

class AdminLoginController extends Controller
{
    public function Adminlogin(Request $request)
    {
        // $encrypted = Crypt::encryptString($request->email.'_'.$request->password);
        // $decrypted = Crypt::decryptString($encrypted);

        // VERIFICA SE O USUARIO EXISTE NO BANCO
        $usuario = Usuarios::where('usuario', $request->email)->first();
        if(!$usuario){
            return response()->json([
                'message' => 'Usuário não encontrado',
                // ENVIA STATUS
                'status' => 401
            ]);
        }
        // VERIFICA SE A SENHA ESTÁ CORRETA
        $hash = Hash::make($request->email.'_'.$request->password);
        $comparaHash = Hash::check($request->email.'_'.$request->password, $usuario->senha);
        if($comparaHash == false){
            return response()->json([
                'message' => 'Senha incorreta',
                // ENVIA STATUS
                'status' => 401
            ]);
        }
        // REALIZA O LOGIN
        return response()->json([
            'usuarios' => $usuario,
            // ENVIA STATUS
            'status' => 200
        ]);
    }
}
