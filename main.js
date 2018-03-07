$(document).ready(initializeApp);
var jobData = [];
function initializeApp(){
    $('#jSearch').click(newSearch);
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