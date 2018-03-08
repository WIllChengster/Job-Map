// This is the javascript file for our jobSearch API data


var where = 'irvine';
var what = 'javascript developer';
// original url i'm breaking down:
// https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=087b8936&app_key=aa9f2f16c163aba979e6fb42412f734a&what=javascript%20developer&results_per_page=20&where=irvine&content-type=application/json


function populateJobDisplay(){

    for(let i = 0; i < 5; i++) {
        var jobSideBar = $('<div>', {
            'class': 'jobSideBar',
            on:{
                click: function(){
                    $('.jobStats').empty();
                    expandJobDescription(i);
                    console.log('clicked job' + i);
                }
            }
        });
        var jobTitle = $('<h4>', {
            html: (i + 1) + '. ' + findJobs.jobData.results[i].title,
            css:{
                'margin-bottom': 0
            }
        });
        var jobCompany = $('<h7>', {
            text: 'company: ' + findJobs.jobData.results[i].company.display_name,
            css:{
                'margin': 0
            }
        });
        jobSideBar.append(jobTitle, jobCompany);
        $('.sidebar').append(jobSideBar);
    }
}

function expandJobDescription(indexOfSelection){
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

    var jobLink = $('<a>', {
        href: findJobs.jobData.results[indexOfSelection].redirect_url,
        target: "_blank",
        text: "Link to Application"
    });
    if( findJobs.jobData.results[indexOfSelection].salary_min != undefined && findJobs.jobData.results[indexOfSelection].salary_max != undefined){
        var minMaxSalary = $('<p>', {
            text: "Salary Range: $" + findJobs.jobData.results[indexOfSelection].salary_min + "-" + findJobs.jobData.results[indexOfSelection].salary_max
        });
        expandedInfo.append(eInfoJobTitle, jobCompany, jobDescription, listDate, minMaxSalary, jobLink);
    } else {
        expandedInfo.append(eInfoJobTitle, jobCompany, jobDescription, listDate, jobLink);
    }
    $('.jobStats').append(expandedInfo);
}

var hardCodeResults = {
    "count": 22,
    "results": [
        {
            "description": "Junior <strong>Javascript</strong> / Typescript <strong>Developer</strong> Are you an up and coming <strong>Javascript</strong> / Typescript <strong>Developer</strong> who has dabbled in Python or Go?Do you enjoy building complex algorithms ...",
            "title": "Junior <strong>Javascript</strong> / Typescript <strong>Developer</strong>",
            "category": {
                "tag": "it-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "IT Jobs"
            },
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "latitude": 33.751486,
            "created": "2018-03-04T17:12:53Z",
            "redirect_url": "https://www.adzuna.com/land/ad/773396017?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=C71D398F4D704C8DE4820E31D7722F943F3A6739",
            "id": "773396017",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NzMzOTYwMTcifQ.7yShgQP1pReiqXaqHfQ2BVRvjITJBzLUuTnJOeXU4kE",
            "salary_min": 80000,
            "longitude": -117.75493,
            "salary_max": 110000,
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "CyberCoders"
            },
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job"
        },
        {
            "longitude": -117.75493,
            "id": "765153752",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NjUxNTM3NTIifQ.tPu0zqIkAi5_l0SV9PyUnR7-OW4dLbAP8Dp8eA-ngK8",
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "company": {
                "display_name": "ETAP",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "category": {
                "tag": "engineering-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "Engineering Jobs"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "description": "...  & 3D Graphic Knowledge in HTML 5, <strong>Javascript</strong>, Visual Studio GUI <strong>development</strong> with .NET Xamarin, SQL Server a plus Solid understanding of object oriented design and programming Use ...",
            "title": "Software Engineer",
            "redirect_url": "https://www.adzuna.com/land/ad/765153752?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=7D992DDA7F4C2F65F817BF114348F48F1741BD24",
            "latitude": 33.751486,
            "created": "2018-02-23T21:14:17Z"
        },
        {
            "redirect_url": "https://www.adzuna.com/land/ad/765089408?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=CDC1A94D6DD304F8EB9C46E39D3B1B72B5CD4810",
            "latitude": 33.751486,
            "created": "2018-02-23T20:22:23Z",
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ]
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "IT Jobs",
                "tag": "it-jobs"
            },
            "description": ".Net Bootstrap C# MVC Microsoft SQL (stored procedures, triggers and functions) Linq and Entity Framework HTML, CSS and Responsive Design Concepts <strong>Javascript</strong> and JQuery Agile <strong>development</strong> ...",
            "title": "Senior Level Full Stack Developer",
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Pacific Technology Solutions"
            },
            "longitude": -117.75493,
            "id": "765089408",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzY1MDg5NDA4IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.a1SdKmNs1ldbkoy9sn7UCEYO-1UraH-q3EACLiKehrg"
        },
        {
            "description": "...  with customer systems DCE LI-SK1 - provided by Dice Agile, DCE, <strong>Developer</strong>, <strong>Development</strong>, <strong>JavaScript</strong>, Programming, Python ...",
            "title": "Front End Developer",
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs",
                "label": "IT Jobs"
            },
            "latitude": 33.751486,
            "created": "2018-02-15T16:21:14Z",
            "redirect_url": "https://www.adzuna.com/land/ad/757378396?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=F42BB11B4BF3948E9D4E60019C780D6AABCDB9F7",
            "id": "757378396",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzU3Mzc4Mzk2IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.FsLMIYJReNVtkQN64S3FiMM7YsVVXGHclaYcEtTIckQ",
            "longitude": -117.75493,
            "company": {
                "display_name": "Glidewell Laboratories",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job"
        },
        {
            "__CLASS__": "Adzuna::API::Response::Job",
            "contract_type": "contract",
            "salary_is_predicted": "0",
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Glidewell Laboratories"
            },
            "longitude": -117.75493,
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NTYwMjUwNjYifQ.qRmUwAXsk5GQ4lu9Ow5mswFCGATOtnRt7BC9gqm8j1Q",
            "id": "756025066",
            "redirect_url": "https://www.adzuna.com/land/ad/756025066?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=E4488086382A434D0A2F04440CAF4C777E168581",
            "created": "2018-02-14T15:15:56Z",
            "latitude": 33.751486,
            "category": {
                "label": "IT Jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "title": "Backend Software Engineer (Contract)",
            "description": ", <strong>Developer</strong>, <strong>Development</strong>, <strong>JavaScript</strong>, Project, Python, Software Engineer, Testing ..."
        },
        {
            "longitude": -117.75493,
            "id": "765423141",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NjU0MjMxNDEifQ.vzuFYGvFbAOI4qe0n6GjUJyJRtHVptqPGW-uyvOVQAE",
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "company": {
                "display_name": "Calance US",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "category": {
                "tag": "it-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "IT Jobs"
            },
            "description": "...  knowledge of Adobe Photoshop, including PSD to HTML conversion Frontend frameworks (Bourbon/Neat) Responsive/Mobile first <strong>development</strong> <strong>Javascript</strong>/jQuery Gulp or Grunt (or similar automated ...",
            "title": "Front End Developer",
            "redirect_url": "https://www.adzuna.com/land/ad/765423141?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=A4365054AF315D41E8885A8604F9D0983E8E87CE",
            "latitude": 33.751486,
            "created": "2018-02-24T02:51:22Z"
        },
        {
            "salary_max": 120960,
            "longitude": -117.75493,
            "salary_min": 120960,
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NTM4OTcxMTgifQ.wBBAixGHdAoCPMe4XOdb0zuDRuyCkuJWxDqzG9ybEiU",
            "id": "753897118",
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Globa Channel Management, Inc."
            },
            "location": {
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "unknown",
                "label": "Unknown"
            },
            "title": "Web Developer",
            "description": "MUST HAVES : 5 Years experience with the following: C# ASP.NET <strong>javascript</strong> Architecting, designing, <strong>developing</strong> and maintaining ASP.NET/C# solutions and enterprise grade software ...",
            "redirect_url": "https://www.adzuna.com/land/ad/753897118?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=F3C587BB99A81DE4B9F4F20C364CFAF82166BF86",
            "created": "2018-02-12T15:23:24Z",
            "latitude": 33.751486
        },
        {
            "longitude": -117.75493,
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzA4OTk5OTQ0IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.5Q8qedOREUnhEsi1yK15fExwzbzKQrrnIIeg2bCJBmk",
            "id": "708999944",
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "company": {
                "display_name": "Cie Digital Labs",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "category": {
                "tag": "unknown",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "Unknown"
            },
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "title": "Sr C#/NET Developer",
            "description": "...  models in high transaction environments and writing complex queries  Experience with HTML, C<strong>SS and Jav</strong>aScript  Expe<strong>rience dev</strong>eloping web services using Web API and/or WCF  Exp ...",
            "redirect_url": "https://www.adzuna.com/land/ad/708999944?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=86EC5F8AF02C25E3EB195FCC671E585D1D72D46C",
            "created": "2017-12-14T17:41:50Z",
            "latitude": 33.751486
        },
        {
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NzI0NzczMTEifQ.m4-4EU-ewa1mPVYAXW4NglIDODsjWqLSTutZtxpQx2Y",
            "id": "772477311",
            "longitude": -117.75493,
            "company": {
                "display_name": "Project Insight",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "title": "Web Application Developer",
            "description": "...  stack includes ASP.NET forms , MVC/Web API/<strong>JavaScript</strong>/HTML and CSS). Responsibilities: <strong>Develop</strong> and improve product features Participate in a small team as a valued member Develop ...",
            "category": {
                "label": "IT Jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "created": "2018-03-04T00:32:36Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/772477311?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=B5994F901A9320FD3A25802FFBFB533786EF3F87"
        },
        {
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Terran Orbital"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NDAzNjc1MDYifQ.V5QiO4xrjgsU3Xj1NcfTKZhfLzya023EDU27yRki37k",
            "id": "740367506",
            "longitude": -117.75493,
            "created": "2018-01-27T21:24:57Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/740367506?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=B6C4D54B00FE977D62FE1CFD8398AA368B15278D",
            "title": "JIRA/Confluence Site Administrator",
            "description": "...  with Perl/Python/Ruby, Bash.  Experience writing SQL and MDX database queries for advanced reporting.  Experience developing JIRA plug-ins in JAVA.  Experience <strong>developing</strong> in <strong>Javascript</strong> ...",
            "category": {
                "tag": "admin-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "Admin Jobs"
            },
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ]
            }
        },
        {
            "title": "Senior NET Developer",
            "description": "...  and MySQL creating efficient and effective data models in high transaction environments and writing complex queries• Experience with HTML, CSS and <strong>JavaScript</strong>• Experience <strong>developing</strong> web ...",
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs",
                "label": "IT Jobs"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "created": "2018-02-13T14:34:27Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/754806517?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=5AE7D618BC6DE8608A61C4250F115B15DD9C6341",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzU0ODA2NTE3IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.DYhIHqfX0z2zMcss_OImpJ4FfLv3MnPBKg9PqLQ8HV0",
            "id": "754806517",
            "longitude": -117.75493,
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "PeopleWare Staffing"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0"
        },
        {
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "category": {
                "tag": "it-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "IT Jobs"
            },
            "description": "...  along with your resume if you are interested. Skill Matrix:SkillsObtained Years of ExperienceLast Year UsedJava Web Development Front-end development Full Stack Web <strong>Development</strong> ...  <strong>JavaScript</strong> HTML CSS Java Server Pages IntelliJ IDEA GIT /GIT Hub Maven AEM - Practical working knowledge JBoss Apache Webserver Chrome/Safari/Firefox development tools Working experience ...",
            "title": "Need - Java Full Stack Web Developer - Philly OR Irvine, CA",
            "redirect_url": "https://www.adzuna.com/land/ad/756032217?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=27FDD7FE747CB3CDF97E95148E0F332FD5328E7A",
            "latitude": 33.751486,
            "created": "2018-02-14T15:20:27Z",
            "longitude": -117.75493,
            "id": "756032217",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzU2MDMyMjE3IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.iqWHIS6qVpzSU5LcQvOzCL7EENnV66SlQSK2LiBemWQ",
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "company": {
                "display_name": "KLNtek",
                "__CLASS__": "Adzuna::API::Response::Company"
            }
        },
        {
            "redirect_url": "https://www.adzuna.com/land/ad/766485748?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=7B00CD21D6DA10E7F12DD40884B94342676AB4DD",
            "created": "2018-02-25T01:13:31Z",
            "latitude": 33.751486,
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "hr-jobs",
                "label": "HR & Recruitment Jobs"
            },
            "location": {
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "title": "Junior Talent Sourcer",
            "description": "...   VC++, C++, C, and more Web Design and <strong>Development</strong>  HTML, <strong>JavaScript</strong>, CSS  User Experience (UX) Database Engineering and Administration  MS SQL Server, Oracle, MySQL  OLTP ...",
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "company": {
                "display_name": "SEP",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "longitude": -117.75493,
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NjY0ODU3NDgifQ.UcsY8MjQdlnGcoJKLe6ZwKlNeKokmqAduRGLw6hCOdY",
            "id": "766485748"
        },
        {
            "title": "Senior Front End Angular Developer",
            "description": "...  Application Architecture and Engineering  C#, VB.NET, ASP.NET  PHP, Ruby on Rails, Python  Java, J2EE  VC++, C++, C, and more Web Design and <strong>Development</strong>  HTML, <strong>JavaScript</strong>, CSS  User ...",
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs",
                "label": "IT Jobs"
            },
            "created": "2018-02-23T21:07:53Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/765135973?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=0F249450D5E92E2403C20283B7D0D39E0C369959",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzY1MTM1OTczIiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.dD4h0VG-pSZnG9xYkKeYL6w5w5xAphTxl9nUPiUCNRI",
            "id": "765135973",
            "longitude": -117.75493,
            "company": {
                "display_name": "SEP",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0"
        },
        {
            "created": "2018-03-02T03:10:00Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/770565428?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=258479B1FD6AD782E960C8A12AF00FA350A978DC",
            "title": "SQL DBA ( Devops experience a plus)",
            "description": "...  Application Architecture and Engineering  C#, VB.NET, ASP.NET  PHP, Ruby on Rails, Python  Java, J2EE  VC++, C++, C, and more Web Design and <strong>Development</strong>  HTML, <strong>JavaScript</strong>, CSS  User ...",
            "category": {
                "tag": "it-jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "IT Jobs"
            },
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ]
            },
            "company": {
                "display_name": "SEP",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NzA1NjU0MjgifQ.hHAjs-3OoE0SRq9itI-iNtkuPwk8UzZi1IveCRrPNBs",
            "id": "770565428",
            "longitude": -117.75493
        },
        {
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NTE2NjUzODgifQ.b3OxrAKrEJzO_wUHMWycUJr1f6dw-3lNJCMEnYPIsYc",
            "id": "751665388",
            "longitude": -117.75493,
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Tom Ferry"
            },
            "__CLASS__": "Adzuna::API::Response::Job",
            "salary_is_predicted": "0",
            "title": "UI/UX Developer",
            "description": ".g. Angular JS, Knockout), Familiarity with the following desirable: Web API, Responsive design, Secure coding practices, GIT, Agile and Scrum <strong>development</strong>, JQuery, <strong>JavaScript</strong>, Salesforce ...",
            "location": {
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs",
                "label": "IT Jobs"
            },
            "created": "2018-02-09T23:35:54Z",
            "latitude": 33.751486,
            "redirect_url": "https://www.adzuna.com/land/ad/751665388?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=654E0E1D52ABBC08859A55E169228BE164A573B0"
        },
        {
            "id": "765142126",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzY1MTQyMTI2IiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.R_6ZqENutajWeBOCIYbwkhNKuxatwqR-QOier4vYxDc",
            "longitude": -117.75493,
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "SEP"
            },
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "description": "...  Architecture and Engineering  C#, VB.NET, ASP.NET  PHP, Ruby on Rails, Python  Java, J2EE  VC++, C++, C, and more Web Design and <strong>Development</strong>  HTML, <strong>JavaScript</strong>, CSS  User Experience (UX ...",
            "title": "Junior Sales Associate / Technical Recruiter",
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "sales-jobs",
                "label": "Sales Jobs"
            },
            "location": {
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County",
                "__CLASS__": "Adzuna::API::Response::Location"
            },
            "latitude": 33.751486,
            "created": "2018-02-23T21:09:05Z",
            "redirect_url": "https://www.adzuna.com/land/ad/765142126?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=A0F1DD0AFD11793F595B020E8E77C4AD1B6316A9"
        },
        {
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs",
                "label": "IT Jobs"
            },
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ],
                "display_name": "Irvine, Orange County"
            },
            "description": "...  <strong>development</strong> languages (<strong>JavaScript</strong> ,HTML, CSS, AJAX, HTTP, XML) Conduct application scoping by working with client service owners across NA, UK&I and other regions as needed to identify ...  by Dice Ajax, Architecture, Automated, Consulting, CSS, <strong>Development</strong>, ERP, HTML, HTTP, <strong>JavaScript</strong>, Security, XML ...",
            "title": "ServiceNow Technical Consultant",
            "redirect_url": "https://www.adzuna.com/land/ad/770828782?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=733350376C19610E9C4AEB0E78B3F46613F59090",
            "latitude": 33.751486,
            "created": "2018-03-02T11:36:23Z",
            "longitude": -117.75493,
            "id": "770828782",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzcwODI4NzgyIiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.J7eKuuMR-MKR9vNa1CmDyUn1Sh_OuUtrRcWM66P2Sfo",
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "company": {
                "__CLASS__": "Adzuna::API::Response::Company",
                "display_name": "Cybersearch, Ltd"
            }
        },
        {
            "latitude": 33.751486,
            "contract_time": "full_time",
            "created": "2018-03-01T14:42:40Z",
            "redirect_url": "https://www.adzuna.com/land/ad/770024743?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=35978C36EE6B88BD51424B49077A326244E54AEC",
            "description": "...  impact on our product and company. Required Skills: 2 years developing web applications in a full-stack capacity, with an emphasis on frontend <strong>development</strong> Strong <strong>Javascript</strong> skills (E6 ...",
            "title": "Front End Engineer",
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ]
            },
            "category": {
                "__CLASS__": "Adzuna::API::Response::Category",
                "label": "Unknown",
                "tag": "unknown"
            },
            "company": {
                "display_name": "Springboard Auto",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "id": "770024743",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiNzcwMDI0NzQzIiwicyI6IkYxeFR6RGI5VFJPbUZjdlkyeU96VVEifQ.bZcn1FhbVuvjFuYomveoT4NLDgykERAlGUR6lLNvCxc",
            "longitude": -117.75493
        },
        {
            "id": "754808137",
            "adref": "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiRjF4VHpEYjlUUk9tRmN2WTJ5T3pVUSIsImkiOiI3NTQ4MDgxMzcifQ.br0JnuBUxTx1D0i41StvnYFz1k6G33ZYQgZImR-atzs",
            "longitude": -117.75493,
            "company": {
                "display_name": "KORE1",
                "__CLASS__": "Adzuna::API::Response::Company"
            },
            "salary_is_predicted": "0",
            "__CLASS__": "Adzuna::API::Response::Job",
            "description": "...  of the following areas (but proficiency in all 3)HTML, CSS, <strong>JavaScript</strong> with Modern web <strong>development</strong> frameworks (Angular, React, or another SPA JavaScript framework, etc.)Object oriented ...",
            "title": "Full Stack Engineer: Java or C#  SPA JS  degree from top school",
            "location": {
                "__CLASS__": "Adzuna::API::Response::Location",
                "display_name": "Irvine, Orange County",
                "area": [
                    "US",
                    "California",
                    "Orange County",
                    "Irvine"
                ]
            },
            "category": {
                "label": "IT Jobs",
                "__CLASS__": "Adzuna::API::Response::Category",
                "tag": "it-jobs"
            },
            "latitude": 33.751486,
            "created": "2018-02-13T14:34:47Z",
            "redirect_url": "https://www.adzuna.com/land/ad/754808137?se=F1xTzDb9TROmFcvY2yOzUQ&utm_medium=api&utm_source=087b8936&v=4ACF0A604A481C30A446EE625FCBAEA6EEC7AFF0"
        }
    ],
    "__CLASS__": "Adzuna::API::Response::JobSearchResults",
    "mean": 106986.67
};
