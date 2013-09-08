<?php ! defined( 'XXOO' ) && exit( 'No direct script access allowed' );

/**
 * Session基类
 * @author yanhong.liu
 */

abstract class BaseSession {
	protected $time;
	protected $data;
	protected $_type;
	protected $_expire;
	protected $_cookieExp;
	protected $_cookiename;
	protected $_cookiepath;
	protected $_cookieDomain;
	
	protected function __construct() {
		foreach( conf( 'xxoo', 'session' ) as $k => $v ) {
			$k = "_{$k}";
			$this->$k = $v;
		}
		$this->time = time();
		$this->data = array();
		// session存在
		if( $this->read() ) {
			$this->update();
		}
		// session不存在或过期
		else {
			$this->create();
		}
		// 保存session数据
		register_shutdown_function( array( $this, 'save' ) );
	}
	
	public function save() {}
	
	/**
	 * 销毁session
	 */
	public function destory() {
		foreach( $this->data as $k => $v ) {
			unset( $this->data[$k] );
		}
		setcookie( $this->_cookiename, '', ( $this->time - 31500000 ), '/' );
	}
	
	/**
	 * 读取session
	 */
	protected function read() {
		// session不存在
		if( empty( $_COOKIE[$this->_cookiename] ) ) {
			return FALSE;
		}
		$data = unserialize( $_COOKIE[$this->_cookiename] );
		foreach( $data as $k => $v ) {
			$this->data[$k] = $v;
		}
		// session id不存在
		if( empty( $this->data['session_id'] ) ) {
			return FALSE;
		}
		// 已过期
		if( empty( $this->data['last_activity'] ) || ( ( $this->data['last_activity'] + $this->_expire ) < $this->time ) ) {
			$this->destory();
			return FALSE;
		}
		return TRUE;
	}
	
	/**
	 * 创建session
	 */
	protected function create() {
		$sessId = $this->generateSessId();
		$this->data = array(
			'session_id'    => $sessId,
			'last_activity' => $this->time
		);
		$this->setCookie();
	}
	
	/**
	 * 更新session
	 */
	protected function update() {
		$this->data['last_activity'] = $this->time;
		$this->setCookie();
	}
	
	/**
	 * 设置cookie
	 */
	protected function setCookie( $data = array() ) {
		$expire = ( $this->_cookieExp == 0 ) ? 0 : $this->time + $this->_cookieExp;
		$data = array_merge( $data, array( 'session_id' => $this->data['session_id'], 'last_activity' => $this->data['last_activity'] ) );
		setcookie(
			$this->_cookiename,
			serialize( $data ),
			$expire,
			$this->_cookiepath,
			$this->_cookieDomain
		);
	}
	
	/**
	 * 获取数据
	 * @param string $item
	 */
	public function get( $item ) {
		return isset( $this->data[$item] ) ? $this->data[$item] : NULL;
	}
	
	/**
	 * 
	 * 设置数据
	 * @param mixed $k
	 * @param mixed $v
	 */
	public function set( $k, $v = NULL ) {
		if( is_null( $v ) && is_array( $k ) ) {
			array_merge( $this->data, $k );
		}
		else {
			$this->data[$k] = $v;
		}
	}
	
	/**
	 * 摧毁session数据
	 * @param string $k
	 */
	public function uset( $k ) {
		if( isset( $this->data[$k] ) ) {
			unset( $this->data[$k] );
		}
	}
	
	/**
	 * 生成session ID
	 */
	public function generateSessId() {
		$sessId = '';
		while ( strlen( $sessId ) < 32 ) {
			$sessId .= mt_rand( 0, mt_getrandmax() );
		}
		return md5( uniqid( $sessId, TRUE ) );
	}
}


// 创建mysql session类
if( conf( 'xxoo', 'session', 'type' ) == 'mysql' ) {
	class Session extends BaseSession {
		private static $instance;
		
		private $db;
		// 表名称
		protected $_table = 'eva_session';
		// 刷新session id时间间隔
		protected $_sessionIdRefresh = 120;
		// 使用哪个mysql配置
		protected $_dbItem = 'default';
		// 清理过期数据频率(值越大频率越小)
		protected $_clearExpire = 10;
		
		protected function __construct() {
			parent::__construct();
			$this->db = db( $this->_dbItem );
		}
		
		public static function instance() {
			if( ! Session::$instance ) {
				Session::$instance = new self();
			}
			return Session::$instance;
		}
		
		protected function read() {
			if( ! parent::read() ) {
				return FALSE;
			}
			$data = get_var(
				prepare(
					"SELECT `data` FROM `{$this->_table}` WHERE `id` = ?s AND `last_activity` >= ?i",
					array( $this->data['session_id'], ( $this->time - $this->_expire ) )
				),
				$this->db
			);
			// session过期或不存在
			if( empty( $data ) ) {
				$this->destory();
				return FALSE;
			}
			$data = unserialize( $data );
			// 客户端信息不合法
			if( empty( $data['user_agent'] ) || ( $data['user_agent'] != substr( $_SERVER['HTTP_USER_AGENT'], 0, 64 ) ) ) {
				$this->destory();
				return FALSE;
			}
			$this->data = array_merge( $this->data, $data );
			return TRUE;
		}
		
		protected function create() {
			parent::create();
			$this->data['user_agent'] = substr( $_SERVER['HTTP_USER_AGENT'], 0, 64 );
			$this->data['last_id_refresh'] = $this->time;
			$data = array( 'id' => $this->data['session_id'], 'data' => serialize( $this->data ), 'last_activity' => $this->data['last_activity'] );
			insert( $this->_table, $data, $this->db );
		}
		
		protected function update() {
			// 刷新session id
			if( empty( $this->data['last_id_refresh'] ) ) {
				$this->data['last_id_refresh'] = 0;
			}
			if( ( $this->time - $this->data['last_id_refresh'] ) > $this->_sessionIdRefresh ) {
				$this->data['last_id_refresh'] = $this->time;
				$oldId = $this->data['session_id'];
				$this->data['session_id'] = $this->generateSessId();
				update(
					$this->_table,
					array( 'id' => $this->data['session_id'] ),
					array( 'id' => $oldId ),
					$this->db
				);
			}
			parent::update();
			// 清理过期数据
			if( ( $this->time % $this->_clearExpire ) == 0 ) {
				run_sql( prepare( "DELETE FROM `{$this->_table}` WHERE `last_activity` < ?i", array( $this->time - $this->_expire ) ), $this->db );
			}
		}
		
		public function destory() {
			run_sql( prepare( "DELETE FROM `{$this->_table}` WHERE `id` = ?s LIMIT 1", array( $this->data['session_id'] ) ), $this->db );
			parent::destory();
		}
		
		public function save() {
			if( ! empty( $this->data ) ) { 
				$data = array( 'data' => serialize( $this->data ), 'last_activity' => $this->data['last_activity'] );
				update( $this->_table, $data, array( 'id' => $this->data['session_id'] ), $this->db );
			}
		}
	}
}
// 创建cookie session类
else {
	class Session extends BaseSession {
		private static $instance;
		
		protected function __construct() {
			parent::__construct();
		}
		
		public static function instance() {
			if( ! Session::$instance ) {
				Session::$instance = new self();
			}
			return Session::$instance;
		}
		
		public function set( $k, $v = NULL ) {
			parent::set( $k, $v );
			$this->setCookie();
		}
		
		public function uset( $k ) {
			parent::uset( $k );
			$this->setCookie();
		}
		
		protected function setCookie( $data = '' ) {
			if( ! empty( $this->data ) ) {
				parent::setCookie( $this->data );
			}
		}
	}
}

function sess_get( $k ) {
	return Session::instance()->get( $k );
}

function sess_set( $k, $v = NULL ) {
	Session::instance()->set( $k, $v );
}

function sess_uset( $k ) {
	Session::instance()->uset( $k );
}

function sess_destory() {
	Session::instance()->destory();
}
