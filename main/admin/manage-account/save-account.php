<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveAccount($idx,$name,$username,$club,$access,$status){
        global $conn;
        $table = "account";
        if($idx == ""){
            if($access == "president"){
                $sql = "INSERT INTO `$table` (name,username,club,password,access,status) VALUES ('$name','$username','$club','123456','$access','$status')";
            }else{
                $sql = "INSERT INTO `$table` (name,username,password,access,status) VALUES ('$name','$username','123456','$access','$status')";
            }
            
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET name='$name',username='$username',access='$access',club='$club',status='$status' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*Successfully updated " . $name . "'s account in account list.";
            }else{
                return "System Failed2!";
            }
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $name = sanitize($_POST["name"]);
        $username = sanitize($_POST["username"]);
        $club = sanitize($_POST["club"]);
        $access = sanitize($_POST["access"]);
        $status = sanitize($_POST["status"]);

        if(isset($name,$username,$access,$status)){
            echo saveAccount($idx,$name,$username,$club,$access,$status);
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