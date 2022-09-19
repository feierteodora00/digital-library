<?php

/**
 * Configuration File
 * 
 * Sets the exception and error handlers, and autoloader. Defines constants. 
 * 
 * @author Teodora Feier w19006590
 */

include 'config/exceptionhandler.php';
set_exception_handler('exceptionHandlerJSON');

include 'config/errorhandler.php';
set_error_handler('errorHandler');

include 'config/autoloader.php';
spl_autoload_register("autoloader");

define('BASEPATH', '/year3/tpap/backend/');
define('DATABASE', 'unn_w18002348');
define('USERNAME', 'unn_w18002348');
define('PASSWORD', 'RDM4QZGZ');
define('SECRET_KEY', 'HV51EZWtmV');
define('DEVELOPMENT_MODE', TRUE);

ini_set('display_errors', DEVELOPMENT_MODE);
ini_set('display_startup_errors', DEVELOPMENT_MODE);
