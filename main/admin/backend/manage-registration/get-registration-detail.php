<?php
    if($_POST){
        include_once "../../../../system/backend/config.php";

        function getRegistrationDetail($idx){
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
                    $value -> regdate = $row["regdate"];
                    $value -> expdate = $row["expdate"];
                    $value -> owner = $row["owner"];
                    $value -> address = $row["address"];
                    array_push($data,$value);
                }
                $data = json_encode($data);
                return "true*_*" . $data;
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true" || $_SESSION["access"] == "admin"){
            $idx = sanitize($_POST["idx"]);
            echo getRegistrationDetail($idx);
        }else{
            echo "Access Denied";
        }
    }else{
        echo "Access Denied!";
    }
?>