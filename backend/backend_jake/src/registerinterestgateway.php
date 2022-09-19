<?php
/**
 * A gateway for inserting registered interests into the database.
 *
 * Connects to the database before inserting
 * the values into the database based on the sql
 * statement.
 *
 * @author Jake Ellerington
 */
class RegisterInterestGateway extends Gateway  {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function registerInterest($first_name, $last_name, $child_age, $phone_number, $email, $language) {

        $phone_number = !empty($phone_number) ? "$phone_number" : "-";
        $email = !empty($email) ? "$email" : "-";

        $sql = "INSERT INTO registered (first_name, last_name, child_age, phone_number, email, language) VALUES (:first_name, :last_name, :child_age, :phone_number, :email, :language)";
        $params = [':first_name' =>$first_name, ':last_name' => $last_name, ':child_age' => $child_age, ':phone_number' => $phone_number, ':email' => $email, ':language' => $language];
        $result = $this->getDatabase()->executeSQL($sql, $params);

    }


}