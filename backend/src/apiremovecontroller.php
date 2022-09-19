<?php

class ApiRemoveController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveGateway();
    }

    protected function processRequest() {
        $id = $this->getRequest()->getParameter("id");
        $type = $this->getRequest()->getParameter("type");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!strcmp($type, "teachers")){
                $this->getGateway()->deleteTeacher($id);
            }
            else if (!strcmp($type, "parents")){
                $this->getGateway()->deleteParent($id);
            }
            else if (!strcmp($type, "children")){
                $this->getGateway()->deleteChild($id);
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