<?php
if($_POST){
    include_once "../../../../system/backend/config.php";
    function getQrCode($length){
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    function saveRegistration($idx,$image,$plateNumber,$regDate,$expDate,$owner,$address){
        global $conn;
        $table = "vehicle";
        if($idx == ""){
            $qr = getQrCode(100);
            $sql = "INSERT INTO `$table` (image,qr,platenumber,regdate,expdate,owner,address) VALUES ('$image','$qr','$plateNumber','$regDate','$expDate','$owner','$address')";
            if(mysqli_query($conn,$sql)){
                return "true*_*Successfully added vehicle registration with plate number ".$plateNumber." to registration list.";
            }else{
                return "System Failed!";
            }
        }else{
            $sql = "UPDATE `$table` SET image='$image',platenumber='$plateNumber',regdate='$regDate',expdate='$expDate',owner='$owner',address='$address' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*Successfully updated vehicle registration with ".$plateNumber." in registration list.";
            }else{
                return "System Failed2!";
            }
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
        $idx = sanitize($_POST["idx"]);
        $image = sanitize($_POST["image"]);
        $plateNumber = sanitize($_POST["platenumber"]);
        $regDate = sanitize($_POST["regdate"]);
        $expDate = sanitize($_POST["expdate"]);
        $owner = sanitize($_POST["owner"]);
        $address = sanitize($_POST["address"]);

        echo saveRegistration($idx,$image,$plateNumber,$regDate,$expDate,$owner,$address);
    }else{
        echo "Access Denied!";
    }
}else{
    echo "Access Denied!";
}
?>