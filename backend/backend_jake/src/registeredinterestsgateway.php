<?php
/**
 * A gateway for returning registered interests from the database.
 *
 * Connects to the database before returning
 * the values from the database based on the sql
 * statement with variable functions.
 *
 * @author Jake Ellerington
 */
class RegisteredInterestsGateway extends Gateway {

    private $sql = "SELECT registered.user_id, first_name, last_name, child_age, phone_number, email, language FROM registered";

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    private function params($parameters = []){
        $result = $this->getDatabase()->executeSQL($this->sql, $parameters);
        $this->setResult($result);
    }

    public function findAll()
    {
        $this->params();
    }

    public function findOne($id)
    {
        $this->sql .= " WHERE registered.user_id = :id";
        $params = ["id" => $id];
        $this->params($params);
    }

    public function findLanguage($language) {
        $this->sql .= " WHERE language = :language";
        $params = ["language" => $language];
        $this->params($params);
    }

    public function findAllLanguages() {
        $this->sql .= " WHERE language IS NOT NULL";
        $this->params();
    }

    public function findAge($age) {
        $this->sql .= " WHERE child_age = :age";
        $params = ["age" => $age];
        $this->params($params);
    }

    public function findAllAges() {
        $this->sql .= " WHERE child_age IS NOT NULL";
        $this->params();
    }






}