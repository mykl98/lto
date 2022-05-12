<?php
include_once "../system/backend/config.php";
    session_start();
    if($_SESSION["isLoggedIn"] == "true"){
        $access = $_SESSION["access"];
        switch ($access){
            case "admin":
                header("location:admin/dashboard");
                exit();
                break;
            case "enforcer":
                header("location:enforcer/dashboard");
                exit();
                break;
            case "owner":
                header("location:owner/dashboard");
                exit();
                break;
        }
    }else{
        session_destroy();
        header("location:../index.php");
        exit();
    }
?>