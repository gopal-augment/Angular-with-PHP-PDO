<?php

    function login($parent){
        $username = $parent->_request["username"];
        $password = trim($parent->_request["password"]);
        $userRole = $parent->_request["userRole"];
       
        try{
            if($userRole == "admin"){
                $response = adminLogin($parent, $username, $password);
            }else if($userRole == "user"){
                $response = userLogin($parent, $username, $password);
            }else{
                $response = array('response'=>'failed', 'message' => 'User role is valid.');
            }
        }catch(PDOException $e){
            echo $e->getMessage();	
        }
        $parent->response($response, 200);
    }

    function adminLogin($parent, $username, $password){
        $str = "SELECT * FROM ".$parent->prefix."registeruser WHERE mr_emailid ='$username'";
        $query = $parent->db->query($str);
        $row = $query->rowCount();
        if($row != 0){
            $arr = $query->fetchAll(PDO::FETCH_OBJ);
            if($arr[0]->mr_status == $parent->active){
                $encryPass = $arr[0]-> mr_password;
                $decryPass = $parent->passwordDecrypt($encryPass);
                if($decryPass == $password){
                    session_start();
                    $obj = new stdClass();

                    $_SESSION["userid"] = $arr[0]->mr_id;
                    $_SESSION["firstname"] =$arr[0]->mr_firstname;
                    $_SESSION["lastname"] =$arr[0]->mr_lastname;
                    $_SESSION["username"] =$arr[0]->mr_emailid;
                    $_SESSION['access_token'] = $arr[0]->mr_password;
                    $_SESSION['userrole'] = 'admin';

                    $obj->firstname = $_SESSION["firstname"];
                    $obj->lastname = $_SESSION["lastname"];
                    $obj->username = $_SESSION["username"];
                    $obj->userid =  $_SESSION["userid"];
                    $obj->accesstoken = $_SESSION['access_token'];
                    $obj->roles = $_SESSION['userrole'];

//                    $parent->response(array('response'=>'success','items'=>$obj), 200);
                    return array('response'=>'success','items'=>$obj);
                }else{
//                    $parent->response(array('response'=>'failed', 'message' => 'Invalid password.'), 200);
                    return array('response'=>'failed', 'message' => 'Invalid password.');
                }
            }else{
//                $parent->response(array('response'=>'failed', 'message' => 'Your account is not in active.'), 200);
                return array('response'=>'failed', 'message' => 'Your account is not in active.');
            }
        }else{
//            $parent->response(array('response'=>'failed', 'message' => 'Such username not registered with us.'), 200);
            return array('response'=>'failed', 'message' => 'Such username not registered with us.');
        }
    }

    function userLogin($parent, $username, $password){
        $str = "SELECT * FROM ".$parent->prefix."users WHERE mu_emailid ='$username'";
        $query = $parent->db->query($str);
        $row = $query->rowCount();
        if($row != 0){
            $arr = $query->fetchAll(PDO::FETCH_OBJ);
            if($arr[0]->mu_status == $parent->active){
                $encryPass = $arr[0]-> mu_password;
                $decryPass = $parent->passwordDecrypt($encryPass);
                if($decryPass == $password){
                    session_start();
                    $obj = new stdClass();

                    $_SESSION["userid"] = $arr[0]->mu_id;
                    $_SESSION["firstname"] =$arr[0]->mu_firstname;
                    $_SESSION["lastname"] =$arr[0]->mu_lastname;
                    $_SESSION["username"] =$arr[0]->mu_emailid;
                    $_SESSION['access_token'] = $arr[0]->mu_password;
                    $roleQuery = "SELECT * FROM ".$parent->prefix."user_roles WHERE ur_id ='".$arr[0]->mu_user_role."'";

                    $roleResult = $parent->db->query($roleQuery);
                    $arrRole = $roleResult->fetchAll(PDO::FETCH_OBJ);
                    $_SESSION['userrole'] = unserialize($arrRole[0]->ur_roles);

                    $obj->firstname = $_SESSION["firstname"];
                    $obj->lastname = $_SESSION["lastname"];
                    $obj->username = $_SESSION["username"];
                    $obj->userid =  $_SESSION["userid"];
                    $obj->accesstoken = $_SESSION['access_token'];
                    $obj->roles =  $_SESSION['userrole'];

    //                    $parent->response(array('response'=>'success','items'=>$obj), 200);
                    return array('response'=>'success','items'=>$obj);
                }else{
    //                    $parent->response(array('response'=>'failed', 'message' => 'Invalid password.'), 200);
                    return array('response'=>'failed', 'message' => 'Invalid password.');
                }
            }else{
    //                $parent->response(array('response'=>'failed', 'message' => 'Your account is not in active.'), 200);
                return array('response'=>'failed', 'message' => 'Your account is not in active.');
            }
        }else{
    //            $parent->response(array('response'=>'failed', 'message' => 'Such username not registered with us.'), 200);
            return array('response'=>'failed', 'message' => 'Such username not registered with us.');
        }
    }


    function checksession($parent){
        //if($parent->get_request_method() != "POST") $parent->response(array('response'=>'failed'),406);
        $parent->checkAuthorization();
        if(isset($_SESSION["userid"])){
            $obj = new stdClass();
            $obj->firstname = $_SESSION["firstname"];
            $obj->lastname = $_SESSION["lastname"];
            $obj->username = $_SESSION["username"];
            $obj->userid =  $_SESSION["userid"];
            $obj->accesstoken = $_SESSION['access_token'];
            $obj->roles = $_SESSION['userrole'];

            if($obj->roles == "admin"){
                $getUserDetail = "SELECT ru.mr_firstname AS firstName, ru.mr_lastname AS lastName, 
                        ru.mr_emailid AS emailId, rut.mrut_name AS userType
                        FROM ".$parent->prefix."registeruser ru
                        JOIN ".$parent->prefix."reg_user_type rut ON rut.mrut_name_abrev = ru.mr_userttype
                        WHERE ru.mr_id='".$_SESSION["userid"]."'";
                $userResult = $parent->db->query($getUserDetail);
                $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
            }else{
                $getUserDetail = "SELECT u.mu_firstname AS firstName, u.mu_lastname AS lastName, 
                        u.mu_emailid AS emailId, rut.mrut_name AS userType
                        FROM ".$parent->prefix."users u
                        JOIN ".$parent->prefix."registeruser ru ON ru.mr_id = u.mu_createdby
                        JOIN ".$parent->prefix."reg_user_type rut ON rut.mrut_name_abrev = ru.mr_userttype
                        WHERE u.mu_id='".$_SESSION["userid"]."'";
                $userResult = $parent->db->query($getUserDetail);
                $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
            }
            $parent->response(array('response'=>'success','items'=>$arr[0]), 200);
        }else{
            $parent->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }
    }
    //Register User
     function adduser($parent){
        try{
            $userFirstName = $parent->_request["userFirstName"];
            $userLastName = $parent->_request["userLastName"];
            $userType = $parent->_request["userType"];
            $userEmail = $parent->_request["userEmail"];
            $userPassword = trim($parent->_request["userPassword"]);
            $activeStatus = $parent->active;
            $createDate = date("Y-m-d H:i:s");

            $userPassword = $parent->passwordEncrypt($userPassword);

            $userCheckDetail = "SELECT * FROM ".$parent->prefix."registeruser WHERE mr_emailid = '$userEmail'";
            $query = $parent->db->query($userCheckDetail);
            $arr = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() == 0){
                $insertQuery = "INSERT INTO ".$parent->prefix."registeruser (mr_firstname, mr_lastname, mr_emailid, mr_password, mr_userttype, mr_createdate, mr_status) VALUES ('".$userFirstName."','".$userLastName."','".$userEmail."','".$userPassword."','".$userType."','".$createDate."','".$activeStatus."')";
                $insertResult = $parent->db->query($insertQuery);

                $id = $parent->lastinsetid();
                $getUserDetail = "SELECT mr_firstname AS firstName , mr_lastname AS lastName, mr_emailid AS emailId FROM ".$parent->prefix."registeruser WHERE mr_id='".$id."'";
                //echo $selectstr;
                $userResult = $parent->db->query($getUserDetail);
                $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
                $parent->response(array('response'=>'success','items'=>$arr[0]), 200);
            }else{
                $parent->response(array('response'=>'failed','message'=>'Email already exists.'), 200);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }	
    }
    //Register User check email id exist
    function checkEmailExist($parent){
        try{
            $mailid = $parent->_request["mailid"];

            $userCheckDetail = "SELECT * FROM ".$parent->prefix."registeruser WHERE mr_emailid = '$mailid'";
            $query = $parent->db->query($userCheckDetail);
            $arr = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() == 0){
                $parent->response(array('response'=>'success','items'=>''), 200);
            }else{
                $parent->response(array('response'=>'failed','message'=>'Email already exists.'), 200);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    /**************************************************************************************************************/
    function getAdminUserList($parent){
        $parent->checkAuthorization();
        if(isset($_SESSION["userid"])){
            $userId = $_SESSION["userid"];
            $resultArr = array();
            $getUserDetail = "SELECT mu.mu_firstname AS firstName, mu.mu_lastname AS lastName, 
                            mu.mu_emailid AS emailId, ur.ur_name AS userRole, 
                            DATE_FORMAT(mu.mu_createdate, '%m-%d-%Y') AS addedDate,
                            mu.mu_id AS userID
                            FROM ".$parent->prefix."users mu
                            JOIN ".$parent->prefix."user_roles ur ON ur.ur_id = mu.mu_user_role
                            WHERE mu.mu_createdby='".$userId."'";
            $userResult = $parent->db->query($getUserDetail);
            $arruser = $userResult->fetchAll(PDO::FETCH_OBJ);
            $resultArr["userList"] = $arruser;
            $resultArr["userRole"] = getAdminUserRoles($parent);
            $parent->response(array('response'=>'success','items'=>$resultArr), 200);
        }else{
            $parent->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }
    }
    //Admin User Adding
    function addAdminUsers($parent){
        $parent->checkAuthorization();
        try{
            $editUserID = 0;
            if(isset($parent->_request["userID"])) {
                $editUserID = $parent->_request["userID"];
            }

            $userFirstName = $parent->_request["userFirstName"];
            $userLastName = $parent->_request["userLastName"];
            $userRole = $parent->_request["userRole"];
            $userEmail = $parent->_request["userEmailId"];
            $userPassword = $parent->generateToken(6);
            $activeStatus = $parent->active;
            $createDate = date("Y-m-d H:i:s");
            $userId = $_SESSION['userid'];

            $userPassword = $parent->passwordEncrypt($userPassword);

            $editCondition = "";
            if($editUserID !== 0){
                $editCondition = " AND mu_id != ".$editUserID;
            }
            $userCheckDetail = "SELECT * FROM ".$parent->prefix."users WHERE mu_emailid  = '$userEmail'".$editCondition;
            $query = $parent->db->query($userCheckDetail);
            $arr = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() == 0){

                if($editUserID == 0) {
                    $insertQuery = "INSERT INTO " . $parent->prefix . "users (mu_firstname, mu_lastname, mu_emailid, mu_password, mu_user_role, mu_createdby, mu_createdate, mu_status) VALUES ('" . $userFirstName . "','" . $userLastName . "','" . $userEmail . "','" . $userPassword . "','" . $userRole . "','" . $userId . "','" . $createDate . "','" . $activeStatus . "')";
                    $insertResult = $parent->db->query($insertQuery);
                    $id = $parent->lastinsetid();
                }else{
                    $updateQuery = "UPDATE " . $parent->prefix . "users
                                    SET mu_firstname ='".$userFirstName."', mu_lastname ='".$userLastName."',
                                    mu_emailid ='".$userEmail."', mu_user_role ='".$userRole."'
                                    WHERE mu_id = ".$editUserID;
                    $updateResult = $parent->db->query($updateQuery);
                    $id = $editUserID;
                }
                $getUserDetail = "SELECT mu_firstname AS firstName , mu_lastname AS lastName, mu_emailid AS emailId FROM ".$parent->prefix."users WHERE mu_id='".$id."'";
                $userResult = $parent->db->query($getUserDetail);
                $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
                $parent->response(array('response'=>'success','items'=>$arr[0]), 200);
            }else{
                $parent->response(array('response'=>'failed','message'=>'Email already exists.'), 200);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    //Admin User check email id exist
    function checkUserEmailExist($parent){
        $parent->checkAuthorization();
        try{
            $editCondition = "";
            if(isset($parent->_request["editUserId"])){
                $editCondition = " AND mu_id != ".$parent->_request["editUserId"];
            }
            $mailid = $parent->_request["mailid"];

            $userCheckDetail = "SELECT * FROM ".$parent->prefix."users WHERE mu_emailid = '$mailid'".$editCondition;
            $query = $parent->db->query($userCheckDetail);
            $arr = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() == 0){
                $parent->response(array('response'=>'success','items'=>''), 200);
            }else{
                $parent->response(array('response'=>'failed','message'=>'Email already exists.'), 200);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    // Get User Datails to View/Edit
    function getAdminUserDetail($parent){
        $parent->checkAuthorization();
        try{
            $userId = $parent->_request["userID"];
            $getUserDetail = "SELECT mu.mu_firstname AS firstName, mu.mu_lastname AS lastName, 
                            mu.mu_emailid AS emailId, mu.mu_user_role AS userRole,
                            mu.mu_id AS userID, ur.ur_name AS userTypeRole
                            FROM ".$parent->prefix."users mu
                            JOIN ".$parent->prefix."user_roles ur ON ur.ur_id = mu.mu_user_role
                            WHERE mu.mu_id='".$userId."'";
            $userResult = $parent->db->query($getUserDetail);
            $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
            $parent->response(array('response'=>'success','items'=>$arr[0]), 200);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    // Delete User
    function deleteAdminUserDetail($parent){
        $parent->checkAuthorization();
        try{
            $userId = $parent->_request["userID"];
            $delUserDetail = "DELETE FROM ".$parent->prefix."users WHERE mu_id='".$userId."'";
            $delResult = $parent->db->exec($delUserDetail);

            $getUserDetail = "SELECT mu.mu_firstname AS firstName, mu.mu_lastname AS lastName, 
                            mu.mu_emailid AS emailId, ur.ur_name AS userRole, 
                            DATE_FORMAT(mu.mu_createdate, '%m-%d-%Y') AS addedDate,
                            mu.mu_id AS userID
                            FROM ".$parent->prefix."users mu
                            JOIN ".$parent->prefix."user_roles ur ON ur.ur_id = mu.mu_user_role
                            WHERE mu.mu_createdby='".$_SESSION["userid"]."'";
            $userResult = $parent->db->query($getUserDetail);
            $arruser = $userResult->fetchAll(PDO::FETCH_OBJ);
            $parent->response(array('response'=>'success','items'=>$arruser), 200);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    function getAdminUserRoles($parent, $condFlag = ''){
        //$parent->checkAuthorization();
        try{
            $condition = '';
            $userId = $_SESSION['userid'];
            if($condFlag == ''){
                $condition = "  AND ur.ur_status = '".$parent->active."' AND ur.ur_roles != ''";
            }
            $getUserRole = "SELECT ur.ur_name AS roleName, ur.ur_id AS roleId
                            FROM ".$parent->prefix."user_roles ur  WHERE ur.ur_created_by = ".$userId.$condition;
            $userRole = $parent->db->query($getUserRole);
            $arr = $userRole->fetchAll(PDO::FETCH_OBJ);
            return $arr;
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    /*******************************************************************************************************/
    /*-------------------------------------------------USER ROLE-------------------------------------------*/
    /*******************************************************************************************************/
    function getAdminUserRoleList($parent){
        $parent->checkAuthorization();
        try{
            $arr = getAdminUserRoles($parent, "1");
            $parent->response(array('response'=>'success','items'=>$arr), 200);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    //Admin User Role Adding
    function addAdminUserRole($parent){
        $parent->checkAuthorization();
        try{
    //        print_r($parent);
    //        die;
            $editUserRoleID = 0;
            if(isset($parent->_request["roleId"])) {
                $editUserRoleID = $parent->_request["roleId"];
            }

            $userRoleName = $parent->_request["userRoleName"];
            $accessRole = $parent->_request["accessRole"];
            $serializeAccessRole = serialize($accessRole);
            $activeStatus = $parent->active;
            $createDate = date("Y-m-d H:i:s");
            $userId = $_SESSION['userid'];

            $editCondition = "";
            if($editUserRoleID !== 0){
                $editCondition = " AND ur_id != ".$editUserRoleID;
            }
            $userCheckDetail = "SELECT * FROM ".$parent->prefix."user_roles WHERE ur_roles  = '$serializeAccessRole' AND ur_created_by = '$userId'".$editCondition;
            $query = $parent->db->query($userCheckDetail);
            $arr = $query->fetchAll(PDO::FETCH_OBJ);

            if($query->rowCount() == 0){

                if($editUserRoleID == 0) {
                    $insertQuery = "INSERT INTO " . $parent->prefix . "user_roles (ur_name, ur_roles, ur_created_by, ur_created_at, ur_status) VALUES ('" . $userRoleName . "','" . $serializeAccessRole . "','" . $userId . "','" . $createDate . "','" . $activeStatus . "')";
                    $insertResult = $parent->db->query($insertQuery);
                    $id = $parent->lastinsetid();
                }else{
                    $updateQuery = "UPDATE " . $parent->prefix . "user_roles
                                    SET ur_name ='".$userRoleName."', ur_roles ='".$serializeAccessRole."'
                                    WHERE ur_id = '".$editUserRoleID."' AND ur_created_by = ".$userId;

                    $updateResult = $parent->db->query($updateQuery);
                    $id = $editUserRoleID;
                }
                $getUserDetail = "SELECT ur.ur_name AS roleName, ur.ur_id AS roleId FROM ".$parent->prefix."user_roles ur WHERE ur.ur_created_by = ".$userId;
                $userResult = $parent->db->query($getUserDetail);
                $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
                $parent->response(array('response'=>'success','items'=>$arr), 200);
            }else{
                $parent->response(array('response'=>'failed','message'=>'Same Role already saved.'), 200);
            }
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    // Get User Datails to View/Edit
    function getAdminUserRoleDetail($parent){
        $parent->checkAuthorization();
        try{
            $roleId = $parent->_request["roleId"];
            $getUserDetail = "SELECT ur.ur_name AS roleName, ur.ur_id AS roleId,
                        ur.ur_roles AS accessRoles FROM ".$parent->prefix."user_roles ur
                        WHERE ur.ur_id='".$roleId."'";
            $userResult = $parent->db->query($getUserDetail);
            $arr = $userResult->fetchAll(PDO::FETCH_OBJ);

            $accessRoles = unserialize($arr[0]->accessRoles);
            $newArray =array();
            $i = 0;
            foreach ($accessRoles as $key => $value) {
                $newArray[$i]['name'] = $value;
                $newArray[$i]['value'] = $value;
                $newArray[$i]['checked'] = true;
                $i++;
            }
            $newArrayEncode = $newArray;

            $result['roleName'] = $arr[0]->roleName;
            $result['roleId'] = $arr[0]->roleId;
            $result['roleAccess'] = $newArrayEncode;
            $parent->response(array('response'=>'success','items'=>$result), 200);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }
    // Delete User
    function deleteAdminUserRoleDetail($parent){
        $parent->checkAuthorization();
        try{
            $roleId = $parent->_request["roleId"];
            $userId = $_SESSION['userid'];

            $delUserDetail = "DELETE FROM ".$parent->prefix."user_roles WHERE ur_id='".$roleId."'";
            $delResult = $parent->db->exec($delUserDetail);

            $getUserDetail = "SELECT ur.ur_name AS roleName, ur.ur_id AS roleId FROM ".$parent->prefix."user_roles ur WHERE ur.ur_created_by = ".$userId;
//            echo $getUserDetail;die;
            $userResult = $parent->db->query($getUserDetail);
            $arr = $userResult->fetchAll(PDO::FETCH_OBJ);
            $parent->response(array('response'=>'success','items'=>$arr), 200);
        }catch(PDOException $e){
            echo $e->getMessage();
        }
    }

    function logout($parent)
    {
        $parent->checkAuthorization();
        session_destroy();
        $parent->response(array('response'=>'success','message'=>'Logout successful.'), 200);
    }
?>