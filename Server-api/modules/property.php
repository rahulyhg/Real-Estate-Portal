<?php
	require_once 'db/dbHelper.php';
	$db = new dbHelper();
	$reqMethod = $app->request->getMethod();
	
	if($reqMethod=="GET"){
		if(isset($id)){
			$where['id'] = $id;
			$data = $db->selectSingle("property", $where);
			echo json_encode($data);
			
		}else{
			$where=[]; 
			// code for search
			 $like = [];
			 if(isset($_GET['search']) && $_GET['search'] == true){
				 
				 (isset($_GET['title'])) ? $like['title'] = $_GET['title'] : "";
			 }
			// to check user_id is set or not
			 (isset($_GET['user_id'])) ? $where['user_id'] = $_GET['user_id'] : "";
			(isset($_GET['status'])) ? $where['status'] = $_GET['status'] : ""; 
			(isset($_GET['domain'])) ? $where['domain'] = $_GET['domain'] : "";
			(isset($_GET['featured'])) ? $where['featured'] = $_GET['featured'] : "";
			 
			$limit['pageNo'] = $pageNo; // from which record to select
			$limit['records'] = $records; // how many records to select
			
			// this is used to select data with LIMIT & where clause
			$data = $db->select("property", $where, $limit, $like);
			
			// this is used to count totalRecords with only where clause
			$totalRecords['totalRecords'] = count($db->select("property", $where,null, $like)['data']);		
			
			// $data is array & $totalRecords is also array. So for final output we just merge these two arrays into $data array
			$data = array_merge($totalRecords,$data);
			echo json_encode($data);
		}
	}
	
	if($reqMethod=="POST"){
		$insert = $db->insert("property", $body);
		echo json_encode($insert);
	}
	
	if($reqMethod=="PUT" || $reqMethod=="DELETE"){
		$where['id'] = $id; // need where clause to update/delete record
		$update = $db->update("property", $body, $where);
		echo json_encode($update);
	}
 ?>