<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getVehicleDetail($idx){
            global $conn;
            $data = array();
            $table = "vehicle";
            $sql = "SELECT * FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $value = new \StdClass();
                    $value -> idx = $row["idx"];
                    $value -> image = $row["image"];
                    $value -> platenumber = $row["platenumber"];
                    $value -> brand = $row["brand"];
                    $value -> model = $row["model"];
                    $value -> chassis = $row["chassis"];
                    $value -> engine = $row["engine"];
                    $value -> color = $row["color"];
                    $value -> regdate = $row["regdate"];
                    $value -> expdate = $row["expdate"];
                    $value -> owner = $row["owner"];
                    array_push($data,$value);
                }
                $data = json_encode($data);
                return "true*_*" . $data;
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            echo getVehicleDetail($idx);
        }else{
            echo "Access Denied";
        }
    }else{
        echo "Access Denied!";
    }
?>