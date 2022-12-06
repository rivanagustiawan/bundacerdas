<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "jenis_pengurus"        => "required|string",
            "name"                  => "required|string|between:2,100",
            "jabatan"               => "required|string",
            "tempat_lahir"          => "required|string",
            "tanggal_lahir"         => "required|string",
            "pendidikan_terakhir"   => "required|string",
            "provinsi"              => "required",
            "kota"                  => "required",
            "kecamatan"             => "required",
            "kelurahan"             => "required",
            "alamat_lengkap"        => "required",
            "memiliki_anak_sekolah" => "required",
            "jenis_hp"              => "",
            "type_hp"               => "",
            "dompet_digital"        => "",
    ];
    }
    public function messages()
    {
        return [
            "required" => 'Tidak Boleh Kosong.',
            "email"     => 'Format Email Salah.',
            "unique"    => 'Sudah Digunakan.'
        ];
    }
}
