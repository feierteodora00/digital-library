<?php
/**
 * A controller for deleting a student event
 *
 * Handles the data before it is used
 * to delete a student event from the database based on the
 * returned id. Returns appropriate responses.
 *
 * @author Jake Ellerington
 */
class ApiRemoveStudentEventController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveStudentEventGateway();
    }

    protected function processRequest() {
        $student_event_id = $this->getRequest()->getParameter("student_event_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if ($student_event_id !== null){
                $this->getGateway()->removeStudentEvent($student_event_id);
            } else {
                $this->getResponse()->setMessage("error");
                $this->getResponse()->setStatusCode(400);
            }
        } else {

            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();

    }

}