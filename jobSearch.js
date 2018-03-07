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
    $.ajax(ajaxConfig);

}


