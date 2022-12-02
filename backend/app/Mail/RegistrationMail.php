<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RegistrationMail extends Mailable
{
    use Queueable, SerializesModels;
    public $name;
    public $email;
    public $nik;
    public $nomorAnggota;
    public $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $email, $nik, $nomorAnggota, $password)
    {
        $this->name         = $name;
        $this->email        = $email;
        $this->nik          = $nik;
        $this->nomorAnggota = $nomorAnggota;
        $this->password     = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('RegistrationMail');
    }
}
