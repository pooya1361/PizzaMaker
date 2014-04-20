<?php

include '../db/db_connection.php';

$sql = "SELECT * FROM pizza WHERE Id = " . $_POST["itemId"];
$result = mysql_query($sql);
$results[] = array();
while ($row = mysql_fetch_array($result)) {
    $Id = $row['Id'];
    $PizzaName = $row['PizzaName'];
    $PizzaPrice = $row['PizzaPrice'];

    $results = array(   "Id" => $Id, 
                        "PizzaName" => $PizzaName,
                        "PizzaPrice" => $PizzaPrice
            );
}
header('Content-type:application/json');
exit(json_encode($results));

?>
