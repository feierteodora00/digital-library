<?php

/**
 * Gateway to the classes table
 * 
 * @author Aida Campean - w18002348
 */

class ClassesGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function retrieveClasses()
    {
        $sql = "SELECT * FROM `classes`";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function retrieveClassByName($name)
    {
        $sql = "SELECT * FROM `classes` WHERE `name` = :name";
        $params = [
            ":name" => $name
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
