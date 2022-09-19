<?php
/**
 * Base gateway for all gateways
 *
 * Handles gateway functions throughout
 * all gateways with both getters and
 * settters
 *
 * @author Jake Ellerington
 */
abstract class Gateway {

    private $database;
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