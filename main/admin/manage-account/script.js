$(document).ready(function() {
    setTimeout(function(){
        $("#manage-account-menu").attr("href","#");
        $("#manage-account-menu").addClass("active");
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

getAccountList();
getUserDetails();
getClubList();
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

function getAccountList(){
    $.ajax({
		type: "POST",
		url: "get-account-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderAccountList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderAccountList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="manage-account-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Name</th>\
                                <th>Username</th>\
                                <th>Club</th>\
                                <th>Access</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var image = list.image;
        if(image == "" || image == undefined){
            image = "../../../system/images/blank-profile.png";
        }
        markUp += '<tr>\
                        <td>'+list.name+'</td>\
                        <td>'+list.username+'</td>\
                        <td>'+list.club+'</td>\
                        <td>'+list.access+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editAccount(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteAccount(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#manage-account-table-container").html(markUp);
    $("#manage-account-table").DataTable();
}

function getClubList(){
    $.ajax({
		type: "POST",
		url: "get-club-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderClubList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderClubList(data){
    var lists = JSON.parse(data);
    var markUp = '<div class="form-group" id="club-container">\
                        <label for="account-club" class="col-form-label">Club:</label>\
                        <select class="form-control" id="account-club">\
                            <option value="">SELECT CLUB</option>';
    lists.forEach(function(list){
        markUp += '<option value="'+list.idx+'">'+list.name+'</option>';
    })
    markUp += '</select></div>';
    $("#club-select-container").html(markUp);
    $("#club-container").hide();
}

function accessChange(){
    var access = $("#account-access").val();
    if(access == "president"){
        $("#club-container").show();
    }else{
        $("#club-container").hide();
        $("#account-club").val("");
    }
}

function addAccount(){
    manageAccountIdx = "";
    $("#add-edit-account-modal").modal("show");
    $("#save-account-error").text("");
}

function saveAccount(){
    var name = $("#account-name").val();
    var username = $("#account-username").val();
    var club = $("#account-club").val();
    var access = $("#account-access").val();
    var status = $("#account-status").val();

    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else if(username == "" || username == undefined){
        error = "*Username field should not be empty.";
    }else if(access == "" || access == undefined){
        error = "*Please select access level!";
    }else if(access == "president" && club == ""){
        error = "*Please select club!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-account.php",
            dataType: 'html',
            data: {
                idx:manageAccountIdx,
                name:name,
                username:username,
                club:club,
                access:access,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-account-modal").modal("hide");
                    getAccountList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#save-account-error").text(error);
}

function editAccount(idx){
    manageAccountIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-account-detail.php",
        dataType: 'html',
        data: {
            idx:idx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditAccount(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditAccount(data){
    var lists = JSON.parse(data);

    lists.forEach(function(list){
        $("#account-name").val(list.name);
        $("#account-username").val(list.username);
        $("#account-access").val(list.access);
        $("#account-status").val(list.status);

        $("#add-edit-account-modal-title").text("Edit " + list.name + "'s Account Details");
    })
    $("#save-account-error").text("");
    $("#add-edit-account-modal").modal("show");
    accessChange();
}

function deleteAccount(idx,name){
    if(confirm("Are you sure you want to delete this Account?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-account.php",
            dataType: 'html',
            data: {
                idx:idx,
                name:name
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getAccountList();
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