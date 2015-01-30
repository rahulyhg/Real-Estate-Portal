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
$app->put('/editproject(/:id)','updateProject');
$app->post('/addproperty','addProperty');
$app->put('/editproperty(/:id)','updateProperty');


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
	     /*  $FName= mysql_real_escape_string($postdata->full_name);
			$UName= mysql_real_escape_string($postdata->user_name);
			$email= mysql_real_escape_string($postdata->user_email);
			$pwd= mysql_real_escape_string($postdata->pwd);
			$address= mysql_real_escape_string($postdata->address);
			$country= mysql_real_escape_string($postdata->country);
			$tel= mysql_real_escape_string($postdata->tel);
			$fax= mysql_real_escape_string($postdata->fax);
			$website= mysql_real_escape_string($postdata->website);
			$domains= mysql_real_escape_string($postdata->requested_domains);*/
			$regKey=array();
			$regVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($regKey,$key);
						array_push($regVal,$value);
			}
			echo "hello";
			$insertSQL="INSERT INTO users('$regKey')VALUES('$regVal')";
			
/*$insertSQL="INSERT INTO users(full_name,user_name,user_email,pwd,address,country,tel,fax,website,requested_domains)VALUES('$FName','$UName','$email','$pwd','$address','$country','$tel','$fax','$website','$domains')";*/
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
		$body = $app->request->getBody();
		$postdata=json_decode($body);
	
			$regEditKey=array();
			$regEditVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($regEditKey,$key);
						array_push($regEditVal,$value);
			}
			echo "hello";
			/*$FName= mysql_real_escape_string($postdata->full_name);
			$UName= mysql_real_escape_string($postdata->user_name);
			$email= mysql_real_escape_string($postdata->user_email);
			$pwd= mysql_real_escape_string($postdata->pwd);
			$address= mysql_real_escape_string($postdata->address);
			$country= mysql_real_escape_string($postdata->country);
			$tel= mysql_real_escape_string($postdata->tel);
			$fax= mysql_real_escape_string($postdata->fax);
			$website= mysql_real_escape_string($postdata->website);
			$domains= mysql_real_escape_string($postdata->requested_domains);*/
				
		$updateSQL=mysql_query("UPDATE  users SET '$regEditKey'='$regEditVal' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "Record updated ";
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
						array_push($propVal,$value);
			}
		
			$insertSQL="INSERT INTO 2_real_property('$propKey')VALUES('$propVal')";
		
	     /*  $FName= mysql_real_escape_string($postdata->property_for);
			$UName= mysql_real_escape_string($postdata->featured);
			$email= mysql_real_escape_string($postdata->category);
			$pwd= mysql_real_escape_string($postdata->type);
			$address= mysql_real_escape_string($postdata->buildup_area);
			$address= mysql_real_escape_string($postdata->build_unit);
			$country= mysql_real_escape_string($postdata->land_area);
			$tel= mysql_real_escape_string($postdata->land_unit);
			$fax= mysql_real_escape_string($postdata->carpet_area);
			$website= mysql_real_escape_string($postdata->carpet_unit);
			$website= mysql_real_escape_string($postdata->price);
			$website= mysql_real_escape_string($postdata->currency);
			$website= mysql_real_escape_string($postdata->bedrooms);
			$bathrooms= mysql_real_escape_string($postdata->bathrooms);
			$country= mysql_real_escape_string($postdata->country);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);
			$address= mysql_real_escape_string($postdata->address);
			$location= mysql_real_escape_string($postdata->location);
			$title= mysql_real_escape_string($postdata->title);
			$browsertitle= mysql_real_escape_string($postdata->browsertitle);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);
			$country= mysql_real_escape_string($postdata->country);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);
			
			
	$insertSQL="INSERT INTO 2_real_property(property_for,featured,category,type,buildup_area,build_unit,land_area,land_unit,carpet_area,carpet_unit,price,currency,bedrooms,bathrooms,country,city,address,location,title,browsertitle,meta_desc,meta_key,society_name,prop_desc,cont_name,contact,email,cont_address,prop_age,furnished,prop_owner,floors,on_floor,parking,hospital,airport,railway,school,power,water,lift,res_parking,maintenance,gym,park,tarrace,swimming,facing,status,club)VALUES('$propFor','$featured','$category','$type','$buildup_area','$build_unit','$land_area','$land_unit','$carpet_area','$carpet_unit','$price','$currency','$bedrooms','$bathrooms','$country','$state','$city','$address','$location','$title','$browsertitle','$meta_desc','$meta_key','$society_name','$prop_desc','$cont_name','$contact','$email','$cont_address','$prop_age','$furnished','$prop_owner','$floors','$on_floor','$parking','$hospital','$airport','$railway','$school','$power','$water','$lift','$res_parking','$maintenance','$gym','$park','$tarrace','$swimming','$facing','$status','$club')";*/
	$result=mysql_query($insertSQL);
	$last_id = mysql_insert_id($result);
	if($result)
	{
	  echo "Property Added successful your property-ID is ".$last_id;
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
		$propEditKey=array();
			$propEditVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($propEditKey,$key);
						array_push($propEditVal,$value);
			}
		
		/* $propFor= mysql_real_escape_string($postdata->property_for);
			$featured= mysql_real_escape_string($postdata->featured);
			$category= mysql_real_escape_string($postdata->category);
			$type= mysql_real_escape_string($postdata->type);
			$buildup_area= mysql_real_escape_string($postdata->buildup_area);
			$build_unit= mysql_real_escape_string($postdata->build_unit);
			$land_area= mysql_real_escape_string($postdata->land_area);
			$land_unit= mysql_real_escape_string($postdata->land_unit);
			$carpet_area= mysql_real_escape_string($postdata->carpet_area);
			$carpet_unit= mysql_real_escape_string($postdata->carpet_unit);
			$price= mysql_real_escape_string($postdata->price);
			$currency= mysql_real_escape_string($postdata->currency);
			$bedrooms= mysql_real_escape_string($postdata->bedrooms);
			$bathrooms= mysql_real_escape_string($postdata->bathrooms);
			$country= mysql_real_escape_string($postdata->country);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);
			$address= mysql_real_escape_string($postdata->address);
			$location= mysql_real_escape_string($postdata->location);
			$title= mysql_real_escape_string($postdata->title);
			$browsertitle= mysql_real_escape_string($postdata->browsertitle);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);
			$country= mysql_real_escape_string($postdata->country);
			$state= mysql_real_escape_string($postdata->state);
			$city= mysql_real_escape_string($postdata->city);*/
			$updateSQL=mysql_query("UPDATE  2_real_property SET  '$propEditKey'='$propEditVal' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "property updated successfully";
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
						array_push($projectVal,$value);
			}
		
			$insertSQL="INSERT INTO 2_real_project('$projectKey')VALUES('$projectVal')";
			$result=mysql_query($insertSQL);
			$last_id = mysql_insert_id($result);
	if($result)
	{
	  echo "Project Added successful your Project-ID is ".$last_id;
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
			$projectEditVal=array();
			foreach($postdata as $key => $value)
			{
						array_push($projectEditKey,$key);
						array_push($projectEditVal,$value);
			}
			$updateSQL=mysql_query("UPDATE  2_real_project SET  '$projectEditKey'='$projectEditVal' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "project details updated successfully";
		}else{
			 mysql_error();
		}	
 }
			
$app->run();
 ?>