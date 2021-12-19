<?php
    include_once "../../system/backend/config.php";
    $name = "Michael Martin G. Abellana";
    $image = "../../system/images/blank-profile.png";

    session_start();
    $idx = $_SESSION["loginidx"];

    if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "admin"){
        $table = "account";
        $sql = "SELECT name,image FROM `$table` WHERE idx='$idx'";
        if($result=mysqli_query($conn,$sql)){
            if(mysqli_num_rows($result) > 0){
                $row = mysqli_fetch_array($result);
                $image = $row["image"];
                $name = $row["name"];
            }
        }
        if($image == ""){
            $image = "../../system/images/blank-profile.png";
        }
        if($name == ""){
            $name = "Michael Martin G. Abellana";
        }
    }else{
        header("location:../../index.php");
        exit();
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
    <link rel="stylesheet" href="../../system/vendor/bootstrap/css/bootstrap.min.css">
    <!--Datatable-->
    <link rel="stylesheet" href="../../system/vendor/datatables/css/dataTables.bootstrap4.min.css">
    <!--Custom style.css-->
    <link rel="stylesheet" href="../../system/vendor/quick-sand/css/quicksand.css">
    <link rel="stylesheet" href="css/style.css">
    <!--Font Awesome-->
    <link rel="stylesheet" href="../../system/vendor/fontawesome/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="../../system/vendor/fontawesome/css/fontawesome.css">
    <!--Animate CSS-->
    <link rel="stylesheet" href="../../system/vendor/animate/css/animate.min.css">
    <!--Croppie-->
    <link rel="stylesheet" href="../../system/vendor/croppie/css/croppie.css">

    <title>SkoolTech Solutions</title>
  </head>
  <body>
    <!--Page loader-->
    <div class="loader-wrapper">
        <div class="loader-circle">
            <div class="loader-wave"></div>
        </div>
    </div>
    <!--Page loader-->
    
    <!--Page Wrapper-->

    <div class="container-fluid">

        <!--Header-->
        <div class="row header shadow-sm">
            
            <!--Logo-->
            <div class="col-sm-3 pl-0 text-center header-logo">
               <div class="bg-theme mr-3 pt-3 pb-2 mb-0">
                    <h4 class="logo"><a href="#" class="text-secondary logo">Land Transportation Office</a></h4>
               </div>
            </div>
            <!--Logo-->

            <!--Header Menu-->
            <div class="col-sm-9 header-menu pt-2 pb-0">
                <div class="row">
                    
                    <!--Menu Icons-->
                    <div class="col-sm-4 col-8 pl-0">

                        <!--Toggle sidebar-->
                        <span class="menu-icon" onclick="toggle_sidebar()">
                            <span id="sidebar-toggle-btn"></span>
                        </span>
                        <!--Toggle sidebar-->
                        
                    </div>
                    <!--Menu Icons-->

                    <!--Search box and avatar-->
                    <div class="col-sm-8 col-4 text-right flex-header-menu justify-content-end">
                        <div class="p-3">
                            <p id="user-global-name" class=""><?php echo $name;?></p>
                        </div>
                        <div class="mr-4">
                            <a class="" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img id="user-global-image" src="<?php echo $image;?>" class="rounded-circle" width="40px" height="40px">
                            </a>
                            <div class="dropdown-menu dropdown-menu-right mt-13" aria-labelledby="dropdownMenuLink">
                                <a class="dropdown-item" href="#" onclick="toggle_menu('profile_settings')"><i class="fa fa-user pr-2"></i> Profile</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" onclick="$('#logout-modal').modal('show');"><i class="fa fa-power-off pr-2"></i> Logout</a>
                            </div>
                        </div>
                    </div>
                    <!--Search box and avatar-->
                </div>    
            </div>
            <!--Header Menu-->
        </div>
        <!--Header-->

        <!--Main Content-->

        <div class="row main-content">
            <!--Sidebar left-->
            <div class="col-sm-3 col-xs-6 sidebar pl-0">
                <div class="inner-sidebar mr-3">
                    <!--Image Avatar-->
                    <div class="avatar text-center">
                        <img id="global-client-logo" src="../../system/images/lto-logo.png" alt="" class="rounded-circle" />
                        <p id="global-client-name"><strong></strong></p>
                    </div>
                    <!--Image Avatar-->

                    <!--Sidebar Navigation Menu-->
                    <div class="sidebar-menu-container">
                        <ul class="sidebar-menu mt-4 mb-4">
                            <li class="parent">
                                <a href="#" onclick="toggle_menu('dashboard'); return false" class=""><i class="fa fa-dashboard mr-3"> </i>
                                    <span class="none">Dashboard</span>
                                </a>
                            </li>
                            <li class="parent">
                                <a href="#" onclick="toggle_menu('manage_registration')" class=""><i class="fas fa-user-circle mr-3"></i>
                                    <span class="none">Manage Registration</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!--Sidebar Naigation Menu-->
                </div>
            </div>
            <!--Sidebar left-->

            <!--Content right-->
            <div id="dashboard" class="col-sm-9 col-xs-12 content pt-3 pl-0 page">
                <h5 class="mb-3" ><strong>Dashboard</strong></h5>
                
                <!--Dashboard widget-->
                <div class="mt-1 mb-3 button-container">
                    <div class="row pl-0">
                        <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                            <div class="bg-theme border shadow rounded">
                                <div class="p-2 text-center">
                                    <h5 class="mb-0 mt-2 text-light"><small><strong>TOTAL REGISTERED VEHICLE</strong></small></h5>
                                    <h1 id="dashboard-total">0</h1>
                                </div>
                                <!--<div class="align-bottom">
                                    <span id="incomeBarCol"></span>
                                </div>-->
                                <div class="text-center text-light">
                                    
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                            <div class="bg-success border shadow rounded">
                                <div class="p-2 mb-1 text-center">
                                    <h5 class="mb-0 mt-2 text-light"><small><strong>NOT EXPIRED REGISTRATION</strong></small></h5>
                                    <h1 class="text-white" id="dashboard-not-expired">0</h1>
                                </div>
                                <!--<div class="align-bottom">
                                    <span id="profitBarCol"></span>
                                </div>-->
                                <div class="text-center text-light">
                                    
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-3">
                            <div class="bg-danger border shadow rounded">
                                <div class="p-2 text-center">
                                    <h5 class="mb-0 mt-2 text-light"><small><strong>EXPIRED REGISTRATION</strong></small></h5>
                                    <h1 class="text-white" id="dashboard-expired">0</h1>
                                </div>
                                <!--<div class="align-bottom">
                                    <span id="expensesBarCol"></span>
                                </div>-->
                                <div class="text-center text-light">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--/Dashboard widget-->

            </div> <!-- Dashboard -->

            <div id="manage_registration" class="col-sm-9 col-xs-12 content pt-3 pl-0 page">
                <h5 class="mb-3" ><strong>Manage Registration</strong></h5>
                <!--Datatable-->
                <div class="row mt-3">
                    <div class="col-sm-12">
                        <!--Datatable-->
                        <div class="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                            <button class="btn bg-theme mb-2 float-right" onclick="addRegistration()"><span class="fa fa-plus"></span> Register a Vehicle</button>
                            <h6 class="mb-2">Vehicle List</h6>
                            <div class="table-responsive">
                                <div id="manage-registration-table-container"></div>
                            </div>
                        </div>
                        <!--/Datatable-->
                    </div>
                </div>

            </div> <!-- Manage Registration -->

            <div id="profile_settings" class="col-sm-9 col-xs-12 content pt-3 pl-0 page">
                <h5 class="mb-3" ><strong>Profile Settings</strong></h5>

                <div class="row mt-3">
                    <div class="col-sm-12">
                        <!--Default elements-->
                        <div class="mt-1 mb-3 p-3 button-container bg-white border shadow-sm">
                            
                            <form class="form-horizontal mt-4 mb-5">
                                <div class="mb-4">
                                <input type="file" accept="image/*" onchange="loadProfileImage(event)" style="display:none;" id="load-profile-picture-btn">
                                    <img id="profile-settings-picture" src="../../system/images/blank-profile.png" onclick="$('#load-profile-picture-btn').click()" width="150" >
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-2" for="profile-settings-name">Name:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="profile-settings-name" placeholder="Your name" />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="control-label col-sm-2" for="profile-settings-username">Username:</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="profile-settings-username" placeholder="Your username" />
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-sm-12" align="right">
                                        <button class="form-control btn bg-danger text-white col-sm-2" onclick="profileChangePassword()">Change Password</button>
                                        <button class="form-control btn bg-theme col-sm-2" onclick="saveProfileSettings()">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!--Footer-->
                <div class="row mt-5 mb-2 footer">
                    <div class="col-sm-8 text-right">
                        <span>&copy; All rights reserved 2021 designed by <a class="text-theme" href="#">SkoolTech Solutions</a></span>
                    </div>
                    <div class="col-sm-4 text-left">
                        <a href="#" class="ml-2">Contact Us</a>
                        <a href="#" class="ml-2">Support</a>
                    </div>
                </div>
                <!--Footer-->

            </div> <!-- Profile Settings -->
        </div>

        <!--Main Content-->

    </div>

    <!--Page Wrapper-->

    <!-- Modals -->

    <!-- Dashboard Modals -->

    <!-- Manage Registration Modals -->
    <div class="modal fade" id="manage-registration-add-edit-registration-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="manage-registration-add-edit-registration-modal-title">Register a Vehicle</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearAddEditRegistrationModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div align="center">
                            <input type="file" accept="image/*" onchange="loadVehicleImage(event)" style="display:none;" id="load-vehicle-image-btn">
                            <img class="rounded" width="150" src="../../system/images/blank-profile.png" id="registration-image" onclick="$('#load-vehicle-image-btn').click()">
                        </div>
                        <div class="form-group">
                            <label for="registration-platenumber" class="col-form-label">Plate Number:</label>
                            <input type="text" class="form-control" id="registration-platenumber">
                        </div>
                        <div class="form-group">
                            <label for="registration-regdate" class="col-form-label">Registration Date:</label>
                            <input type="date" class="form-control" id="registration-regdate">
                        </div>
                        <div class="form-group">
                            <label for="registration-expdate" class="col-form-label">Expiration Date:</label>
                            <input type="date" class="form-control" id="registration-expdate">
                        </div>
                        <div class="form-group">
                            <label for="registration-owner" class="col-form-label">Owner Name:</label>
                            <input type="text" class="form-control" id="registration-owner">
                        </div>
                        <div class="form-group">
                            <label for="registration-address" class="col-form-label">Address:</label>
                            <textarea class="form-control" id="registration-address"></textarea>
                        </div>
                    </form>
                    <p id="save-registration-error" class="text-danger font-italic small"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="clearAddEditRegistrationModal()">Close</button>
                    <button type="button" class="btn btn-primary" onclick="saveRegistration()">Save</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Vehicle Image Editor Modal -->
    <div class="modal" id="vehicle-image-editor-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-secondary"><strong>Vehicle Image Editor</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="vehicleImageEditorCancel()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img id="vehicle-image-editor-buffer">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="vehicleImageEditorRotate()">Rotate</button>
                    <button type="button" class="btn btn-theme" data-dismiss="modal" id="vehicle-image-editor-ok-btn">Ok</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Change Password Modal -->
    <div class="modal fade" id="change-password-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="manage-account-add-edit-account-modal-title">Change Password</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearChangePasswordModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="profile-setting-old-password" class="col-form-label">Old Password:</label>
                            <input type="text" class="form-control" id="profile-setting-old-password">
                        </div>
                        <div class="form-group">
                            <label for="profile-setting-new-password" class="col-form-label">New Password:</label>
                            <input type="text" class="form-control" id="profile-setting-new-password">
                        </div>
                        <div class="form-group">
                            <label for="profile-setting-retype-password" class="col-form-label">Retype Password:</label>
                            <input type="text" class="form-control" id="profile-setting-retype-password">
                        </div>
                    </form>
                    <p id="change-password-modal-error" class="text-danger font-italic small"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" onclick="clearChangePasswordModal()">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="savePassword()">Change</button>
                </div>
            </div>
        </div>
    </div>

    <!-- QR Code Modal -->
    <div class="modal fade" id="qr-code-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">QR Code</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div align="center">
                        <canvas id="qr_code"></canvas>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"">Close</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Profile Image Editor Modal -->
    <div class="modal" id="profile-image-editor-modal" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-secondary"><strong>Profile images Editor</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="profileImageEditorCancel()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img id="profile-image-editor-buffer">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="profileImageEditorRotate()">Rotate</button>
                    <button type="button" class="btn btn-theme" data-dismiss="modal" id="profile-image-editor-ok-btn">Ok</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Logout Modal -->
    <div class="modal fade" id="logout-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-secondary"><strong>Logout</strong></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Do you want to logout?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="logout()">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Page JavaScript Files-->
    <!-- jQuery -->
    <script src="../../system/vendor/jquery/js/jquery.min.js"></script>
    <script src="../../system/vendor/jquery/js/jquery.dataTables.min.js"></script>
    <!--Popper JS-->
    <script src="../../system/vendor/popper/js/popper.min.js"></script>
    <!--Bootstrap-->
    <script src="../../system/vendor/bootstrap/js/bootstrap.min.js"></script>
    <!--Datatables-->
    <script src="../../system/vendor/datatables/js/dataTables.bootstrap4.min.js"></script>
    <!--Sweet alert JS-->
    <script src="../../system/vendor/sweet-alert/js/sweetalert.js"></script>
    <!--Croppie-->
    <script src="../../system/vendor/croppie/js/croppie.js"></script>
    <!--QR-->
    <script src="../../system/vendor/qr/qr.min.js"></script>
    
    <!--Custom Js Script-->
    <script src="js/dashboard.js"></script>
    <script src="js/manage_registration.js"></script>
    <script src="js/profile_settings.js"></script>
    <script src="js/script.js"></script>
  </body>
</html>