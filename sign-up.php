<?php
    session_start();
    $error = "";
    $name = "";
    $address = "";
    $phone = "";
    $username = "";
    $password = "";
    $retype = "";
    if(isset($_SESSION["isLoggedIn"])){
        if($_SESSION["isLoggedIn"] == "true"){
            header("location:main");
            exit();
        }
    }
    if($_POST){
        include_once "system/backend/config.php";

        $name = sanitize($_POST["name"]);
        $address = sanitize($_POST["address"]);
        $phone = sanitize($_POST["phone"]);
        $username = sanitize($_POST["username"]);
        $password = sanitize($_POST["password"]);
        $retype = sanitize($_POST["retype"]);
        if($name == ""){
            $error = "*Name field shoudl not be empty!";
        }else if($address == ""){
            $error = "*Address field should not be empty!";
        }else if($phone == ""){
            $error = "*Phone number field should not be empty!";
        }else if($username == ""){
            $error = "*Username field should not be empty!";
        }else if($password == ""){
            $error = "*Password field should not be empty!";
        }else if($retype == ""){
            $error = "*Retype Password field should not be empty!";
        }else if($password != $retype){
            $error = "*Password and retype password does not match!";
        }else{
            global $conn;
            $table = "account";
            $sql = "INSERT INTO `$table` (name,username,password,address,phone,access,status) VALUES ('$name','$username','$password','$address','$phone','owner','active')";
            if(mysqli_query($conn,$sql)){
                header("location:congrats.php");
            }else{
                $error = "System Error!";
            }
        }
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
                    <h3 class="mb-2 text-dark">Sign Up</h3>
                    <form method="post" class="mt-2">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-male"></i></span>
                            </div>
                            <input type="text" name="name" value="<?php echo $name;?>" class="form-control mt-0" placeholder="Name">
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-address-book"></i></span>
                            </div>
                            <textarea name="address" class="form-control mt-0" placeholder="Address"><?php echo $address;?></textarea>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-phone"></i></span>
                            </div>
                            <input type="number" name="phone" value="<?php echo $phone;?>" class="form-control mt-0" placeholder="Phone Number">
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-user"></i></span>
                            </div>
                            <input type="text" name="username" value="<?php echo $username;?>" class="form-control mt-0" placeholder="Username">
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-lock"></i></span>
                            </div>
                            <input type="password" name="password" value="<?php echo $password;?>" class="form-control mt-0" placeholder="Password">
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-asterisk"></i></span>
                            </div>
                            <input type="password" name="retype" value="<?php echo $retype;?>" class="form-control mt-0" placeholder="Retype Password">
                        </div>

                        <div class="form-group">
                            <a href="#">
                                <small class="text-danger font-italic"><?php echo $error;?></small>
                            </a>
                            <input type="submit" class="btn btn-theme btn-block p-2 mb-1" value="Login">
                        </div>
                        <p>Already have an account?<a class="text-info" href="index.php"> Sign Up</a></p>
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