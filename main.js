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
    var findJobs = new startSearch();
    findJobs.title = $('#jTitle').text();
    $('#jTitle').text('');
    console.log(findJobs);
}

class startSearch{
    constructor(){
        this.title = "Title";
        this.location = "Location";
    }
}