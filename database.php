<?php
	
	class Database
	{
		var $servername ;
		var $username ;
		var $password ;
		var $dbname;
		var $conn;
		function __construct()
		{
			$servername = "localhost";
			$username = "root";
			$password = "goldtree9";
			$dbname = "todo";
			$this->$conn = mysqli_connect($servername, $username, $password, $dbname);
			if (!$this->$conn) {
			    die("Connection failed: " . $conn->connect_error);
			}	
		}


		function getAllTasks(){
			if($this->$conn){
				$arr = array();
				$sql = "SELECT * FROM tasks";
				$result = $this->$conn->query($sql);
				if ($result->num_rows > 0) {
				    while($row = $result->fetch_assoc()) {
				        
				        array_push($arr, array('ID' => $row["ID"], 'caption' => $row["caption"], 'is_completed' => $row["is_completed"]));
				    }
				}
				$this->disconnect();
				return json_encode($arr);
			}
			else{
				return "failed";
			}
		}

		function addTask($task){
			// return $task;
			if($this->$conn){
				$sql = "INSERT INTO tasks (caption, is_completed) values ('".$task."', 0)";
				if ($this->$conn->query($sql) === TRUE) {
					$id = $this->$conn->insert_id;
					$this->disconnect();
    				return $id;
    			}
    			echo "Error: " . $sql . "<br>" . $this->$conn->error;
				$this->disconnect();
				return "failed";
			}
			else{
				return "failed";
			}
		}

		function completeTask($taskIndex){
			if($this->$conn){
				$sql = "update tasks set is_completed = 1 where ID = ".$taskIndex."";
				if ($this->$conn->query($sql) === TRUE) {
					$this->disconnect();
    				return "success";
    			}
    			echo "Error: " . $sql . "<br>" . $this->$conn->error;
				$this->disconnect();
				return "failed";
			}
			else{
				return "failed";
			}
		}

		function redoTask($taskIndex){
			if($this->$conn){
				$sql = "update tasks set is_completed = 0 where ID = '".$taskIndex."'";
				if ($this->$conn->query($sql) === TRUE) {
					$this->disconnect();
    				return "success";
    			}
    			echo "Error: " . $sql . "<br>" . $this->$conn->error;
				$this->disconnect();
				return "failed";
			}
			else{
				return "failed";
			}
		}

		function deleteTask($taskIndex){
			if($this->$conn){
				$sql = "Delete from tasks where ID = '".$taskIndex."'";
				if ($this->$conn->query($sql) === TRUE) {
					$this->disconnect();
    				return "success";
    			}
    			echo "Error: " . $sql . "<br>" . $this->$conn->error;
				$this->disconnect();
				return "failed";
			}
			else{
				return "failed";
			}
		}



		function disconnect(){
			$this->$conn->close();
		}
	}
?>