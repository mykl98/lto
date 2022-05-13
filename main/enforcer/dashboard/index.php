<?php
    include_once "../../../system/backend/config.php";
    session_start();
    $idx = $_SESSION["loginidx"];

    if($_SESSION["isLoggedIn"] == "true" && $_SESSION["access"] == "enforcer"){
    
    }else{
        session_destroy();
        header("location:".$baseUrl."/index.php");
        exit();
    }
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Admin | Dashboard</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/fontawesome/css/fontawesome-all.min.css">
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/fontawesome/css/fontawesome.css">
    <!--Bootstrap CSS-->
    <link rel="stylesheet" href="<?php echo $baseUrl?>/system/plugin/bootstrap/css/bootstrap.min.css">
    <!--Datatable-->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/datatables/css/dataTables.bootstrap4.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/adminlte/css/adminlte.min.css">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="<?php echo $baseUrl;?>/system/plugin/overlayScrollbars/css/OverlayScrollbars.min.css">
    <!-- Google Font: Source Sans Pro -->
    <link href="<?php echo $baseUrl;?>/system/plugin/googlefont/css/googlefont.min.css" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
        <!-- Top Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <p id="global-user-name" class="mr-2 mt-2">Michael Martin G. Abellana</p>
                    <p id="base-url" class="d-none"><?php echo $baseUrl;?></p>
                </li>
                <li class="nav-item">
                    <a class="" data-toggle="dropdown" href="#">
                        <img id="global-user-image" class="rounded-circle" src="<?php echo $baseUrl;?>/system/images/blank-profile.png" width="40px" height="40px">
                    </a>
                    <div class="dropdown-menu dropdown-menu-right mt-13" aria-labelledby="dropdownMenuLink">
                        <a class="dropdown-item" href="../profile-setting"><i class="fa fa-user pr-2"></i> Profile</a>
                            <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#" onclick="$('#logout-modal').modal('show');"><i class="fa fa-power-off pr-2"></i> Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- /Top Navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="#" class="brand-link text-center pb-0">
                <img id="global-client-logo" src="<?php echo $baseUrl;?>/system/images/logo.png" class="rounded-circle mb-2" width="100px">
                <p id="global-department-name" class="">Admin</p>
            </a>
            <?php include "../side-nav-bar.html"?>
        </aside>
        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div class="row mt-2">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Vehicle Details</h3>
                                <button class="btn btn-sm bg-warning float-right ml-2" onclick="reset()"><span class="fa fa-refresh"></span> Reset</button>
                                <button class="btn btn-sm bg-success float-right" onclick="scanQRCode()"><span class="fa fa-qrcode"></span> Scan QR Code</button>
                            </div>
                            <div class="card-body">
                                <div class="">
                                    <div id="qr-reader-page" align="center">
                                        <div id="qr-reader" style="width:300px"></div>
                                    </div>
                                    <div id="result-page">
                                        <div class="row">
                                            <div class="col">
                                                <div align="center">
                                                    <input type="file" accept="image/*" onchange="loadVehicleImage(event)" style="display:none;" id="load-vehicle-image-btn">
                                                    <img id="vehicle-image" class="rounded" width="250" src="<?php echo $baseUrl;?>/system/images/no-image-available.jpg" onclick="$('#load-vehicle-image-btn').click()">
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-platenumber" class="col-form-label">Plate Number:</label>
                                                    <input type="text" class="form-control" id="vehicle-platenumber" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-brand" class="col-form-label">Brand:</label>
                                                    <input type="text" class="form-control" id="vehicle-brand" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-model" class="col-form-label">model:</label>
                                                    <input type="text" class="form-control" id="vehicle-model" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-chassis" class="col-form-label">Chassis Number:</label>
                                                    <input type="text" class="form-control" id="vehicle-chassis" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-engine" class="col-form-label">Engine Number:</label>
                                                    <input type="text" class="form-control" id="vehicle-engine" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-color" class="col-form-label">Paint Color:</label>
                                                    <input type="text" class="form-control" id="vehicle-color" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-regdate" class="col-form-label">Registration Date:</label>
                                                    <input type="date" class="form-control" id="vehicle-regdate" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-expdate" class="col-form-label">Expiration Date:</label>
                                                    <input type="date" class="form-control" id="vehicle-expdate" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label for="vehicle-owner" class="col-form-label">Owner:</label>
                                                    <input type="text" class="form-control" id="vehicle-owner" readonly>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" id="ticket-card">
                    <div class="col">
                        <div class="card">
                            <div class="card-header">
                                <!--h3 class="card-title">Violation Tickets</h3-->
                                <button class="btn btn-sm bg-danger float-right" onclick="addViolation()"><span class="fa fa-Plus"></span> Add Violation</button>
                                <div class="input-group input-group-sm w-50">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-success">Filter</span>
                                    </div>
                                    <select class="" id="violation-filter" onchange="violationFilterChange()">
                                        <option value="all">ALL</optio>
                                        <option value="pending">Pending</option>
                                        <option value="settled">Settled</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <div id="ticket-table-container"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section><!-- /.content -->
        </div><!-- /.content-wrapper -->
        <footer class="main-footer">
            <strong>Copyright &copy; 2021 <a href="#">SkoolTech Solutions</a>.</strong>
                All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.0.4
            </div>
        </footer>
    </div>
    <!-- ./wrapper -->

    <!-- Add Violation Modal -->
    <div class="modal fade" id="add-violation-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Select Violation Ticket</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="clearAddEditAccountModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div id="violation-table-container"></div>
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

<!-- jQuery -->
<script src="<?php echo $baseUrl;?>/system/plugin/jquery/js/jquery.min.js"></script>
<script src="<?php echo $baseUrl;?>/system/plugin/jquery/js/jquery.dataTables.min.js"></script>
<!--Popper JS-->
<script src="<?php echo $baseUrl;?>/system/plugin/popper/js/popper.min.js"></script>
<!--Bootstrap-->
<script src="<?php echo $baseUrl;?>/system/plugin/bootstrap/js/bootstrap.min.js"></script>
<!-- Admin LTE -->
<script src="<?php echo $baseUrl;?>/system/plugin/adminlte/js/adminlte.js"></script>
<!-- overlayScrollbars -->
<script src="<?php echo $baseUrl;?>/system/plugin/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!--Datatables-->
<script src="<?php echo $baseUrl;?>/system/plugin/datatables/js/dataTables.bootstrap4.min.js"></script>
<!--QR Scanner-->
<script src="<?php echo $baseUrl;?>/system/plugin/qr-scanner/qr-scanner.min.js"></script>

<!-- Page Level Script -->
<script src="script.js"></script>
</body>
</html>
