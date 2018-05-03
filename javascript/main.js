
$(document).ready(initializeApp);
/***************************************************************************************************
 * initializeApp - calls our event listener function
 * @param none
 * @returns {undefined} none
 * @calls attachEventHandlers()
 */
function initializeApp() {
    attachEventHandlers();
}

/***************************************************************************************************
 * attachEventHandlers - adds event hanlders
 * @param none
 * @returns {undefined} none
 * @calls different functions on each click
 */
function attachEventHandlers() {
    $('#jSearch').click(landingSearch);
    $('#headerSearch').click(headerSearch);
    $('.inner').click(makeMenuSpin);
    $('.item1').click(jobListMenuToggle);
    $('.item4').click(jobStatsMenuToggle);
    $('.listReturn').click(jobStatsMenuToggle)
    $('.hideList').click(jobListMenuToggle)
    $('.noResultModal').click(() => {
        $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
    });
    $('.mobileList').click(jobListMenuToggle);
        
}


/****************************************************************************************************
 * landingSearch - our initial search from the landing page.
 * @params none
 * @returns {undefined} none
 * @calls newSearch, createInitialMapCenter, LandingHide
 */
var landingSearchFlag = 0;
function landingSearch(event) {
    event.preventDefault()
    if (landingSearchFlag === 0) {
        let title = $('#jTitle').val();
        let location = $('#jLocal').val();
        if (title === '')
            tooltipShow('.jobTitleTooltip');
        if (location === '')
            tooltipShow('.jobLocationTooltip');
        if (title !== '' && location !== '') {
            newSearch(title, location);
            $('#jTitleHeader').val(title);
            $('#jLocalHeader').val(location);
            $('#jSearch').addClass('noTouch');
            landingSearchFlag = 1;
            createInitialMapCenter();
            setTimeout(landingHide, 500);
        }
    }
}


/***************************************************************************************************
 * headerSearch - processes our header search fields, and validates input
 * @param none
 * @returns {undefined} none
 * @calls newSearch, createInitialMapCenter
 */
function headerSearch(event) {
    event.preventDefault()
    let title = $('#jTitleHeader').val();
    let location = $('#jLocalHeader').val();
    if (title === '')
        tooltipShow('.headerJobTitleTooltip')
    if (location === '')
        tooltipShow('.headerJobLocationTooltip')
    if (title !== '' && location !== '') {
        removeMarkers();
        newSearch(title, location);
        $('.jobSideBar').remove();
        $('#headerSearch').addClass('noTouch');
        if ($('#leftSideBar').hasClass('sidebarHide')) {
            jobListMenuToggle();
        }
        if ($('.jobStats').children().length > 0) {
            $('.expandedInfo').remove();
        }
        if (!$('.jobStats').hasClass('jobStatsHide')) {
            jobStatsMenuToggle();
        }
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
function newSearch(title, location) {
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
class startSearch {
    constructor(title, location) {
        placesData = [];
        indexesToBeSpliced = [];
        this.title = title;
        this.location = location;
        this.jobData = {};
        this.getJobData.bind(this);
        createInitialMapCenter(this.location).then(result =>{
            this.initializeSearch.call(this);
        })
        .catch(err =>{
        console.log("map error: ", err);
        });
    }
    initializeSearch() {
        $('.spinner').toggleClass('toggleDisplay');
        this.getJobData().then(resultData => {
            this.jobData = resultData;
            if (findJobs.jobData.results.length === 0) {

                throw "no results for job search";
            } else {
                return cleanAndPopulateMarkers();
            }
        }).then(resultOfMarkers => {
            mapPlacesToJobData();
            spliceOutNoResults();
            renderAllMarkers();
            populateJobDisplay();
            $('#headerSearch').removeClass('noTouch');
            $('.spinner').toggleClass('toggleDisplay');
        })
            .catch(error => {
                console.log("error in promise chain, error is: ", error);
                $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
                $('#headerSearch').removeClass('noTouch');
                if (!($('.spinner').hasClass('toggleDisplay'))) {
                    $('.spinner').toggleClass('toggleDisplay');
                }
                indexesToBeSpliced = [];
            });
    }
    getJobData() {
        const location = this.location;
        const title = this.title;
        return new Promise(function (resolve, reject) {
            var ajaxConfig = {
                dataType: 'json',
                url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
                data: {
                    app_id: '087b8936',
                    app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                    what: title,
                    where: location,
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

       