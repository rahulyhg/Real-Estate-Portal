<?php

// load required files
require 'Slim/Slim.php';
require 'dbcon.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$body = $app->request->getBody();

$app->response->headers->set('Content-Type', 'application/json');

$app->get('/response(/:id)','responseData');
$app->get('/project(/:id)','projectData');
$app->get('/property(/:id)','propertyData');
$app->post('/register','registerUser');
$app->put('/editprofile/:id','registerUpdate');
$app->post('/addproject','addProject');
$app->put('/editproject/:id','updateProject');
$app->post('/addproperty','addProperty');
$app->put('/editproperty/:id','updateProperty');
$app->post('/login','adminlogin');
//view web response
function responseData($id=null)
{
	
	if($id===Null){
		$selectSQL=mysql_query( "SELECT * FROM 2_real_response")or die(mysql_error());
		$data = array();
		
		while($row=mysql_fetch_assoc($selectSQL))
		{
			array_push($data,$row);
		}
	}else{
	
		$where="WHERE id= ".$id;
		$selectSQL=mysql_query("SELECT * FROM 2_real_response $where");
		$data=mysql_fetch_assoc($selectSQL);
		
	}
	echo json_encode($data);	
}

//view project response
function projectData($id=null)
{
	
	if($id===Null){
		$selectSQL=mysql_query( "SELECT * FROM 2_real_project")or die(mysql_error());
		$data = array();
		
		while($row=mysql_fetch_assoc($selectSQL))
		{
			array_push($data,$row);
		}
	}else{
	
		$where="WHERE id= ".$id;
		$selectSQL=mysql_query("SELECT * FROM 2_real_project $where");
		$data=mysql_fetch_assoc($selectSQL);
		
	}
	echo json_encode($data);	
}

//view property response
function propertyData($id=null)
{
		
	if($id===Null){
		$selectSQL=mysql_query( "SELECT * FROM 2_real_property")or die(mysql_error());
		$data = array();
		
		while($row=mysql_fetch_assoc($selectSQL))
		{
			array_push($data,$row);
		}
	}else{
	
		$where="WHERE id= ".$id;
		$selectSQL=mysql_query("SELECT * FROM 2_real_property $where");
		$data=mysql_fetch_assoc($selectSQL);
		
	}
	echo json_encode($data);	
}

//Register for new user
function registerUser()
{
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		$regKey=array();
			$regVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($regKey,$key);
						array_push($regVal,"'".mysql_real_escape_string($value)."'");
			}
			$col=implode(",",$regKey);
			$row=implode(",",$regVal);
			$insertSQL="INSERT INTO users($col)VALUES($row)";
			

	$result=mysql_query($insertSQL) or die(mysql_error());
	//$last_id = mysql_insert_id($result);
	if($result)
	{
	  echo "Registration successful your Reg-ID is ";//.$last_id;
	}
	else
	{
	 mysql_error();
	}	
		
}


//update User registration details 
 function registerUpdate($id=null)
 
 {
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		
	
			$regEditKey=array();
			
			foreach($postdata as $key => $value)
			{
						array_push($regEditKey,$key."='".$value."'");
						
			}
			$data=implode(",",$regEditKey);
			
				
		$updateSQL=mysql_query("UPDATE  users SET '$data' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "Your profile updated  successfully......";
		}else{
			 mysql_error();
		}	
		
                }
	
	
// Add new Properties

function addproperty()
{
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
			$propKey=array();
			$propVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($propKey,$key);
						array_push($propVal,"'".mysql_real_escape_string($value)."'");
			}
			$col = implode(",",$propKey);
			$val = implode(",",$propVal);
			//echo $col;
			$insertSQL="INSERT INTO 2_real_property($col)VALUES($val)";
		
	     
	$result=mysql_query($insertSQL) or die(mysql_error());
	//$last_id = mysql_insert_id($result);
	if($result)
	{
	  echo "Property Added successful your property-ID is ";//.$last_id ;
	}
	else
	{
	 mysql_error();
	}	
		
}

//update property details
 function updateProperty($id=null)
 
 {
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		
			$propEdit=array();

			foreach($postdata as $key => $value)
			{
						array_push($propEdit,$key."='".$value."'");
			}
			$data = implode(",",$propEdit);
		
			$updateSQL=mysql_query("UPDATE  2_real_property SET  $data where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "Property details updated successfully.....";
		}else{
			 mysql_error();
		}	

 
 }

 //add new project
function addProject()
{	
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		
			$projectKey=array();
			$projectVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($projectKey,$key);
						array_push($projectVal,"'".mysql_real_escape_string($value)."'");
			}
			//impolde for array value seperation
			$col=implode(",",$projectKey);
			$row=implode(",",$projectVal);
			
			$insertSQL="INSERT INTO 2_real_project($col)VALUES($row)";
			$result=mysql_query($insertSQL)or die(mysql_error());
			//$last_id = mysql_insert_id($result);
	if($result)
	{
	  
	  echo "Project Added successful your Project-ID is ";
	 
	}
	else
	{
	 mysql_error();
	}	
			
}

//update project details
 function updateProject($id=null)
 
 {
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
			
			$projectEditKey=array();
			
			foreach($postdata as $key => $value)
			{
				array_push($projectEditKey,$key."='".$value."'");
			}
			
			$data=implode(",",$projectEditKey)	;		
			
			$updateSQL=mysql_query("UPDATE  2_real_project SET  $data where id='$id' ")or die(mysql_error());
	
		if($updateSQL){
		  echo "project details updated successfully";
		}else{
			 mysql_error();
		}	
		
	}	
	
//Login
function adminlogin()
{
	$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		//to accept data into login form
			$user= mysql_real_escape_string($postdata->user_email);
			$password=mysql_real_escape_string($postdata->pwd);
			
		//fetch username & password into db
			$uname=mysql_query("select user_name From users");
			$email=mysql_query("select * from users WHERE user_email='$user' AND pwd='$password'");
			$usersNo = mysql_num_rows($email);
			if($usersNo === 1){
				echo "valid user";
			}else{
				echo "invalid user";
			}
			
			
}
			}
			if(!isset($_COOKIE[$cookie_name]))
			{
				echo "Invalid username and Password";
			}
			else
			{
				alert("Login Successful User Name is:".$user."password:".$password);
			
				
			}
			
			
}
		
$app->run();
 ?>