<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getPendingTicketCount($vehicleIdx){
            global $conn;
            $count = 0;
            $table = "ticket";
            $sql = "SELECT * FROM `$table` WHERE vehicleidx='$vehicleIdx' && status='pending'";
            if($result=mysqli_query($conn,$sql)){
                $count = mysqli_num_rows($result);
            }
            return $count;
        }

        function getOwnerName($idx){
            global $conn;
            $name = "";
            $table = "account";
            $sql = "SELECT name FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $name = $row["name"];
                }
            }
            return $name;
        }

        function getVehicleList($owner){
            global $conn;
            $data = array();
            $table = "vehicle";
            $sql = "SELECT * FROM `$table` WHERE owner='$owner' ORDER by idx DESC";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> idx = $row["idx"];
                        $value -> platenumber = $row["platenumber"];
                        $value -> regdate = $row["regdate"];
                        $value -> expdate = $row["expdate"];
                        $value -> ticket = getPendingTicketCount($row["idx"]);
                        array_push($data,$value);
                    }
                }
                $data = json_encode($data);
                return "true*_*".$data;
            }else{
                return "System Error!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $owner = $_SESSION["loginidx"];
            echo getVehicleList($owner);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>