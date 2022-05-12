$(document).ready(function() {
    setTimeout(function(){
        $("#manage-violation-menu").attr("href","#");
        $("#manage-violation-menu").addClass("active");
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

getViolationList();
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

function getViolationList(){
    $.ajax({
		type: "POST",
		url: "get-violation-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
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
                                <th>Code</th>\
                                <th>Description</th>\
                                <th>Penalty Amount</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.code+'</td>\
                        <td>'+list.description+'</td>\
                        <td>'+list.amount+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editViolation(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteViolation(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#violation-table-container").html(markUp);
    $("#violation-table").DataTable();
}

function addViolation(){
    violationIdx = "";
    $("#add-edit-violation-modal").modal("show");
    $("#add-edit-violation-modal-error").text("");
}

function saveViolation(){
    var code = $("#violation-code").val();
    var description = $("#violation-description").val();
    var amount = $("#violation-amount").val();
    var status = $("#violation-status").val();
    var error = "";

    if(code == "" || code == undefined){
        error = "*Code field should not be empty!";
    }else if(description == "" || description == undefined){
        error = "*Description field should not be empty!";
    }else if(amount == "" || amount == undefined){
        error = "*Penalty amount field should not be empty!";
    }else{
        $.ajax({
            type: "POST",
            url: "save-violation.php",
            dataType: 'html',
            data: {
                idx:violationIdx,
                code:code,
                description:description,
                amount:amount,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-violation-modal").modal("hide");
                    getViolationList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-violation-modal-error").text(error);
}

function editViolation(idx){
    violationIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-violation-detail.php",
        dataType: 'html',
        data: {
            idx:violationIdx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditViolation(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditViolation(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        $("#violation-code").val(list.code);
        $("#violation-description").val(list.description);
        $("#violation-amount").val(list.amount);
        $("#violation-status").val(list.status);
    })
    $("#add-edit-violation-modal-title").text("Edit Violation Details");
    $("#add-edit-violation-modal-error").text("");
    $("#add-edit-violation-modal").modal("show");
}

function deleteViolation(idx){
    if(confirm("Are you sure you want to delete this Violation Code?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-violation.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getViolationList();
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