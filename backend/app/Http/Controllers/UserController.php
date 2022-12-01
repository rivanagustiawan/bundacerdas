<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(){
        return response()->json([
            "user"          => User::all(),
          ],200);
    }
    public function destroy($id){
        User::where('nomor_anggota', $id)->delete();

        return response()->json([
            "message"          => 'User Deleted !',
          ],200);
    }
}
