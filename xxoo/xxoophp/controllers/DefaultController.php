<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

// require XXOO . 'libs/Pagination.lib.php';

class DefaultController extends _Controller {

	public function __construct() {
		parent::__construct();
	}
	
	public function index() {
		echo 'Welcome to xxoophp.hahaha';
	}
	
} 