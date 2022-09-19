<?php

/**
 * AddChild gateway
 * 
 * @author Teodora Feier w19006590
 */

class AddChildGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertChild($first_name, $last_name, $dob, $class, $parent_id) {
        $sql = "INSERT INTO child(first_name, last_name, dob, class, parent_id) VALUES (:firstName, :lastName, :dob, :class, :parent_id)";
        $params = [':firstName' => $first_name, ':lastName' => $last_name, ':dob' => $dob, ':class' => $class, ':parent_id' => $parent_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}