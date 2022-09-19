<?php

/**
 * AddParent gateway
 * 
 * @author Teodora Feier w19006590
 */

class AddParentGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertParent($first_name, $last_name, $email, $phone_number) {
        $sql = "INSERT INTO parent(first_name, last_name, email, phone_number) VALUES (:firstName, :lastName, :email, :phone_number)";
        $params = [':firstName' => $first_name, ':lastName' => $last_name, ':email' => $email, ':phone_number' => $phone_number];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}