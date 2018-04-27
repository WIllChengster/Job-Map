
$(document).ready(initializeApp);
/***************************************************************************************************
 * initializeApp - calls our event listener function
 * @param none
 * @returns {undefined} none
 * @calls attachEventHandlers()
 */
function initializeApp(){
    attachEventHandlers();
}

/***************************************************************************************************
 * attachEventHandlers - adds event hanlders
 * @param none
 * @returns {undefined} none
 * @calls different functions on each click
 */
function attachEventHandlers(){
    $("#dev").click(devSearch)
    $('#jSearch').click(landingSearch);
    $('#headerSearch').click(headerSearch);
    $('.inner').click(makeMenuSpin);
    $('.item1').click(jobListMenuToggle);
    $('.item4').click(jobStatsMenuToggle);
    /* This is still being worked on and will be added to a later feature set
    $('.aboutUs, .escape').click( ()=>{
        $('.aboutContainer').toggleClass('hideAbout');
    }); */
    $('.modalEscape').click( () => {
        $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
    });
    $('.brian').on('mouseenter mouseleave', aboutBrian);
    $('.will').on('mouseenter mouseleave', aboutWill);
    $('.evan').on('mouseenter mouseleave', aboutEvan);
    $('.matt').on('mouseenter mouseleave', aboutMatt);
}


/****************************************************************************************************
 * devSearch - for developmental purposes. doesn't spam google api, but hides landing.
 * @params none
 * @returns {undefined} none
 * 
  */
function devSearch(){
    landingHide()
}

 /***************************************************************************************************
 * landingSearch - processes our landing page fields, and validates input
 * @param none
 * @returns {undefined} none
 * @calls newSearch, createInitialMapCenter, LandingHide
 */
function landingSearch() {
    let title = $('#jTitle').val();
    let location = $('#jLocal').val();
    if (title === '')
        tooltipShow('.jobTitleTooltip');
    if (location === '')
        tooltipShow('.jobLocationTooltip');
    if (title !== '' && location !== ''){
        newSearch(title, location);
        $('#jSearch').addClass('noTouch');
        createInitialMapCenter();
        setTimeout(landingHide, 500);
    }
}
/***************************************************************************************************
 * headerSearch - processes our header search fields, and validates input
 * @param none
 * @returns {undefined} none
 * @calls newSearch, createInitialMapCenter
 */
function headerSearch() {
    let title = $('#jTitleHeader').val();
    let location = $('#jLocalHeader').val();
    if (title === '')
        tooltipShow('.headerJobTitleTooltip')
    if (location === '')
        tooltipShow('.headerJobLocationTooltip')
    if (title !== '' && location !== ''){
        removeMarkers();
        newSearch(title, location);
        createInitialMapCenter();
        $('#headerSearch').addClass('noTouch');
    }
}

var placesData = [];
var findJobs = null;
/***************************************************************************************************
 * newSearch - initializes our start search instance
 * @param title, location    ---these get passed to the start search constructor
 * @returns {undefined} none
 * @calls startSearch, initializeSearch
 */
function newSearch(title, location){
    findJobs = new startSearch(title, location);
}
/***************************************************************************************************
 * StartSearch - hold our api calls and promises
 * @constructor -- (title, location)
 * @param title, location    ---these get passed to the start search constructor
 * @returns {undefined} none
 * @properties startSearch, initializeSearch
 *
 */
class startSearch{
    constructor(title, location) {
        this.title = title;
        this.location = location;
        this.jobData = {};
        this.getJobData.bind(this);
        this.initializeSearch.call(this);
    }
    initializeSearch(){
        $('.spinner').toggleClass('toggleDisplay');
        this.getJobData().then(resultData => {
            console.log('getJobdata resolved');
            this.jobData = resultData;
            if(findJobs.jobData.results.length === 0){
                $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
            } else {
            return cleanAndPopulateMarkers();
            }
        }).then(resultOfMarkers =>{
            mapPlacesToJobData();
            renderAllMarkers();
            populateJobDisplay();
            $('#headerSearch').removeClass('noTouch');
            $('.spinner').toggleClass('toggleDisplay');
        })
        .catch(error => {
            console.log("error in then chain, probably getJob", error);
            $('#headerSearch').removeClass('noTouch');
            if(!($('.spinner').hasClass('toggleDisplay'))){
                $('.spinner').toggleClass('toggleDisplay');
            }
            indexesToBeSpliced = [];
        });
         }
    getJobData(){
        console.log('getJobData called');
        return new Promise( function(resolve, reject){
            // var where = findJobs.location; 
            // var title = findJobs.title; 
            console.log("title and location are: ", this.title, this.location);
            debugger;
            var ajaxConfig = {
                dataType: 'json',
                url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
                data: {
                    app_id: '087b8936',
                    app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                    what: this.title, 
                    where: this.location, 
                    'content-type': 'application/json',
                    results_per_page: 10
                },
                method: 'GET',
                success: function (result) {
                    resolve(result);
                },
                error: function (result) {
                    reject(result);
                }
            }
            $.ajax(ajaxConfig);
        });
    }
}