<?php
	
	function registerUser($body){
		$db = new dbHelper();	
		$insert = $db->insert("users", $body);
		echo json_encode($insert);
	}
	
	
	function editUser($body){
		$db = new dbHelper();	
		$insert = $db->put("users", $body);
		echo json_encode($insert);
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