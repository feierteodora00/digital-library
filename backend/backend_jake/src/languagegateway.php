<?php
/**
 * A gateway for returning contact information from the database.
 *
 * Connects to the database before returning
 * the values from the database based on the sql
 * statement with variable functions.
 *
 * @author Jake Ellerington
 */
class LanguageGateway extends Gateway
{

    private $sql = "SELECT language.language, phone_number, email, address FROM language";

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    private function params($parameters = [])
    {
        $result = $this->getDatabase()->executeSQL($this->sql, $parameters);
        $this->setResult($result);
    }

    public function findAll()
    {
        $this->params();
    }

    public function findLanguage($language)
    {
        $this->sql .= " WHERE language.language = :language";
        $params = ["language" => $language];
        $this->params($params);
    }


}

