// *************************************************************************************************
// *makeMenuSpin - function that toggles classes to each item. Essentially will make our menu animate in and out
// *@parms none
// *@returns none
// *@calls none

function makeMenuSpin(){
    $('.item1').toggleClass('spinItem1');
    $('.item2').toggleClass('spinItem2');
    $('.item3').toggleClass('spinItem3');
    $('.item4').toggleClass('spinItem4');
    $('.outer').toggleClass('hideBorder')
    $('.inner svg').toggleClass('toggleDisplay');
}

// *************************************************************************************************
// *jobListMenuToggle - function that scales the map with the job lists menu
// *@parms none
// *@returns none
// *@calls none

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
// *************************************************************************************************
// *jobStatsMenuToggle - function that scales map with job stats menu
// *@parms none
// *@returns none
// *@calls none
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

// *************************************************************************************************
// *landingHide - function that hides the landing page
// *@parms none
// *@returns none
// *@calls none

function landingHide(){
    $('.landing').toggleClass('hideLanding')
}
// *************************************************************************************************
// *tooltipShow - function that toggles opacity and display of tooltips
// *@parms element{string} the element we want to wrap
// *@returns none
// *@calls none

function tooltipShow(element){
    var self=element
    $(element).toggleClass('toggleDisplay');
    setTimeout(()=>$(self).toggleClass('noOpacity'),1)
    // $(element).toggleClass('noOpacity');
    setTimeout(()=> $(self).toggleClass('noOpacity'), 4000)
    setTimeout( ()=>$(self).toggleClass('toggleDisplay'),4200)
}
// *************************************************************************************************
// *aboutBrian - function that displays brians bio
// *@parms none
// *@returns none
// *@calls none
function aboutBrian(){
    $('.aboutBrian').toggleClass('hidePeople')
}
// *************************************************************************************************
// *aboutWill - function that display Will' bio
// *@parms none
// *@returns none
// *@calls none
function aboutWill(){
    $('.aboutWill').toggleClass('hidePeople');
}
// *************************************************************************************************
// *aboutEvan - function hat displays Evan's bio
// *@parms none
// *@returns none
// *@calls none
function aboutEvan(){
    $('.aboutEvan').toggleClass('hidePeople');
}
// *************************************************************************************************
// *aboutMatt - function that dispalys matt's bio
// *@parms none
// *@returns none
// *@calls none
function aboutMatt(){
    $('.aboutMatt').toggleClass('hidePeople');
}