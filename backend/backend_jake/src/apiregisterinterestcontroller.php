<?php
/**
 * A controller for creating a user with a registered interest
 *
 * Handles and sanitises the data before it is
 * entered into the database. Ensures that none
 * of the values are null and returns appropriate
 * responses
 *
 * @author Jake Ellerington
 */
class ApiRegisterInterestController extends Controller {

    protected function setGateway() {
        $this->gateway = new RegisterInterestGateway();
    }

    protected function processRequest()
    {

        $first_name = $this->getRequest()->getParameter("first_name");
        $last_name = $this->getRequest()->getParameter("last_name");
        $child_age = $this->getRequest()->getParameter("child_age");
        $phone_number = $this->getRequest()->getParameter("phone_number");
        $email = $this->getRequest()->getParameter("email");
        $language = $this->getRequest()->getParameter("language");

        $first_name =  html_entity_decode($first_name);
        $last_name =  html_entity_decode($last_name);
        $child_age =  html_entity_decode($child_age);
        $phone_number =  html_entity_decode($phone_number);
        $email =  html_entity_decode($email);
        $language =  html_entity_decode($language);

        $first_name = trim($first_name);
        $last_name = trim($last_name);
        $child_age = trim($child_age);
        $phone_number = trim($phone_number);
        $email = trim($email);
        $language = trim($language);

        if($this->getRequest()->getRequestMethod() === "POST"){

            if($first_name !== null && $last_name !== null && $child_age !== null && $phone_number !== null && $email !== null && $language !== null){
                $this->getGateway()->registerInterest($first_name, $last_name, $child_age, $phone_number, $email, $language);
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
