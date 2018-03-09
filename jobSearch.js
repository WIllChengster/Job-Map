// This is the javascript file for our jobSearch API data


var where = 'irvine';
var what = 'javascript developer';
// original url i'm breaking down:
// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=087b8936&app_key=aa9f2f16c163aba979e6fb42412f734a&what=javascript%20developer&results_per_page=20&where=irvine&content-type=application/json

let listingClicked;

function populateJobDisplay(){
    $('#leftSideBar').empty();
    for(let i = 0; i < placesData.length; i++) {
        var jobSideBar = $('<div>', {
            'class': 'jobSideBar'
        });
        var jobTitle = $('<h4>', {
            html: (i + 1) + '. ' + findJobs.jobData.results[i].title,
            'class': 'jobName',
            css:{
                'margin-bottom': 0
            },
            on:{
                click: () => {
                    expandJobDescription(i);
                    if ($('#map').hasClass('mapWithoutInfo') === true){
                        jobStatsMenuToggle();
                    }
                    listingClicked=this
                }
            }
        });
        var jobCompany = $('<h7>', {
            text: 'company: ' + findJobs.jobData.results[i].company.display_name,
            'class': 'companyName',
            css:{
                'margin': 0
            }
        });
        jobSideBar.append(jobTitle, jobCompany);
        $('.sidebar').append(jobSideBar);
    }
}

function expandJobDescription(indexOfSelection){
    $('.jobStats').empty();
    var expandedInfo = $('<div>', {
        'class': 'expandedInfo',
    });
    var eInfoJobTitle = $('<h4>', {
        html: findJobs.jobData.results[indexOfSelection].title
    });
    var jobCompany = $('<h7>', {
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