<?php
	require_once 'db/dbHelper.php';
	$db = new dbHelper();
	$reqMethod = $app->request->getMethod();
	
	if($reqMethod=="GET"){
		
		if(isset($id)){
			$where['id'] = $id;
			$data = $db->select("templates", $where);
			echo json_encode($data);			
			
		}else{
			$like = [];
			if(isset($_GET['search']) && $_GET['search'] == true){	
              
				(isset($_GET['template_name'])) ? $like['template_name'] = $_GET['template_name'] : "";
			}
			print_r ($like);
			$where=[]; 
			// to check user_id is set or not
			((isset($_GET['user_id'])) && ($_GET['user_id']!=="")) ? $where['user_id'] = $_GET['user_id'] : "";			
			(isset($_GET['status'])) ? $where['status'] = $_GET['status'] : "";
			(isset($_GET['category'])) ? $where['category'] = $_GET['category'] : "";
			(isset($_GET['custom'])) ? $where['custom'] = $_GET['custom'] : "";
			(isset($_GET['template_type'])) ? $where['template_type'] = $_GET['template_type'] : "";
			(isset($_GET['devlpement_status'])) ? $where['devlpement_status'] = $_GET['devlpement_status'] : "";
			$limit['pageNo'] = $pageNo; // from which record to select
			$limit['records'] = $records; // how many records to select		
			// this is used to select data with LIMIT & where clause with like filter
			$data = $db->select("templates", $where, $limit,$like);
			
			
			
			// this is used to count totalRecords with only where clause
			$totalRecords['totalRecords'] = count($db->select("templates", $where)['data']);		
			
			// $data is array & $totalRecords is also array. So for final output we just merge these two arrays into $data array
			$data = array_merge($totalRecords,$data);
			echo json_encode($data);
		}
	}
	
	if($reqMethod=="POST"){
		$insert = $db->insert("templates", $body);
		echo json_encode($insert);
	}
	
	if($reqMethod=="PUT" || $reqMethod=="DELETE"){
		$where['id'] = $id; // need where clause to update/delete record
		
		$update = $db->update("templates", $body, $where);
		echo json_encode($update);
		//to delete record {sunita}
		$delete = $db->delete("templates",$where);
			echo json_encode($delete);
		
	}
 ?>