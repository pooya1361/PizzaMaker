<?php

include '../db/db_connection.php';

$sql = "SELECT * FROM ingredients WHERE Id = " . $_POST["itemId"];
$result = mysql_query($sql);
$results[] = array();
while ($row = mysql_fetch_array($result)) {
    $Id = $row['Id'];
    $Name = $row['Name'];
    $Figure = $row['FigurePic'];
    $Iteration = $row['Iteration'];

    $results = array(   "Id" => $Id, 
                        "Name" => $Name,
                        "FigurePic" => $Figure,
                         "Iteration" => $Iteration

            );
}
header('Content-type:application/json');
exit(json_encode($results));

?>
