<?php

/**
 * Modules endpoint
 * 
 * @author Aida Campean w18002348
 */

class ApiClasses extends Controller {

    protected function setGateway() {
        $this->gateway = new ClassesGateway();
    }

    protected function processRequest()
    {
        $action = $this->getRequest()->getParameter("action");
        //file_put_contents('./logFile.txt', 'ACTION: ' . $this->getRequest()->getParameter("action") . PHP_EOL, FILE_APPEND);
        //file_put_contents('./logFile.txt', 'NAME: ' . $this->getRequest()->getParameter("name") . PHP_EOL, FILE_APPEND);

        if ($action == 'retrieve') {
            $this->retrieveClasses();
        } elseif ($action == 'retrieveByName') {
            $this->retrieveClassByName();
        }

        return $this->getGateway()->getResult();
    }

    // private function addClass()
    // {
    //     $data = [
    //         'name' => $this->getRequest()->getParameter("name")
    //     ];

    //     $this->getGateway()->insertClass($data);
    //     return $this->getGateway()->getResult();
    // }

    private function retrieveClasses()
    {
        $this->getGateway()->retrieveClasses();
    }

    private function retrieveClassByName()
    {

        $name = $this->getRequest()->getParameter("name");
        //file_put_contents('./logFile.txt', 'NAME: ' . $this->getRequest()->getParameter("name") . PHP_EOL, FILE_APPEND);

        $this->getGateway()->retrieveClassByName($name);
    }
}