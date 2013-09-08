<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

class TestInterceptor {
	
	public function before() {
		Logger::debug( 'before...' );
	}
	
	public function after() {
		Logger::debug( 'after' );
	}
	
}