<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function getEnforcerName($idx){
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

        function getViolationDescription($idx){
            global $conn;
            $description = "";
            $table = "violation";
            $sql = "SELECT description FROM `$table` WHERE idx='$idx'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $description = $row["description"];
                }
            }
            return $description;
        }

        function getViolationList($idx){
            global $conn;
            $data = array();
            $table = "ticket";
            $sql = "SELECT * FROM `$table` WHERE idx='$idx' ORDER by idx DESC";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $value = new \StdClass();
                        $value -> idx = $row["idx"];
                        $value -> date = $row["date"];
                        $value -> time = $row["time"];
                        $value -> enforcer = getEnforcerName($row["enforcer"]);
                        $value -> violation = getViolationDescription($row["violation"]);
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
            $idx = sanitize($_POST["idx"]);
            echo getViolationList($idx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>