<?php

/**
 * Error Handler
 * 
 * @param errno - error number
 * @param errstr - error string
 * @param errfile - error file
 * @param errline - error line
 * 
 * @author Teodora Feier w19006590
 */

function errorHandler($errno, $errstr, $errfile, $errline) {

    if (DEVELOPMENT_MODE || ($errno !=2 && $errno != 8)) {
        throw new Exception ("Error detected: [$errno] $errstr file: $errfile line: $errline");
    } 
}