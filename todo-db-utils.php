<?php
	include("database.php");

	$method = $_SERVER['REQUEST_METHOD'];
	$db = new Database();
	switch($method) {
		case 'GET':
		    $todoItemIndex = $_GET['todoItemId'];
			if($todoItemIndex != ""){
				echo $db->completeTask($todoItemIndex);
			}
		break;

		case "PUT":
			parse_str(file_get_contents("php://input"),$_PUT);
			$todoItemIndex = $_PUT['todoItemId'];
			if($todoItemIndex != ""){
				echo $db->redoTask($todoItemIndex);
			}
		break;

	  	case 'POST':
			$todoItem = $_POST['todoItem'];
			if($todoItem != ""){
				echo $db->addTask($todoItem);
			}
		break;

	  	case 'DELETE':
	  		//echo "in del";
	  		parse_str(file_get_contents("php://input"),$_DELETE);
	    	$todoItemIndex = $_DELETE['todoItemId'];
			if($todoItemIndex != ""){
				echo $db->deleteTask($todoItemIndex);
			}
	  	break;

	  

	  default:
	    header('HTTP/1.1 405 Method Not Allowed');
	    header('Allow: GET, PUT, DELETE');
	   break;
	}







?>