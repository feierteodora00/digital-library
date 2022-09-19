<?php

/**
 * AddChild endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiAddChildController extends Controller {

    protected function setGateway() {
        $this->gateway = new AddChildGateway();
    }

    protected function processRequest() {
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $dob = $this->getRequest()->getParameter("dob");
        $class = $this->getRequest()->getParameter("class");
        $parent_id = $this->getRequest()->getParameter("parent_id");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if all fields are filled, add child to db
            if (!is_null($first_name) && !is_null($last_name) && !is_null($dob) && !is_null($class) && !is_null($parent_id)){
                $this->getGateway()->insertChild($first_name, $last_name, $dob, $class, $parent_id);
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