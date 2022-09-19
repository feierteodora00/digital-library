<?php

/**
 * AddChild endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiAddParentController extends Controller {

    protected function setGateway() {
        $this->gateway = new AddParentGateway();
    }

    protected function processRequest() {
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $email = $this->getRequest()->getParameter("email");
        $phone_number = $this->getRequest()->getParameter("phone_number");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if all fields are filled, add child to db
            if (!is_null($first_name) && !is_null($last_name)){
                $this->getGateway()->insertParent($first_name, $last_name, $email, $phone_number);
            } else {
            
                $this->getResponse()->setMessage("Forbidden. Missing name");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}