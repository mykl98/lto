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
getViolationList();
reset();

var baseUrl = $("#base-url").text();
var vehicleIdx;

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

function scanQRCode(){
    reset();
    html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader", { fps: 10, qrbox: 200 });
    html5QrcodeScanner.render(onScanSuccess, onScanError);
}

function getVehicleData(code){
    $.ajax({
		type: "POST",
		url: "get-vehicle-data.php",
		dataType: 'html',
		data: {
			qr:code
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderVehicleData(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderVehicleData(data){
    var lists = JSON.parse(data);
    lists.forEach(function(list){
        vehicleIdx = list.idx;
        $("#vehicle-image").attr("src",list.image);
        $("#vehicle-platenumber").val(list.platenumber);
        $("#vehicle-brand").val(list.brand);
        $("#vehicle-model").val(list.model);
        $("#vehicle-chassis").val(list.chassis);
        $("#vehicle-engine").val(list.engine);
        $("#vehicle-color").val(list.color);
        $("#vehicle-regdate").val(list.regdate);
        $("#vehicle-expdate").val(list.expdate);
        $("#vehicle-owner").val(list.owner);
    })
    $("#qr-reader-page").hide();
    $("#result-page").show();
    $("#ticket-card").show();
    violationFilterChange();
}

function violationFilterChange(){
    var filter = $("#violation-filter").val();
    getTicketList(filter,vehicleIdx);
}

function getTicketList(filter,vehicleIdx){
    $.ajax({
		type: "POST",
		url: "get-ticket-list.php",
		dataType: 'html',
		data: {
            vehicleidx:vehicleIdx,
			filter:filter
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderTicketList(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderTicketList(data){
    var lists = JSON.parse(data);
    var markUp = '<table id="ticket-table" class="table table-striped table-bordered table-sm">\
                        <thead>\
                            <tr>\
                                <th>Date</th>\
                                <th>Time</th>\
                                <th>Violation Description</th>\
                                <th>Enforcer</th>\
                                <th>Processed By</th>\
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
                        <td>'+list.violation+'</td>\
                        <td>'+list.enforcer+'</td>\
                        <td>'+list.processedby+'</td>\
                        <td>'+status+'</td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#ticket-table-container").html(markUp);
    $("#ticket-table").DataTable();
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
                                <th style="max-width:25px;min-width:25px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        markUp += '<tr>\
                        <td>'+list.code+'</td>\
                        <td>'+list.description+'</td>\
                        <td>'+list.amount+'</td>\
                        <td>\
                            <button class="btn btn-success btn-sm" onclick="confirmViolation(\''+ list.idx +'\')"><i class="fa fa-plus"></i></button>\
                        </td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#violation-table-container").html(markUp);
    $("#violation-table").DataTable();
}

function addViolation(){
    $("#add-violation-modal").modal("show");
}

function confirmViolation(idx){
    if(confirm("Are you sure you want to add this violation ticket? This ticket can only be cancelled at the main office!")){
        $.ajax({
            type: "POST",
            url: "add-violation-ticket.php",
            dataType: 'html',
            data: {
                vehicleidx:vehicleIdx,
                violationidx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    $("#add-violation-modal").modal("hide");
                    violationFilterChange();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

function reset(){
    $("#qr-reader-page").show();
    $("#result-page").hide();
    $("#ticket-card").hide();
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

var lastResult, countResults = 0;
var html5QrcodeScanner;

function onScanSuccess(decodedText, decodedResult) {
    getVehicleData(decodedText);
    html5QrcodeScanner.clear();
}

// Optional callback for error, can be ignored.
function onScanError(qrCodeError) {
    // This callback would be called in case of qr code scan error or setup error.
    // You can avoid this callback completely, as it can be very verbose in nature.
    //alert(qrCodeError);
    //html5QrcodeScanner.clear();
}
