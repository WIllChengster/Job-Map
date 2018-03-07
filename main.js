$(document).ready(initializeApp);
var jobData = [];
function initializeApp(){
    $('#jSearch').click(newSearch);
    $('#jSearch').click(function(){
        $('.landing').css('display', 'none');
    })
    $('.inner').click(function(){
        $('.item1').toggleClass('spinItem1');
        $('.item2').toggleClass('spinItem2');
        $('.item3').toggleClass('spinItem3');
        $('.item4').toggleClass('spinItem4');
        $('.outer').toggleClass('hideBorder')
    })
    getJobData();
}

function newSearch(){
    let title = $('#jTitle').val();
    let location = $('#jLocal').val();
    var findJobs = new startSearch(title, location);
    console.log(findJobs);
}

class startSearch{
    constructor(title, location){
        this.title = title;
        this.location = location;
    }
}