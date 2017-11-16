<?php

    function getMenuList($parent){
        $getUserDetail = "SELECT aml_menu_name AS name, aml_router_link AS value, 
                            IF(aml_checked = 'true', true, false) AS checked
                            FROM ".$parent->prefix."access_menu_list";
        $userResult = $parent->db->query($getUserDetail);

        $i = 0;
        $newArray =array();
        foreach ($userResult as $row) {
            $newArray[$i]['name'] = $row['name'];
            $newArray[$i]['value'] = $row['value'];
            $newArray[$i]['checked'] = true;
            if($row['checked'] == 0){
                $newArray[$i]['checked'] = false;
            }
            $i++;
        }

        $arrResult = $userResult->fetchAll(PDO::FETCH_OBJ);
        $parent->response(array('response'=>'success','items'=>$newArray), 200);
    }
?>