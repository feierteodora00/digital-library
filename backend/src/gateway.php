<?php

/**
 * 
 * Gateway Class
 * 
 * Used to set and access the database, as well as the result
 * 
 * @author Teodora Feier w19006590
 * 
 */

abstract class Gateway {

    private $database;
    private $username;
    private $password;
    private $result;

    protected function setDatabase($database, $username, $password) {
        $this->database = new Database($database, $username, $password);
    }

    protected function getDatabase() {
        return $this->database;
    }

    protected function setResult($result) {
        $this->result = $result;
    }

    public function getResult() {
        return $this->result;
    }
}