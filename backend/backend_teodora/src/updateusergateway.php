<?php

/**
 * Update user gateway
 * 
 * @author Teodora Feier w19006590
 */

class UpdateUserGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function updateUser($id, $password, $phone_number) {
        $sql = "UPDATE users SET hashed_password = :hashed_password, phone_number = :phone_number WHERE id = :id";
        $params = [":hashed_password" => $password, ':phone_number' => $phone_number, ':id' => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function updatePhoneNumber($id, $phone_number) {
        $sql = "UPDATE users SET phone_number = :phone_number WHERE id = :id";
        $params = [':phone_number' => $phone_number, ':id' => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function userExists($id) {
        $sql = "SELECT * FROM users WHERE id = :id";
        $params = [":id" => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }

}