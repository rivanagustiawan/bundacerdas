<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
  Route::resource("todos", "TodoController");
});
