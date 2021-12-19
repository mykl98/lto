<?php
    if($_POST){
        include_once "../../../../system/backend/config.php";
        date_default_timezone_set("Asia/Manila");
	    $date = date("Y-m-d");

        function getServerData(){
            global $conn, $date;
            $data = array();
            $table = "vehicle";
            $sql = "SELECT * FROM `$table`";
            $total = 0;
            $notExpired = 0;
            $expired = 0;
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        $total += 1;
                        $expDate = $row["expdate"];
                        if($expDate > $date){
                            saveLog("not expired");
                            $notExpired += 1;
                        }else{
                            saveLog("expired");
                            $expired += 1;
                        }
                    }
                }
                $value = new \StdClass();
                $value -> total = $total;
                $value -> notexpired = $notExpired;
                $value -> expired = $expired;
                array_push($data,$value);
                $data = json_encode($data);
                return "true*_*".$data;
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
            echo getServerData();
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>