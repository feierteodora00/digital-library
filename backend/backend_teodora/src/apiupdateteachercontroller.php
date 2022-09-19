<?php

/**
 * UpdateTeacher endpoint 
 * 
 * @author Teodora Feier w19006590  
 */

class ApiUpdateTeacherController extends Controller {

    protected function setGateway() {
        $this->gateway = new UpdateTeacherGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");
        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $class = $this->getRequest()->getParameter("class");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            if (!is_null($id) && !is_null($first_name) && !is_null($last_name) && !is_null($class)){
                $this->getGateway()->updateTeacher($id, $first_name, $last_name, $class);
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