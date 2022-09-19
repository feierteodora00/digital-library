<?php

/**
 * Modules endpoint
 * 
 * @author Aida Campean w18002348
 */

class ApiModules extends Controller {

    protected function setGateway() {
        $this->gateway = new ModulesGateway();
    }

    protected function processRequest()
    {
        $action = $this->getRequest()->getParameter("action");
        //file_put_contents('./logFile.txt', 'ACTION: ' . $this->getRequest()->getParameter("action") . PHP_EOL, FILE_APPEND);
        //file_put_contents('./logFile.txt', 'NAME: ' . $this->getRequest()->getParameter("name") . PHP_EOL, FILE_APPEND);
        if ($action == 'add') {
            $this->addModule();
        } elseif ($action == 'retrieve') {
            $this->retrieveModules();
        } elseif ($action == 'retrieveByClassId') {
            $this->retrieveByClassId();
        } elseif ($action == 'retrieveByName') {
            $this->retrieveModulesByName();
        } elseif ($action == 'delete') {
            $this->delete();
        }

        return $this->getGateway()->getResult();
    }

    private function addModule()
    {
        $data = [
            'class_id' => $this->getRequest()->getParameter("class_id"),
            'name' => $this->getRequest()->getParameter("name")
        ];

        $this->getGateway()->insertModules($data);
    }

    private function retrieveModules()
    {
        $this->getGateway()->retrieveModules();
    }

    private function retrieveByClassId()
    {
        $this->getGateway()->retrieveByClassId($this->getRequest()->getParameter("class_id"));
    }

    private function retrieveModulesByName()
    {
        $name = $this->getRequest()->getParameter("name");
        $this->getGateway()->retrieveModulesByName($name);
    }

    private function delete()
    {
        $name = $this->getRequest()->getParameter("name");
        $this->getGateway()->delete($name);
    }
}