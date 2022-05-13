<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveVehicleOwner($idx,$name,$address,$phone,$username,$status){
        global $conn;
        $table = "account";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (name,address,phone,username,password,access,status) VALUES ('$name','$address','$phone','$username','123456','owner','$status')";
        }else{
            $sql = "UPDATE `$table` SET name='$name',address='$address',phone='$phone',username='$username',status='$status' WHERE idx='$idx'";
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
        $address = sanitize($_POST["address"]);
        $phone = sanitize($_POST["phone"]);
        $username = sanitize($_POST["username"]);
        $status = sanitize($_POST["status"]);
        if(!empty($name)&&!empty($address)&&!empty($phone)&&!empty($username)&&!empty($status)){
            echo saveVehicleOwner($idx,$name,$address,$phone,$username,$status);
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