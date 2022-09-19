<?php

include 'config/autoloader.php';
spl_autoload_register("autoloader");

include 'config/errorhandler.php';
set_error_handler("errorHandler");

include 'config/htmlexceptionhandler.php';

include 'config/jsonexceptionhandler.php';
set_exception_handler("JSONexceptionHandler");

define('BASEPATH', '/kv6002/coursework/part1/');
define('DATABASE', 'unn_w18012419');
define('USERNAME', 'unn_w18012419');
define('PASSWORD', '');
define('DEVELOPMENT_MODE', true);

ini_set('display_errors', DEVELOPMENT_MODE);
ini_set('display_startup_errors', DEVELOPMENT_MODE);



