<?php
/**
 * A controller for handling errors
 *
 * Handles errors for if the endpoint does not
 * exist and returns a link to return to the base
 * user api.
 *
 * @author Jake Ellerington
 */
class ApiErrorController extends Controller {

    protected function processRequest() {
        $data['message'] = "Endpoint not found";
        $data['base'] = "http://unn-w18012419.newnumyspace.co.uk/kv6002/coursework/part1/api/";

        return $data;
    }
}