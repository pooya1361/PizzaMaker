<div class='component' id='VerticalList'>
    <div class='button_VerticalList' id='upButton'>
        <img class='UpDownArrow' src="images/navigate-left.png" />
    </div>
    <div id='Slidebar_VerticalList'>
        <div class='Hint_VerticalList' id="IngreName">Hint</div>
        <div class='Hint_VerticalList' id="IngreDetails" Iteration="0">
            <div class="VerticalDetailButton" id="Plus"><p>+</p></div>            
            <div class="VerticalDetailButton" id="Minus"><p>-</p></div> 
        </div>
        <div id='Slider_VerticalList'>
            <?php
            include 'db/db_connection.php';

            $sql = "SELECT * FROM ingredients";
            $result = mysql_query($sql);
            $array_ingre = array();

            while ($row = mysql_fetch_array($result)) {
                $array_ingre[$row['Id']] = $row['Name'];
                include "VerticalItem.php";
            }
            ?>

        </div>
        <!--</div>-->
    </div>
    <div class='button_VerticalList' id='downButton'>
        <img class='UpDownArrow' src="images/navigate-left.png" />
    </div>
</div>