<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

class LoginInterceptor {
	
	public function before() {
		Logger::debug( 'login interceptor...' );
	}
	
}