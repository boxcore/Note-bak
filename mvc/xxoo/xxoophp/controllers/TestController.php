<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

require ROOT . 'controllers/SmartyController.php';

class TestController extends SmartyController {

	public function __construct() {
		parent::__construct();
	}
	
	public function testSmarty() {
		$this->tpl->assign('username', 'bing.peng');
		$this->tpl->assign('age', '27');
		$this->tpl->display('smartyTest.tpl');
	}
}

