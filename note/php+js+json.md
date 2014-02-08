## PHP下JS和JSON的互转 ##
> 案例，在网页中常用到js的ajax获取数据，然后无刷新加载进来，下面将总结在实际操作中的笔记记录。

### 一、js下的json数组和对象 ###

**1. json对象**

对象是一个无序的“‘名称/值’对”集合。一个对象以“{”（左括号）开始，“}”（右括号）结束。每个“名称”后跟一个“:”（冒号）；“‘名称/值’ 对”之间使用“,”（逗号）分隔。
 
例如： {“username”: “Eric”,”age”:23,”sex”: “man”}

娶到对象后可以这样访问： $data.username;

**2. json数组**

数组是值（value）的有序集合。一个数组以“[”（左中括号）开始，“]”（右中括号）结束。值之间使用“,”（逗号）分隔。

例如： ["Eric",23, "man"]

娶到数组后可以这样访问： $data[0];

### 二、php转换json数据

> - json_encode()就是将PHP数组转换成Json
> - json_decode()就是将Json转换成PHP数组

如果不用php内置函数输出，可以这样：

    header(‘Content-type:text/json’);
	//这句是重点，它告诉接收数据的对象此页面输出的是json数据；
    $json={“n”:”name”,”p”:”password”};
	//虽然这行数据形式上是json格式，如果没有上面那句的话，它是不会被当做json格式的数据被处理的；
	echo $json;

**1. php数组转json**

**2. php对象转json**

要将"索引数组"强制转化成"对象":

    json_encode( (object)$arr );
    //或者
    json_encode ( $arr, JSON_FORCE_OBJECT );

**3. php类转json**

PHP的类:

    class Foo {
    　　　　const ERROR_CODE = '404';
    　　　　public$public_ex = 'this is public';
    　　　　private   $private_ex = 'this is private!';
    　　　　protected $protected_ex = 'this should be protected'; 
    　　　　public function getErrorCode() {
    　　　　　　return self::ERROR_CODE;
    　　　　}
    　　}

现在，对这个类的实例进行json转换：

    　　$foo = new Foo;
    　　$foo_json = json_encode($foo);
    　　echo $foo_json;

输出结果是：

    {"public_ex":"this is public"} 


可以看到，除了公开变量（public），其他东西（常量、私有变量、方法等等）都遗失了。

--------------------------
注意：

*如果PHP数组的键都是数字，那么json_encode()返回一个数组形式的Json，如果PHP数组的键全是字符串。那么json_encode()就会返回一个对象形式的Json。<br/>事实上，只要在PHP数组的键中有一个字符串形式的键，那么json_encode()就会返回对象形式的Json。这是不正确的。因为，虽然在PHP代码中不会出现错误，但要是将这样的Json传给JS函数，JS会将此Json当做一个对象，而对象是不可能以数字作为属性名的。也就是说JS不知道这是什么：user.0.username(中间是数字零)*


### 二、ajax发送和接收数据


