<?php
include_once "../system/backend/config.php";
    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $access = $_SESSION["access"];
        switch ($access){
            case "admin":
                header("location:admin");
                exit();
                break;
            case "machine":
                header("location:machine");
                exit();
                break;
            case "station":
                header("location:station");
                exit();
                break;
        }
    }else{
        header("location:../index.php");
        exit();
    }
?>