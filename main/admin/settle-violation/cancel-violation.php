<?php
    if($_POST){
        include_once "../../../system/backend/config.php";

        function cancelViolation($loginIdx,$idx){
            global $conn;
            $table = "ticket";
            $sql = "UPDATE `$table` SET status='cancelled',processedby='$loginIdx' WHERE idx='$idx'";
            if(mysqli_query($conn,$sql)){
                return "true*_*";
            }else{
                return "System Failed!";
            }
        }

        session_start();
        if($_SESSION["isLoggedIn"] == "true"){
            $idx = sanitize($_POST["idx"]);
            $loginIdx = $_SESSION["loginidx"];
            echo cancelViolation($loginIdx,$idx);
        }else{
            echo "Access Denied!";
        }
    }else{
        echo "Access Denied!";
    }
?>