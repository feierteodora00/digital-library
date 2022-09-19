<?php

/**
 * UpdateTeacher gateway
 * 
 * @author Teodora Feier w19006590
 */

class UpdateTeacherGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function updateTeacher($id, $first_name, $last_name, $class) {
        $sql = "UPDATE teacher SET first_name = :first_name, last_name = :last_name, class = :class  WHERE id = :id";
        $params = [':id' => $id, ':first_name' => $first_name, ':last_name' => $last_name, ':class' => $class];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}