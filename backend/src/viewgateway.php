<?php

class ViewGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function viewUsers() {
        $sql = "SELECT * FROM users";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function viewTeachers() {
        $sql = "SELECT * FROM teachers ORDER BY first_name, last_name";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function viewParents() {
        $sql = "SELECT * FROM parents ORDER BY first_name, last_name";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    public function viewChildren() {
        $sql = "SELECT * FROM children ORDER BY first_name, last_name";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

}