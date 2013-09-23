<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

/**
 * CURL经典并发实现
 * @author bing.peng
 *
 */
class ClassicCurl {

	public function __construct() {
		// 判断是否支持CURL
	}
	
	/**
	 * 开始并发执行请求
	 * @param array() $urls 请求的URL列表 
	 */
	function start($urls) {
	    $main    = curl_multi_init();
		$results = array();
		$errors  = array();
		$info    = array();
		$count   = count( $urls );
		for( $i = 0; $i < $count; $i++ ) {
			$handles[$i] = curl_init( $urls[$i] );
		  	curl_setopt( $handles[$i], CURLOPT_URL, $urls[$i] );
		  	curl_setopt( $handles[$i], CURLOPT_RETURNTRANSFER, 1 );
		  	curl_multi_add_handle( $main, $handles[$i] );
		}
		
		$running = 0;
		
		do {
			curl_multi_exec( $main, $running );
		} while( $running > 0 );
		
		for( $i = 0; $i < $count; $i++ ) {
			$results[] = curl_multi_getcontent( $handles[$i] );
		  	$errors[]  = curl_error( $handles[$i] );
		  	$info[]    = curl_getinfo( $handles[$i] );
		  	curl_multi_remove_handle( $main, $handles[$i] );
		}
		curl_multi_close( $main );
		
		return $results;
	}
	
}
