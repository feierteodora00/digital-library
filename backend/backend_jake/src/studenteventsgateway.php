<?php
/**
 * A gateway for returning student events from the database.
 *
 * Connects to the database before returning
 * the values from the database based on the sql
 * statement with variable functions.
 *
 * @author Jake Ellerington
 */
class StudentEventsGateway extends Gateway
{

    private $sql = "SELECT student_event_id, event_name, event_description, event_date, event_time, student_events.class, consent FROM student_events";

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

    public function findClass($class)
    {
        $this->sql .= " WHERE student_events.class = :class";
        $params = ["class" => $class];
        $this->params($params);
    }


}