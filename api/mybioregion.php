<?php

    function saveMyBioRegion($parent){
        $parent->checkAuthorization();
        $valid_formats = array("jpg", "png", "gif", "bmp", "jpeg");
        $max_file_size = 1024*1000; //1 Mb
        $path = "../uploads/"; // Upload directory
        $count = 0;

        $totalFileCount = $parent->_request["totalFileCount"];
        $latitude = $parent->_request["latitude"];
        $longitude = $parent->_request["longitude"];
        $bioRegionName = $parent->_request["bioRegionName"];
        $searchLocation = $parent->_request["searchLocation"];

        $fileErrorMessage = '';
        $uploadId = rand(1000, 9999);
        $userId = $_SESSION['userid'];
        $activeStatus = $parent->active;
        $createDate = date("Y-m-d H:i:s");
        if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST"){
            for($i = 0; $i <= $totalFileCount; $i++)
            {
                $name = $_FILES['image-'.$i]['name'];

                if ($_FILES['image-'.$i]['error'] == 4) {
                    continue; // Skip file if any error found
                }

                if ($_FILES['image-'.$i]['error'] == 0) {
                    if( ! in_array(pathinfo($name, PATHINFO_EXTENSION), $valid_formats) ){
                        $fileErrorMessage .= "$name is not a valid format. It should be jpg/png/gif/bmp format<br>";
                        continue; // Skip invalid file formats
                    }elseif ($_FILES['image-'.$i]['size'] > $max_file_size) {
                        $fileErrorMessage .= "$name size should less than 1Mb<br>";
                        continue; // Skip large files
                    }
                    else{ // No error found! Move uploaded files
                        $fileDetail = pathinfo($name);
                        $fileName = $fileDetail['filename']."_".$userId."_".$uploadId.".".$fileDetail['extension'];
                        $uploadFileUrl = $path.$fileName;
                        if(move_uploaded_file($_FILES['image-'.$i]["tmp_name"], $uploadFileUrl)) {
                            $count++;
                            $uploadFileUrl = "uploads/".$fileName;
                            $insertQuery = "INSERT INTO " . $parent->prefix . "seed_files (sf_about_file, sf_file_name, sf_file_url, sf_upload_id, sf_upload_by, sf_upload_date, sf_status) VALUES ('".$bioRegionName."','" . $fileName . "','" . $uploadFileUrl . "','" . $uploadId . "','" . $userId . "','".$createDate."','" . $activeStatus . "')";
                            $insertResult = $parent->db->query($insertQuery);
                        }else{
                            $fileErrorMessage .= "There is a technical error in upload picture. Please contact support.<br>";
                            continue;
                        }
                    }
                }
            }
            if($count > 0){
                $insertRegionQuery = "INSERT INTO " . $parent->prefix . "bio_region (br_region_name, br_region_location_name, br_loc_lat, br_loc_lng, br_upload_id,br_user_id, br_created_at, br_status) VALUES ('".$bioRegionName."','" . $searchLocation . "','" . $latitude . "','" . $longitude . "','" . $uploadId . "','" . $userId . "','".$createDate."','" . $activeStatus . "')";
                $insertRegionResult = $parent->db->query($insertRegionQuery);
            }
        }
        if($fileErrorMessage){
            $parent->response(array('response'=>'failed','items'=>$fileErrorMessage), 200);
        }else{
            $arrResult = apiGetAllBioRegion($parent, $userId);
            $parent->response(array('response'=>'success','items'=>$arrResult), 200);
        }
    }

    function getAllBioRegion($parent){
        $parent->checkAuthorization();
        if(isset($_SESSION["userid"])){
            $userId = $_SESSION["userid"];
            $arrResult = apiGetAllBioRegion($parent, $userId);
            $parent->response(array('response'=>'success','items'=>$arrResult), 200);
        }else{
            $parent->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }
    }

    function apiGetAllBioRegion($parent, $userId){
        $getUserRegionDetail = "SELECT br.br_region_name as regionName, br.br_region_location_name AS locationAddress,
                            br.br_loc_lat AS locLatitude, br.br_loc_lng AS locLongitude,
                            DATE_FORMAT(br.br_created_at, '%m-%d-%Y') AS addedDate
                            FROM ".$parent->prefix."bio_region br
                            WHERE br.br_user_id='".$userId."' ORDER BY br.br_id DESC";
        $userRegionResult = $parent->db->query($getUserRegionDetail);
        $arrRegionResult = $userRegionResult->fetchAll(PDO::FETCH_OBJ);
        return $arrRegionResult;
    }
?>