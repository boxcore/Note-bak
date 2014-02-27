-- phpMyAdmin SQL Dump
-- version 2.11.2-rc1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2010 年 11 月 09 日 05:34
-- 服务器版本: 5.0.41
-- PHP 版本: 5.2.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `demo`
--

-- --------------------------------------------------------

--
-- 表的结构 `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(100) NOT NULL,
  `solutation` varchar(40) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `company` varchar(100) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `source` varchar(50) NOT NULL,
  `sdate` date NOT NULL,
  `job` varchar(50) NOT NULL,
  `web` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createtime` datetime NOT NULL,
  `modifiedtime` datetime default NULL,
  `note` varchar(500) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `customer`
--

INSERT INTO `customer` (`id`, `username`, `solutation`, `phone`, `company`, `mobile`, `source`, `sdate`, `job`, `web`, `email`, `createtime`, `modifiedtime`, `note`) VALUES
(1, '李小三', '先生', '(513) 378-6268', '常丰集团', '13800138000', '合作伙伴', '2011-11-30', '部门经理', 'www.helloweba.com', 'lrfbeyond@163.com', '2010-11-04 21:11:59', '2010-11-08 09:30:35', '备注信息\n');
