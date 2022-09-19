<?php

/**
 * 
 * User Gateway
 * 
 * Handles the database interaction for the authentication task
 * 
 * @author Teodora Feier w19006590
 * 
 */

class UserGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function findDetails($email) {
        $sql = "SELECT id, hashed_password, first_name, last_name, role, approved FROM users WHERE email = :email";
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}