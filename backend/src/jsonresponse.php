<?php 

/**
 * 
 * JSON Response Class
 * 
 * Encodes the response in JSON. Sets the headers for an appropiate JSON response.
 * It sets the message and status codes according to the content
 * 
 * @author Teodora Feier w19006590 
 */

class JSONResponse extends Response
{

    private $message;
    private $statusCode;

    protected function headers() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function setMessage($message) {
        $this->message = $message;
    }

    public function setStatusCode($statusCode) {
        $this->statusCode = $statusCode;
    }

    public function getData() {
        if (is_null($this->message)) {
            if (count($this->data) === 0) {
                $this->message = "No content";
                $this->setStatusCode(204);
            } else {
                $this->message = "Ok";
                $this->setStatusCode(200);
            }
        }
        
        http_response_code($this->statusCode);

        $response['message'] = $this->message;        
        $response['count'] = count($this->data);
        $response['results'] = $this->data;
        return json_encode($response);
    }
}