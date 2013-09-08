<?php ! defined('XXOO') && exit( 'No direct script access allowed' );

/**
 * 设置表单值
 * @param string $filed
 * @return string
 */
function set_value( $filed ) {
	if( isset( $_POST[$filed] ) ) {
		return $_POST[$filed];
	}
	else {
		return "";
	}
}

/**
 * 根据表单字段名获取错误信息
 * @param string $filed
 */
function from_error( $filed ) {
	if( isset( $GLOBALS['form_errors'][$filed] ) ) {
		return $GLOBALS['form_errors'][$filed];
	}
	else {
		return "";
	}
}

/**
 * 表单验证错误消息
 */
function validation_errors() {
	if( isset( $GLOBALS['form_errors'] ) ) {
		return $GLOBALS['form_errors'];
	}
	else {
		return false;
	}
}

/**
 * 生成下拉列表框
 */
function form_dropdown() {

}
