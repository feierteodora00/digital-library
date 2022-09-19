<?php

class ApiRecoverPasswordController extends Controller {

protected function setGateway() {
    $this->gateway = new RecoverPasswordGateway();
}

protected function processRequest() {
    $email = $this->getRequest()->getParameter("email");
    $password = $this->getRequest()->getParameter("password");

    if ($this->getRequest()->getRequestMethod() === "POST"){
        if ($this->getGateway()->userExists($email)) {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            $this->getGateway()->updatePassword($email, $hashed_password);
        } else {
            $this->getResponse()->setMessage("Not found");
            $this->getResponse()->setStatusCode(404);
        }
    } else {
        $this->getResponse()->setMessage("Method not allowed");
        $this->getResponse()->setStatusCode(405);
    }
}

}