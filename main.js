$(document).ready(initializeApp);
function initializeApp(){
    attachEventHandlers();
}

function attachEventHandlers(){
    $('#jSearch').click( () => {
        newSearch($('#jTitle').val(), $('#jLocal').val());
        landingHide();
    });
    $('#headerSearch').click( () => {
        newSearch($('#jTitleHeader').val(), $('#jLocalHeader').val());
    });
    $('.inner').click(makeMenuSpin);
    $('.item1').click(jobListMenuToggle);
    $('.item4').click(jobStatsMenuToggle);
}
var placesData = [];
var findJobs = null;

function newSearch(title, location){
    findJobs = new startSearch(title, location);
}

class startSearch{
    constructor(title, location){
        this.title = title;
        this.location = location;
        this.jobData = hardCodeResults;
        // this.getJobData().then(result => console.log('promise resolved', result));
        //make sure that we are stripping the timeout and calling this after promise resolves when we move away from hard coded data
        setTimeout(function(){
            populateJobDisplay();
            populateMarkers();
            setTimeout(function(){
                mapPlacesToJobData();
                renderAllMarkers();
            }, 300);
        }, 300);

    }
    getJobData(){
        return new Promise(function(resolve, reject){
            var where = 'irvine'; //Placeholders, Will be changed later.
            var what = 'javascript developer'; //Placeholders, Will be changed later.
            var ajaxConfig = {
                dataType: 'json',
                url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
                data: {
                    app_id: '087b8936',
                    app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                    what: what, //Placeholders, Will be changed later.
                    where: where, //Placeholders, Will be changed later.
                    'content-type': 'application/json',
                    results_per_page: 20
                },
                method: 'GET',
                success: function (result) {
                    this.jobData = result;
                    resolve(result);
                },
                error: function (result) {
                    reject(result);
                    console.log('Error: had trouble getting data from server', result);

                }
            }
            $.ajax(ajaxConfig);
        });
    }
}