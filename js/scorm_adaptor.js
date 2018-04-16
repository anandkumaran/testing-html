var scormAPIHandle = null;

var LMSFinishCalled = false;
var userPassed = false;
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
var sessionSetTimeOut;
function scormAdaptor_getAPI(){

  var myAPI = null;
  var tries = 0, triesMax = 10;  
  while (tries <= triesMax && myAPI == null){
    myAPI = findAPI(window);
    
    if (myAPI == null && typeof(window.parent) != 'undefined'){
    	myAPI = findAPI(window.parent);
    }
    
    if (myAPI == null && typeof(window.top) != 'undefined'){
    	myAPI = findAPI(window.top);
    }	

    if (myAPI == null && typeof(window.opener) != 'undefined'){
    	if (window.opener != null && !window.opener.closed){
    		myAPI = findAPI(window.opener);
    	}
    	
    	try {
		if (myAPI == null && typeof(window.opener.parent) != 'undefined'){
			myAPI = findAPI(window.opener.parent);
		}	
	} catch(e) {}
	
		try {
		    if (myAPI == null && typeof(window.opener.top) != 'undefined'){
			if (window.opener.top != null && !window.opener.top.closed){
				myAPI = findAPI(window.opener.top);
			}

			if (myAPI == null && window.opener.top.opener != null && !window.opener.top.opener.closed){
				myAPI = findAPI(window.opener.top.opener);			

				if (myAPI == null && window.opener.top.opener.top != null && !window.opener.top.opener.top.closed){
					myAPI = findAPI(window.opener.top.opener.top);
				}			
			}	
		    }
		} catch(e) {}
		
    }
    tries++;
  }
  if (myAPI == null){
  	
  } else {
    scormAPIHandle = myAPI;
    //scormAdaptor_adlOnload();
  }
}

function findAPI(win){
  if (typeof(win) != 'undefined' ? typeof(win.API) != 'undefined' : false){
    if (win.API != null )  return win.API;
  }
  if (win.frames.length > 0)  for (var i = 0 ; i < win.frames.length ; i++){
    if (typeof(win.frames[i]) != 'undefined' ? typeof(win.frames[i].API) != 'undefined' : false){
       if (win.frames[i].API != null)  return win.frames[i].API;
    }
  }
  return null;
}

// KB - This function earlier was on Load of Player html .. now calling after API is found .. 
function scormAdaptor_adlOnload(){
  if (scormAPIHandle != null){
    var res = scormAPIHandle.LMSInitialize("");
    	if (res=="true"){
    	}else{
    	}
    	fGetLastError();
    	
    	fGetLastError();
    	fGetLastError();

	var res = scormAPIHandle.LMSGetValue("cmi.core.credit");
    	fGetLastError();

	var res = scormAPIHandle.LMSGetValue("cmi.core.entry");
    	fGetLastError();
    	

	var res = scormAPIHandle.LMSGetValue("cmi.comments");
    	fGetLastError();
    	
	var res = scormAPIHandle.LMSGetValue("cmi.objectives._children");
    	fGetLastError();

	var res = scormAPIHandle.LMSGetValue("cmi.student_data._children");
    	fGetLastError();

	var res = scormAPIHandle.LMSGetValue("cmi.student_preference._children");
    	fGetLastError();

	var res = scormAPIHandle.LMSGetValue("cmi.interactions._children");
    	fGetLastError();


    	startTimer()
    	scormAdaptor_incomplete();
    	if(is_chrome) sessionSetTimeOut = setTimeout("scormAdaptor_setSessionTime()",30000);
    	// only for SABA
    	//keepLMSAlive();	
  }
}

function fGetLastError(){
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSGetLastError();
		if (res=="0"){
		}else{
		}	
	}
}

function scormAdaptor_adlOnunload(){
	if(! LMSFinishCalled){
		if (scormAPIHandle != null){
		
			scormAdaptor_setSessionTime();

			// only for SABA
			scormAdaptor_commit();
			var res = scormAPIHandle.LMSFinish("");
			LMSFinishCalled = true;
			if (res == "false"){
				fGetLastError();
			}else{
			}
	  }
  }
}

function scormAdaptor_isAPI(){
	if(scormAPIHandle != null){
		return true
	}else{
		return false
	}
}

function scormAdaptor_getstatus(){
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSGetValue("cmi.core.lesson_status");
		fGetLastError();
		return res;
	}
}


function scormAdaptor_getlocation(){
  if(scormAPIHandle != null){
    var res = scormAPIHandle.LMSGetValue("cmi.core.lesson_location");
    return res;
    fGetLastError();
  }else if($.jStorage.storageAvailable()){
  	var res = $.jStorage.get("_lesson_location");
  	if (res == null){
  		res = "";
  	}
  	return res;
  }else{
  	return "";
  }
}

function scormAdaptor_setlocation(lPageNum){
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSSetValue("cmi.core.lesson_location", lPageNum);
		if (res=="true"){
		}else{
		}
		fGetLastError();
		if(is_chrome){
			scormAdaptor_setSessionTime();	
		}		
  }
  /*else if($.jStorage.storageAvailable()){
  	$.jStorage.set("_lesson_location",lPageNum);
  }	*/	  
}

function scormAdaptor_complete(){
	if(scormAPIHandle != null){
		//var res = scormAPIHandle.LMSSetValue("cmi.core.lesson_status", "passed");
		var res = scormAPIHandle.LMSSetValue("cmi.core.lesson_status", "completed");
		if (res=="true"){
		}else{
		}
		fGetLastError();
		scormAdaptor_commit();
	}
}

function scormAdaptor_incomplete(){
	if(scormAPIHandle != null){
		var status = scormAPIHandle.LMSGetValue("cmi.core.lesson_status");
		fGetLastError();
		if(status == "not attempted"){
			var res = scormAPIHandle.LMSSetValue("cmi.core.lesson_status", "incomplete");
			if (res=="true"){
			}else{
			}
			fGetLastError();
		}
	}
}

function scormAdaptor_failed(){
	if(scormAPIHandle != null){
		var status = scormAPIHandle.LMSGetValue("cmi.core.lesson_status");
		fGetLastError();
		if((status == "not attempted") || (status == "incomplete")){
			var res = scormAPIHandle.LMSSetValue("cmi.core.lesson_status", "incomplete");
			if (res=="true"){
			}else{
			}
			fGetLastError();
		}
	}
}

function scormAdaptor_setmaxscore(score){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSSetValue("cmi.core.score.max", score);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}
}

function scormAdaptor_setminscore(score){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSSetValue("cmi.core.score.min", score);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}
}


function scormAdaptor_setreview(ans){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSSetValue("cmi.core.review.raw", ans);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}else if($.jStorage.storageAvailable()){
  		$.jStorage.set("_review",ans);
  	}	
}

// this storage will be used for repopulating the questions
function scormAdaptor_setRecalreview(ans){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSSetValue("cmi.core.review.raw", ans);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}else if($.jStorage.storageAvailable()){
  		$.jStorage.set("_reviewRecal",ans);
  	}	
}

// this storage will reset everytime when Review button is clicked.
function scormAdaptor_getreview(){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSGetValue("cmi.core.review.raw", ans);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	} else if($.jStorage.storageAvailable()){
		var res = $.jStorage.get("_review");
		if (res == null){
			res = "";
		}
		return res;
	   } else {
   	return 0;  
   }
}

// this storage to repopulate once Review button is clicked.
function scormAdaptor_getRecalreview(){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSGetValue("cmi.core.review.raw", ans);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	} else if($.jStorage.storageAvailable()){
		var res = $.jStorage.get("_reviewRecal");
		if (res == null){
			res = "";
		}
		return res;
	   } else {
   	return 0;  
   }
}

function scormAdaptor_setscore(score){
	if(scormAPIHandle != null ){
		var res = scormAPIHandle.LMSSetValue("cmi.core.score.raw", score);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}else if($.jStorage.storageAvailable()){
  		$.jStorage.set("_score",score);
  	}	
}

function scormAdaptor_getscore(){
  if(scormAPIHandle != null ){
    	var res = scormAPIHandle.LMSGetValue("cmi.core.score.raw");
    	fGetLastError();
    	if (res==""){
    		res = "0";
    	}
    	return res;  
    	
   }else if($.jStorage.storageAvailable()){
	var res = $.jStorage.get("_score");
	if (res == null){
		res = "";
	}
	return res;
   } else {
   	return 0;  
   }
 }

function scormAdaptor_setsuspenddata(args){
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSSetValue("cmi.suspend_data", args);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}else if($.jStorage.storageAvailable()){
  		$.jStorage.set("_suspend_data",args);
  	}
}

function scormAdaptor_getsuspenddata(){
	if(scormAPIHandle != null){
        	var res = scormAPIHandle.LMSGetValue("cmi.suspend_data");
        	fGetLastError();

        	return res;
	}else if($.jStorage.storageAvailable()){
		var res = $.jStorage.get("_suspend_data");
		if (res == null){
			res = "";
		}
		return res;
	}else{
		return "";
	}
}

function scormAdaptor_getstudentname(){
	if(scormAPIHandle != null){
        	var res = scormAPIHandle.LMSGetValue("cmi.core.student_name");
        	fGetLastError();
        	return res;
	} else {
		return "";
	}
}

function scormAdaptor_getstudentid(){
	if(scormAPIHandle != null){
        	var res = scormAPIHandle.LMSGetValue("cmi.core.student_id");
        	fGetLastError();
        	return res;
	} else {
		return "";
	}
}

function scormAdaptor_commit(){
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSCommit("");
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}	
}

/*function scormAdaptor_setInteraction(lNum, lId, lType, lCorrectResponses, lStudentResponse, lResult){
	return ;
	
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".id",lId);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".type",lType);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".correct_responses.0.pattern",lCorrectResponses);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".student_response",lStudentResponse);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".result",lResult);
}*/

function scormAdaptor_setInteraction(lNum, lId, lType, lStudentResponse){

	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".id",lId);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".type",lType);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".student_response",lStudentResponse);
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".result","wrong");
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".correct_responses.0.pattern", "This is the correct response to the question")
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".weighting", "1");
	scormAPIHandle.LMSSetValue("cmi.interactions."+lNum+".objectives.0.id", "Results1");
}

function startTimer(){
	startDate = new Date().getTime();
}

function scormAdaptor_setSessionTime(){
	if(is_chrome){
		clearTimeout(sessionSetTimeOut);
		sessionSetTimeOut = setTimeout("scormAdaptor_setSessionTime()",30000);
	}
	var formattedTime;
	if ( startDate != 0 )
	{
		var currentDate = new Date().getTime();
		var elapsedSeconds = ( (currentDate - startDate) / 1000 );
		// formattedTime = getduration( elapsedSeconds );
		// only for SABA
		formattedTime = convertTotalSeconds( elapsedSeconds );
	}
	else
	{
		formattedTime = "00:00:00.0";
	}
			
	if(scormAPIHandle != null){
		var res = scormAPIHandle.LMSSetValue("cmi.core.session_time", formattedTime);
		if (res == "true"){
		}else{
		}
		fGetLastError();
	}
}

function fSetDecimalPoints(num){
	var Numvalue = String (Math.round(num * 100) / 100);
	var dot = Numvalue.indexOf(".");
	if(dot == -1){
		Numvalue += ".0";
	}
	var temp = Numvalue.split(".");
	var addDecimals = 2 - temp[1].length;
	for(i=1; i<= addDecimals; i++){
		Numvalue += "0";
	}
	return Numvalue;
};

function getduration(ts){
      var strTime="";
      var Hour = Math.floor(ts/3600);
      var Min   = Math.floor((ts-Hour*3600)/60);
      var Sec   = ts-Hour*3600 - Min*60;
		Sec=fSetDecimalPoints(Sec)
      if(Hour<10){
		strTime+="0";
      }else if (Hour<100){
		strTime+="";
      }else if (Hour<1000){
		strTime+="";
      }else{
	Hour=99
      }
      strTime+= Hour + ":";
      if(Min<10) strTime+="0";
      strTime+= Min + ":";
      if(Sec<10) strTime+="0";
      strTime+= Sec;
     return strTime;
}

// KB - Commenting this here... calling from document onload .. 
// scormAdaptor_getAPI();

// only for SABA 
function convertTotalSeconds(ts)
{
   var sec = (ts % 60);

   ts -= sec;
   var tmp = (ts % 3600);  //# of seconds in the total # of minutes
   ts -= tmp;              //# of seconds in the total # of hours

   // convert seconds to conform to CMITimespan type (e.g. SS.00)
   sec = Math.round(sec*100)/100;
   
   var strSec = new String(sec);
   var strWholeSec = strSec;
   var strFractionSec = "";

   if (strSec.indexOf(".") != -1)
   {
      strWholeSec =  strSec.substring(0, strSec.indexOf("."));
      strFractionSec = strSec.substring(strSec.indexOf(".")+1, strSec.length);
   }
   
   if (strWholeSec.length < 2)
   {
      strWholeSec = "0" + strWholeSec;
   }
   strSec = strWholeSec;
   
   if (strFractionSec.length)
   {
      strSec = strSec+ "." + strFractionSec;
   }


   if ((ts % 3600) != 0 )
      var hour = 0;
   else var hour = (ts / 3600);
   if ( (tmp % 60) != 0 )
      var min = 0;
   else var min = (tmp / 60);

   if ((new String(hour)).length < 2)
      hour = "0"+hour;
   if ((new String(min)).length < 2)
      min = "0"+min;

   var rtnVal = hour+":"+min+":"+strSec;

   return rtnVal;
}


// only for SABA 
/*var tKeepAlive;
function keepLMSAlive()
{
	if (!LMSFinishCalled) {
		scormAdaptor_commit();
		tKeepAlive=setTimeout("keepLMSAlive()",600000);
	}
}*/