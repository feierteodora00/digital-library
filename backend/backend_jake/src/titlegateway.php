<?php
/**
 * A gateway for returning titles from the database.
 *
 * Connects to the database before returning
 * the values from the database based on the sql
 * statement with variable functions.
 *
 * @author Jake Ellerington
 */
class TitleGateway extends Gateway
{

    private $sql = "SELECT titles.language, mainTitle, title1, title2, title3 FROM titles";

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
        $this->sql .= " WHERE titles.language = :language";
        $params = ["language" => $language];
        $this->params($params);
    }


}
