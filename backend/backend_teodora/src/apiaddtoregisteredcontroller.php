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

class ApiAddToRegisteredController extends Controller {

    protected function setGateway() {
        $this->gateway = new AddToRegisteredGateway();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("email");
        $password = $this->getRequest()->getParameter("password");
        $firstName = $this->getRequest()->getParameter("firstName");
        $lastName = $this->getRequest()->getParameter("lastName");
        $phoneNumber = $this->getRequest()->getParameter("phoneNumber");
        $accessLevel = $this->getRequest()->getParameter("accessLevel");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!$this->getGateway()->userExists($email)){
                if (!is_null($email) && !is_null($password)) {
                    if (is_null($phoneNumber)) {
                        $phoneNumber = "";
                    }
                    if (strpos($email, '@') && strlen($password)>5) {
                        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
                        $this->getGateway()->insertUser($email, $hashedpassword, $firstName, $lastName, $phoneNumber, $accessLevel);
                        //$this->getGateway()->deleteUserRequest($email);
                    } else {
                        $this->getResponse()->setMessage("Not acceptable. Inappropiate email or passoword");
                        $this->getResponse()->setStatusCode(406);
                    }
                } else {
                    $this->getResponse()->setMessage("Not acceptable. Inappropiate email or passoword");
                    $this->getResponse()->setStatusCode(406);
                }
            } else {
                //if the user is registered prompt a corresponding message
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Forbidden. User already exists");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}