<?php
/**
 * A controller for removing a registered user
 *
 * Handles the data before it is used
 * to delete a user from the database based on the
 * returned id. Returns appropriate responses.
 *
 * @author Jake Ellerington
 */
class ApiRemoveUserController extends Controller {

    protected function setGateway() {
        $this->gateway = new RemoveUserGateway();
    }

    protected function processRequest() {
        $user_id = $this->getRequest()->getParameter("user_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if ($user_id !== null){
                $this->getGateway()->removeUser($user_id);
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
