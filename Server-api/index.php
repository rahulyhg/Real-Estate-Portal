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
//$app->put('/editprofile/:id','registerUpdate');

$app->post('/register','registerUser');
//$app->post('/addproject','addProject');
//$app->post('/editproject(/:id)','updateProject');
//$app->post('/addproperty','addProperty');
//$app->post('/editproperty(/:id)','updateProperty');


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
			$regKey=[];
			$regVal=[];
			foreach($postdata as $key=>$val)
			{
						array_push($regKey,postdata=>$key);
						array_push($regVal,postdata=>$val);
			}
			
			$insertSQL="INSERT INTO users($regKey)VALUES($regVal)";
			
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

/*
//update User registration details 
 function registerUpdate($id=null)
 
 {
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
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
	
// Add new Properties

function addproperty()
{
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
	       $FName= mysql_real_escape_string($postdata->property_for);
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
			
			
	$insertSQL="INSERT INTO 2_real_property(property_for,featured,category,type,buildup_area,build_unit,land_area,land_unit,carpet_area,carpet_unit,price,currency,bedrooms,bathrooms,country,city,address,location,title,browsertitle,meta_desc,meta_key,society_name,prop_desc,cont_name,contact,email,cont_address,prop_age,furnished,prop_owner,floors,on_floor,parking,hospital,airport,railway,school,power,water,lift,res_parking,maintenance,gym,park,tarrace,swimming,facing,status,club)VALUES('$propFor','$featured','$category','$type','$buildup_area','$build_unit','$land_area','$land_unit','$carpet_area','$carpet_unit','$price','$currency','$bedrooms','$bathrooms','$country','$state','$city','$address','$location','$title','$browsertitle','$meta_desc','$meta_key','$society_name','$prop_desc','$cont_name','$contact','$email','$cont_address','$prop_age','$furnished','$prop_owner','$floors','$on_floor','$parking','$hospital','$airport','$railway','$school','$power','$water','$lift','$res_parking','$maintenance','$gym','$park','$tarrace','$swimming','$facing','$status','$club')";
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

//update property details
 function updateProperty($id=null)
 
 {
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata=json_decode($body);
		
		 $propFor= mysql_real_escape_string($postdata->property_for);
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
			$city= mysql_real_escape_string($postdata->city);
			$updateSQL=mysql_query("UPDATE  2_real_property SET property_for='$propFor',featured='$featured',category='$category',type='$type',buildup_area='$buildup_area' ,build_unit='$build_unit' ,land_area='$land_area',land_unit='$land_unit',carpet_area='$carpet_area',carpet_unit='$carpet_unit',price='$price',currency='$currency',bedrooms='$bedrooms',bathrooms='$bathrooms',country='$country',state='$state',city='$city',address='$address',location='$location',title='$title',browsertitle='$browsertitle',state='$state',carpet_unit='$carpet_unit',carpet_unit='$carpet_unit',carpet_unit='$carpet_unit',carpet_unit='$carpet_unit' where id='$id'")or die(mysql_error());
	
		if($updateSQL){
		  echo "Record updated ";
		}else{
			 mysql_error();
		}	

*/


$app->run();
 ?>