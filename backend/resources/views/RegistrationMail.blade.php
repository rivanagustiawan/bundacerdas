@component('mail::message')

Selamat datang di Wanita Islam <br>
Berikut ini adalah password anda : {{ $password }}

@component('mail::button', ['url' => "http://localhost:3000/login"])
Login disini
@endcomponent

Thanks,<br>
Bunda Cerdas Wanita Islam
@endcomponent