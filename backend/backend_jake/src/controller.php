<?php
/**
 * Base controller for all controllers
 *
 * Handles controller functions throughout
 * all controllers with both their requests
 * and responses.
 *
 * @author Jake Ellerington
 */
abstract class Controller {

    private $request;
    protected $response;
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

    protected function processRequest() {

    }
}