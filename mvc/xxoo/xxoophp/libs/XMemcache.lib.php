<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

/**
 * memcache 缓存类，同时支持memcache，sae，bae
 * 
 * @link http://xxoophp.com/api/mcache
 * @author bing.peng
 */

class XMemcache {
	
	private $xcache;

	public function __construct() {
		switch( ENV ) {
			case 'bae' :
				require_once ('BaeMemcache.class.php');
   				$this->xcache = new BaeMemcache();
			break;
			case 'sae' :
				//$class = 'SaeFileUpload';	// 新浪云
			break;
			default :
				$this->xcache = new Memcache();	// 普通环境
				$this->xcache->connect('192.168.13.128', 12000);
		}
	}
	
	public function add( $key, $value, $expiration=0 ) {
		$this->xcache->add( $key, $value, $expiration );
	}
	
	public function get( $key ) {
		$this->xcache->get( $key );
	}
	
	public function set( $key, $value, $expiration=0 ) {
		$this->xcache->set( $key, $value, $expiration );
	}
	
	public function replace() {
	
	}
	
	public function increment() {
	
	}
	
	public function decrement() {
	
	}
	
	public function delete( $key, $expire=0 ) {
		$this->xcache->delete( $key, $expire );
	}
	
}