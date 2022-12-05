<?php

namespace Database\Factories;

use App\Models\Regency;
use App\Models\Village;
use App\Models\District;
use App\Models\Province;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
      $pengurus   = ['Pusat', 'Wilayah', 'Daerah', 'Cabang', 'Ranting', 'Anggota'];
      $random     = Carbon::today()->subDays(mt_rand(1, 30));
      $provinsi   = Province::inRandomOrder()->first();
      $kota       = Regency::where('province_id', $provinsi->id)->inRandomOrder()->first();
      $kecamatan  = District::where('regency_id', $kota->id)->inRandomOrder()->first();
      $kelurahan  = Village::where('district_id', $kecamatan->id)->inRandomOrder()->first();

      return  [
        "id"                    => $this->faker->numerify('##########'),
        'jenis_pengurus'        => $pengurus[mt_rand(0,5)],
        'name'                  => $this->faker->name(),
        'email'                 => $this->faker->unique()->safeEmail(),
        'email_verified_at'     => null,
        'password'              => bcrypt("12345678"),
        'antrian_anggota'       => 1,
        'nomor_anggota'         => $this->faker->numerify('###-###-####'),
        'nik'                   => "3210032911951".mt_rand(5,100),
        'jabatan'               => "Ketua Umum",
        'role'                  => "user",
        'tempat_lahir'          => "Majalengka",
        'tanggal_lahir'         => "1995-11-29",
        'pendidikan_terakhir'   => "S1",
        'no_hp'                 => "082121884".mt_rand(5,150),
        'provinsi'              => $provinsi->id,
        'kota'                  => $kota->id,
        'kecamatan'             => $kecamatan->id,
        'kelurahan'             => $kelurahan->id,
        'alamat_lengkap'        => "RT.002, RW.005",
        'memiliki_anak_sekolah' => "1",
        'jenis_hp'              => "Android",
        'type_hp'               => "Huawei P20 Pro",
        'dompet_digital'        => "OVO,Gopay",
        'created_at'            => $random
      ];
   
  }

  /**
   * Indicate that the model's email address should be unverified.
   *
   * @return \Illuminate\Database\Eloquent\Factories\Factory
   */
  public function unverified()
  {
    return $this->state(function (array $attributes) {
      return [
        'email_verified_at' => null,
      ];
    });
  }
}
