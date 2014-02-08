//工作计划 20130722 √
1.旅游模块
2.旅游路线

/**
 * 信帮网 工作任务
 */



//扩展阅读：
mysql join 和if ifnull查询
SELECT m.*,concat(if(u.username is null,'xxxx',u.username)) username FROM xbweb_infleave m LEFT JOIN xbweb_user u ON m.uid=u.userid WHERE m.info_id=107
等同于
SELECT m.*,ifnull(u.username,'xxxx') username FROM xbweb_infleave m LEFT JOIN xbweb_user u ON m.uid=u.userid WHERE m.info_id=107
 
 
/**
 * 工作Tips
 *
 */


 