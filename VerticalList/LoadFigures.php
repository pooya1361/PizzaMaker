<?php

echo "<!-- LoadFigures -->";

$html = new DOMDocument('1.0', 'iso-8859-1');
$html->formatOutput = true;
$desktop = $html->createElement('div');
$desktop->setAttribute('id', 'Desktop');

$floor = $html->createElement('div');
$floor->setAttribute('id', 'PizzaFloor');
$desktop->appendChild($floor);

$img = $html->createElement('img');
$img->setAttribute('Id', '0');
$img->setAttribute('class', 'FigurePic');
$img->setAttribute('src', "images/Figures/Dough_Sause_Cheese.gif");
$floor->appendChild($img);

include 'db/db_connection.php';

$sql = "SELECT * FROM ingredients WHERE FigurePic  <>  ''";
$result = mysql_query($sql);
while ($row = mysql_fetch_array($result)) {
    $iteration = is_null($row['Iteration']) ? 1 : $row['Iteration'];

    for ($i = 0; $i < ($iteration); $i++) {
        $img = $html->createElement('img');
        $img->setAttribute('Id', $row['Id']);
        $img->setAttribute('class', 'FigurePic');
        $img->setAttribute('Iteration', $i + 1);
        $degree = (string) 360 / $iteration * $i;
        $rotation = '-webkit-transform: rotate(' . $degree . 'deg);' .
                '-moz-transform: rotate(' . $degree . 'deg);' .
                '-o-transform: rotate(' . $degree . 'deg);' .
                'transform: rotate(' . $degree . 'deg);';
        $img->setAttribute('style', 'display: none;' . $rotation);
        $img->setAttribute('src', "images/Figures/" . $row['FigurePic']);
        $floor->appendChild($img);
    };
}

$html->appendChild($desktop);

echo html_entity_decode($html->saveHTML());

echo "<!-- End of LoadFigures -->";
?>
