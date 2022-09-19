<?php

/**
 * Update user details endpoint
 * 
 * @author Teodora Feier w19006590  
 */

class ApiUpdateUserController extends Controller {

    protected function setGateway() {
        $this->gateway = new UpdateUserGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");
        $password = $this->getRequest()->getParameter("password");
        $phone_number = $this->getRequest()->getParameter("phone_number");
    
        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if ($this->getGateway()->userExists($id)){
                if (strcmp($password, "") !== 0) {
                    if (is_null($phone_number)) {
                        $phone_number = "";
                    }
                    if (strlen($password)>5) {
                        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                        $this->getGateway()->updateUser($id, $hashed_password, $phone_number);
                    } else {
                        $this->getResponse()->setMessage("Not acceptable. Inappropiate passoword");
                        $this->getResponse()->setStatusCode(406);
                    }
                } else {
                    $this->getGateway()->updatePhoneNumber($id, $phone_number);
                }
            } else {
                //if the user does not exist, prompt message
                $this->getResponse()->setMessage("Forbidden. User does not exist");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}