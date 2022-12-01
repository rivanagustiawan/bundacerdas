<?php

namespace App\Http\Controllers;

class Helper extends Controller
{
   public static function validationMessage()
   {
      return [
         'required' => ':attribute tidak boleh kosong',
         'email'    => ':attribute harus berupa format email yang valid',
         'unique'   => ':attribute sudah digunakan',
         'numeric'  => 'input :attribute harus berupa angka',
         'string'   => 'input :attribute harus berupa huruf',
         'file'     => ':attribute harus berupa file',
         'image'    => ':attribute harus berupa gambar',
         'min'      => ':attribute tidak boleh kurang dari :min',
         'max'      => ':attribute tidak boleh lebih dari :max'
      ];
   }

   public static function generateRandomString($length = 10, $type = "default")
   {
      switch ($type) {
         case 'int':
            $characters = '0123456789';
            break;
         case 'int-lower':
            $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
            break;
         case 'int-upper':
            $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
         case 'lower':
            $characters = 'abcdefghijklmnopqrstuvwxyz';
            break;
         case 'upper':
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
         case 'string':
            $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;

         default:
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
      }

      $charactersLength = strlen($characters);

      $randomString = '';

      for ($i = 0; $i < $length; $i++) {
         $randomString .= $characters[rand(0, $charactersLength - 1)];
      }

      return $randomString;
   }
}
