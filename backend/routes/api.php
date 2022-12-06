<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
  "middleware" => "api",
  "namespace"  => "App\Http\Controllers",
  "prefix"     => "auth"
], function ($router) {
  Route::post("login", "AuthController@login");
  Route::post("register", "AuthController@register");
  Route::post("logout", "AuthController@logout");
  Route::get("profile", "AuthController@profile");
  Route::post("refresh", "AuthController@refresh");

});

Route::group([
  "middleware" => "api",
  "namespace"  => "App\Http\Controllers"
], function ($router) {

  
  Route::get("get/provinces", [AuthController::class, "getProvinces"]);
  Route::get("get/regencies/{province}", [AuthController::class, "getRegencies"]);
  Route::get("get/districts/{regency}", [AuthController::class, "getDistricts"]);
  Route::get("get/villages/{district}", [AuthController::class, "getVillages"]);
  Route::get('profile/view', [AuthController::class, 'showProfile']);
  Route::get('profile/edit', [AuthController::class, 'editProfile']);
  Route::post('profile/update', [AuthController::class, 'updateProfile']);
  Route::post('profile/change-password', [AuthController::class, 'changePassword']);
  
  Route::resource('users', UserController::class);
  // Route::resource("todos", "TodoController");
});
