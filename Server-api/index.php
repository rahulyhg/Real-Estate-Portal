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
$app->put('/editProfile/:id','registerUpdate');
$app->post('/register)','registerUser');
//$app->post('/addproject','addProject');
//$app->post('/addproperty','addProperty');

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
		$body = $myapp->request->getBody();
		$postdata=json_decode($body);
	       $FName= mysql_real_escape_string($postdata->full_name);
			$UName= mysql_real_escape_string($postdata->user_name);
			$email= mysql_real_escape_string($postdata->user_email);
			$pwd= mysql_real_escape_string($postdata->pwd);
			$address= mysql_real_escape_string($postdata->address);
			$country= mysql_real_escape_string($postdata->country);
			$tel= mysql_real_escape_string($postdata->tel);
			$fax= mysql_real_escape_string($postdata->fax);
			$website= mysql_real_escape_string($postdata->website);
			$domains= mysql_real_escape_string($postdata->requested_domains);
	$insertSQL="INSERT INTO users(full_name,user_name,user_email,pwd,address,country,tel,fax,website,requested_domains)VALUES('$FName','$UName','$email','$pwd','$address','$country','$tel','$fax','$website','$domains')";
	$result=mysql_query($insertSQL);
	$last_id = mysql_insert_id($result);
	if($result)
	{
	  echo "Registration successful your Reg-ID is ".$last_id;
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
		$body = $myapp->request->getBody();
		$postdata=json_decode($body);
	
		
	
			
			$FName= mysql_real_escape_string($postdata->full_name);
			$UName= mysql_real_escape_string($postdata->user_name);
			$email= mysql_real_escape_string($postdata->user_email);
			$pwd= mysql_real_escape_string($postdata->pwd);
			$address= mysql_real_escape_string($postdata->address);
			$country= mysql_real_escape_string($postdata->country);
			$tel= mysql_real_escape_string($postdata->tel);
			$fax= mysql_real_escape_string($postdata->fax);
			$website= mysql_real_escape_string($postdata->website);
			$domains= mysql_real_escape_string($postdata->requested_domains);
				
		$updateSQL=mysql_query("UPDATE  users SET full_name='$FName',user_name='$UName',user_email='$email',pwd='$pwd',address='$address' ,country='$country' ,tel='$tel',fax='$fax',website='$website',requested_domains='$domains' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "Record updated ";
		}else{
			 mysql_error();
		}	
		
	
	}
	
// 




$app->run();
 ?>