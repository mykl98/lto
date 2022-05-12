$(document).ready(function() {
    setTimeout(function(){
        $("#manage-club-menu").attr("href","#");
        $("#manage-club-menu").addClass("active");
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

getClubList();
getUserDetails();
var clubIdx;
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
    var markUp = '<table id="club-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Logo</th>\
                                <th>Name</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var image = list.image;
        if(image == ""){
            image = baseUrl + "../../../system/images/blank-profile.png";
        }
        markUp += '<tr>\
                        <td>\
                            <img src="'+image+'" class="rounded" width="40">\
                        </td>\
                        <td>'+list.name+'</td>\
                        <td>'+list.status+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="editClub(\''+ list.idx +'\')"><i class="fa fa-pencil"></i></button>\
                            <button class="btn btn-danger btn-sm" onclick="deleteClub(\''+ list.idx +'\')"><i class="fas fa-trash"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#club-table-container").html(markUp);
    $("#club-table").DataTable();
}

function addClub(){
    clubIdx = "";
    $("#add-edit-club-modal").modal("show");
    $("#add-edit-club-modal-error").text("");
    $("#club-image").attr("src",baseUrl + "/system/images/blank-profile.png");
}

function saveClub(){
    var name = $("#club-name").val();
    var image = $("#club-image").attr("src");
    var status = $("#club-status").val();

    var error = "";
    if(name == "" || name == undefined){
        error = "*Name field should not be empty.";
    }else{
        $.ajax({
            type: "POST",
            url: "save-club.php",
            dataType: 'html',
            data: {
                idx:clubIdx,
                name:name,
                image:image,
                status:status
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-edit-club-modal").modal("hide");
                    getClubList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }

    $("#add-edit-club-modal-error").text(error);
}

function editClub(idx){
    clubIdx = idx;
    $.ajax({
        type: "POST",
        url: "get-club-detail.php",
        dataType: 'html',
        data: {
            idx:idx
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                renderEditClub(resp[1]);
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}

function renderEditClub(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        $("#club-name").val(list.name);
        $("#club-image").attr("src",list.image);
        $("#club-status").val(list.status);
    })
    $("#add-edit-club-modal-title").text("Edit Club Details");
    $("#add-edit-club-modal-error").text("");
    $("#add-edit-club-modal").modal("show");
}

function deleteClub(idx){
    if(confirm("Are you sure you want to delete this Club?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "delete-club.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getClubList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

var clubLogo;
var reader;
var loadClubLogo = function(event){
	reader = new FileReader();
	reader.onload = function(e) {
		$('#club-logo-editor-buffer').attr('src', e.target.result);

        if(clubLogo){
            clubLogo.destroy();
        }

		clubLogo = new Croppie($('#club-logo-editor-buffer')[0], {
			viewport: { width: 300, height: 300,type:'square'},
			boundary: { width: 400, height: 400 },
            enableOrientation: true
		});

        $('#club-logo-editor-modal').modal('show');
		$('#club-logo-editor-ok-btn').on('click', function() {
			clubLogo.result('base64').then(function(dataImg) {
				var data = [{ image: dataImg }, { name: 'myimage.jpg' }];
				$('#club-image').attr('src', dataImg);
			});
		});
	}
	reader.readAsDataURL(event.target.files[0]);
}

function clubLogoEditorCancel(){
	if(clubLogo){
		clubLogo.destroy();
    }
}

function clubLogoEditorRotate(){
	clubLogo.rotate(-90);
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