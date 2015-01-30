<?php

// load required files
require 'Slim/Slim.php';
require 'dbcon.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$body = $app->request->getBody();
$app->response->headers->get('Content-Type', 'application/json');
$app->response->headers->set('Content-Type', 'application/json');


$app->get('/','getUser');
$app->post('/post','registerUser');

function getUser(){
	echo "this is get request:";
}


//Register for new user
function registerUser()
{
		$app= new \Slim\Slim();
		$body = $app->request->getBody();
		$postdata = json_decode($body);
		print_r($postdata);
		
}


$app->run();
 ?>