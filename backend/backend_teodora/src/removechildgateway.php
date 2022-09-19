<?php

/**
 * RemoveParent gateway
 * 
 * @author Teodora Feier w19006590
 */

class RemoveChildGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeChild($id) {
        $sql = "DELETE FROM child WHERE id = :id";
        $params = [':id' => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}