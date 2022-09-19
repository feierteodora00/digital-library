<?php
/**
 * A gateway for removing registered users from the database.
 *
 * Connects to the database before deleting
 * the values in the database based on the sql
 * statement.
 *
 * @author Jake Ellerington
 */
class RemoveUserGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeUser($user_id) {
        $sql = "DELETE FROM registered WHERE user_id = :user_id";
        $params = [":user_id" => $user_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

}