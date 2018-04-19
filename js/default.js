/* ----*/
var toggleFlag = false;
var currentIndex = 0;
var menuData = null;
var postQuizData = null;
var citationData = null;
var currentTopicIndex = null;
var currentSubTopicIndex = null;
var currentModuleName = "Home";
//Array which will contains node names based on name attribute
var menuIndexArray = [];
//Array which will contains node names based on commonTopic if any
var menuNodeArr = [];
var pageStatusListArray = [];
var navigationFlag = false;
var pretestMarkScored = 0;
var pretestTotalQn = 0;

var currentPostQn = 0;
var prePostQn = 0;
var postTstQnDone = false;

var isMobileAndPortrait = false;

// Object will hold info about user postTest Actions
//attempted:[key:0, option : , result];
var postQnAnsObj = {"attempted":[] ,"totalScore":0 , "totalQn":0, "completedTest":false};



//Flag to trace if post test module started
var postTestStart = false;
//Flag to trace if post test questions started
var postTestQn = false;

//Flag to trace if the build is standalone or SCORM
var appType = 'scorm';
var passScore = 60;
var setMinScore = 0;
var setMaxScore = 100;

/*Pre-test keys*/
var pretestKey = [
				 {"id":"q1","key":"1"},
				 {"id":"q2","key":"1"}
				// {"id":"q3","key":"2"},
				 //{"id":"q4","key":"0"}
				 // {"id":"q5","key":"3"},
				 // {"id":"q6","key":"4"},
				 // {"id":"q7","key":"2"},
				 // {"id":"q8","key":"1"},
				 // {"id":"q9","key":"4"},
				 // {"id":"q10","key":"3"} 
];