<?php

class RemoveGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function deleteTeacher($id) {
        $sql = "DELETE FROM teachers WHERE id = :id";
        $params = [":id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function deleteParent($id) {
        $sql = "DELETE FROM parents WHERE id = :id";
        $params = [":id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function deleteChild($id) {
        $sql = "DELETE FROM children WHERE id = :id";
        $params = [":id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

}