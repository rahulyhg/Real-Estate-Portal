<?php
	
	
	require '/Slim/Slim.php';
\Slim\Slim::registerAutoloader();


$app= new \Slim\Slim();
$body = $app->request->getBody();

$app->response->headers->set('Content-Type', 'application/json');
$app->get('/response(/:id)','responseData');
//$app->get('/project(/:id)','projectData');
//$app->get('/property(/:id)','propertyData');
$con=mysql_Connect("localhost","root","")or die("connection aborted");
	mysql_select_db("prop")or die("Not Selected");
	
	
	
	
?>