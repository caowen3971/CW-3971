<?php
include("./config.php");

$username = $_POST['username'];
$password = $_POST['password'];

$sql1 = "select * from user where username='$username' ";
//验证用户名是否存在
$res1 = mysql_query($sql1);

$row = mysql_num_rows($res1);

if($row){
	echo json_encode(array(
    "res_code" => 2,
    "res_message" => "用户名已注册,请重试"
  ));
}else{
	$sql = "insert into user (username,password) values ('$username','$password')";
	// echo $sql;
	$res = mysql_query($sql);
	
	if($res) {
	  echo json_encode(array(
	    "res_code" => 1,
	    "res_message" => "注册成功"
	  ));
	}else{
	  echo json_encode(array(
	    "res_code" => 0,
	    "res_message" => "网络错误，注册失败，请重试"
	  ));
	}
}



?>