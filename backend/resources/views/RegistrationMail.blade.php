@component('mail::message')

Selamat datang di Wanita Islam <br>
Berikut ini adalah informasi anda :
- Nama          : {{ $name }} <br>
- Email         : {{ $email }} <br>
- NIK           : {{ $nik }} <br>
- Nomor Anggota : {{ $nomorAnggota }} <br>
- Password      : {{ $password }}

@component('mail::button', ['url' => "http://localhost:3000/login"])
Login disini
@endcomponent

Thanks,<br>
Bunda Cerdas Wanita Islam
@endcomponent