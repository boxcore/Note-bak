<?php

/**
 * 生成URL
 * @author boxcore
 * @param bool $type 是否输出绝对链接
 * @return string
 */
function getURL( $type = false) {
    $http_protocol = ( !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ) ? 'https://' : 'http://';
    $url = $type ? $http_protocol . $_SERVER ['HTTP_HOST'] . $_SERVER['REQUEST_URI'] : $_SERVER['REQUEST_URI'] ;

    if( $pos = strpos( $url, '?' ) ) {
        $url = substr( $url, 0, $pos );
    }
    return $url;
}