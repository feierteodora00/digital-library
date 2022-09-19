<?php

class ApiDeleteAccountController extends Controller {

    protected function setGateway() {
        $this->gateway = new DeleteAccountGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            $this->getGateway()->deleteAccount($id);
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(406);
        }

        return $this->getGateway()->getResult();
    }
}