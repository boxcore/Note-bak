《复制表中的指定内容》


1. 复制表结构

方法1：create table item_ad_fn28 like item_ad;  //
方法2：create table b select * from users limit 0;   //复制表结构
方法3：show create table users\G;  //


2. 复制内容

方法一：
create table temp_item_ad select * from item_ad where site_id=11;  //创建表的同时复制指定的内容
方法二：
insert into item_ad_fn28 select * from item_ad where item_ad.site_id=11; //往表中添加指定的数据数据（注意，如果结构一样则只需要直接添加，如果不一样则需要添加指定的数据）
方法三：
insert into item_ad_fn28(`id`, `item_id`, `site_id`, `ad_name`, `ad_mark`, `group_mark`, `sort`, `slogan`, `link`, `src`, `width`, `height`, `type`, `status`, `created_time`) select * from item_ad where item_ad.site_id=11
// 往指定的表中添加指定字段的数据


3. 删除临时表

清空表：TRUNCATE `item_ad_fn28`;
删除表：DROP TABLE `item_ad_fn28`;


*参考文档
http://blog.51yip.com/mysql/1311.html