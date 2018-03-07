// This is the javascript file for our jobSearch API data


var where = 'irvine';
var what = 'javascript developer';
// original url i'm breaking down:
// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=087b8936&app_key=aa9f2f16c163aba979e6fb42412f734a&what=javascript%20developer&results_per_page=20&where=irvine&content-type=application/json
function getJobData(){
    var ajaxConfig = {
        dataType: 'json',
        url: 'https://api.adzuna.com/v1/api/jobs/us/search/1',
        data:{
            app_id:'087b8936',
            app_key: 'aa9f2f16c163aba979e6fb42412f734a',
            what: what,
            where: where,
            'content-type': 'application/json',
            results_per_page: 20
        },
        method:'GET',
        success: function(result) {
            jobData = result;
            populateJobDisplay();
            console.log(jobData);
            if(result.count === 0){
                console.log('NO RESULTS RETURNED', result.count);
            }
            else{
            }
        },
        error: function(result){
            console.log('Error: had trouble getting data from server', result);
        }
    }
    $.ajax(ajaxConfig);
}

function populateJobDisplay(){
// <div class="jobSidebar">
//         1.
//         <h3> Job Title</h3>
//     <h5> Job company</h5>
//     </div>
    for(let i = 0; i < 5; i++) {
        var jobSideBar = $('<div>', {
            'class': 'jobSideBar',
            on:{
                click: function(){
                    console.log('clicked job' + i);
                }
            }
        });
        var jobTitle = $('<h4>', {
            html: (i + 1) + '. ' + jobData.results[i].title,
            css:{
                'margin-bottom': 0
            }
        });
        var jobCompany = $('<h7>', {
            text: 'company: ' + jobData.results[i].company.display_name,
            css:{
                'margin': 0
            }
        });
        jobSideBar.append(jobTitle, jobCompany);
        $('.sidebar').append(jobSideBar);
    }
}

