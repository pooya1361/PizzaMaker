<?php
echo "<!-- VerticalItem -->";
$html = new DOMDocument('1.0','iso-8859-1');
$html->formatOutput = true;

$container = $html->createElement('div');
$container->setAttribute('class', 'VerticalItem');
$container->setAttribute('Id', $row['Id']);
$container->setAttribute('IngreName', $row['Name']);
$container->setAttribute('Iteration', is_null($row['Iteration']) ? 1 : $row['Iteration']);

$checkCircle = $html->createElement('span');
$checkCircle->setAttribute('class', 'VerticalItem_CheckCircle');
    $checkedImg = $html->createElement('img');
    $checkedImg->setAttribute('src', "images/Circle-Check-Mark.png");
$checkCircle->appendChild($checkedImg);
$container->appendChild($checkCircle);

$img = $html->createElement('img');
$img->setAttribute('class', "Vertical_img");
$img->setAttribute('src', "images/Ingredients/" . $row['PicFileName']);
$container->appendChild($img);

$html->appendChild($container);
echo html_entity_decode($html->saveHTML());
?>