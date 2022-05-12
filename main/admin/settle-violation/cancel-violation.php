<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function cancelViolation($idx){
            global $conn;
            $table = "ticket";
            $sql = "UPDATE `$table` SET status='cancelled' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            echo cancelViolation($idx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>