<?php
if($_POST){
    include_once "../../../system/backend/config.php";

    function saveVehicle($idx,$image,$plateNumber,$brand,$model,$chassis,$engine,$color,$regDate,$expDate,$owner){
        global $conn;
        $table = "vehicle";
        if($idx == ""){
            $qr = generateCode(100);
            $sql = "INSERT INTO `$table` (image,qr,platenumber,brand,model,chassis,engine,color,regdate,expdate,owner) VALUES ('$image','$qr','$plateNumber','$brand','$model','$chassis','$engine','$color','$regDate','$expDate','$owner')";
        }else{
            $sql = "UPDATE `$table` SET image='$image',platenumber='$plateNumber',brand='$brand',model='$model',chassis='$chassis',engine='$engine',color='$color',regdate='$regDate',expdate='$expDate',owner='$owner' WHERE idx='$idx'";
        }
        if(mysqli_query($conn,$sql)){
            return "true*_*";
        }else{
            return "System Failed!" . $conn -> error;
        }
    }

    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $idx = sanitize($_POST["idx"]);
        $image = sanitize($_POST["image"]);
        $plateNumber = sanitize($_POST["platenumber"]);
        $brand = sanitize($_POST["brand"]);
        $model = sanitize($_POST["model"]);
        $chassis = sanitize($_POST["chassis"]);
        $engine = sanitize($_POST["engine"]);
        $color = sanitize($_POST["color"]);
        $regDate = sanitize($_POST["regdate"]);
        $expDate = sanitize($_POST["expdate"]);
        $owner = $_SESSION["loginidx"];

        if(!empty($image)&&!empty($plateNumber)&&!empty($brand)&&!empty($model)&&!empty($chassis)&&!empty($engine)&&!empty($color)&&!empty($regDate)&&!empty($expDate)&&!empty($owner)){
            echo saveVehicle($idx,$image,$plateNumber,$brand,$model,$chassis,$engine,$color,$regDate,$expDate,$owner);
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