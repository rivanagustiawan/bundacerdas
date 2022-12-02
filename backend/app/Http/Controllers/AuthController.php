<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Helper;
use App\Http\Resources\UserResource;
use App\Mail\RegistrationMail;
use App\Models\District;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  public function __construct()
  {
    $exceptMiddleware = [
      "login",
      "register",
      "getProvinces",
      "getRegencies",
      "getDistricts",
      "getVillages",
    ];

    $this->middleware("auth:api", ["except" => $exceptMiddleware]);
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      "email"    => "required|email",
      "password" => "required|string|min:6"
    ], Helper::validationMessage());

    if ($validator->fails()) {
      return response()->json([
        "status"  => 400,
        "type"    => "validation",
        "message" => $validator->errors()
      ], 400);
    }

    $tokenValidity = 30 * 24 * 60;
    // $tokenValidity = 1;

    $this->guard()->factory()->setTTL($tokenValidity);

    if (!$token = $this->guard()->attempt($validator->validated())) {
      return response()->json([
        "status"  => 401,
        "type"    => "attempt",
        "message" => "Unauthorized"
      ], 401);
    }

    return $this->respondWithToken($token);
  }

  public function register(Request $request)
  {
    $allowedRequest = $request->only('jenis_pengurus', 'name', 'email', 'nik', 'jabatan', 'tempat_lahir', 'tanggal_lahir', 'pendidikan_terakhir', 'no_hp', 'provinsi', 'kota', 'kecamatan', 'kelurahan', 'alamat_lengkap', 'memiliki_anak_sekolah', 'jenis_hp', 'type_hp', 'dompet_digital');

    $validator = Validator::make($allowedRequest, [
      "jenis_pengurus"        => "required|string",
      "name"                  => "required|string|between:2,100",
      "email"                 => "required|email|unique:users,email",
      "nik"                   => "required|string|unique:users,nik",
      "jabatan"               => "required|string",
      "tempat_lahir"          => "required|string",
      "tanggal_lahir"         => "required|string",
      "pendidikan_terakhir"   => "required|string",
      "no_hp"                 => "required|string",
      "provinsi"              => "required",
      "kota"                  => "required",
      "kecamatan"             => "required",
      "kelurahan"             => "required",
      "alamat_lengkap"        => "required",
      "memiliki_anak_sekolah" => "required",
      "jenis_hp"              => "required",
      "type_hp"               => "required",
      "dompet_digital"        => "required",
    ], Helper::validationMessage());

    if ($validator->fails()) {
      return response()->json(["errors" => $validator->errors()], 422);
    }

    $antrian = User::select("antrian_anggota")
      ->where("provinsi", $request->provinsi)
      ->orderBy("antrian_anggota", "DESC")
      ->first();

    $antrian = $antrian ? $antrian->antrian_anggota : 0;
    $antrian++;

    $code                  = str_split($request->kecamatan, 2);
    $antrianAnggota        = sprintf('%05d', $antrian);
    $generatedNomorAnggota = $code[0] . "." . $code[1] . "." . $code[2] . $code[3] . "." . $antrianAnggota;

    $generatedPassword = Helper::generateRandomString(15);

    try {
      Mail::to($request->email)->send(new RegistrationMail(
        $request->name,
        $request->email,
        $request->nik,
        $generatedNomorAnggota,
        $generatedPassword
      ));

      $user = User::create(array_merge(
        $validator->validated(),
        [
          "id"              => uniqid(date("YmdHis") . "-"),
          "tanggal_lahir"   => date("Y-m-d", strtotime($request->tanggal_lahir)),
          "password"        => bcrypt($generatedPassword),
          "antrian_anggota" => $antrian,
          "nomor_anggota"   => $generatedNomorAnggota,
        ]
      ));

      return response()->json([
        "status"  => 200,
        "error"   => false,
        "message" => "User registered successfully",
        "data"    => [
          "user" => $user
        ]
      ]);
    } catch (Exception $e) {
      return response()->json([
        "status"  => 500,
        "error"   => true,
        "message" => $e->getMessage(),
        "data"    => null
      ]);
    }
  }

  public function logout()
  {
    $this->guard()->logout();

    return response()->json(["message" => "User logged out successfully"]);
  }

  public function profile()
  {
    return response()->json([
      "status" => 200,
      "error"  => false,
      "data"   => [
        "user" => new UserResource($this->guard()->user())
      ]
    ]);
  }


  public function refresh()
  {
    return $this->respondWithToken($this->guard()->refresh());
  }


  protected function respondWithToken($token)
  {
    return response()->json([
      "token"          => $token,
      "token_type"     => "Bearer",
      "user_data"      => new UserResource($this->guard()->user()),
      "token_validity" => $this->guard()->factory()->getTTL() * 60
    ]);
  }

  protected function guard()
  {
    return Auth::guard();
  }

  public function getProvinces()
  {
    return response()->json([
      "status" => 200,
      "error"  => false,
      "data"   => [
        "provinces" => Province::all()
      ]
    ]);
  }

  public function getRegencies(Province $province)
  {
    return response()->json([
      "status" => 200,
      "error"  => false,
      "data"   => [
        "regencies" => $province->regencies
      ]
    ]);
  }

  public function getDistricts(Regency $regency)
  {
    return response()->json([
      "status" => 200,
      "error"  => false,
      "data"   => [
        "districts" => $regency->districts
      ]
    ]);
  }

  public function getVillages(District $district)
  {
    return response()->json([
      "status" => 200,
      "error"  => false,
      "data"   => [
        "villages" => $district->villages
      ]
    ]);
  }
}
