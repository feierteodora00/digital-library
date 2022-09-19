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

class ApiApproveRegistrationController extends Controller {

    protected function setGateway() {
        $this->gateway = new ApproveRegistrationGateway();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("email");
        
        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user has registered, the registration can be approved
            if ($this->getGateway()->userExists($email)){
                $this->getGateway()->updateUser($email);
            } else {
                $this->getResponse()->setMessage("Forbidden. User does not exist");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}