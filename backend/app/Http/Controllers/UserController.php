<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        $user =  User::select('id', 'jenis_pengurus', 'nomor_anggota', 'name', 'jabatan', 'nik', 'no_hp', 'provinsi', 'kota', 'kecamatan', 'kelurahan', 'created_at')
            ->where('jenis_pengurus', 'like', '%' . request('jenis_pengurus') . '%')
            ->where('name', 'like', '%' . request('name') . '%')
            ->where('nomor_anggota', 'like', '%' . request('nomor_anggota') . '%')
            ->where('nik', 'like', '%' . request('nik') . '%')
            ->where('no_hp', 'like', '%' . request('no_hp') . '%')
            ->where('provinsi', 'like', '%' . request('provinsi') . '%')
            ->where('kota', 'like', '%' . request('kota') . '%')
            ->where('kecamatan', 'like', '%' . request('kecamatan') . '%')
            ->where('kelurahan', 'like', '%' . request('kelurahan') . '%');

        if (request('all')) {
            $user->where('name', 'like', '%' . request('all') . '%')
                ->orWhere('nomor_anggota', 'like', '%' . request('all') . '%')
                ->orWhere('nik', 'like', '%' . request('all') . '%')
                ->orWhere('no_hp', 'like', '%' . request('all') . '%');
        }

        if (request('dari')) {
            $user->whereDate('created_at', '>=', request('dari'));
        }
        if (request('sampai')) {
            $user->whereDate('created_at', '<=', request('sampai'));
        }

        return response()->json([
            'status'  => 200,
            'message' => 'Success.',
            "user"    => $user->get()
        ], 200);
    }
    public function show($id)
    {

        return response()->json([
            'status'        => 200,
            'message'       => 'Success.',
            "user"          => User::where('nomor_anggota', $id)->first()
        ], 200);
    }

    public function destroy($id)
    {
        User::where('nomor_anggota', $id)->delete();

        return response()->json([
            "message"          => 'User Deleted !',
        ], 200);
    }
}
