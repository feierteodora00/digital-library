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

class ApiRegisterController extends Controller {

    protected function setGateway() {
        $this->gateway = new RegisterGateway();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("email");
        $password = $this->getRequest()->getParameter("password");
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $phone_number = $this->getRequest()->getParameter("phone_number");
        $role = $this->getRequest()->getParameter("role");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!$this->getGateway()->userExists($email)){
                if (!is_null($email) && !is_null($password)) {
                    if (is_null($phone_number)) {
                        $phone_number = "";
                    }
                    if (strpos($email, '@') && strlen($password)>5) {
                        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                        $this->getGateway()->insertUser($email, $hashed_password, $first_name, $last_name, $phone_number, $role);
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
                $this->getResponse()->setMessage("Forbidden. User already exists or requested registration");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}