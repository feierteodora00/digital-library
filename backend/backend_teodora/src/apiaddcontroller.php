<?php

class ApiAddController extends Controller {

    protected function setGateway() {
        $this->gateway = new AddGateway();
    }

    protected function processRequest() {
        $type = $this->getRequest()->getParameter("type");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!strcmp($type, "teachers")){
                $first_name = $this->getRequest()->getParameter("first_name");
                $last_name = $this->getRequest()->getParameter("last_name");
                $class = $this->getRequest()->getParameter("class");
                $this->getGateway()->insertTeacher($first_name, $last_name, $class);
            }
            else if (!strcmp($type, "parents")){
                $first_name = $this->getRequest()->getParameter("first_name");
                $last_name = $this->getRequest()->getParameter("last_name");
                $email = $this->getRequest()->getParameter("email");
                $phone_number = $this->getRequest()->getParameter("phone_number");
                $this->getGateway()->insertParent($first_name, $last_name, $email, $phone_number);
            }
            else if (!strcmp($type, "children")){
                $first_name = $this->getRequest()->getParameter("first_name");
                $last_name = $this->getRequest()->getParameter("last_name");
                $dob = $this->getRequest()->getParameter("dob");
                $class = $this->getRequest()->getParameter("class");
                $parent_id = $this->getRequest()->getParameter("parent_id");
                $this->getGateway()->insertChild($first_name, $last_name, $dob, $class, $parent_id);
            } 
            else if (!strcmp($type, "admin")){
                $first_name = $this->getRequest()->getParameter("first_name");
                $last_name = $this->getRequest()->getParameter("last_name");
                $email = $this->getRequest()->getParameter("email");
                $password = $this->getRequest()->getParameter("password");
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $this->getGateway()->insertAdmin($first_name, $last_name, $email, $password);
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