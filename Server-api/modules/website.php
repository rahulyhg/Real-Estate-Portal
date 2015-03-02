<?php
	require_once 'db/dbHelper.php';
	$reqMethod = $app->request->getMethod();
	
	switch ($reqMethod) {
		case GET:
			echo $reqMethod;
			break;
		case PUT:
			echo $reqMethod;
			break;
		case POST:
			echo $reqMethod;
			break;
		default:
			echo $reqMethod;
			getData();
	}
	
	function getData($id){
		echo $reqMethod;
	}
	
	function insertData($id){
		
	}
	
	function updateData($id){
		
	}
 ?>