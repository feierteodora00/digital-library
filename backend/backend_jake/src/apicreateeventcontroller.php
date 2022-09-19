<?php
/**
 * A controller for creating an event
 *
 * Handles and sanitises the data before it is
 * entered into the database. Ensures that none
 * of the values are null and returns appropriate
 * responses
 *
 * @author Jake Ellerington
 */
class ApiCreateEventController extends Controller {

    protected function setGateway() {
        $this->gateway = new CreateEventGateway();
    }

    protected function processRequest(){


        $language = $this->getRequest()->getParameter("language");
        $event_name = $this->getRequest()->getParameter("event_name");
        $event_description =$this->getRequest()->getParameter("event_description");
        $event_date = $this->getRequest()->getParameter("event_date");
        $event_time = $this->getRequest()->getParameter("event_time");

        $language =  html_entity_decode($language);
        $event_name =  html_entity_decode($event_name);
        $event_description =  html_entity_decode($event_description);
        $event_date =  html_entity_decode($event_date);
        $event_time =  html_entity_decode($event_time);

        $language = trim($language);
        $event_name = trim($event_name);
        $event_description = trim($event_description);
        $event_date = trim($event_date);
        $event_time = trim($event_time);


        if($this->getRequest()->getRequestMethod() === "POST"){
            if($language !== null && $event_name !== null && $event_description !== null  && $event_date  !== null && $event_time !== null){
                $event_description = trim($event_description);
                $this->getGateway()->registerEvent($language, $event_name, $event_description, $event_date, $event_time);
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

