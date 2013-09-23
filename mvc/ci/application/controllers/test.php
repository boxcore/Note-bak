<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Test extends CI_Controller {

	public function index()
	{
		echo 111;
		$a = 123;
		$this->load->view('test/index');
	}

	// public function test()
	// {
	// 	echo 'this is test, haha!';
	// }

}