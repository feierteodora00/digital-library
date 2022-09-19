<?php

class ApiClassChildrenController extends Controller {

    protected function setGateway() {
        $this->gateway = new ClassChildrenGateway();
    }

    protected function processRequest() {
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            $this->getGateway()->findChildren($first_name, $last_name);
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();
    }
}