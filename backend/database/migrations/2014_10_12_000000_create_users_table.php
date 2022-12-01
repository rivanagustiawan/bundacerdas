<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('jenis_pengurus', 100);
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('antrian_anggota');
            $table->string('nomor_anggota')->unique();
            $table->string('nik');
            $table->string('jabatan');
            $table->string('role')->default("user");
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('pendidikan_terakhir');
            $table->string('no_hp');
            $table->integer('provinsi');
            $table->integer('kota');
            $table->bigInteger('kecamatan');
            $table->bigInteger('kelurahan');
            $table->text('alamat_lengkap');
            $table->string('memiliki_anak_sekolah');
            $table->string('jenis_hp');
            $table->string('type_hp');
            $table->string('dompet_digital');
            // $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
