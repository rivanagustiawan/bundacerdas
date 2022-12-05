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
        $this->call(IndoRegionProvinceSeeder::class);
        $this->call(IndoRegionRegencySeeder::class);
        $this->call(IndoRegionDistrictSeeder::class);
        $this->call(IndoRegionVillageSeeder::class);
        User::factory(1000)->create();

        User::create([
            "id"                    => uniqid(date("YmdHis") . "-"),
            'jenis_pengurus'        => "pusat",
            'name'                  => "Annisa Nur Shabrina",
            'email'                 => "anisa@gmail.com",
            'email_verified_at'     => null,
            'password'              => bcrypt("12345678"),
            'antrian_anggota'       => 1,
            'nomor_anggota'         => "32.10.030.0000",
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
    
    }
}
