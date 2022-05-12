<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function settleViolation($idx){
            global $conn;
            $table = "ticket";
            $sql = "UPDATE `$table` SET status='settled' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            echo settleViolation($idx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>