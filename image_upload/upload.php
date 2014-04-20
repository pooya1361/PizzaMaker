<?php

if (is_array($_FILES)) {
    if (is_uploaded_file($_FILES ['userImage'] ['tmp_name'])) {
        $sourcePath = $_FILES ['userImage'] ['tmp_name'];
        mysql_connect("localhost", "root", "admin");
        mysql_select_db("Pizza_db");

        $Upload_OK = false;
        $table = $_POST ['type'];
        if ($table == 'Pizza') {
            $targetPath = "../images/Pizza/" . $_FILES ['userImage'] ['name'];
            if (move_uploaded_file($sourcePath, $targetPath)) {
                $Upload_OK = true;
            }

            $sql = "INSERT INTO Pizza(PizzaName ,PicFileName)
                    VALUES('" . $_POST['pizzaName'] . "', '" . $_FILES ['userImage'] ['name'] . "')";
            $current_id = mysql_query($sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysql_error());
            if (isset($current_id) and $Upload_OK) {
                ?>
                <img src="<?php echo $targetPath; ?>" width="500px" height="500px" />
                <?php
            }
        } else if ($table == 'Ingredient') {

            $targetPath = "../images/Ingredients/" . $_FILES ['userImage'] ['name'];
            if (move_uploaded_file($sourcePath, $targetPath)) {
                $Upload_OK = true;
            }

            $sql = "INSERT INTO Ingredients(Name ,PicFileName)
                    VALUES('" . $_POST['pizzaName'] . "', '" . $_FILES ['userImage'] ['name'] . "')";
            $current_id = mysql_query($sql) or die("<b>Error:</b> Problem on Image Insert<br/>" . mysql_error());
            if (isset($current_id) and $Upload_OK) {
                ?>
                <img src="<?php echo $targetPath; ?>" width="500px" height="500px" />
                <?php
            }
        }
    }
}
?>