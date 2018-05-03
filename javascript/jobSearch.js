let listingClicked;

// *************************************************************************************************
// *populateJobDisplay - function populates the the found jobs that display on the right side bar of the main page
// *@parms none
// *@returns none
// *@calls expandJobDescription, jobStatsMenuToggle
function populateJobDisplay(){

    $('.jobSideBar').remove();
    for(let i = 0; i < placesData.length; i++) {

        var elem = document.createElement("img");
          elem.setAttribute("src", "assets/images/buildings.png");
          elem.setAttribute("width", "4%");
          elem.className += 'businessIcon';

        var jobSideBar = $('<div>', {
            'class': 'jobSideBar',
            on:{
                click: () => {
                    expandJobDescription(i);
                    highlightMarker(i);
                    if ($('#map').hasClass('mapWithoutInfo') === true){
                        jobStatsMenuToggle();
                    }
                    listingClicked=this
                }
            }
        });

        var jobTitle = $('<h4>', {
            html: (i + 1) + '. ' + findJobs.jobData.results[i].title,
            'class': 'jobName',
            css:{
                'margin-bottom': 0
            }
        });
        
        var jobCompany = $('<h7>', {
            image: `${elem}`,
            text: findJobs.jobData.results[i].company.display_name,
            'class': 'companyName',
            css:{
                'margin': 0
            }
        });
        
        jobSideBar.append(jobTitle, jobCompany);
        $('.sidebar').append(jobSideBar);
        jobCompany.prepend(elem);
    }
}

function highlightMarker(indexOfMarker){
    let markerCounter = 1;
    for(i = 0; i < markers.length; i++){
        markers[i].setIcon(`http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${markerCounter}|FF0000|000000`)
        markerCounter++
    }
    markers[indexOfMarker].setIcon('https://www.google.com/mapfiles/marker_green.png')
}

// *************************************************************************************************
// *expandJobDescription - This function populates the sidebar with the appropriate selected job.
// *@parms It takes an index of the item that it is being referred to.
// *@returns none
// *@calls none
function expandJobDescription(indexOfSelection){
    $('.expandedInfo').remove();
    var expandedInfo = $('<div>', {
        'class': 'expandedInfo',
    });
    var eInfoJobTitle = $('<h2>', {
        html: findJobs.jobData.results[indexOfSelection].title
    });
    var jobCompany = $('<h3>', {
        text: findJobs.jobData.results[indexOfSelection].company.display_name
    });
    var jobDescription = $('<p>', {
        html: findJobs.jobData.results[indexOfSelection].description
    });

    let dateUglyFormat = findJobs.jobData.results[indexOfSelection].created;
    let year = dateUglyFormat.slice(0,4);
    let month = dateUglyFormat.slice(5,7);
    let day = dateUglyFormat.slice(8,10);
    var listDate = $('<p>', {
        text: "Date Listed: " + month + '-' + day + '-' + year
    });

    var jobAddress = $('<p>', {
        text: findJobs.jobData.results[indexOfSelection].address
    });

    var jobLink = $('<a>', {
        'class': 'linkToJob',
        href: findJobs.jobData.results[indexOfSelection].redirect_url,
        target: "_blank",
        text: "Link to Listing"  
    });
    if( findJobs.jobData.results[indexOfSelection].salary_min != undefined && findJobs.jobData.results[indexOfSelection].salary_max != undefined){
        var minMaxSalary = $('<p>', {
            text: "Salary Range: $" + findJobs.jobData.results[indexOfSelection].salary_min + "-" + findJobs.jobData.results[indexOfSelection].salary_max
        });
        expandedInfo.append(eInfoJobTitle, jobCompany, jobAddress, jobDescription, listDate,  minMaxSalary, jobLink);
    } else {
        expandedInfo.append(eInfoJobTitle, jobCompany, jobAddress, jobDescription, listDate,  jobLink);
    }
    $('.jobStats').append(expandedInfo);
}
