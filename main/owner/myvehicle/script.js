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
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#vehicle-table-container").html(markUp);
    $("#vehicle-table").DataTable();
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
            size: 400,
            value: qr
        });
    })();

    $("#view-qr-modal").modal("show");
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
