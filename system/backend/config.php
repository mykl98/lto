<?php
$servername = "localhost";
	$username = "u528264240_lto";
	$password = "Skooltech_113012";
	$dbname = "u528264240_lto";
	$conn = new mysqli($servername, $username, $password, $dbname);

function sanitize($input){
	global $conn;
	$output = mysqli_real_escape_string($conn, $input);
	return $output;
}

function saveLog($log){
	$logFile = fopen("log.txt", "a") or die("Unable to open file!");
	$timeStamp = date("Y-m-d") . '-' . date("h:i:sa");
	fwrite($logFile, $timeStamp .' Log: '. $log . "\n");
	fclose($logFile);
}

?>