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

class RegisterGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertUser($email, $password, $first_name, $last_name, $phone_number, $role) {
        $sql = "INSERT INTO users(email, hashed_password, first_name, last_name, phone_number, role, approved) VALUES (:email, :hashedpassword, :firstName, :lastName, :phoneNumber, :role, :approved)";
        $params = [":email" => $email, ":hashedpassword" => $password, ':firstName' => $first_name, ':lastName' => $last_name, ':phoneNumber' => $phone_number, ':role' => $role, ':approved' => 0];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function userExists($email) {
        $sql = "SELECT * FROM users WHERE email = :email";
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }

}