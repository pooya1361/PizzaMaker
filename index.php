<!DOCTYPE html>
<html>
    <head>
        <!--<meta charset="windows-1256">-->
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>Pooya Pizza Maker</title>

        <!-- ================ CSS =============== -->
        <link href="favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="stylesheet" type="text/css" href="normalize.css"></link>
        <link rel="stylesheet" type="text/css" href="style.css"></link>
        <link rel="stylesheet" type="text/css"
              href="VerticalList/VerticalList.css"></link>
        <link rel="stylesheet" type="text/css"
              href="HorizontalList/HorizontalList.css"></link>
        <link rel="stylesheet" type="text/css" href="PizzaMaker.css"></link>
        <link rel="stylesheet" href="hint.css">

        <!-- ================ JS ================ -->
        <script
        src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script
        src="http://jqueryrotate.googlecode.com/svn/trunk/jQueryRotate.js"></script>
        <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <script src="main.js"></script>
        <script src="HorizontalList/HorizontalList.js"></script>
        <script src="VerticalList/VerticalList.js"></script>
        <script src="PizzaMaker.js"></script>
        <script src="jquery.transit.js"></script>


    </head>
    <body id='page'>
        <?php header('Content-Type: text/html; charset=utf-8'); ?>
        <div>
<!--            <section id='header'>
            <?php
            include 'header.php';
            ?>

            <?php
            include 'menu.php';
            ?>

            </section>-->
            <section id='content'>
                <?php
                include 'PizzaMaker.php';
                ?>
            </section>
        </div>
    </body>
</html>
