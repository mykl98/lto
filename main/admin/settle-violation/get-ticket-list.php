<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getAccountName($idx){
            global $conn;
            $name = "";
            if($idx == ""){
                return $name;
            }
            $table = "account";
            $sql = "SELECT name FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result)){
                    $row = mysqli_fetch_array($result);
                    $name = $row["name"];
                }
            }
            return $name;
        }

        function getVehiclePlateNumber($idx){
            global $conn;
            $plateNumber = "";
            $table = "vehicle";
            $sql = "SELECT platenumber FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result)){
                    $row = mysqli_fetch_array($result);
                    $plateNumber = $row["platenumber"];
                }
            }
            return $plateNumber;
        }

        function getViolationDescription($idx){
            global $conn;
            $description = "";
            $table = "violation";
            $sql = "SELECT description FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result)){
                    $row = mysqli_fetch_array($result);
                    $description = $row["description"];
                }
            }
            return $description;
        }

        function getTicketList(){
            global $conn;
            $data = array();
            $table = "ticket";
            $sql = "SELECT * FROM `$table` ORDER by idx DESC";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> idx = $row["idx"];
                        $value -> date = $row["date"];
                        $value -> time = $row["time"];
                        $value -> enforcer = getAccountName($row["enforcer"]);
                        $value -> platenumber = getVehiclePlateNumber($row["vehicleidx"]);
                        $value -> violation = getViolationDescription($row["violation"]);
                        $value -> status = $row["status"];
                        $value -> processedby = getAccountName($row["processedby"]);                      
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
            echo getTicketList();
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>