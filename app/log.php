<?php

require 'start.php';

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
