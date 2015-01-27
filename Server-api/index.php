<?php
require("dbcon.php");
function responseData($id=null)
{
	if($id===Null){
		$selectSQL=mysql_query("SELECT * FROM to real_response")or die(mysql_error());
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

function projectData($id=null)
{
	if($id===Null){
		$selectSQL=mysql_query("SELECT * FROM to real_response")or die(mysql_error());
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
?>
