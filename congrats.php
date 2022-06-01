<?php
    session_start();
    if(isset($_SESSION["isLoggedIn"])){
        if($_SESSION["isLoggedIn"] == "true"){
            header("location:main");
            exit();
        }
    }
    if($_POST){
        header("location:index.php");
    }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="description" content="" >
    <meta name="author" content="">
    <meta name="keywords" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!--Meta Responsive tag-->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!--Bootstrap CSS-->
    <link rel="stylesheet" href="system/plugin/bootstrap/css/bootstrap.min.css">
    <!--Custom style.css-->
    <link rel="stylesheet" href="style.css">
    <!--Font Awesome-->
    <link rel="stylesheet" href="system/plugin/fontawesome/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="system/plugin/fontawesome/css/fontawesome.css">

    <title>LTO Vehicle Registration System</title>
  </head>

  <body class="login-body">
    
    <!--Login Wrapper-->

    <div class="container-fluid login-wrapper">
        <div class="">
            <h1 class="text-center mb-3 pt-5 text-white" id="title">LTO Vehicle Registration System</h1>    
            <div class="row">
                <div class="col"></div>
                <div class="col-4 bg-white p-4 rounded">
                    <h3 class="mb-2 text-dark">Congratulation</h3>
                    <form method="post" class="mt-2">
                        <p>You have successfully created your account. Go to <a href="index.php" class="text-info">Sign In</a> to start using your account!</p>
                        <div class="form-group">
                            <input type="submit" class="btn btn-theme btn-block p-2 mb-1" value="Ok">
                        </div>
                    </form>
                </div>
                <div class="col"></div>
            </div>
        </div>
    </div>    

    <!--Login Wrapper-->

    <!-- Page JavaScript Files-->
    <script src="system/plugin/jquery/js/jquery.min.js"></script>
    <!--Popper JS-->
    <script src="system/plugin/popper/js/popper.min.js"></script>
    <!--Bootstrap-->
    <script src="system/plugin/bootstrap/js/bootstrap.min.js"></script>

    <!--Custom Js Script-->
    <script src="script.js"></script>
    <!--Custom Js Script-->
  </body>
</html>