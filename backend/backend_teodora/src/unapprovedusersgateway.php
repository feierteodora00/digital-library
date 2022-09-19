<?php

/**
 * Register gateway
 * 
 * Handles the interaction with database for the registration of new users
 * 
 * @method insertUser - inserts credentials of a newly registrated user into the database
 * @method userExists - checks if the provided email already exists in the database
 * 
 * @author Teodora Feier w19006590
 */

class UnapprovedUsersGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function listUsers() {
        $sql = "SELECT * FROM users WHERE approved = 0";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }
}