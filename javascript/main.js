
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
    /* This is still being worked on and will be added to a later feature set
    $('.aboutUs, .escape').click( ()=>{
        $('.aboutContainer').toggleClass('hideAbout');
    }); */
    $('.modalEscape').click(() => {
        $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
    });
    $('.brian').on('mouseenter mouseleave', aboutBrian);
    $('.will').on('mouseenter mouseleave', aboutWill);
    $('.evan').on('mouseenter mouseleave', aboutEvan);
    $('.matt').on('mouseenter mouseleave', aboutMatt);
}

/***************************************************************************************************
 * landingSearch - processes our landing page fields, and validates input
 * @param none
 * @returns {undefined} none
 * @calls newSearch, createInitialMapCenter, LandingHide
 */
var landingSearchFlag = 0;
function landingSearch() {
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
function headerSearch() {
    let title = $('#jTitleHeader').val();
    let location = $('#jLocalHeader').val();
    if (title === '')
        tooltipShow('.headerJobTitleTooltip')
    if (location === '')
        tooltipShow('.headerJobLocationTooltip')
    if (title !== '' && location !== '') {
        removeMarkers();
        newSearch(title, location);
        createInitialMapCenter();
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
    $('.spinner').toggleClass('toggleDisplay');
    findJobs.initializeSearch();
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
        this.title = title;
        this.location = location;
        this.jobData = {};
    }
    initializeSearch() {
        this.getJobData().then(resultData => {
            this.jobData = resultData;
            if (findJobs.jobData.results.length === 0) {
                $('.fadeOverlay, .noResultModal').toggleClass('toggleDisplay');
            } else {
                return cleanAndPopulateMarkers();
            }
        }).then(resultOfMarkers => {
            mapPlacesToJobData();
            renderAllMarkers();
            populateJobDisplay();
            $('#headerSearch').removeClass('noTouch');
            $('.spinner').toggleClass('toggleDisplay');
        })
            .catch(error => {
                $('#headerSearch').removeClass('noTouch');
                if (!($('.spinner').hasClass('toggleDisplay'))) {
                    $('.spinner').toggleClass('toggleDisplay');
                }
                indexesToBeSpliced = [];
            });
    }
    getJobData() {
        return new Promise(function (resolve, reject) {
            var where = findJobs.location; //Placeholders, Will be changed later.
            var what = findJobs.title; //Placeholders, Will be changed later.
            var ajaxConfig = {
                dataType: 'json',
                url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
                data: {
                    app_id: '087b8936',
                    app_key: 'aa9f2f16c163aba979e6fb42412f734a',
                    what: what, //Placeholders, Will be changed later.
                    where: where, //Placeholders, Will be changed later.
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