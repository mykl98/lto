$(document).ready(function() {
    setTimeout(function(){
        $("#settle-violation-menu").attr("href","#");
        $("#settle-violation-menu").addClass("active");
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

getTicketList();
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

function getTicketList(){
    $.ajax({
		type: "POST",
		url: "get-ticket-list.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
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
                                <th>Enforcer</th>\
                                <th>Plate Number</th>\
                                <th>Violation Description</th>\
                                <th>Enforcer</th>\
                                <th>Processed By</th>\
                                <th>Status</th>\
                                <th style="max-width:50px;min-width:50px;">Action</th>\
                            </tr>\
                        </thead>\
                        <tbody>';
    lists.forEach(function(list){
        var status = list.status;
        var button = "";
        if(status == "settled"){
            status = '<span class="badge badge-success">Settled</span>';
        }else if(status == "cancelled"){
            status = '<span class="badge badge-danger">Cancelled</span>';
        }else{
            button = '<button class="btn btn-success btn-sm" onclick="settleTicket(\''+ list.idx +'\')"><i class="fa fa-check"></i></button>\
                      <button class="btn btn-danger btn-sm" onclick="cancelTicket(\''+ list.idx +'\')"><i class="fa fa-times"></i></button>';
        }
        markUp += '<tr>\
                        <td>'+list.date+'</td>\
                        <td>'+list.time+'</td>\
                        <td>'+list.enforcer+'</td>\
                        <td>'+list.platenumber+'</td>\
                        <td>'+list.violation+'</td>\
                        <td>'+list.enforcer+'</td>\
                        <td>'+list.processedby+'</td>\
                        <td>'+status+'</td>\
                        <td>'+button+'</td>\
                   </tr>';
    })
    markUp += '</tbody></table>';
    $("#ticket-table-container").html(markUp);
    $("#ticket-table").DataTable();
}

function cancelTicket(idx){
    if(confirm("Are you sure you want to cancel this Violation Ticket?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "cancel-violation.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getTicketList();
                }else if(resp[0] == "false"){
                    alert(resp[1]);
                } else{
                    alert(response);
                }
            }
        });
    }
}

function settleTicket(idx){
    if(confirm("Are you sure you want to settle this Violation Ticket?\nThis Action cannot be undone!")){
        $.ajax({
            type: "POST",
            url: "settle-violation.php",
            dataType: 'html',
            data: {
                idx:idx
            },
            success: function(response){
                var resp = response.split("*_*");
                if(resp[0] == "true"){
                    getTicketList();
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