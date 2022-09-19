<?php
/**
 * A controller for returning student events
 *
 * Handles and  the data before it is
 * returned from the database. Allows for the execution
 * of different return statements to return a variety
 * of processed requests.
 *
 * @author Jake Ellerington
 */
class ApiStudentEventsController extends Controller {

    protected function setGateway() {
        $this->gateway = new StudentEventsGateway();

    }

    protected function processRequest() {

        $class = $this->getRequest()->getParameter("class");

        if ($this->getRequest()->getRequestMethod() === "GET") {

            if (!is_null($class)) {
                $this->getGateway()->findClass($class);
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