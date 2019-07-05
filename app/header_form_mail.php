<?php
$recepient = "kirillhlot@mail.ru";
$sitename = "Lift";
$phone = trim($_POST["phone"]);
$name = trim($_POST["name"]);
$message = "
<div xmlns=\"http://www.w3.org/1999/xhtml\">
	Заявка из формы хедера
	<br>Телефон: $phone	
	<br>Имя: $name	
</div>";
$pagetitle = "Новая заявка с нашего сайта $sitename";
mail($recepient, $pagetitle, $message, "Content-type: text/html; charset=\"UTF-8\";\n From: $recepient");