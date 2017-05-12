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
