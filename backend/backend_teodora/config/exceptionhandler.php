<?php

/**
 * Exception Handlers
 * 
 * Functions which provide response in case of exception
 * 
 * @method exceptionHandlerHTML - HTML output about the exception
 * @method exceptionHandlerJSON - JSON output about the exception
 * 
 * @param e - the exception
 * 
 * @author Teodora Feier w19006590
 */

function exceptionHandlerHTML($e){
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: text/html; charset=UTF-8");
    if (DEVELOPMENT_MODE){
        echo "<p>Message: " . $e->getMessage() . "</p>";
        echo "<p>File: " . $e->getFile() . "</p>";
        echo "<p>Line: " . $e->getLine() . "</p>";
    } else {
        echo "<p>Internal server error (status code 500) </p>";
    }
}

function exceptionHandlerJSON($e){
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST");
    if (DEVELOPMENT_MODE){
        $errorArr['message'] = $e->getMessage();
        $errorArr['file'] = $e->getFile();
        $errorArr['line'] = $e->getLine();
        echo json_encode($errorArr);
    } else {
        $message['message'] = 'Internal server error (status code 500)';
        echo json_encode($message);
    }
}