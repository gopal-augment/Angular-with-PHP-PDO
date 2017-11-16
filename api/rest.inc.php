<?php
	/*
	 * File : Rest.inc.php
	*/
class REST {

    public $_allow = array();
    public $_content_type = "application/json";
    public $_request = array();
    public $_body = '';

    private $_method = "";
    private $_code = 200;

    public function __construct(){
        $this->inputs();
    }

    public function get_referer(){
        return $_SERVER['HTTP_REFERER'];
    }

    public function response($data=array(),$status){
        $this->_code = ($status) ? $status : 200;
        $this->set_headers();
        $data['response_text']=$this->get_status_message();
        $data['status']=$this->_code;
        echo json_encode($data);
        exit;
    }

    public function get_status_message(){
        $status = array(
                    100 => 'Continue',
                    101 => 'Switching Protocols',
                    200 => 'OK',
                    201 => 'Created',
                    202 => 'Accepted',
                    203 => 'Non-Authoritative Information',
                    204 => 'No Content',
                    205 => 'Reset Content',
                    206 => 'Partial Content',
                    300 => 'Multiple Choices',
                    301 => 'Moved Permanently',
                    302 => 'Found',
                    303 => 'See Other',
                    304 => 'Not Modified',
                    305 => 'Use Proxy',
                    306 => '(Unused)',
                    307 => 'Temporary Redirect',
                    400 => 'Bad Request',
                    401 => 'Unauthorizedgk',
                    402 => 'Payment Required',
                    403 => 'Forbidden',
                    404 => 'Not Found',
                    405 => 'Method Not Allowed',
                    406 => 'Not Acceptable',
                    407 => 'Proxy Authentication Required',
                    408 => 'Request Timeout',
                    409 => 'Conflict',
                    410 => 'Gone',
                    411 => 'Length Required',
                    412 => 'Precondition Failed',
                    413 => 'Request Entity Too Large',
                    414 => 'Request-URI Too Long',
                    415 => 'Unsupported Media Type',
                    416 => 'Requested Range Not Satisfiable',
                    417 => 'Expectation Failed',
                    500 => 'Internal Server Error',
                    501 => 'Not Implemented',
                    502 => 'Bad Gateway',
                    503 => 'Service Unavailable',
                    504 => 'Gateway Timeout',
                    505 => 'HTTP Version Not Supported');
        return ($status[$this->_code])?$status[$this->_code]:$status[500];
    }

    public function get_request_method(){
        return $_SERVER['REQUEST_METHOD'];
    }

    private function inputs(){
        $josnStr = $this->cleanInputs(file_get_contents('php://input'));
        $json = json_decode($josnStr, TRUE);
        $this->_request = $json;
        switch($this->get_request_method()){
            case "POST":
                $josnStr = $this->cleanInputs(file_get_contents('php://input'));
                $json = json_decode($josnStr, TRUE);
                $this->_request = (array) $json;
                if(count($this->_request)==0){
                    $this->_request=$_REQUEST;
                    unset($this->_request["request"]);
                }
                break;
            case "GET":
            case "DELETE":
                $josnStr = $this->cleanInputs(file_get_contents('php://input'));
                $json = json_decode($josnStr, TRUE);
                $this->_request = (array) $json;
                break;
            case "PUT":
                $josnStr = $this->cleanInputs(file_get_contents('php://input'));
                $json = json_decode($josnStr, TRUE);
                $this->_request = (array) $json;
                if(count($this->_request)==0){
                    $this->_request=$_REQUEST;
                    unset($this->_request["request"]);
                }
                //$this->_request = $this->cleanInputs($this->_body);
                break;
            case "OPTIONS":
                $this->response('Accepted',202);
                break;
            default:
                $this->response('',406);
                break;
        }
    }

    private function cleanInputs($data){
        $clean_input = array();
        if(is_array($data)){
            foreach($data as $k => $v){
                $clean_input[$k] = $this->cleanInputs($v);
            }
        }else{
            if(get_magic_quotes_gpc()){
                $data = trim(stripslashes($data));
            }

            $data = strip_tags($data);
            $clean_input = trim($data);
        }
        return $clean_input;
    }

    private function set_headers(){
        header("HTTP/1.1 ".$this->_code." ".$this->get_status_message());
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Origin, Content-Type, Content-Range, Content-Disposition, Content-Description');
        header("Content-Type:".$this->_content_type);
    }
}
?>