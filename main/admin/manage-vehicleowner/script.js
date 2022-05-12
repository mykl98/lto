$(document).ready(function() {
    setTimeout(function(){
        $("#manage-vehicleowner-menu").attr("href","#");
        $("#manage-vehicleowner-menu").addClass("active");
    },100)
})

$(document).on('shown.lte.pushmenu', function(){
    $("#global-department-name").show();
    $("#global-client-logo").attr("width","100px");
})

$(document).on('collapsed.lte.pushmenu', function(){
    $("#global-department-name").hide();
    $("#global-client-logo").attr("width","40px");
})

$(".modal").on("hidden.bs.modal",function(){
    $(this).find("form").trigger("reset");
})

getVehicleOwnerList();
getUserDetails();
var violationIdx;
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

function getVehicleOwnerList(){
    $.ajax({
		type: "POST",
		url: "get-vehicleowner-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVehicleOwnerList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVehicleOwnerList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="vehicleowner-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Address</th>\
                                <th>Phone Number</th>\
                                <th>Username</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.address+'</td>\
                        <td>'+list.phone+'</td>\
                        <td>'+list.username+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editVehicleOwner(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteVehicleOwner(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vehicleowner-table-container").html(markUp);
    $("#vehicleowner-table").DataTable();
}

function addVehicleOwner(){
    vehicleOwnerIdx = "";
    $("#add-edit-vehicleowner-modal").modal("show");
    $("#add-edit-vehicleowner-modal-title").text("Create New Vehicle Owner");
    $("#add-edit-vehicleowner-modal-error").text("");
}

function saveVehicleOwner(){
    var name = $("#vehicleowner-name").val();
    var address = $("#vehicleowner-address").val();
    var phone = $("#vehicleowner-phone").val();
    var username = $("#vehicleowner-username").val();
    var status = $("#vehicleowner-status").val();
    var error = "";

    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else if(address == "" || address == undefined){
        error = "*Address field should not be empty.";
    }else if(phone == "" || phone == undefined){
        error = "*Phone Number field should not be empty.";
    }else if(username == "" || username == undefined){
        error = "*Username field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-vehicleowner.php",
            dataType: 'html',
            data: {
                idx:vehicleOwnerIdx,
                name:name,
                address:address,
                phone:phone,
                username:username,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-vehicleowner-modal").modal("hide");
                    getVehicleOwnerList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-vehicleowner-modal-error").text(error);
}

function editVehicleOwner(idx){
    vehicleOwnerIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-vehicleowner-detail.php",
        dataType: 'html',
        data: {
            idx:vehicleOwnerIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditVehicleOwner(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditVehicleOwner(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#vehicleowner-name").val(list.name);
        $("#vehicleowner-address").val(list.address);
        $("#vehicleowner-phone").val(list.phone);
        $("#vehicleowner-username").val(list.username);
        $("#cehicleowner-status").val(list.status);
    })
    $("#add-edit-vehicleowner-modal-title").text("Edit Vehicle Owner Details");
    $("#add-edit-vehicleowner-modal-error").text("");
    $("#add-edit-vehicleowner-modal").modal("show");
}

function deleteVehicleOwner(idx){
    if(confirm("Are you sure you want to delete this Vehicle Owner?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-vehicleowner.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getVehicleOwnerList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
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