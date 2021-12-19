<?php
if(isset($_POST)){
    include_once "../../../../system/backend/config.php";
    function getQrCode($idx){
        global $conn;
        $table = "vehicle";
        $sql = "SELECT qr FROM `$table` WHERE idx='$idx'";
        if($result=mysqli_query($conn,$sql)){
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_array($result);
                $code = $row["qr"];
                return "true*_*" . $code;
            }else{
                return "false*_*No QR Code";
            }
        }else{
            return "System Error!";
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
        $idx = sanitize($_POST["idx"]);
        echo getQrCode($idx);
    }else{
        echo "Access Denied!";
    }
}else{
    echo "Access Denied!";
}
?>