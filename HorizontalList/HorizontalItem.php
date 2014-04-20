<?php

$html = new DOMDocument('1.0','iso-8859-1');
$html->formatOutput = true;

$container = $html->createElement('div');
$container->setAttribute('class', 'HorizontalItem');
$container->setAttribute('Id', $row['Id']);
$container->setAttribute('PizzaName', $row['PizzaName']);
$container->setAttribute('PizzaPrice', $row['PizzaPrice']);


$checkCircle = $html->createElement('span');
$checkCircle->setAttribute('class', 'HorizontalItem_CheckCircle');
    $checkedImg = $html->createElement('img');
    $checkedImg->setAttribute('src', "images/Circle-Check-Mark.png");
$checkCircle->appendChild($checkedImg);
$container->appendChild($checkCircle);

$img = $html->createElement('img');
$img->setAttribute('class', "Horizontal_img");
$img->setAttribute('src', "images/Pizza/" . $row['PicFileName']);
$container->appendChild($img);

$html->appendChild($container);
echo html_entity_decode($html->saveHTML());
?>