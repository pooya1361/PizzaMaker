<?php

include '../db/db_connection.php';

$sql = "SELECT * FROM pizza_ingre WHERE PizzaId = " . $_POST["itemId"];
$result = mysql_query($sql);
$results[] = array();
while ($row = mysql_fetch_array($result)) {
    $results[] = array("PizzaId" => $row['PizzaId'],
                     "IngreId" => $row['IngreId']);
}
header('Content-type:application/json');
exit(json_encode($results));
?>
