<?php

/**
 * AddChild endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiAddTeacherController extends Controller {

    protected function setGateway() {
        $this->gateway = new AddTeacherGateway();
    }

    protected function processRequest() {
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $class = $this->getRequest()->getParameter("class");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if all fields are filled, add teacher to db
            if (!is_null($first_name) && !is_null($last_name) && !is_null($class)){
                $this->getGateway()->insertTeacher($first_name, $last_name, $class);
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