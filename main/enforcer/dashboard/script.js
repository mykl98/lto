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
reset();

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

function scanQRCode(){
    var QRCodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    QRCodeScanner.render(onScanSuccess);
}

var prevDecodedText = "";

function onScanError(errorMessage) {
    // handle on error condition, with error message
    alert(errorMessage);
    QRCodeScanner.reset();
}

function onScanSuccess(decodedText, decodedResult) {
    if(prevDecodedText != decodedText){
        prevDecodedText = decodedText;
        var markUp = '<p class="text-center">'+prevDecodedText+'</p>';
        $("#markp").html(markUp);
    }
    QRCodeScanner.reset();
}

function reset(){
    var markUp = '<p class="text-center">---- No data to show ----</p>';
    $("#markup").html(markUp);
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
