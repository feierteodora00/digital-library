<?php

class AddGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function insertTeacher($first_name, $last_name, $class) {
        $sql = "INSERT INTO teachers(first_name, last_name, class) VALUES (:first_name, :last_name, :class)";
        $params = [":first_name" => $first_name, ":last_name" => $last_name, ":class" => $class];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function insertParent($first_name, $last_name, $email, $phone_number) {
        $sql = "INSERT INTO parents(first_name, last_name, email, phone_number) VALUES (:first_name, :last_name, :email, :phone_number)";
        $params = [":first_name" => $first_name, ":last_name" => $last_name, ":email" => $email, ":phone_number" => $phone_number];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function insertChild($first_name, $last_name, $dob, $class, $parent_id) {
        $sql = "INSERT INTO children(first_name, last_name, dob, class, parent_id) VALUES (:first_name, :last_name, :dob, :class, :parent_id)";
        $params = [":first_name" => $first_name, ":last_name" => $last_name, ":dob" => $dob, ":class" => $class, ":parent_id" => $parent_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

    public function insertAdmin($first_name, $last_name, $email, $hashed_passoword) {
        $sql = "INSERT INTO users(first_name, last_name, email, hashed_password, role, approved) VALUES (:first_name, :last_name, :email, :hashed_password, 'admin', 1)";
        $params = [":first_name" => $first_name, ":last_name" => $last_name, ":email" => $email, ":hashed_password" => $hashed_passoword];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

}