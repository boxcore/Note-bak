session 操作类

一、初始化
$this->load->library('session');
 session就可以这样使用： $this->session


二、session格式
[array]
(
     'session_id'    => random hash, //唯一的用户Session ID 
     'ip_address'    => 'string - user IP address', //用户的 IP 地址
     'user_agent'    => 'string - user agent data', //用户浏览器信息（取前120个字符）
     'last_activity' => timestamp //最新的一个活跃时间戳
)

三、session操作
// 取得 Session 数据
$this->session->userdata('item'); // 获取item值
$session_id = $this->session->userdata('session_id'); //获得 session ID
$this->session->set_userdata($array); //添加session数据一
$this->session->set_userdata('some_name', 'some_value'); //添加session数据二
$this->session->all_userdata(); //取得所有 Session 数据
$this->session->unset_userdata('some_name');  //删除 Session 数据
//删除session方法二：
$array_items = array('username' => '', 'email' => '');
$this->session->unset_userdata($array_items);
-----
/* "闪出数据", Session数据只对下次服务器请求可用, 然后会自动清除 */
$this->session->set_flashdata('item', 'value'); //添加闪出数据
$this->session->flashdata('item');  // 要读取一个闪出数据变量
$this->session->keep_flashdata('item'); // 如果你发现你需要在一个附加的请求中保留一个闪出数据，你可以使用 keep_flashdata() 这个函数。

$this->session->sess_destroy(); // 销毁 Session


四、将session数据存入数据库
// 数据结构
CREATE TABLE IF NOT EXISTS  `ci_sessions` (
  session_id varchar(40) DEFAULT '0' NOT NULL,
  ip_address varchar(45) DEFAULT '0' NOT NULL,
  user_agent varchar(120) NOT NULL,
  last_activity int(10) unsigned DEFAULT 0 NOT NULL,
  user_data text DEFAULT '' NOT NULL,
  PRIMARY KEY (session_id),
  KEY `last_activity_idx` (`last_activity`)
);

// config配置：
$config['sess_use_database'] = TRUE; // 启用在数据库中存储session数据
$config['sess_table_name'] = 'ci_sessions';  //指定数据表名


附：参数说明
sess_cookie_name	ci_session	无	你想要保存 Session Cookie 的名字。
sess_expiration	7200	无	session 持续的秒数。默认是2个小时(7200秒)。如果将这个数值设为: 0，就可以得到 永久 session。
sess_expire_on_close	FALSE	TRUE/FALSE (boolean)	这个选项决定当浏览器窗口关闭时是否自动使session过期。
sess_encrypt_cookie	FALSE	TRUE/FALSE (布尔值boolean)	是否对 session 数据加密.
sess_use_database	FALSE	TRUE/FALSE (布尔值boolean)	是否将 session 数据存放入数据库中。在开启这个选项前，你要先创建一个数据库表。
sess_table_name	ci_sessions	任何有效的 SQL 表名	session 数据库表的名字。
sess_time_to_update	300	时间以秒计算	这个选项控制 session 类多久会产生一个新的session 和 session id。
sess_match_ip	FALSE	TRUE/FALSE (布尔值boolean)	是否通过用户的IP地址来读取 session 的数据。 注意 ，有些网络运行商 ISPs 会动态的改变IP, 所以将这个选项设为 FALSE， 才有可能得到永久的 session。
sess_match_useragent	TRUE	TRUE/FALSE (布尔值boolean)	是否要按照对应的 User Agent 来读取 session 数据。


参考链接：
http://codeigniter.org.cn/user_guide/libraries/sessions.html