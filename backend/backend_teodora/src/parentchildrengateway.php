<?php

class ParentChildrenGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function findChildren($first_name, $last_name) {
        $sql = "SELECT children.id, children.first_name, children.last_name, classes.name, classes.id AS cls_id FROM children
                JOIN parents ON parents.id = children.parent_id
                JOIN classes ON classes.id = children.class
                WHERE parents.first_name = :first_name AND parents.last_name = :last_name";
        $params = [":first_name" => $first_name, ":last_name" => $last_name];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}