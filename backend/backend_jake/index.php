<?php
/**
 * Allows all the controllers to be used to
 * process the different sql statements
 *
 * @author Jake Ellerington
 */
include "config/config.php";

$request = new Request();

if (substr($request->getPath(),0,3) === "api") {
    $response = new JSONResponse();
} else {
    set_exception_handler("HTMLexceptionHandler");
    $response = new HTMLResponse();
}

switch ($request->getPath()) {
    case '':
    case 'api':
        $controller = new ApiBaseController($request, $response);
        break;
    case 'api/registeredinterests':
        $controller = new APIRegisteredInterestsController($request, $response);
        break;
    case 'api/registerinterest':
        $controller = new ApiRegisterInterestController($request, $response);
        break;
    case 'api/language':
        $controller = new ApiLanguageController($request, $response);
        break;

    case 'api/event':
        $controller = new ApiCreateEventController($request, $response);
        break;

    case 'api/events':
        $controller = new ApiEventsController($request, $response);
        break;

    case 'api/title':
        $controller = new ApiTitleController($request, $response);
        break;

    case 'api/studentevent':
        $controller = new ApiCreateStudentEventController($request, $response);
        break;

    case 'api/studentevents':
        $controller = new ApiStudentEventsController($request, $response);
        break;

    case 'api/removeuser':
        $controller = new ApiRemoveUserController($request, $response);
        break;

    case 'api/removeevent':
        $controller = new ApiRemoveEventController($request, $response);
        break;

    case 'api/removestudentevent':
        $controller = new ApiRemoveStudentEventController($request, $response);
        break;


    default:
        if (substr($request->getPath(),0,3) === "api") {
            $controller = new ApiErrorController($request, $response);
        } else {
            $controller = new ErrorController($request, $response);
        }
        break;
}



echo $response->getData();