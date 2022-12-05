<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Regency;
use App\Models\Village;
use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use App\Http\Requests\UpdateUserRequest;

class UserController extends Controller
{
    public function index(){

    // Ambil seluruh data user dengan filter yang telah ditentukan dari parameter url
    $user =  User::select('id', 'jenis_pengurus', 'nomor_anggota', 'users.name', 'jabatan', 'nik', 'no_hp', 'provinsi', 'kota', 'kecamatan', 'kelurahan', 'created_at')
                    ->with(['provinsi', 'kota','kecamatan','kelurahan'])
                    ->orderBy('created_at', 'DESC')
                    ->where(function($query){
                        $query->where('jenis_pengurus', 'like', '%' . request('jenis_pengurus') . '%')
                                ->where('nomor_anggota', 'like', '%' . request('nomor_anggota') . '%')
                                ->where('kecamatan', 'like', '%' . request('kecamatan') . '%')
                                ->where('kelurahan', 'like', '%' . request('kelurahan') . '%')
                                ->where('provinsi', 'like', '%' . request('provinsi') . '%')
                                ->where('no_hp', 'like', '%' . request('no_hp') . '%')
                                ->where('kota', 'like', '%' . request('kota') . '%')
                                ->where('name', 'like', '%' . request('name') . '%')
                                ->where('nik', 'like', '%' . request('nik') . '%');
                    })
                    ->when(request('all'), function ($query) {
                        // filter user dengan parameter default / tidak ditentukan
                        $query->where('nomor_anggota', 'like', '%' . request('all') . '%')
                                ->orWhere('no_hp', 'like', '%' . request('all') . '%')
                                ->orWhere('name', 'like', '%' . request('all') . '%')
                                ->orWhere('nik', 'like', '%' . request('all') . '%');
                    })
                    ->when(request('sampai'), function ($query){
                        $query->whereDate('created_at', '<=', request('sampai'));
                    })
                    ->when(request('dari'), function ($query){
                        $query->whereDate('created_at', '>=', request('dari'));
                    });

                    
        return response()->json([
            "error"         => false,
            "user"          => $user->get()
        ],Response::HTTP_OK);
    }

    public function show($id){

        $user   =  User::where('nomor_anggota', $id)->first();

        if(!$user){
            return response()->json([
                "error"         => true,
                "message"       => "User Not Found !"
            ],Response::HTTP_NOT_FOUND);
        }

        // proses merubah kode wilayah menjadi nama wilayah
        $user->kecamatan    = District::where('id' , $user->kecamatan)->first()->name;
        $user->provinsi     = Province::where('id' , $user->provinsi)->first()->name;
        $user->kelurahan    = Village::where('id' , $user->kelurahan)->first()->name;
        $user->kota         = Regency::where('id' , $user->kota)->first()->name;
        
        return response()->json([
            "error"         => false,
            "user"          => $user
        ],Response::HTTP_OK);
    }

    public function edit($id){

        $user   =  User::where('nomor_anggota', $id)->first();

        $user->dompet_digital = explode(',',$user->dompet_digital);

        if(!$user){
            return response()->json([
                "error"         => true,
                "message"       => "User Not Found !"
            ],Response::HTTP_NOT_FOUND);
        }

        
        return response()->json([
            "error"         => false,
            "user"          => $user
        ],Response::HTTP_OK);
    }

    public function update(UpdateUserRequest $request, $id){

        $request['tanggal_lahir'] =  Carbon::parse($request['tanggal_lahir'])->format("Y-m-d");

        unset($request['created_at']);
        unset($request['updated_at']);

        $user   =  User::where('nomor_anggota', $id)->update($request->all());
        
        return response()->json([
            "error"         => false,
            "user"          => $user
        ],Response::HTTP_OK);
    }

    public function destroy($id){
        User::where('nomor_anggota', $id)->delete();

        return response()->json([
            "message"          => 'User Deleted !',
          ],Response::HTTP_OK);
    }
}
