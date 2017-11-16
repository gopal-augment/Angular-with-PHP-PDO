<?php

    function uploadFiles($parent){
        $parent->checkAuthorization();
        $valid_formats = array("jpg", "png", "gif", "bmp");
        $max_file_size = 1024*1000; //1 Mb
        $path = "../uploads/"; // Upload directory
        $count = 0;

        $totalFileCount = $parent->_request["totalFileCount"];
        $aboutFile = $parent->_request["aboutFile"];
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
                            $insertQuery = "INSERT INTO " . $parent->prefix . "seed_files (sf_about_file, sf_file_name, sf_file_url, sf_upload_id, sf_upload_by, sf_upload_date, sf_status) VALUES ('".$aboutFile."','" . $fileName . "','" . $uploadFileUrl . "','" . $uploadId . "','" . $userId . "','".$createDate."','" . $activeStatus . "')";
                            $insertResult = $parent->db->query($insertQuery);
                        }
                    }
                }
            }
        }
        if($fileErrorMessage){
            $parent->response(array('response'=>'failed','items'=>$fileErrorMessage), 200);
        }else{
            $arrResult = apiGetAllGalleryFiles($parent, $userId);
            $parent->response(array('response'=>'success','items'=>$arrResult), 200);
        }
    }
    function getAllGalleryFiles($parent){
        $parent->checkAuthorization();
        if(isset($_SESSION["userid"])){
            $userId = $_SESSION["userid"];
            /*
            $getUserDetail = "SELECT sf.sf_file_name AS uploadFileName, sf.sf_file_url AS fileUrl,
                            sf.sf_about_file AS aboutFile,
                            DATE_FORMAT(sf.sf_upload_date, '%m-%d-%Y') AS addedDate
                            FROM ".$parent->prefix."seed_files sf
                            WHERE sf.sf_upload_by='".$userId."'";
            $userResult = $parent->db->query($getUserDetail);
            $userResult->fetchAll(PDO::FETCH_OBJ);*/
            $arrResult = apiGetAllGalleryFiles($parent, $userId);
            $parent->response(array('response'=>'success','items'=>$arrResult), 200);
        }else{
            $parent->response(array('response'=>'failed','message'=>'Session Expired!'), 200);
        }
    }
    function apiGetAllGalleryFiles($parent, $userId){
        $getUserDetail = "SELECT sf.sf_file_name AS uploadFileName, sf.sf_file_url AS fileUrl, 
                            sf.sf_about_file AS aboutFile,
                            DATE_FORMAT(sf.sf_upload_date, '%m-%d-%Y') AS addedDate
                            FROM ".$parent->prefix."seed_files sf
                            WHERE sf.sf_upload_by='".$userId."' ORDER BY sf.sf_id DESC";
        $userResult = $parent->db->query($getUserDetail);
        $arrResult = $userResult->fetchAll(PDO::FETCH_OBJ);
        return $arrResult;
    }
?>