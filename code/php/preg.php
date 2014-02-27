<?php
$str = '192.168.30.75 - - [11/Feb/2014:23:59:43 +0800] "GET /api do=sendios HTTP/1.1" 200 24 "-" "curl/7.15.5 (x86_64-redhat-linux-gnu) libcurl/7.15.5 OpenSSL/0.9.8b zlib/1.2.3 libidn/0.6.5" "-"';


if(preg_match("/\"GET\s?([\/a-z0-9A-Z]){2,}\s([\w=]){3,}\sHTTP\/1\.1\"/i", $str, $matches)){
    print "A match was found:". $matches[0];
} else {
    print "A match was not found.";
}