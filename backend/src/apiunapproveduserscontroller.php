<?php

/**
 * Registration (sign up) endpoint 
 * @author Teodora Feier w19006590  
 */

class ApiUnapprovedUsersController extends Controller {

    protected function setGateway() {
        $this->gateway = new UnapprovedUsersGateway();
    }

    protected function processRequest() {
        
        if ($this->getRequest()->getRequestMethod() === "POST"){
            $this->getGateway()->listUsers();
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();
    }

}