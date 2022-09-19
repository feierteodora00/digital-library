<?php

/**
 * Gateway to the folders table
 * 
 * @author Aida Campean - w18002348
 */

class FoldersGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertFolder(array $data)
    {
        $sql = "INSERT INTO `folders` (`folder_name`, `module_id`) VALUES (:folderName, :moduleId)";
        $params = [
            ':folderName' => $data['folder_name'],
            ":moduleId" => $data['module_id']
        ];

        if($this->getDatabase()->executeInsertSQL($sql, $params)) {
            $this->retrieveFoldersByModuleId($data['module_id']);
        } else {
            $this->setResult(FALSE);
        }
    }

    public function retrieveFoldersByModuleId($moduleId)
    {
        $sql = "SELECT * FROM `folders` WHERE `module_id` = :moduleId";
        $params = [
            ":moduleId" => $moduleId
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);

        $this->setResult($result);
    }

    public function retrieveFoldersByNameAndModule($moduleId, $folderName)
    {
        $sql = "SELECT * FROM `folders` WHERE `module_id` = :moduleId AND `folder_name` = :folderName";
        $params = [
            ":moduleId" => $moduleId,
            ":folderName" => $folderName
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function deleteFolder($id, $moduleId)
    {
        $sql = "DELETE FROM `folders` WHERE `id` = :folderId";
        $params = [
            ":folderId" => $id
        ];

        if ($this->getDatabase()->executeDeleteSQL($sql, $params)) {
            $this->retrieveFoldersByModuleId($moduleId);
        } else {
            $this->setResult(FALSE);
        }
    }
}