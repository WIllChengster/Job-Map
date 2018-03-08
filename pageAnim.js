function makeMenuSpin(){
    $('.item1').toggleClass('spinItem1');
    $('.item2').toggleClass('spinItem2');
    $('.item3').toggleClass('spinItem3');
    $('.item4').toggleClass('spinItem4');
    $('.outer').toggleClass('hideBorder')
    $('.inner svg').toggleClass('toggleDisplay');
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

function tooltipShow(element){
    var self=element
    $(element).toggleClass('toggleDisplay');
    setTimeout(()=>$(self).toggleClass('noOpacity'),1)
    // $(element).toggleClass('noOpacity');
    setTimeout(()=> $(self).toggleClass('noOpacity'), 4000)
    setTimeout( ()=>$(self).toggleClass('toggleDisplay'),4200)
}

function aboutBrian(){
    $('.aboutBrian').toggleClass('hidePeople')
}
function aboutWill(){
    $('.aboutWill').toggleClass('hidePeople');
}
function aboutEvan(){
    $('.aboutEvan').toggleClass('hidePeople');
}
function aboutMatt(){
    $('.aboutMatt').toggleClass('hidePeople');
}