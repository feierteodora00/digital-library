<?php

/**
 * AddChild gateway
 * 
 * @author Teodora Feier w19006590
 */

class AddTeacherGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertTeacher($first_name, $last_name, $class) {
        $sql = "INSERT INTO teacher(first_name, last_name, class) VALUES (:firstName, :lastName, :class)";
        $params = [':firstName' => $first_name, ':lastName' => $last_name, ':class' => $class];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}