<!-- PizzaMaker -->
<div id="frame">
    <div class='row' id='firstRow'>
        <div id='logo'></div>
        <div id='HorizontalList_col'><?php
            include 'HorizontalList/HorizontalList.php';
            ?>
        </div>
    </div>
    <div class='row' id='secondRow'>
        <div id='VerticalList_col'><?php
            include 'VerticalList/VerticalList.php';
            ?>
        </div>
        <div id='preview'>
            <?php
            include 'VerticalList/LoadFigures.php';
            ?>

        </div>
    </div>

</div>