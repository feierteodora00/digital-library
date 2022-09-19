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

class RemoveFromPendingGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function deleteUserRequest($email) {
        $sql = "DELETE FROM tpap_pending_user WHERE email = :email";
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function userExists($email) {
        $sql = "SELECT * FROM tpap_pending_user WHERE email = :email";
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }

}