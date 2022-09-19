<?php
/**
 * A controller for deleting an event
 *
 * Handles the data before it is used
 * to delete an event from the database based on the
 * returned id. Returns appropriate responses.
 *
 * @author Jake Ellerington
 */
class ApiRemoveEventController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveEventGateway();
    }

    protected function processRequest() {
        $event_id = $this->getRequest()->getParameter("event_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if ($event_id !== null){
                $this->getGateway()->removeEvent($event_id);
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

