<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveClub($idx,$name,$image,$status){
        global $conn;
        $table = "club";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,image,status) VALUES ('$name','$image','$status')";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET name='$name',image='$image',status='$status' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $name = sanitize($_POST["name"]);
        $image = sanitize($_POST["image"]);
        $status = sanitize($_POST["status"]);

        if(!empty($name)&&!empty($status)){
            echo saveClub($idx,$name,$image,$status);
        }else{
            echo "Network Error!";
        }
    }else{
        echo "Access Denied!";
    }
}else{
    echo "Access Denied!";
}
?>