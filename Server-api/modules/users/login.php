<?php
	function getSession($getRequest){
		$sessionObj = new session();
		echo json_encode($sessionObj->getSession());
	}
	function doLogin($body){
		try{
			$db = new dbHelper();
			$sessionObj = new session();
			
			$input = json_decode($body);
			
			$where['username'] = $input->username;
				
			$password = $input->password; // get password from json
			
			$table = "users";
			// inner join [table name][column name]
			$innerJoin['user_group']['group_id'] = "id";
			
			
			// inner join select column [table name][join col name][column to select] = column alias
			$selectInnerJoinCols['user_group']['group_id']['group_name'] = "group_name";
			$selectInnerJoinCols['user_group']['group_id']['config'] = "group_config";
			$selectInnerJoinCols['user_group']['group_id']['group_permission'] = "permission";
			
			// this is used to select data with LIMIT & where clause & inner/left join with join columns
			$data = $db->selectSingleJoin($table, $where, $innerJoin, $selectInnerJoinCols);

			
			
			//$data = $db->selectSingle("users", $where);
			if($data['status'] == 'error' || $data['status'] == 'warning' || $data['data'] == "" ){
				throw new Exception('You are not registered user!: '.$data['status'] . " : ". $data['data']);
			}
			// password check with hash encode
			if(passwordHash::check_password($data['data']['password'],$password)){
				$sessionObj->setSession($data['data']);
				
				$response["message"] = "You are logged in successfully.";
                $response["status"] = "success";
				$response["data"] = json_encode($sessionObj->getSession());
				echo json_encode($response);
			}else{
				throw new Exception('Password does\'n match!');
			}
			
				
		}catch(Exception $e){
            $response["status"] = "error";
            $response["message"] = 'Error: ' .$e->getMessage();
            $response["data"] = null;
			echo json_encode($response);
        }
		
	}
	function forgotPass($body){
		$db = new dbHelper();
		$sessionObj = new session();
		$input = json_decode($body);
		(property_exists($input,'email')) ? $where['email'] = $input->email : "";
		echo json_encode($where);
		
	}
	function changePass($body){
		try{
			$db = new dbHelper();
			$sessionObj = new session();
			$input = json_decode($body);
			$table = 'users';
			$where = [];
			(property_exists($input,'user_id')) ? $where['id'] = $input->user_id : "";
			$data = $db->selectSingle($table, $where);
			$password = $input->password->old;
			
			// password check with hash encode
			if(passwordHash::check_password($data['data']['password'],$password)){
				$newPass['password'] = $input->password->new;
				$updatePass = $db->update($table, $newPass, $where);
				if($updatePass['status'] == 'success'){
					$response["message"] = "Your password Changed successfully.";
					$response["status"] = "success";
					$response["data"] = null;
				}else{
					throw new Exception('Password does\'n match!');
				}
				
				echo json_encode($response);
			}else{
				throw new Exception('Password does\'n match!');
			}
			
		}catch(Exception $e){
            $response["status"] = "error";
            $response["message"] = 'Error: ' .$e->getMessage();
            $response["data"] = null;
			echo json_encode($response);
        }
	}
	function logout(){
		$sessionObj = new session();
		print_r($sessionObj->destroySession());
	}
 ?>