<?php

/**
 * Gateway to the files table
 * Aida Campean - w18002348
 */

class FilesGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertFile(array $data)
    {
        $sql = "INSERT INTO `files` (`filename`, `folder_id`, `module_id`) VALUES (:filename, :folderId, :moduleId)";
        $params = [
            ':filename' => $data['filename'],
            ':folderId' => $data['folder_id'],
            ':moduleId' => $data['module_id']
        ];

        if ($this->getDatabase()->executeInsertSQL($sql, $params)) {
            $this->retrieveFiles($data['folder_id']);
        } else {
            $this->setResult(FALSE);
        }
    }

    public function retrieveFiles($id)
    {
        $sql = "SELECT * FROM `files` WHERE `folder_id` = :folderId";
        $params = [
            ':folderId' => $id
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function delete($id)
    {
        $sql = "DELETE FROM `files` WHERE `id` = :fileId";
        $params = [
            ':fileId' => $id
        ];

        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
        
    }
    
    public function getFileById($id)
    {
        $sql = "SELECT `filename` FROM `files` WHERE `id` = :fileId";
        $params = [
            ':fileId' => $id
        ];

        return $this->getDatabase()->executeSQL($sql, $params);
    }
}
