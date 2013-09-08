<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

require ROOT . 'third/PHPMailer/class.phpmailer.php';

class ArticleController extends _Controller {

	public function __construct() {
		parent::__construct();
	}
	
	public function index() {
		
	}
	
	public function show($id) {
		echo 'id:' . $id ;
	}
	
}

