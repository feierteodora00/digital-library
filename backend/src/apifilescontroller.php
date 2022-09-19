<?php

/**
 * Update user details endpoint
 * 
 * @author Aida Campean w18002348
 */

class ApiFilesController extends Controller {

    protected function setGateway() {
        $this->gateway = new FilesGateway();
    }

    protected function processRequest()
    {
        $action = $this->getRequest()->getParameter("action");

        file_put_contents('./logFile.txt', 'ACTION: ' . $this->getRequest()->getParameter("action") . PHP_EOL, FILE_APPEND);
        // file_put_contents('./logFile.txt', 'Folder: ' . $this->getRequest()->getParameter("folder_id") . PHP_EOL, FILE_APPEND);
        
        
        if ($action == 'add') {
            $this->addFile();
            return $this->getGateway()->getResult();
        } elseif ($action == 'retrieveFiles') {
            $this->retrieveFiles();
            return $this->getGateway()->getResult();
        } elseif ($action == 'delete') {
            $this->delete();
            return $this->getGateway()->getResult();
        } elseif ($action == 'download') {
            $this->downloadFile();
        } 
        // elseif ($action == 'retrieveByModuleAndName') {
        //     $this->retrieveFoldersByNameAndModule();
        // } elseif ($action == 'delete') {
        //     $this->deleteFolder();
        // }

        
    }

    private function addFile()
    {
        if ($_FILES['file']) {
            $filename = $_FILES['file']['name'];
            $fileTmp = $_FILES['file']['tmp_name'];
            $fileType = $_FILES['file']['type'];
            $fileSize = $_FILES['file']['size'];

            $fileDestination = '/home/unn_w18002348/public_html/3/tpap/backend/uploads/';
            
            $file = $fileDestination . $filename;
            move_uploaded_file($fileTmp, $file);
        
            $data = [
                'filename' => $filename,
                'folder_id' => $this->getRequest()->getParameter("folder_id"),
                'module_id' => $this->getRequest()->getParameter("module_id")
            ];

            $this->getGateway()->insertFile($data);
        }
    }

    private function retrieveFiles()
    {
        $folderId = (int) $this->getRequest()->getParameter("folder_id");
        $this->getGateway()->retrieveFiles($folderId);
    }

    private function delete()
    {
        $fileId = (int) $this->getRequest()->getParameter("id");
        $this->getGateway()->delete($fileId);
    }

    private function downloadFile()
    {
        $fileId = $this->getRequest()->getParameter("id");
        $downloadPath = '/home/unn_w18002348/public_html/3/tpap/backend/uploads/';
        $file = $this->getGateway()->getFileById($fileId);

        if ($file) {
            $filePath = $downloadPath . $file[0]['filename'];
            if(file_exists($filePath)) {
                header('Content-Description: File Transfer');
                header('Content-Type: application/octet-stream');
                header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
                header('Expires: 0');
                header('Cache-Control: must-revalidate');
                header('Pragma: public');
                header('Content-Length: ' . filesize($filePath));
                flush(); // Flush system output buffer
                readfile($filePath);
                unset($file);
                exit();
            }
        }
    }
}
