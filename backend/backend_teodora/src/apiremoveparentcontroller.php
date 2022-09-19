<?php

/**
 * RemoveParent endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiRemoveParentController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveParentGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            if (!is_null($id)){
                $this->getGateway()->removeParent($id);
            } else {
            
                $this->getResponse()->setMessage("Forbidden. Does not exist");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }

}