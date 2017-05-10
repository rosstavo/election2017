<?php

// Load packages
require_once __DIR__ . '/../vendor/autoload.php';

use Noodlehaus\Config;

// What mode are we?
$mode = trim( file_get_contents( 'mode.php' ) );

// Load in the appropriate config file
$conf = Config::load( 'config/' . $mode . '.php' );

// Instantiate database class
$db = new PDO(
    "{$conf->get('db.driver')}:host={$conf->get('db.host')}{$conf->get('db.port')};dbname={$conf->get('db.name')}",
    "{$conf->get('db.username')}",
    "{$conf->get('db.password')}",
    array(
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    )
);

// If correct headers for AJAX submission, enter into database
if ( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) ) {

    $gameData = json_decode( $_POST['game'] );

    $game = [
        'name'        => $gameData[0],
        'start_party' => $gameData[1],
        'end_party'   => $gameData[5],
        'stage_1'     => $gameData[2],
        'stage_2'     => $gameData[3],
        'stage_3'     => $gameData[4]
    ];

    $insertGame = $db->prepare("
      INSERT INTO games (name, start_party, end_party, stage_1, stage_2, stage_3)
      VALUES (:name, :start_party, :end_party, :stage_1, :stage_2, :stage_3)
    ");

    $insertGame->execute( [
        'name'        => $game['name'],
        'start_party' => $game['start_party'],
        'end_party'   => $game['end_party'],
        'stage_1'     => $game['stage_1'],
        'stage_2'     => $game['stage_2'],
        'stage_3'     => $game['stage_3']
    ] );
}
