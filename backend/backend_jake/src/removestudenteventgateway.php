<?php
/**
 * A gateway for removing student events from the database.
 *
 * Connects to the database before deleting
 * the values in the database based on the sql
 * statement.
 *
 * @author Jake Ellerington
 */
class RemoveStudentEventGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeStudentEvent($student_event_id) {
        $sql = "DELETE FROM student_events WHERE student_event_id = :student_event_id";
        $params = [":student_event_id" => $student_event_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

}