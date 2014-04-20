<!-- HorizontalList -->
<div class='component' id='HorizontalList'>
    <div class="button_HorizontalList" id='leftButton'>
        <img alt="" src="images/navigate-left.png" />
    </div>
    <div id='Slidebar_HorizontalList'>
        <div class='Hint_HorizontalList' id="PizzaName">Hint</div>
        <div class='Hint_HorizontalList' id="PizzaPrice">Hint</div>
        <div id='Slider_HorizontalList'>
            <?php
            include 'db/db_connection.php'; 

            $sql = "SELECT * FROM pizza";
            $result = mysql_query($sql) or die(mysql_error());
            $array_pizza = array();

            while ($row = mysql_fetch_array($result)) {
                $array_pizza[$row['Id']] = $row['PizzaName'];
                include "HorizontalItem.php";
            }
            ?>
        </div>
    </div>
    <div class='button_HorizontalList' id='rightButton'>
        <img alt="" src="images/navigate-left.png" />
    </div>
</div>