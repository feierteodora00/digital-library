<?php

/**
 * 
 * Login (authentication) enpoint
 * 
 * Used to verify user credentials to allow access to restricted parts
 * 
 * @param email - user's email
 * @param password - user's password
 * Parameters are passed in the body, not in the URL
 * 
 * @return - access token as an array
 * 
 * @author Teodora Feier w19006590
 * 
 */

use Firebase\JWT\JWT;

class ApiAuthenticateController extends Controller {

    protected function setGateway() {
        $this->gateway = new UserGateway();
    }

    protected function processRequest() {
        $data = [];

        $email = $this->getRequest()->getParameter("email");
        $password = $this->getRequest()->getParameter("password");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            
            if (!is_null($email) && !is_null($password)) {

                $this->getGateway()->findDetails($email);

                if (count($this->getGateway()->getResult()) == 1) {
                    $hashpassword = $this->getGateway()->getResult()[0]['hashed_password'];
                    $approved = $this->getGateway()->getResult()[0]['approved'];
                    
                    if ($approved === '1') {
                        if (password_verify($password, $hashpassword)) {
                            $key = SECRET_KEY;

                            $payload = array(
                                "user_id" => $this->getGateway()->getResult()[0]['id'],
                                "role" => $this->getGateway()->getResult()[0]['role'],
                                "first_name" => $this->getGateway()->getResult()[0]['first_name'],
                                "last_name" => $this->getGateway()->getResult()[0]['last_name'],
                                "exp" => time() + 10800
                            );

                            $jwt = JWT::encode($payload, $key, 'HS256');

                            $data = ['token' => $jwt];
                        }
                        
                    }  
                }

            } 
            
            if (!array_key_exists('token', $data)) {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatusCode(401);
            }

        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $data;
    }
}