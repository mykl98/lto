<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getVehicleOwnerCount(){
            global $conn;
            $count = 0;
            $table = "account";
            $sql = "SELECT idx FROM `$table` WHERE access='owner'";
            if($result=mysqli_query($conn,$sql)){
                $count = mysqli_num_rows($result);
            }
            return $count;
        }

        function getVehicleCount(){
            global $conn;
            $count = 0;
            $table = "vehicle";
            $sql = "SELECT idx FROM `$table`";
            if($result=mysqli_query($conn,$sql)){
                $count = mysqli_num_rows($result);
            }
            return $count;
        }

        function getViolationTicketCount(){
            global $conn;
            $count = 0;
            $table = "ticket";
            $sql = "SELECT idx FROM `$table`";
            if($result=mysqli_query($conn,$sql)){
                $count = mysqli_num_rows($result);
            }
            return $count;
        }

        function getDashboardDetails(){
            global $vaccinee,$first,$complete;
            $data = array();
            $value = new \StdClass();
            $value -> owner = getVehicleOwnerCount();
            $value -> vehicle = getVehicleCount();
            $value -> ticket = getViolationTicketCount();
            array_push($data,$value);
            $data = json_encode($data);
            return "true*_*" . $data;
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            echo getDashboardDetails();
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>