<?php
//error_reporting(0);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
require_once("rest.inc.php");

class API extends REST {

    public $data = "";
    public $db = NULL;
    public $params = NULL;
    public $host = "localhost";
    public $user = "root";
    public $pass = "";
    public $dbname = "myprojectangular";

    public $prefix = "ma_";
    public $active = "1";
    public $inactive = "2";

    //String to encrypt/decrypt the password
    public $passKey = "my first angular";

    public function __construct() {
        parent::__construct();
    }

    /*
     *  Database connection 
     */

    private function dbConnect() {

        $this->db = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->user, $this->pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
        //$database->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        return $this->db;
    }

    /*
     * Public method for access api.
     * This method dynamically call the method based on the query string
     *
     */

    public function processApi() {
        $api_request = explode("_api/", urldecode($_SERVER['REQUEST_URI']));

        if (!isset($api_request[1]) || ($api_request[1] == NULL || $api_request[1] == '')) {

            $this->response(array('response' => 'failed'), 404);
        }
        if (strpos($api_request[1], '/') === false) {
            $request_function = explode("?", $api_request[1]);
            if (!isset($request_function[1])) {
                $function = strtolower(trim(str_replace("/", "", $request_function[0])));
                $this->params = NULL;
            } else {
                //$params=
                $function="";
            }
        } else {
            $request_function = explode("/", $api_request[1]);
            $function = strtolower(trim(str_replace("/", "", $request_function[0])));
            if ($request_function[1] == NULL || $request_function[1] == '') {
                $this->params = NULL;
            } else {
                array_shift($request_function);
                $this->params = $request_function;
            }
        }

        if ((int) method_exists($this, $function) > 0) {
            $this->dbConnect();
            $this->$function();
        } else {
            $this->response(array('response' => 'failed'), 404);    // If the method not exist with in this class, response would be "Page not found".
        }
    }

    public function lastinsetid() {
        return $this->db->lastInsertId();
    }

    public function master() {
        require_once("master.php");
        if ($this->params != NULL) {
            switch ($this->params[0]) {
                case 'getMenuList':
                case 'deleteMenuList':
                    $this->params[0]($this);
                    break;
                default:
                    $this->response(array('response' => 'failed'), 404);
                    break;
            }
        }
    }
    public function user() {
        require_once("user.php");
        if ($this->params != NULL) {
            switch ($this->params[0]) {
                case 'login':
                case 'logout':
                case 'checksession':
                case 'checkEmailExist':
                case 'checkUserEmailExist':
                case 'addAdminUsers':
                case 'getAdminUserList':
                case 'getAdminUserDetail':
                case 'viewAdminUserDetail':
                case 'deleteAdminUserDetail':

                case 'addAdminUserRole':
                case 'getAdminUserRoleList':
                case 'getAdminUserRoleDetail':
                case 'viewAdminUserRoleDetail':
                case 'deleteAdminUserRoleDetail':
                case 'adduser':
                    $this->params[0]($this);
                    break;
                default:
                    $this->response(array('response' => 'failed'), 404);
                    break;
            }
        }
    }
    public function myfarm() {
        require_once("myfarm.php");
        if ($this->params != NULL) {
            switch ($this->params[0]) {
                case 'uploadFiles':
                case 'getAllGalleryFiles':
                case 'deleteFiles':
                    $this->params[0]($this);
                    break;
                default:
                    $this->response(array('response' => 'failed'), 404);
                    break;
            }
        }
    }

    /* /////////////////////////////// TOKEN GENERATION ////////////////////////////// */

    public function generateToken($length = 256) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    /* /////////////////////////////// CHECK Authorization ////////////////////////////// */

    public function getAllHeader() {
        if (!function_exists('getallheaders')) {

            function getallheaders() {
                $headers = '';
                foreach ($_SERVER as $name => $value) {
                    if (substr($name, 0, 5) == 'HTTP_') {
                        $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                    }
                }
                return $headers;
            }

        }
    }

    public function checkAuthorization($device_id = NULL) {
        $headers = getallheaders();

        $auth = '';
        if (isset($headers['Authorization'])) {
            $auth = 'Authorization';
        } else if (isset($headers['authorization'])) {
            $auth = 'authorization';
        } else {
            //$this->response(array('response' => 'failed'), 403);
            $this->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }

        $request_token = $headers[$auth];
        if (!is_null($request_token)) {
            $access_token = explode("Bearer ", $request_token);
            if (isset($access_token[1])) {
                $access_token = $access_token[1];
                session_start();
                if (isset($_SESSION['access_token']) && ($_SESSION['access_token'] == $access_token)) {
                    return '';
                } else {
                    $this->response(array('response' => 'failed'), 401);
                }
            } else {
                $this->response(array('response' => 'failed'), 403);
            }
        } else {
            //$this->response(array('response' => 'failed'), 403);
            $this->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }
    }

    /* Password Encrypted */

    public function passwordEncrypt($string) {
        $iv = mcrypt_create_iv(
            mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC),
            MCRYPT_DEV_URANDOM
        );

        $encrypted = base64_encode(
            $iv .
            mcrypt_encrypt(
                MCRYPT_RIJNDAEL_128,
                hash('sha256', $this->passKey, true),
                $string,
                MCRYPT_MODE_CBC,
                $iv
            )
        );
        return $encrypted;
    }

    /* Password Decrypted */

    public function passwordDecrypt($encryptString) {
        $data = base64_decode($encryptString);
        $iv = substr($data, 0, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC));

        $decrypted = rtrim(
            mcrypt_decrypt(
                MCRYPT_RIJNDAEL_128,
                hash('sha256', $this->passKey, true),
                substr($data, mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC)),
                MCRYPT_MODE_CBC,
                $iv
            ),
            "\0"
        );
        return $decrypted;
    }

    /* /////////////////////////////// TOKEN GENERATION ////////////////////////////// */

    public function generateOTP($length = 6) {
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }
}

// Initiate Library

$api = new API;
$api->processApi();
?>