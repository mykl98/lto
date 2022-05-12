<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveViolation($idx,$code,$description,$amount,$status){
        global $conn;
        $table = "violation";
        if($idx == ""){
            $sql = "INSERT INTO `$table` (code,description,amount,status) VALUES ('$code','$description','$amount','$status')";
        }else{
            $sql = "UPDATE `$table` SET code='$code',description='$description',amount='$amount',status='$status' WHERE idx='$idx'";
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
        $code = sanitize($_POST["code"]);
        $description = sanitize($_POST["description"]);
        $amount = sanitize($_POST["amount"]);
        $status = sanitize($_POST["status"]);

        if(!empty($code)&&!empty($description)&&!empty($amount)&&!empty($status)){
            echo saveViolation($idx,$code,$description,$amount,$status);
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