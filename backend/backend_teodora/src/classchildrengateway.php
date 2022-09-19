<?php

class ClassChildrenGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function findChildren($first_name, $last_name) {
        $sql = "SELECT children.id, children.first_name, children.last_name, children.dob FROM children 
                JOIN teachers ON children.class = teachers.class
                WHERE teachers.first_name = :first_name AND teachers.last_name = :last_name";
        $params = [":first_name" => $first_name, ":last_name" => $last_name];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}