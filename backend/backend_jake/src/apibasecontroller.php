<?php
/**
 * A base api to check if a connection is made
 *
 * Information displaying information about the author
 * and the subsystem purpose
 *
 * @author Jake Ellerington
 */
class ApiBaseController extends Controller {

    protected function processRequest() {
        $data['author']['name'] = "Team 27";
        $data['message'] = "This is a Web API for the Northumbria University module Team Project and Professionalism.";

        return $data;
    }
}