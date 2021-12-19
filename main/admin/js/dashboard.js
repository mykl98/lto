getServerData();

function getServerData(){
    $.ajax({
		type: "POST",
		url: "backend/dashboard/get-server-data.php",
		dataType: 'html',
		data: {
			dummy:"dummy"
		},
		success: function(response){
			var resp = response.split("*_*");
			if(resp[0] == "true"){
				renderServerData(resp[1]);
			}else if(resp[0] == "false"){
				alert(resp[1]);
			} else{
				alert(response);
			}
		}
	});
}

function renderServerData(data){
    console.log(data);
    lists = JSON.parse(data);
    var total;
    var notExpired;
    var expired;

    lists.forEach(function(list){
        total = list.total;
        notExpired = list.notexpired;
        expired = list.expired;
    })
    $("#dashboard-total").text(total);
    $("#dashboard-not-expired").text(notExpired);
    $("#dashboard-expired").text(expired);
}