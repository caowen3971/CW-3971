<?php
include("./config.php");

$pageIndex = $_GET['pageIndex'];
$count = $_GET["count"];

$sqlAll = "select * from shop";
$resAll = mysql_query($sqlAll);
$countAll = mysql_num_rows($resAll); // 取条数
$pageCount = ceil($countAll / $count);

// index          
// 1      limit 0,4
// 2      limit 4,4
// 3      limit 8,4
// limit ($pageIndex-1)*$count, $count
$start = ($pageIndex-1)*$count;
$sql = "select * from shop limit $start, $count";
// echo $sql;
$res = mysql_query($sql);

$shop = array();

while($row = mysql_fetch_assoc($res)){
  array_push($shop, $row);
}

// 判断$shop的长度为0的话，返回失败

$json = array(
  "res_code" => 1,
  "res_message" => "查询成功",
  "res_body" => array(
    "data" => $shop,
    "pageCount" => $pageCount
  )
);

echo json_encode($json);

mysql_close();



?>