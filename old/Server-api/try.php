<?php

// load required files
require 'Slim/Slim.php';
require 'dbcon.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$body = $app->request->getBody();

$app->response->headers->set('Content-Type', 'application/json');


$app->get('/','getUser');
$app->post('/post','registerUser');
$app->post('/upload','uploadFile');

function uploadFile () {
 
 
 
     if(isset($_FILES['file'])){
//print_r($_FILES['file']);
    $errors= array();        
    $file_name = $_FILES['file']['name'];
    $file_size =$_FILES['file']['size'];
    $file_tmp =$_FILES['file']['tmp_name'];
    $file_type=$_FILES['file']['type'];   
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    $extensions = array("jpeg","jpg","png","gif");        
    if(in_array($file_ext,$extensions )=== false){
         $errors[]="image extension not allowed, please choose a JPEG or PNG file.";
    }
    if($file_size > 2097152){
        $errors[]='File size cannot exceed 2 MB';
    }               
    if(empty($errors)==true){
        move_uploaded_file($file_tmp,"PlayerAvatar/".$file_name);
        echo " uploaded file: " . "images/" . $file_name;
    }else{
        print_r($errors);
    }
}
else{
    $errors= array();
    $errors[]="No image found";
    print_r($errors);
}
 
}


// Get Method here
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