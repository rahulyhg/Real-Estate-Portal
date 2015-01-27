<?php

// load required files
require 'Slim/Slim.php';
require 'dbcon.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$body = $app->request->getBody();

$app->response->headers->set('Content-Type', 'application/json');

$app->get('/get(/:id)','responseData');

//$app->get('/project(/:id)','projectData');
//$app->get('/property(/:id)','propertyData');

echo "hello";

function responseData($id=null)
{
		echo "hi";
	if($id===Null){
		$selectSQL=mysql_query( "SELECT * FROM 2_real_response")or die(mysql_error());
		$data = array();
		
		while($row=mysql_fetch_assoc($selectSQL))
		{
			array_push($data,$row);
		}
	}else{
	
		$where="WHERE id= ".$id;
		$selectSQL=mysql_query("SELECT * FROM real_response $where");
		$data=mysql_fetch_assoc($selectSQL);
		
	}
	echo json_encode($data);	
}


$app->run();
 ?>