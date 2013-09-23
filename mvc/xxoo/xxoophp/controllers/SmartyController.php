<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

require ROOT . 'third/smarty/Smarty.class.php';

class SmartyController extends _Controller {

	public $tpl;
	
	public function __construct() {
		$this->tpl = new Smarty();
		Smarty::muteExpectedErrors();
		$this->tpl->setTemplateDir( ROOT.'views' );
		$this->tpl->setCompileDir( ROOT.'data'.DS.'template_c' );
		$this->tpl->setConfigDir( ROOT.'conf'.DS.'smarty_configs' );
		$this->tpl->setCacheDir( ROOT.'data'.DS.'cache' );
	}
}
