<?php
    if($_POST){
        include_once "../../../../system/backend/config.php";

        function deleteRegistration($idx,$plateNumber){
            global $conn;
            $table = "vehicle";
            $sql = "DELETE FROM `$table` WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*Successfully deleted vehicle registration with plate number " . $plateNumber;
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
            $idx = sanitize($_POST["idx"]);
            $plateNumber = sanitize($_POST["platenumber"]);
            echo deleteRegistration($idx,$plateNumber);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>