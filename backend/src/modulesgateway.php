<?php

/**
 * Gateway to the modules table
 * 
 * @author Aida Campean - w18002348
 */

class ModulesGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertModules(array $data)
    {
        $sql = "INSERT INTO `modules` (`class_id`, `name`) VALUES (:classId, :name)";
        $params = [
            ':classId' => $data['class_id'],
            ":name" => $data['name']
        ];

        return $this->getDatabase()->executeInsertSQL($sql, $params);
    }

    public function retrieveModules()
    {
        $sql = "SELECT * FROM `modules`";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function retrieveByClassId($classId)
    {
        $sql = "SELECT * FROM `modules` WHERE `class_id` = :classId";
        $params = [
            ":classId" => $classId
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);

        $this->setResult($result);
    }

    public function retrieveModulesByName($name)
    {
        $sql = "SELECT * FROM `modules` WHERE `name` = :name";
        $params = [
            ":name" => $name
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function delete($name)
    {
        $sql = "DELETE FROM `modules` WHERE `name` = :name";
        $params = [
            ":name" => $name
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
