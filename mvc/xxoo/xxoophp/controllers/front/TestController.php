<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

class TestController extends _Controller {
	
	public function __construct() {
		parent::__construct();
	}
	
	public function index() {
		echo 'test index...';
	}
	
	public function pb($id, $name) {
		echo 'id:' . $id . '  name:' . $name;
	}
	
}
