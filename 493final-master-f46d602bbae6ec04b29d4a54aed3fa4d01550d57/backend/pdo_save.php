<?php
//Sets up the connection to the database holding the save state
global $pdo_save;
$pdo_save = new PDO('mysql:host=localhost;port=3306;dbname=493_save_state', 'mjwenzke', 'php123');
$pdo_save->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
#phpinfo();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
