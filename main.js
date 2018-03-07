$(document).ready(initializeApp);
function initializeApp(){
    $('#jSearch').click(newSearch);
    attachEventHandlers();
}

function newSearch(){
    let title = $('#jTitle').val();
    let location = $('#jLocal').val();
    findJobs = new startSearch(title, location);
}

class startSearch{
    constructor(title, location){
        this.title = title;
        this.location = location;
        this.jobData = hardCodeResults;
        //this.getJobData();
    }
    getJobData(){
        var where = 'irvine'; //Placeholders, Will be changed later.
        var what = 'javascript developer'; //Placeholders, Will be changed later.
        var ajaxConfig = {
            dataType: 'json',
            url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
            data:{
                app_id:'087b8936',
                app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                what: what, //Placeholders, Will be changed later.
                where: where, //Placeholders, Will be changed later.
                'content-type': 'application/json',
                results_per_page: 20
            },
            method:'GET',
            success: function(result) {
                this.jobData = result;
                console.log(jobData);
                if(result.success){
    
                    console.log('getting data', result);
                    //Feature set 3
                    // updateLists();
                }
                else{
    
                }
            },
            error: function(result){
                console.log('Error: had trouble getting data from server', result);
    
            }
        }
        console.log(hardCodeResults);
    
    }
}