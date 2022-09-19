<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ApiUserDetailsController extends Controller {
    
    protected function setGateway() {
        $this->gateway = new UserDetailsGateway();
    }

    protected function processRequest() {
        $token = $this->getRequest()->getParameter("token");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($token)) {
                $key = SECRET_KEY;
                $decoded = JWT::decode($token, new Key($key, 'HS256'));
                
                $user_id = $decoded->user_id;

                $this->getGateway()->findUser($user_id);
            } else {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatusCode(401);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();
    }
}