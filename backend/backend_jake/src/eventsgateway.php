<?php
/**
 * A gateway for returning events from the database.
 *
 * Connects to the database before returning
 * the values from the database based on the sql
 * statement with variable functions.
 *
 * @author Jake Ellerington
 */
class EventsGateway extends Gateway
{

    private $sql = "SELECT event_id, events.language, event_name, event_description, event_date, event_time FROM events";

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
        $this->sql .= " WHERE events.language = :language";
        $params = ["language" => $language];
        $this->params($params);
    }


}