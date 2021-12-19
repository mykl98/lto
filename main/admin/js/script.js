var ip = "192.168.1.10";
var flashCount;
var flashFlag = false;

var reCheckServerDelay = 2000;

var logo;
var clientName;
var color;

var userImage;
var userName;
var userUsername;

$(document).ready(function() {
    
    /*==============Page Loader=======================*/

    $(".loader-wrapper").fadeOut("slow");
    toggle_menu("dashboard");

    /*===============Page Loader=====================*/

    getUserDetails();
});

function getUserDetails(){
    $.ajax({
        type: "POST",
        url: "backend/profile-settings/get-profile-settings.php",
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
        userImage = list.image;
        userName = list.name;
        userUsername = list.username;
    })

    if(userImage == ""){
        userImage = "../../system/images/blank-profile.png";
    }
}

function updateGlobalProfileSettings(){
    $("#user-global-name").text(userName);
    $("#user-global-image").attr("src",userImage);
}

/*========== Toggle Sidebar width ============ */
function toggle_sidebar() {
    $('#sidebar-toggle-btn').toggleClass('slide-in');
    $('.sidebar').toggleClass('shrink-sidebar');
    $('.content').toggleClass('expand-content');
    
    //Resize inline dashboard charts
    $('#incomeBar canvas').css("width","100%");
    $('#expensesBar canvas').css("width","100%");
    $('#profitBar canvas').css("width","100%");
}

/*==============Switch Menu==================*/
function toggle_menu(page) {
    $(".page").hide();
    switch (page){
        case "dashboard":
            $("#dashboard").show();
            break;
        case "manage_registration":
            $("#manage_registration").show();
            updateManageRegistration();
            break;
        case "system_settings":
            $("#system_settings").show();
            updateSystemSettings();
            break;
        case "profile_settings":
            $("#profile_settings").show();
            updateProfileSettings();
            break;
    }
}

function logout(){
    $.ajax({
        type: "POST",
        url: "backend/logout.php",
        dataType: 'html',
        data: {
            dummy:"dummy"
        },
        success: function(response){
            var resp = response.split("*_*");
            if(resp[0] == "true"){
                window.open("../../index.php","_self")
            }else if(resp[0] == "false"){
                alert(resp[1]);
            } else{
                alert(response);
            }
        }
    });
}
