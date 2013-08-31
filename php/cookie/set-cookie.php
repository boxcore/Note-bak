<?php
$value = "dfdf";
header("set-cookie:name=$value");
echo $_COOKIE['name'];