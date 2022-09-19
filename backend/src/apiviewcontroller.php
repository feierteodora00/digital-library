<?php

class ApiViewController extends Controller {

    protected function setGateway() {
        $this->gateway = new ViewGateway();
    }

    protected function processRequest() {
        $type = $this->getRequest()->getParameter("type");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if(!strcmp($type, "users")){
                $this->getGateway()->viewUsers();
            } 
            else if (!strcmp($type, "teachers")){
                $this->getGateway()->viewTeachers();
            }
            else if (!strcmp($type, "parents")){
                $this->getGateway()->viewParents();
            }
            else if (!strcmp($type, "children")){
                $this->getGateway()->viewChildren();
            } else {
                $this->getResponse()->setMessage("Bad request");
                $this->getResponse()->setStatusCode(400);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();
    } 
}