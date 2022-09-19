<?php
/**
 * A gateway for creating a student events
 *
 * Connects to the database before inserting
 * the values into the database based on the sql
 * statement
 *
 * @author Jake Ellerington
 */
class CreateStudentEventGateway extends Gateway  {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function createStudentEvent($event_name, $event_description, $event_date, $event_time, $class, $consent) {

        $sql = "INSERT INTO student_events (event_name, event_description, event_date, event_time, class, consent) VALUES (:event_name, :event_description, :event_date, :event_time, :class, :consent)";
        $params = [':event_name' => $event_name, ':event_description' => $event_description, ':event_date' => $event_date, ':event_time' => $event_time, ':class' => $class, ':consent' => $consent];
        $result = $this->getDatabase()->executeSQL($sql, $params);

    }

}
