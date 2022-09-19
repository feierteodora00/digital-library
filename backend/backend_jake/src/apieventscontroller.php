<?php
/**
 * A controller for returning an event
 *
 * Handles and sanitises the data before it is
 * returned from the database. Allows for the execution
 * of different return statements to return a variety
 * of processed requests.
 *
 * @author Jake Ellerington
 */
class ApiEventsController extends Controller {

    protected function setGateway() {
        $this->gateway = new EventsGateway();
    }

    protected function processRequest() {

        $language = $this->getRequest()->getParameter("language");

        if ($this->getRequest()->getRequestMethod() === "GET") {

            if (!is_null($language)) {
                $this->getGateway()->findLanguage($language);
            }else {
                $this->getGateway()->findAll();
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }

        return $this->getGateway()->getResult();
    }
}