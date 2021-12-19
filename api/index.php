<?php
    if(isset($_POST)){
        include_once "../system/backend/config.php";
        date_default_timezone_set("Asia/Manila");
	    $date = date("Y-m-d");

        function getData($code){
            global $conn,$date;
            $data = array();
            $table = "vehicle";
            $sql = "SELECT * FROM `$table` WHERE qr='$code'";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    $row = mysqli_fetch_array($result);
                    $expDate = $row["expdate"];
                    if($expDate > $date){
                        $expired = "false";
                    }else{
                        $expired = "true";
                    }
                    $value = new \StdClass();
                    $value -> image = $row["image"];
                    $value -> platenumber = $row["platenumber"];
                    $value -> regdate = $row["regdate"];
                    $value -> expdate = $row["expdate"];
                    $value -> owner = $row["owner"];
                    $value -> address = $row["address"];
                    $value -> expired = $expired;

                    $data = json_encode($value);
                    return $data;
                }else{
                    return "Vehicle's record not found!";
                }
            }else{
                return "System Error!";
            }
        }

        $code = sanitize($_POST["code"]);
        echo getData($code);
    }else{
        echo "Access Denied!";
    }
?>