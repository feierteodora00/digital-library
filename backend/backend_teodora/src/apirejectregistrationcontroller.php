<?php

/**
 * Registration (sign up) endpoint 
 * 
 * Used to add new users (credentials) to the users database
 * 
 * @param email - email (username) of the user
 * @param password - user's password
 * Parameters are parsed in the body, not the URL (sensitive information) 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiRejectRegistrationController extends Controller {

    protected function setGateway() {
        $this->gateway = new RejectRegistrationGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            $this->getGateway()->deleteUser($id);
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}