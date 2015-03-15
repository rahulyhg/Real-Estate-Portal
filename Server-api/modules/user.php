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
				$where=[]; // this will used for user specific data selection.
				$like = [];
				if(isset($_GET['search']) && $_GET['search'] == true){	
					(isset($_GET['username'])) ? $like['username'] = $_GET['username'] : "";
				}
				// to check user_id is set or not
				
				(isset($_GET['status'])) ? $where['status'] = $_GET['status'] : "";
				$limit['pageNo'] = $pageNo; // from which record to select
				$limit['records'] = $records; // how many records to select
				getMultipleUsers($where,$limit,$like); // from getUsers.php
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
		}elseif(isset($postParams) && $postParams == 'addusers'){ // addusers.php
			postRecord($body);
		}
	}
	
	if($reqMethod=="PUT" || $reqMethod=="DELETE"){
		echo $reqMethod;
		echo $body;
	}
	

 ?>