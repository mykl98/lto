<?php
    if($_POST){
        include_once "../../../../system/backend/config.php";

        function getRegistrationList(){
            global $conn;
            $data = array();
            $table = "vehicle";
            $sql = "SELECT * FROM `$table`";
            if($result=mysqli_query($conn,$sql)){
                if(mysqli_num_rows($result) > 0){
                    while($row=mysqli_fetch_array($result)){
                        if($row["idx"] != 0){
                            $value = new \StdClass();
                            $value -> idx = $row["idx"];
                            $value -> image = $row["image"];
                            $value -> platenumber = $row["platenumber"];
                            $value -> regdate = $row["regdate"];
                            $value -> expdate = $row["expdate"];

                            array_push($data,$value);
                        }
                    }
                }
                $data = json_encode($data);
                return "true*_*".$data;
            }else{
                return "System Error!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
            echo getRegistrationList();
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>