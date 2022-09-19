<?php

/**
 * RemoveParent gateway
 * 
 * @author Teodora Feier w19006590
 */

class RemoveTeacherGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeTeacher($id) {
        $sql = "DELETE FROM teacher WHERE id = :id";
        $params = [':id' => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}