<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWebhookSaweriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webhook_saweria', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("saweria_id");
            $table->bigInteger("amount_raw");
            $table->bigInteger("amount_cut");
            $table->string("donator_email");
            $table->string("donator_name");
            $table->text("message");
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
        Schema::dropIfExists('webhook_saweria');
    }
}
