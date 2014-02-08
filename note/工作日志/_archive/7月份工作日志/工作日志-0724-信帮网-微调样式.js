//工作计划 20130724 √
/**
 * 内容
 */

sql语句组装
$sql = select m.infshop_id,m.infshop_view,count(l.info_id) from xbweb_infshop m,xbweb_infleave l where m.infshop_id=l.info_id
 
//文瑞取产品下评论的数量
SELECT k.infshop_id,COUNT(l.info_id) 
FROM (SELECT * FROM xbweb_infshop s LEFT JOIN xbweb_menutab m ON s.infshop_cid=m.id WHERE s.infshop_mid = 9 AND infshop_c = 37) k 
LEFT JOIN xbweb_infleave l ON l.info_id= k.infshop_id GROUP BY k.infshop_id


 
SELECT t.*,m.menuname,m.menu_shortname,p.cl FROM xbweb_infshop t LEFT JOIN xbweb_menutab m ON t.infshop_cid=m.id LEFT JOIN (SELECT l.info_id,COUNT(l.info_id) cl FROM xbweb_infleave l GROUP BY l.info_id) p ON p.info_id= t.infshop_id WHERE ( `infshop_mid` = 8 ) AND ( `infshop_p` = '1' ) ORDER BY infshop_time desc LIMIT 0,7


SELECT id,COUNT(info_id) FROM xbweb_infleave GROUP BY info_id
 
 

 
/*特效学习*/
http://baike.baidu.com/picview/26719/26719/0/b258f5c4864ef4908226ace2.html#albumindex=3&picindex=8

百度相册学习