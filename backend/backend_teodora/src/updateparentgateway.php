<?php

/**
 * UpdateChild gateway
 * 
 * @author Teodora Feier w19006590
 */

class UpdateParentGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function updateParent($id, $first_name, $last_name, $email, $phone_number) {
        $sql = "UPDATE parent SET first_name = :first_name, last_name = :last_name, email = :email, phone_number = :phone_number  WHERE id = :id";
        $params = [':id' => $id, ':first_name' => $first_name, ':last_name' => $last_name, ':email' => $email, ':phone_number' => $phone_number];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}