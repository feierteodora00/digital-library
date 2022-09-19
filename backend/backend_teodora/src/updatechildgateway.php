<?php

/**
 * UpdateChild gateway
 * 
 * @author Teodora Feier w19006590
 */

class UpdateChildGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function updateChild($id, $first_name, $last_name, $dob, $class, $parent_id) {
        $sql = "UPDATE child SET first_name = :first_name, last_name = :last_name, dob = :dob, class = :class, parent_id = :parent_id  WHERE id = :id";
        $params = [':id' => $id, ':first_name' => $first_name, ':last_name' => $last_name, ':dob' => $dob, ':class' => $class, ':parent_id' => $parent_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}