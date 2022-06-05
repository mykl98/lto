$(document).ready(function() {
    setTimeout(function(){
        $("#dashboard-menu").attr("href","#");
        $("#dashboard-menu").addClass("active");
    },100)
});

$(document).on('shown.lte.pushmenu', function(){
    $("#global-department-name").show();
    $("#global-client-logo").attr("width","100px");
})

$(document).on('collapsed.lte.pushmenu', function(){
    $("#global-department-name").hide();
    $("#global-client-logo").attr("width","40px");
})

$(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal.show').length && $(document.body).addClass('modal-open');
});

getUserDetails();
getVehicleList()

var baseUrl = $("#base-url").text();

function getUserDetails(){
    $.ajax({
        type: "POST",
        url: "get-profile-settings.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderUserDetails(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderUserDetails(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        if(list.image != ""){
            $("#global-user-image").attr("src", list.image);
        }
        $("#global-user-name").text(list.name);
    })

}

function getVehicleList(){
    $.ajax({
		type: "POST",
		url: "get-vehicle-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVehicleList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVehicleList(data){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    if(month < 10){
        month = "0" + month;
    }
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var nowDate = year + "-" + month + "-" + day;

    var lists = JSON.parse(data);
    var markUp = '<table id="vehicle-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Plate Number</th>\
                                <th>Registration Date</th>\
                                <th>Expiration Date</th>\
                                <th>Violation Ticket</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var regDate = list.regdate;
        var expDate = list.expdate;
        var status;
        //alert(expDate + "   " + nowDate);
        if(expDate >= nowDate){
            status = '<span class="badge badge-success">Registered</span>';
        }else{
            status = '<span class="badge badge-danger">Expired</span>';
        }
        markUp += '<tr>\
                        <td>'+list.platenumber+'</td>\
                        <td>'+regDate+'</td>\
                        <td>'+expDate+'</td>\
                        <td>'+list.ticket+'</td>\
                        <td>'+status+'</td>\
                        <td>\
                            <button class="btn btn-warning btn-sm" onclick="viewViolation(\''+ list.idx +'\')"><i class="fa fa-eye"></i></button>\
                            <button class="btn btn-dark btn-sm" onclick="viewQRCode(\''+ list.idx +'\')"><i class="fa fa-qrcode"></i></button>\
                            <!--button class="btn btn-success btn-sm" onclick="editVehicle(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteVehicle(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button-->\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vehicle-table-container").html(markUp);
    $("#vehicle-table").DataTable();
}

function addVehicle(){
    vehicleIdx = "";
    $("#vehicle-image").attr("src", baseUrl + "/system/images/no-image-available.jpg");
    $("#add-edit-vehicle-modal").modal("show");
    $("#add-edit-vehicle-modal-title").text("Add New Vehicle");
    $("#add-edit-vehicle-modal-error").text("");
}

function saveVehicle(){
    var image = $("#vehicle-image").attr("src");
    var plateNumber = $("#vehicle-platenumber").val();
    var brand = $("#vehicle-brand").val();
    var model = $("#vehicle-model").val();
    var chassis = $("#vehicle-chassis").val();
    var engine = $("#vehicle-engine").val();
    var color = $("#vehicle-color").val();
    var regDate = $("#vehicle-regdate").val();
    var expDate = $("#vehicle-expdate").val();
    var error = "";

    if(plateNumber == "" || plateNumber == undefined){
        error = "*Plate Number field should not be empty.";
    }else if(brand == "" || brand == undefined){
        error = "*Brand field should not be empty.";
    }else if(model == "" || model == undefined){
        error = "*Model field should not be empty.";
    }else if(chassis == "" || chassis == undefined){
        error = "*Chassis Number field should not be empty.";
    }else if(engine == "" || engine == undefined){
        error = "*Engine Number field should not be empty.";
    }else if(color == "" || color == undefined){
        error = "*Vehicle Color field should not be empty.";
    }else if(regDate == "" || regDate == undefined){
        error = "*Registration Date field should not be empty.";
    }else if(expDate == "" || expDate == undefined){
        error = "*Expiration Date field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-vehicle.php",
            dataType: 'html',
            data: {
                idx:vehicleIdx,
                image:image,
                platenumber:plateNumber,
                brand:brand,
                model:model,
                chassis:chassis,
                engine:engine,
                color:color,
                regdate:regDate,
                expdate:expDate
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-vehicle-modal").modal("hide");
                    getVehicleList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-vehicle-modal-error").text(error);
}

function editVehicle(idx){
    vehicleIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-vehicle-detail.php",
        dataType: 'html',
        data: {
            idx:vehicleIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditVehicle(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditVehicle(data){
    var lists = JSON.parse(data); 
    lists.forEach(function(list){
        $("#vehicle-image").attr("src",list.image);
        $("#vehicle-platenumber").val(list.platenumber);
        $("#vehicle-brand").val(list.brand);
        $("#vehicle-model").val(list.model);
        $("#vehicle-chassis").val(list.chassis);
        $("#vehicle-engine").val(list.engine);
        $("#vehicle-color").val(list.color);
        $("#vehicle-regdate").val(list.regdate);
        $("#vehicle-expdate").val(list.expdate);
    })
    $("#add-edit-vehicle-modal-title").text("Edit Vehicle Details");
    $("#add-edit-vehicle-modal-error").text("");
    $("#add-edit-vehicle-modal").modal("show");
}

function deleteVehicle(idx){
    if(confirm("Are you sure you want to delete this Vehicle Registration?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-vehicle.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getVehicleList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

function viewViolation(idx){
    $.ajax({
		type: "POST",
		url: "get-violation-list.php",
		dataType: 'html',
		data: {
			idx:idx
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderViolationList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderViolationList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="violation-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Date</th>\
                                <th>Time</th>\
                                <th>Enforcer</th>\
                                <th>Violation</th>\
                                <th>Status</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var status = list.status;
        if(status == "settled"){
            status = '<span class="badge badge-success">Settled</span>';
        }else if(status == "cancelled"){
            status = '<span class="badge badge-danger">Cancelled</span>';
        }else{
            status = '<span class="badge badge-info">Pending</span>';
        }
        markUp += '<tr>\
                        <td>'+list.date+'</td>\
                        <td>'+list.time+'</td>\
                        <td>'+list.enforcer+'</td>\
                        <td>'+list.violation+'</td>\
                        <td>'+status+'</td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#violation-table-container").html(markUp);
    $("#violation-table").DataTable();
    $("#view-violation-modal").modal("show");
}

function viewQRCode(idx){
    $.ajax({
		type: "POST",
		url: "get-qr-code.php",
		dataType: 'html',
		data: {
			idx:idx
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderQRCode(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderQRCode(data){
    var lists = JSON.parse(data);
    var qr;
    lists.forEach(function(list){
        qr = list.qr;
    })
    var qrCode = (function() {
        qr = new QRious({
            element: document.getElementById('qr_code'),
            size: 300,
            value: qr
        });
    })();

    $("#view-qr-modal").modal("show");
}

var vehicleImage;
var reader;
var loadVehicleImage = function(event){
	reader = new FileReader();
	reader.onload = function(e) {
		$('#vehicle-image-editor-buffer').attr('src', e.target.result);

        if(vehicleImage){
            vehicleImage.destroy();
        }

		vehicleImage = new Croppie($('#vehicle-image-editor-buffer')[0], {
			viewport: { width: 300, height: 300,type:'square'},
			boundary: { width: 400, height: 400 },
            enableOrientation: true
		});

        $('#vehicle-image-editor-modal').modal('show');
		$('#vehicle-image-editor-ok-btn').on('click', function() {
			vehicleImage.result('base64').then(function(dataImg) {
				var data = [{ image: dataImg }, { name: 'myimage.jpg' }];
				$('#vehicle-image').attr('src', dataImg);
			});
		});
	}
	reader.readAsDataURL(event.target.files[0]);
}

function vehicleImageEditorCancel(){
	if(vehicleImage){
		vehicleImage.destroy();
    }
}

function vehicleImageEditorRotate(){
	vehicleImage.rotate(-90);
}

function logout(){
    $.ajax({
        type: "POST",
        url: "logout.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                window.open(baseUrl + "/index.php","_self")
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}
