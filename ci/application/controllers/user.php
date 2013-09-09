<?php
class User extends CI_Controller
{
	function __construct()
	{
		parent::__construct();
	}

	public function index($aa='', $bb='')
	{
		echo $aa;
		echo $bb;
		echo "this is index for user";
	}

	// public function list()
	// {
	// 	echo "this is id list for me.";
	// }
}
