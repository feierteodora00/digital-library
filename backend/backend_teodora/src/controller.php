<?php

/**
 * Base controller class
 * 
 * Handles the request and response, sets the gateway
 * 
 * @author Teodora Feier w19006590
 * 
 */

abstract class Controller {

    private $request;
    private $reponse;
    protected $gateway;
    
    public function __construct($request, $response) {
        $this->setGateway();
        $this->setRequest($request);
        $this->setResponse($response);

        $data = $this->processRequest();
        $this->getResponse()->setData($data);
    }

    private function setRequest($request) {
        $this->request = $request;
    }

    protected function getRequest() {
        return $this->request;
    }

    private function setResponse($response) {
        $this->response = $response;
    }

    protected function getResponse() {
        return $this->response;
    }

    protected function setGateway() {

    }

    protected function getGateway() {
        return $this->gateway;
    }

}