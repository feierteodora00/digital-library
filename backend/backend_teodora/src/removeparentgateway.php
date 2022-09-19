<?php

/**
 * RemoveParent gateway
 * 
 * @author Teodora Feier w19006590
 */

class RemoveParentGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeParent($id) {
        $sql = "DELETE FROM parent WHERE id = :id";
        $params = [':id' => $id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }
}