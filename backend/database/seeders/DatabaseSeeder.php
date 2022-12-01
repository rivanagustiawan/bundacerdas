<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "id"                    => uniqid(date("YmdHis") . "-"),
            'jenis_pengurus'        => "pusat",
            'name'                  => "Annisa Novitri",
            'email'                 => "anisa@gmail.com",
            'email_verified_at'     => null,
            'password'              => bcrypt("asdfasdf"),
            'antrian_anggota'       => 1,
            'nomor_anggota'         => "32.10.030.00001",
            'nik'                   => "3210032911950021",
            'jabatan'               => "Ketua Umum",
            'role'                  => "superadmin",
            'tempat_lahir'          => "Majalengka",
            'tanggal_lahir'         => "1995-11-29",
            'pendidikan_terakhir'   => "S1",
            'no_hp'                 => "082121884879",
            'provinsi'              => 32,
            'kota'                  => 3204,
            'kecamatan'             => 3204040,
            'kelurahan'             => 3204040002,
            'alamat_lengkap'        => "RT.002, RW.005",
            'memiliki_anak_sekolah' => "1",
            'jenis_hp'              => "Android",
            'type_hp'               => "Huawei P20 Pro",
            'dompet_digital'        => "OVO,Gopay",
        ]);

        User::create([
            "id"                    => uniqid(date("YmdHis") . "-"),
            'jenis_pengurus'        => "wilayah",
            'name'                  => "Dedeh Sukmawati",
            'email'                 => "dedeh@gmail.com",
            'email_verified_at'     => null,
            'password'              => bcrypt("asdfasdf"),
            'antrian_anggota'       => 2,
            'nomor_anggota'         => "32.10.030.00002",
            'nik'                   => "3210058976551234",
            'jabatan'               => "Sekretaris",
            'role'                  => "user",
            'tempat_lahir'          => "Bekasi",
            'tanggal_lahir'         => "1998-10-17",
            'pendidikan_terakhir'   => "D3",
            'no_hp'                 => "089507436748",
            'provinsi'              => 32,
            'kota'                  => 3204,
            'kecamatan'             => 3204040,
            'kelurahan'             => 3204040002,
            'alamat_lengkap'        => "RT.002, RW.005",
            'memiliki_anak_sekolah' => "0",
            'jenis_hp'              => "Android",
            'type_hp'               => "Huawei P20 Pro",
            'dompet_digital'        => "Gopay",
        ]);
    }
}
