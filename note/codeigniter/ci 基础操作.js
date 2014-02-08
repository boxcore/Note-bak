ci 基础操作

一、控制器

二、模板视图

三、模型

文件： application/models/user_model.php
class User_model extends CI_Model {
    function __construct(){parent::__construct();}
}

//在控制器中载入
$this->load->model('Model_name');
$this->Model_name->function();

// 使用别名载入
$this->load->model('Model_name', 'fubar');
$this->fubar->function();

// 自动载入
vi application/config/autoload.php
$this->load->model('Model_name', '', TRUE);

//您可以手动设定第三个参数来载入您的自定义数据库配置:
-------------------------------------
$config['hostname'] = "localhost";
$config['username'] = "myusername";
$config['password'] = "mypassword";
$config['database'] = "mydatabase";
$config['dbdriver'] = "mysql";
$config['dbprefix'] = "";
$config['pconnect'] = FALSE;
$config['db_debug'] = TRUE;
---------------------------------------
$this->load->model('Model_name', '', $config);


