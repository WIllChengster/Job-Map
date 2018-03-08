function attachEventHandlers(){
    $('#jSearch').click(landingHide)
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
    if($('.map').hasClass('mapWithoutInfo')){
        $('.map').toggleClass('mapWithoutAnything')
    } else if ($('.map').hasClass('mapWithoutAnything')){
        $('.map').toggleClass('mapWithoutAnything')
    }
    $('.map').toggleClass('mapWithoutList')

}

function jobStatsMenuToggle(){
    $('.jobStats').toggleClass('jobStatsHide')
    $('.item4').toggleClass('select')
    if($('.map').hasClass('mapWithoutList')){
        $('.map').toggleClass('mapWithoutAnything')
    } else if ($('.map').hasClass('mapWithoutAnything')){
        $('.map').toggleClass('mapWithoutAnything')
    }
    $('.map').toggleClass('mapWithoutInfo')

}

function landingHide(){
    $('.landing').toggleClass('hideLanding')
}