<?php

/**
 * Folders endpoint
 * 
 * @author Aida Campean w18002348
 */

class ApiFolders extends Controller {

    protected function setGateway() {
        $this->gateway = new FoldersGateway();
    }

    protected function processRequest()
    {
        $action = $this->getRequest()->getParameter("action");
       // file_put_contents('./logFile.txt', 'ACTION: ' . $this->getRequest()->getParameter("action") . PHP_EOL, FILE_APPEND);
        //file_put_contents('./logFile.txt', 'NAME: ' . $this->getRequest()->getParameter("name") . PHP_EOL, FILE_APPEND);
        if ($action == 'add') {
            $this->addFolder();
        } elseif ($action == 'retrieveByModules') {
            $this->retrieveFoldersByModuleId();
        } elseif ($action == 'retrieveByModuleAndName') {
            $this->retrieveFoldersByNameAndModule();
        } elseif ($action == 'delete') {
            $this->deleteFolder();
        }

        return $this->getGateway()->getResult();
    }

    private function addFolder()
    {
        $data = [
            'folder_name' => $this->getRequest()->getParameter("folder_name"),
            'module_id' => $this->getRequest()->getParameter("module_id")
        ];

        $this->getGateway()->insertFolder($data);
    }

    private function retrieveFoldersByModuleId()
    {
        $moduleId = $this->getRequest()->getParameter("module_id");

        $this->getGateway()->retrieveFoldersByModuleId($moduleId);
    }

    private function retrieveFoldersByNameAndModule()
    {
        $moduleId = $this->getRequest()->getParameter("module_id");
        $folderName = $this->getRequest()->getParameter("folder_name");

        $this->getGateway()->retrieveFoldersByNameAndModule($moduleId, $folderName);
    }

    private function deleteFolder()
    {
        $folderId = $this->getRequest()->getParameter("folder_id");
        $moduleId = $this->getRequest()->getParameter("module_id");

        $this->getGateway()->deleteFolder($folderId, $moduleId);
    }

}