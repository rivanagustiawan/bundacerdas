<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\Models\User
 *
 * @property int $id
 * @property string $jenis_pengurus
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property int $antrian_anggota
 * @property string $nomor_anggota
 * @property string $nik
 * @property string $jabatan
 * @property string $role
 * @property string $tempat_lahir
 * @property string $tanggal_lahir
 * @property string $pendidikan_terakhir
 * @property string $no_hp
 * @property int $provinsi
 * @property int $kota
 * @property int $kecamatan
 * @property int $kelurahan
 * @property string $alamat_lengkap
 * @property string $memiliki_anak_sekolah
 * @property string $jenis_hp
 * @property string $type_hp
 * @property string $dompet_digital
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAlamatLengkap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAntrianAnggota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDompetDigital($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereJabatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereJenisHp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereJenisPengurus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereKecamatan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereKelurahan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereKota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMemilikiAnakSekolah($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereNik($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereNoHp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereNomorAnggota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePendidikanTerakhir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProvinsi($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTanggalLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTempatLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTypeHp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable implements JWTSubject
{
  use HasApiTokens, HasFactory, Notifiable;

  protected $primaryKey   = "id";
  public    $incrementing = false;
  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'id',
    'jenis_pengurus',
    'name',
    'email',
    'password',
    'antrian_anggota',
    'nomor_anggota',
    'nik',
    'jabatan',
    'role',
    'tempat_lahir',
    'tanggal_lahir',
    'pendidikan_terakhir',
    'no_hp',
    'provinsi',
    'kota',
    'kecamatan',
    'kelurahan',
    'alamat_lengkap',
    'memiliki_anak_sekolah',
    'jenis_hp',
    'type_hp',
    'dompet_digital',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function getJWTIdentifier()
  {
    return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
    return [];
  }
}
