<?php
/**
 * A controller for creating a student event
 *
 * Handles and sanitises the data before it is
 * entered into the database. Ensures that none
 * of the values are null and returns appropriate
 * responses
 *
 * @author Jake Ellerington
 */
class ApiCreateStudentEventController extends Controller {

    protected function setGateway() {
        $this->gateway = new CreateStudentEventGateway();
    }

    protected function processRequest(){

        $event_name = $this->getRequest()->getParameter("event_name");
        $event_description =$this->getRequest()->getParameter("event_description");
        $event_date = $this->getRequest()->getParameter("event_date");
        $event_time = $this->getRequest()->getParameter("event_time");
        $class = $this->getRequest()->getParameter("class");
        $consent = $this->getRequest()->getParameter("consent");

        $event_name =  html_entity_decode($event_name);
        $event_description =  html_entity_decode($event_description);
        $event_date =  html_entity_decode($event_date);
        $event_time =  html_entity_decode($event_time);
        $class =  html_entity_decode($class);
        $consent =  html_entity_decode($consent);

        $event_name = trim($event_name);
        $event_description = trim($event_description);
        $event_date = trim($event_date);
        $event_time = trim($event_time);
        $class = trim($class);
        $consent = trim($consent);



        if($this->getRequest()->getRequestMethod() === "POST"){
            if($event_name !== null){

                $this->getGateway()->createStudentEvent($event_name, $event_description, $event_date, $event_time, $class, $consent);
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