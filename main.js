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