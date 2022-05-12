<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveAccount($idx,$name,$username,$access,$status){
        global $conn;
        $table = "account";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,username,password,access,status) VALUES ('$name','$username','123456','$access','$status')";
        }else{
            $sql = "UPDATE `$table` SET name='$name',username='$username',access='$access',status='$status' WHERE idx='$idx'";
        }
        if(mysqli_query($conn,$sql)){
            return "true*_*";
        }else{
            return "System Failed!";
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $name = sanitize($_POST["name"]);
        $username = sanitize($_POST["username"]);
        $access = sanitize($_POST["access"]);
        $status = sanitize($_POST["status"]);
        if(!empty($name)&&!empty($username)&&!empty($access)&&!empty($status)){
            echo saveAccount($idx,$name,$username,$access,$status);
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