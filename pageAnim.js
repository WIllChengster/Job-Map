$(document).ready(initializeApp);

function initializeApp(){
    attachEventHandlers()
}

function attachEventHandlers(){
    $('#jSearch').click(function(){
        $('.landing').css('display', 'none');
    })
    $('.inner').click(makeMenuSpin)
}

function makeMenuSpin(){
    $('.item1').toggleClass('spinItem1');
    $('.item2').toggleClass('spinItem2');
    $('.item3').toggleClass('spinItem3');
    $('.item4').toggleClass('spinItem4');
    $('.outer').toggleClass('hideBorder')
}