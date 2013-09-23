<?php

class HttpRequest {

	public static function get( $host, $domain, $getway, $port=80 ) {
		$fp = fsockopen( $host, $port, $errno, $errstr, 30 );

		$get_content = '';
    	if (!$fp) {
        	echo "$errstr ($errno)\n";
    	}
    	else {
        	$out  = "GET ".$getway." HTTP/1.1\r\n";
        	$out .= "Host: ".$host_domain."\r\n";
        	$out .= "Accept: */*\r\n\r\n";

    		fwrite($fp, $out);
    		while (!feof($fp)) {
        		$content .= fgets( $fp, 128 );
    		}
    		fclose($fp);
    		
    		$pager = explode("\n",$content);
    		$get_content = $pager[4];
    	}
    	return $get_content;
	}
	
	public static function post( $host, array $params=array() ) {
		$path = explode( '/', $host );
	    $host = $path[0];
	    unset( $path[0] );
	    $path = '/' . ( implode( '/',$path ) );
	    $post="POST $path HTTP/1.1\r\nHost: $host\r\n";
	    $post.="Content-type: application/x-www-form-";
	    $post.="urlencoded\r\n${others}";
	    $post.="User-Agent: Mozilla 4.0\r\nContent-length: ";
	    $post.=strlen($query)."\r\nConnection: close\r\n\r\n$query";
	    $h=fsockopen($host,80);
	    fwrite($h,$post);
	    for($a=0,$r='';!$a;)
	    {
	    $b=fread($h,8192);
	    $r.=$b;
	    $a=(($b=='')?1:0);
	    }
	    fclose($h);
	    return $r;
	}
}