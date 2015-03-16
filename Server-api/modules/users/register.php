<?php
	
	function registerUser($body){
		$db = new dbHelper();	
		$insert = $db->insert("users", $body);
		echo json_encode($insert);
	}
	function userGroup($body){
		$db = new dbHelper();	
		$insert = $db->insert("user_group", $body);
		echo json_encode($insert);
	}
		
	function editUser($body){
		$db = new dbHelper();
		$where = [];
		(isset($_GET['id'])) ? $where['id'] = $_GET['id'] : "";		
		$insert = $db->update("users", $body);
		$insert1 = $db->update("user_group", $body);
		echo json_encode($insert);
		echo json_encode($insert1);
	}
	
	function checkAvailability($body){
		$db = new dbHelper();
		$where = [];
		$input = json_decode($body);
		$where['username'] = $input->username;		
		$insert = $db->select("users", $where);
		echo json_encode($insert);
	}
	
 ?>