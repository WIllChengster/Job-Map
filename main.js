$(document).ready(initializeApp);
var jobData = [];
function initializeApp(){
    $('#jSearch').click(newSearch);
    $('#jSearch').click(function(){
        $('.landing').css('display', 'none');
    })
    getJobData();
}

function newSearch(){
    
}

class startSearch{
    constructor(){
        this.title = "Title";
        this.location = "Location";
    }
}