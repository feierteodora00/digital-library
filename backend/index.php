<?php

/**
 * Index page
 * 
 * Acts as a router based on the path after /. No extension required (.php)
 * APIs only
 * 
 * @author Teodora Feier
 */

 include "config/config.php";

 $request = new Request();
 $response = new JSONResponse();

 switch ($request->getPath()) {
    case 'authenticate':
        $controller = new ApiAuthenticateController($request, $response);
        break;
    case 'register':
        $controller = new ApiRegisterController($request, $response);
        break; 
    case 'profile':
        $controller = new ApiUserDetailsController($request, $response);
        break;
    case 'passwordrecovery':
        $controller = new ApiRecoverPasswordController($request, $response);
        break;
    case 'updateuser':
        $controller = new ApiUpdateUserController($request, $response);
        break;
    case 'deleteaccount':
        $controller = new ApiDeleteAccountController($request, $response);
        break;
    case 'classchildren':
        $controller = new ApiClassChildrenController($request, $response);
        break;
    case 'parentchildren':
        $controller = new ApiParentChildrenController($request, $response);
        break;
    case 'unapprovedusers':
        $controller = new ApiUnapprovedUsersController($request, $response);
        break;
    case 'approveregistration': 
        $controller = new ApiApproveRegistrationController($request, $response);
        break;
    case 'rejectregistration':
        $controller = new ApiRejectRegistrationController($request, $response);
        break; 
    case 'addchild':
        $controller = new ApiAddChildController($request, $response);
        break; 
    case 'addparent':
        $controller = new ApiAddParentController($request, $response);
        break;
    case 'addteacher':
        $controller = new ApiAddTeacherController($request, $response);
        break;
    case 'removechild' :
        $controller = new ApiRemoveChildController($request, $response);
        break;
    case 'removeteacher' :
        $controller = new ApiRemoveTeacherController($request, $response);
        break;
    case 'removeparent' :
        $controller = new ApiRemoveParentController($request, $response);
        break;
    case 'updateparent' :
        $controller = new ApiUpdateParentController($request, $response);
        break;
    case 'updatechild' :
        $controller = new ApiUpdateChildController($request, $response);
        break;
    case 'updateteacher' :
        $controller = new ApiUpdateTeacherController($request, $response);
        break;
    case 'view':
        $controller = new ApiViewController($request, $response);
        break;
    case 'remove':
        $controller = new ApiRemoveController($request, $response);
        break;
    case 'add': 
        $controller = new ApiAddController($request, $response);
        break;
    }

 echo $response->getData();