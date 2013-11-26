<?php

$result = array(
                'php','网店PHP','ecphp','phpmy','myphp','12php','23343p',12,'ad12',
                'abcdefghijklmnopqrstxyz','akKKPHP','PHP');

            $result = array_filter( $result, function ($element) use ($keyword) { return ( strpos($element, $keyword) ); } );