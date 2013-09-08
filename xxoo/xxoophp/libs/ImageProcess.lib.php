<?php if ( !defined('XXOO') ) exit('No direct script access allowed');

/**
 * 图片处理类
 * @author bing.peng
 *
 */
class ImageProcess {

	public function __construct() {
	
	}
	
	
	/**
	 * 等比例缩放图片
	 * @param $src_image string 源图片路径
	 * @param $dest_image string 目标图片路径
	 * @param $maxwidth int 缩略图最大宽度
	 * @param $maxheight int 缩略图最大高度
	 * @return bool
	 */
	public function resize($src_image, $dest_image, $maxwidth, $maxheight ) {
		// 获取图片大小
		$image = getimagesize($src_image);

		// 无效的图片
		if( $image[0] <= 0 || $image[1] <= 0 ) return false;

		// 获取图片格式
		$image['format'] = strtolower(preg_replace('/^.*?\//', '', $image['mime']));

		// 获取图片文件流
		switch( $image['format'] ) {
			case 'jpg':
			case 'jpeg':
				$image_data = imagecreatefromjpeg($src_image);
				break;
			case 'png':
				$image_data = imagecreatefrompng($src_image);
				break;
			case 'gif':
				$image_data = imagecreatefromgif($src_image);
				break;
			default:
				return false;	// 不支持的格式
				break;
		}

		// 获取图片文件流失败
		if( $image_data == false ) return false;


		// 源图片宽高小于指定宽高
		if( $image[0] <= $maxwidth && $image[1] <= $maxheight ) {
			$realwidth = $image[0];
			$realheight = $image[1];
		}
		// 源图片宽小于等于指定宽，而源图片高大于指定高
		else if( $image[0] <= $maxwidth && $image[1] > $maxheight ) {
			$realheight = $maxheight;
			$realwidth = $realheight / $image[1] * $image[0];
		}
		// 源图片高小于等于指定高，而源图片宽大于指定宽
		else if( $image[1] <= $maxheight && $image[0] > $maxwidth ) {
			$realwidth = $maxwidth;
			$realheight = $realwidth / $image[0] * $image[1];
		}
		// 源图片宽高均大小指定宽高
		else {
			if( ($maxwidth / $image[0] * $image[1]) > $maxheight  ) {
				$realheight = $maxheight;
				$realwidth = $realheight / $image[1] * $image[0];
			}
			else {
				$realwidth = $maxwidth;
				$realheight = $realwidth / $image[0] * $image[1];
			}
		}

		// 创建缩略图
		$canvas = imagecreatetruecolor($realwidth,$realheight);
		if( imagecopyresampled( $canvas, $image_data, 0, 0, 0, 0, $realwidth, $realheight, $image[0], $image[1] )) {
			switch( strtolower(preg_replace('/^.*\./', '', $dest_image)) ) {
				case 'jpg':
				case 'jpeg':
					return imagejpeg($canvas, $dest_image, 100);
					break;
				case 'png':
					return imagepng($canvas, $dest_image);
					break;
				case 'gif':
					return imagegif($canvas, $dest_image);
					break;
				default:
					return false;
					break;
			}
		} else {
			return false;
		}
	}
	
}