<?php
	require_once 'db/dbHelper.php';
	$reqMethod = $app->request->getMethod();
	
	if($reqMethod=="GET"){
		echo $reqMethod;
	}
	
	if($reqMethod=="POST"){
		echo $reqMethod;
	}
	
	if($reqMethod=="PUT" || $reqMethod=="DELETE"){
		echo $reqMethod;
	}
 ?>