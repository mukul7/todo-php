<?php
	include("database.php");

	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		$db = new Database();
		echo $db->getAllTasks();
	}
?>