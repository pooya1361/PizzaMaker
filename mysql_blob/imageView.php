<?php
	$conn = mysql_connect("localhost", "root", "admin");
    mysql_select_db("Pizza") or die(mysql_error());
    if(isset($_GET['Id'])) {
        $sql = "SELECT FileType,Photo FROM Pizza WHERE Id=" . $_GET['Id'];
		$result = mysql_query("$sql") or die("<b>Error:</b> Problem on Retrieving Image BLOB<br/>" . mysql_error());
		$row = mysql_fetch_array($result);
		header("Content-type: " . $row["imageType"]);
        echo $row["Photo"];
	}
	mysql_close($conn);
?>