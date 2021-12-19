var updateManageRegistrationFlag = false;
var manageRegistrationIdx;

function updateManageRegistration(){
    if(updateManageRegistrationFlag == false){
        updateManageRegistrationFlag = true;
        getRegistrationList();
    }
}

function getRegistrationList(){
    $.ajax({
		type: "POST",
		url: "backend/manage-registration/get-registration-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderRegistrationList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderRegistrationList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="manage-registration-table" class="table table-striped table-bordered">\
                        <thead>\
                            <tr>\
                                <th>Image</th>\
                                <th>Plate Number</th>\
                                <th>Registration Date</th>\
                                <th>Expiration Date</th>\
                                <th>Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var image = list.image;
        if(image == "" || image == undefined){
            image = "../../system/images/blank-profile.png";
        }
        markUp += '<tr>\
                        <td>\
                            <img src="'+image+'" class="rounded" width="40px" height="40px">\
                        </td>\
                        <td>'+list.platenumber+'</td>\
                        <td>'+list.regdate+'</td>\
                        <td>'+list.expdate+'</td>\
                        <td>\
                            <button class="btn btn-theme" onclick="viewQRCode(\''+ list.idx +'\')"><i class="fas fa-qrcode"></i></button>\
                            <button class="btn btn-success" onclick="editRegistration(\''+ list.idx +'\',\''+list.platenumber+'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger" onclick="deleteRegistration(\''+ list.idx +'\',\''+list.platenumber+'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#manage-registration-table-container").html(markUp);
    $("#manage-registration-table").DataTable();
}


function addRegistration(){
    manageRegistrationIdx = "";
    $("#manage-registration-add-edit-registration-modal").modal("show");
}

function saveRegistration(){
    var image = $("#registration-image").attr("src");
    var plateNumber = $("#registration-platenumber").val();
    var regDate = $("#registration-regdate").val();
    var expDate = $("#registration-expdate").val();
    var owner = $("#registration-owner").val();
    var address = $("#registration-address").val();

    var error;
    if(plateNumber == "" || plateNumber == undefined){
        error = "*Plate number field should not be empty.";
    }else if(regDate == "" || regDate == undefined){
        error = "*Registration date field should not be empty.";
    }else if(expDate == "" || expDate == undefined){
        error = "*Expiration date field should not be empty.";
    }else if(owner == "" || owner == undefined){
        error = "*Owner field should not be empty.";
    }else if(address == "" || address == undefined){
        error = "*Address field should not be empty.";
    }else{
        $("#manage-registration-add-edit-registration-modal").modal("hide");
        clearAddEditRegistrationModal();

        $.ajax({
            type: "POST",
            url: "backend/manage-registration/save-registration.php",
            dataType: 'html',
            data: {
                idx: manageRegistrationIdx,
                image: image,
                platenumber: plateNumber,
                regdate: regDate,
                expdate: expDate,
                owner: owner,
                address: address
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    alert(resp[1]);
                    getRegistrationList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#save-registration-error").text(error);
}

function clearAddEditRegistrationModal(){
    $("#registration-image").attr("src","../../system/images/blank-profile.png");
    $("#registration-platenumber").val("");
    $("#registration-regdate").val("");
    $("#registration-expdate").val("");
    $("#registration-owner").val("");
    $("#registration-address").val("");
}

function viewQRCode(idx){
    $.ajax({
        type: "POST",
        url: "backend/manage-registration/get-qr-code.php",
        dataType: 'html',
        data: {
            idx:idx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderQrCode(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderQrCode(code){
    (function() {
        qr = new QRious({
            element: document.getElementById('qr_code'),
            size: 400,
            value: code
        });
    })();

    $("#qr-code-modal").modal("show");
}

function editRegistration(idx, plateNumber){
    manageRegistrationIdx = idx;
    $.ajax({
        type: "POST",
        url: "backend/manage-registration/get-registration-detail.php",
        dataType: 'html',
        data: {
            idx:idx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderRegistration(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderRegistration(data){
    var lists = JSON.parse(data);
    var image;
    var plateNumber;
    var regDate;
    var expDate;
    var owner;
    var address;
    lists.forEach(function(list){
       image = list.image;
       plateNumber = list.platenumber;
       regDate = list.regdate;
       expDate = list.expdate;
       owner = list.owner;
       address = list.address;
    })

    if(image == ""){
        image = "../../system/images/blank-profile.png";
    }

    $("#registration-image").attr("src",image);
    $("#registration-platenumber").val(plateNumber);
    $("#registration-regdate").val(regDate);
    $("#registration-expdate").val(expDate);
    $("#registration-owner").val(owner);
    $("#registration-address").val(address);
    
    $("#manage-registration-add-edit-registration-modal").modal("show");
}

function deleteRegistration(idx,plateNumber){
    if(confirm("Are you sure you want to delete vehicle registration with plate number " + plateNumber +"\n\n This Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "backend/manage-registration/delete-registration.php",
            dataType: 'html',
            data: {
                idx:idx,
                platenumber: plateNumber
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    alert(resp[1]);
                    getRegistrationList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

var vehicleImage;
var loadVehicleImage= function(event){
	var reader = new FileReader();
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

        $('#manage-registration-add-edit-registration-modal').modal('hide');
        $('#vehicle-image-editor-modal').modal('show');
		$('#vehicle-image-editor-ok-btn').on('click', function() {
			vehicleImage.result('base64').then(function(dataImg) {
				var data = [{ image: dataImg }, { name: 'myimage.jpg' }];
                $('#vehicle-image-editor-modal').modal('hide');
                $('#manage-registration-add-edit-registration-modal').modal('show');
				$('#registration-image').attr('src', dataImg);
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