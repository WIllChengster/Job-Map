function attachEventHandlers(){
    $('#jSearch').click(function(){
        $('.landing').css('display', 'none');
    })
    $('.inner').click(makeMenuSpin)
    $('.item1').click(jobListMenuToggle)
    $('.item4').click(jobStatsMenuToggle)
}

function makeMenuSpin(){
    $('.item1').toggleClass('spinItem1');
    $('.item2').toggleClass('spinItem2');
    $('.item3').toggleClass('spinItem3');
    $('.item4').toggleClass('spinItem4');
    $('.outer').toggleClass('hideBorder')
}

function jobListMenuToggle(){
    $('.sidebar').toggleClass('sidebarHide')
    $('.item1').toggleClass('select')
}

function jobStatsMenuToggle(){
    $('.jobStats').toggleClass('jobStatsHide')
    $('.item4').toggleClass('select')
}