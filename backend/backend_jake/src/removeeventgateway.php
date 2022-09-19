<?php
/**
 * A gateway for removing events from the database.
 *
 * Connects to the database before deleting
 * the values in the database based on the sql
 * statement.
 *
 * @author Jake Ellerington
 */
class RemoveEventGateway extends Gateway {

    public function __construct() {
        $this->setDatabase(DATABASE, USERNAME, PASSWORD);
    }

    public function removeEvent($event_id) {
        $sql = "DELETE FROM events WHERE event_id = :event_id";
        $params = [":event_id" => $event_id];
        $result = $this->getDatabase()->executeSQL($sql, $params);
    }

}