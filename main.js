$(document).ready(initializeApp);

function initializeApp(){
    $('#jSearch').click(newSearch);
    $('#jSearch').click(function(){
        $('.landing').css('display', 'none');
    })
}

function newSearch(){

}

class startSearch{
    constructor(){
        this.title = "Title";
        this.location = "Location";
    }
}