<?php
/**
 * A controller for returning the registered interest users
 *
 * Handles and sanitises the data before it is
 * returned from the database. Allows for the execution
 * of different return statements to return a variety
 * of processed requests.
 *
 * @author Jake Ellerington
 */
class ApiRegisteredInterestsController extends Controller {

    protected function setGateway() {
        $this->gateway = new RegisteredInterestsGateway();

    }

    protected function processRequest() {

        $id = $this->getRequest()->getParameter("id");
        $language = $this->getRequest()->getParameter("language");
        $age = $this->getRequest()->getParameter("age");

        if ($this->getRequest()->getRequestMethod() === "GET") {

            if (!is_null($id)) {
                $this->getGateway()->findOne($id);
            } elseif (!is_null($language)) {
                if($language === "all") {
                    $this->getGateway()->findAllLanguages();
                } else {
                    $this->getGateway()->findLanguage($language);
                }
            } elseif (!is_null($age)) {
                if($age === "all") {
                    $this->getGateway()->findAllAges();
                } else {
                    $this->getGateway()->findAge($age);
                }
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