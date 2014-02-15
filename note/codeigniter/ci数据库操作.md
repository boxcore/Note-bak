## ci数据库操作笔记： ##


------------------------------------------------
我的常用函数

    /*  链式方法 */
    $this->db->select('title')->from('mytable')->where('id', $id)->order_by('id', 'DESC')->limit(10, 20);
    $query = $this->db->get();
	
	$query->result_array()  多条
	$query->row_array()	单条
	
	
	打印最后执行的sql：$this->db->last_query();  返回的是最后执行的sql语句
	

------------------------------------------------

### 一、数据库配置 
数据库配置文件： app/config/database.php

### 二、加载数据库
$this->load->database(); //数据库配置载入并初始化数据库类


### 三、数据库查询


3.1. 多结果标准查询

    $query = $this->db->query('SELECT name, title, email FROM my_table');
    /*（对象形式）*/
    $query->result()；
    /*（数组形式） */
    $query->result_array();
    /* 查询的总结果集 */
    $query->num_rows();

3.2. 单结果标准查询
    
    $query = $this->db->query('SELECT name FROM my_table LIMIT 1');

3.2.1 对象形式

    $row = $query->row();
	echo $row->name;

3.2.2 数组形式

    $row = $query->row_array();
	echo $row['name'];


3. 快捷查询  

快捷查询类能为我们提供快速取得数据的途径:
    
    $query = $this->db->get('table_name');
    $row  = $query->result() ;

注意：$query->result() 这样的对象查询必须要有"()"否则查询不出东西。

### 四、数据库插入

4.1 标准插入(insert)

$sql = "INSERT INTO mytable (title, name) 
        VALUES (".$this->db->escape($title).",".$this->db->escape($name).")";
$this->db->query($sql);
echo $this->db->affected_rows();


4.2 快捷插入(insert)

$data = array('title' => $title,'name' => $name,);
$this->db->insert('mytable', $data); 
// Produces: INSERT INTO mytable (title, name, date) VALUES ('{$title}', '{$name}', '{$date}')


### 五、数据库更新

5.1 获得sql语句 打印 sql语句
$data = array('name' => $name, 'email' => $email,);
$where = "author_id = 1 AND status = 'active'"; 
$str = $this->db->update_string('table_name', $data, $where);

// 
$data = array('title' => $title,'name' => $name,);
$this->db->where('id', $id);
$this->db->update('mytable', $data);

//
$this->db->update('mytable', $data, "id = 4"); 
$this->db->update('mytable', $data, array('id' => $id));
//上面的效果都是 update mytable set xx=xx where id=4;

// 


### 六、删除数据

//生成并执行一条DELETE(删除)语句。
$this->db->delete('mytable', array('id' => $id)); 

//
$this->db->where('id', $id);
$this->db->delete('mytable'); 

//从一个以上的表中删除数据
$tables = array('table1', 'table2', 'table3');
$this->db->where('id', '5');
$this->db->delete($tables);

// *如果你想要删除表中的全部数据，你可以使用 truncate() 函数，或者 empty_table() 函数。
$this->db->empty_table('mytable'); 
// 生成  DELETE FROM mytable

$this->db->from('mytable'); 
$this->db->truncate(); 
// 或 
$this->db->truncate('mytable'); 
// 生成:TRUNCATE TABLE mytable 


---------------------------------------------
六、 Active Record 缓存
---------------------------------------------
$this->db->start_cache() 	// 开启缓存 如果使用缓存，必须先开启
$this->db->stop_cache()		// 停止缓存
$this->db->flush_cache()	// 从Active Record 缓存中删除全部项目

*说明: 下列语句能够被缓存: select, from, join, where, like, group_by, having, order_by, set

-----------------
六、查询辅助函数
-----------------
$this->db->insert_id(); // 取得 执行数据插入时的ID
$this->db->affected_rows()  //当执行写入操作（insert,update等）的查询后，显示被影响的行数
$this->db->count_all('mytable'); //计算出指定表的总行数并返回
$this->db->last_query(); // 返回最后运行的查询（是查询语句，不是查询结果）
$this->db->platform() // 输出系统使用的数据库平台(MySQL, MS SQL, Postgres……)
$this->db->version() // 输出系统正在运行的数据库版本号

/* 简化了写入数据库的insert函数。它返回一个标准的SQL insert字符串 */
$data = array('name' => $name, 'email' => $email, 'url' => $url);
$str = $this->db->insert_string('table_name', $data);
//INSERT INTO table_name (name, email, url) VALUES ('Rick', 'rick@example.com', 'example.com')

$this->db->update_string();
/* 简化了写入数据库的update操作。它返回一条格式正确的SQL update字符串 */
eg:
$data = array('name' => $name, 'email' => $email, 'url' => $url);
$where = "author_id = 1 AND status = 'active'"; 
$str = $this->db->update_string('table_name', $data, $where);
//UPDATE table_name SET name = 'Rick', email = 'rick@example.com', url = 'example.com' WHERE author_id = 1 AND status = 'active'



#### 附：参考文档
http://codeigniter.org.cn/user_guide/database/active_record.html#chaining
