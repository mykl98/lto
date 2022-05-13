<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function addViolationTicket($enforcer,$vehicleIdx,$violationIdx){
            global $conn;
            $table = "ticket";
            $date = date("Y-m-d");
            $time = date("h:m:i a");
            $sql = "INSERT INTO `$table` (date,time,enforcer,vehicleidx,violation,status,processedby) VALUES ('$date','$time','$enforcer','$vehicleIdx','$violationIdx','pending','')";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Error!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $enforcer = $_SESSION["loginidx"];
            $vehicleIdx = sanitize($_POST["vehicleidx"]);
            $violationIdx = sanitize($_POST["violationidx"]);
            echo addViolationTicket($enforcer,$vehicleIdx,$violationIdx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>