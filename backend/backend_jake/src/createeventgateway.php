<?php
/**
 * A gateway for creating an event
 *
 * Connects to the database before inserting
 * the values into the database based on the sql
 * statement
 *
 * @author Jake Ellerington
 */
class CreateEventGateway extends Gateway  {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function registerEvent($language, $event_name, $event_description, $event_date, $event_time) {

        $sql = "INSERT INTO events (language, event_name, event_description, event_date, event_time) VALUES (:language, :event_name, :event_description, :event_date, :event_time)";
        $params = [':language' =>$language, ':event_name' => $event_name, ':event_description' => $event_description, ':event_date' => $event_date, ':event_time' => $event_time ];
        $result = $this->getDatabase()->executeSQL($sql, $params);

    }

}
