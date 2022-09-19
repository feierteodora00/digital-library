<?php

/**
 * UpdateChild endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiUpdateParentController extends Controller {

    protected function setGateway() {
        $this->gateway = new UpdateParentGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $email = $this->getRequest()->getParameter("email");
        $phone_number = $this->getRequest()->getParameter("phone_number");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            if (!is_null($id) && !is_null($first_name) && !is_null($last_name)){
                $this->getGateway()->updateParent($id, $first_name, $last_name, $email, $phone_number);
            } else {
            
                $this->getResponse()->setMessage("Forbidden. Missing information");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}