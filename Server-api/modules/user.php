<?php
	require_once 'db/dbHelper.php';
	require_once 'db/passwordHash.php';
	require_once 'db/session.php';
	require_once 'users/login.php';
	require_once 'users/getUsers.php';
	require_once 'users/register.php';
	
	$db = new dbHelper();
	
	$reqMethod = $app->request->getMethod();

	//getMethod
	if($reqMethod=="GET"){
		if(isset($getRequest) && $getRequest =='session'){
			getSession($getRequest);
		}elseif(isset($getRequest) && $getRequest =='logout'){
			logout();
		}else{
			if(isset($id)){
				getSingleUser($id);
			}else{
				getMultipleUsers($pageNo,$records); // from getUsers.php
				((isset($_GET['user_id'])) && ($_GET['user_id']!=="")) ? $where['user_id'] = $_GET['user_id'] : "";			
			}
		}
	
	}//end get
	
	if($reqMethod=="POST"){
		if(isset($postParams) && $postParams == 'login'){ // login.php
			doLogin($body);
		}elseif(isset($postParams) && $postParams == 'register'){ // register.php
			registerUser($body);
		}elseif(isset($postParams) && $postParams == 'forgot'){
			forgotPass($body);
		}elseif(isset($postParams) && $postParams == 'register'){
			checkAvailability($body);			// register.php
		}elseif(isset($postParams) && $postParams == 'changepass'){
			changePass($body);			
		}elseif(isset($postParams) && $postParams == 'usersgroup'){
			userGroup($body);
			
		}
		
	}
	
	if($reqMethod=="PUT" || $reqMethod=="DELETE"){
		$where['id'] = $id; // need where clause to update/delete record
		$update = $db->update("users", $body, $where);
		echo json_encode($update);
	}
	

 ?>