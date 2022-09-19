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

class ApiRemoveFromRegisteredController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveFromRegisteredGateway();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("email");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            if ($this->getGateway()->userExists($email)){
                if (!is_null($email)) { 
                    $this->getGateway()->deleteUser($email);
                } else {
                        $this->getResponse()->setMessage("Not acceptable. Missing email");
                        $this->getResponse()->setStatusCode(406);
                }
            } else {
                //if the user is registered prompt a corresponding message
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Forbidden. User does not exists");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}