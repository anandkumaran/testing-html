/*************** Impelsys Added ******************/
var localStateValues = {};
/* $("body").children().click(function (event) {
    document.body.focus();
  });  */
  var visibleTextarea = null;
  var crt, isMobileAndLandscape = false, isMobileAndPortrait = false;
  var visitedPage = [], barDisaplyed = false, reviewQn = false, displayTime = false;
/* $menuWrap = $('.menu-wrap2'),
    	$sidebarArrow = $('.sidebar-menu-arrow2');

function onChecking(){
		$(this).toggleClass('button-open2');
		$menuWrap.toggleClass('menu-show2');
		$( ".menu-sidebar2" ).html( "<p>Test</p>" );
  } */

// $(document).ready(function() {

	// $toggleButton = $('.toggle-button2'),
    	// $menuWrap = $('.menu-wrap2'),
    	// $sidebarArrow = $('.sidebar-menu-arrow2');

	//Hamburger button

	// $toggleButton.on('click', function() {
		// $(this).toggleClass('button-open2');
		// $menuWrap.toggleClass('menu-show2');
		
		// $( ".menu-sidebar2" ).html( "<p>Test</p>" );
	// });

	//Sidebar navigation arrows

	// $sidebarArrow.click(function() {
		// $(this).next().slideToggle(300);
	// });

// });


$("body").children().click(function (event) {
  if (event.target.type == "textarea") {
    crt = $(event.target).attr('id');
  }
  else {
        //document.body.focus();
        // hide from Jithin
        // if (window.parent.src.model.CommonValues.PLAYERTYPE == "OFFLINE" && window.parent.src.model.CommonValues.PLAYERTYPE != undefined) {
        //     closeMobileDeviceKeyBoard();
        //     $("#" + crt).blur();
        // } 
        // else {
        //     $("#" + crt).blur();
        //     //$("#" + crt).attr("readonly", "readonly");
        // }
        // if (isMobile() && visibleTextarea != null) {
        //     resetPosition(document.getElementById(visibleTextarea));
        //     visibleTextarea = null;
        // }
      }
    });

/* 
if(isApple()){
var crt = "";
$("body").children().click(function(event){
if (event.target.type == "textarea")
{
crt = $(event.target).attr('id');
	// $(".form-control").select(); 
	// $(crt).select();
	 
}
else{
	//$("body").blur();
	//$(".form-control").blur();
		if(crt !=""){
		$("#"+crt).blur();
		}
	}
});
}
else{
	
}
function isApple(){
		var ua = navigator.userAgent.toUpperCase();
		var 
		  ipad = ua.indexOf('IPAD')>-1,
	      ipod = ua.indexOf('IPOD')>-1,
	      iphone = ua.indexOf('IPHONE')>-1 ;
	    return   ipad || ipod || iphone ;
   }  */
/* $("html").children().click(function(event){

if (event.target.type == "textarea"){
alert("hi");
}
else{
$(".form-control").blur();
}
}); */


/* 
	$(function(){

    var cacheInput = null;
    var timer = null;
    if(!isApple()){
        return false;
    }
    $(document).on('focus','input',function(e){
        cacheInput = e.target;
    })
    $(document).on('focus','textarea',function(e){
        cacheInput = e.target;
    })
    $(document).on('touchend',function(e){
        if(e.target.tagName!=='INPUT'&&e.target.tagName!=='TEXTAREA'){
            if(cacheInput!==null){
                timer = setTimeout(function(){
                    cacheInput.blur();
                    clearTimeout(timer);
                },300)
            }
        }
    })
    function isApple(){
        var ua = navigator.userAgent.toUpperCase();
        var 
          ipad = ua.indexOf('IPAD')>-1,
          ipod = ua.indexOf('IPOD')>-1,
          iphone = ua.indexOf('IPHONE')>-1 ;
        return   ipad || ipod || iphone ;
    }
})
*/

/*************************************************/
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status == 200 || httpRequest.status == 0) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

/*******************Sumanth Added below code*******************/
function getLMSData() {
  var str = scormAdaptor_getlocation();
  launchResumeWindow(str);
}

function launchResumeWindow(str) {
  swal({
    title: "Do you want to resume the course where you had left?",
    text: "",
    type: "warning",
    showCancelButton: true,
    confirmButtonClass: "btn-danger",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    closeOnConfirm: true,
    closeOnCancel: true
  },
  function (isConfirm) {
    if (isConfirm) {
      var obj = getIndexObjFromMenu(str);
      hightlightSelectedNode(str);
      navigateToIndex(obj);
                //swal("Deleted!", "Your imaginary file has been deleted.", "success");
              } else {
                loadHomePage();
                //swal("Cancelled", "Your imaginary file is safe :)", "error");
              }
            });
}

function setLMSData() {
    //alert('setting lms data: '+currentModuleName);
    if (appType != 'standalone') {
      scormAdaptor_setlocation(currentModuleName);
    }
    //scormAdaptor_commit();
  }

//function setLMSData () {
//alert('setting lms data: '+currentModuleName);
//  scormAdaptor_setlocation(currentModuleName);
//scormAdaptor_commit();
//}

window.onunload = function () {
  scormAdaptor_adlOnunload();
}
/******************End of Sumanth Code************************/

window.onload = function () {
  localStorage.optionState = "";
  fetchJSONFile('data/menu.json', function (data) {
    if (data) {
      menuData = data;
      populateMenu(data);
      prepareList();
      fetchNodeNames();
      isMobileAndPortrait = checkIfMobileAndPortrait();
      isMobileAndLandscape = checkIfMobileAndLandscape();

    scormAdaptor_setreview(null)
    scormAdaptor_setRecalreview(null)
      /*******************Sumanth Added below code*******************/
      if (appType != 'standalone') {
        scormAdaptor_getAPI();
        scormAdaptor_adlOnload();
        scormAdaptor_setmaxscore(setMaxScore);
        scormAdaptor_setminscore(setMinScore);
        if (scormAdaptor_getlocation() != '' || scormAdaptor_getlocation() == undefined || scormAdaptor_getlocation() == 'undefined') {
          getLMSData();
        } else {
          loadHomePage();
        }
      } else {

      }



      /******************End of Sumanth Code************************/
    } else {
      alert("Menu Json Failed to load");
      return;
    }

  });

  fetchJSONFile('data/post-test.json', function (data) {
    if (data) {
      postQuizData = data;
    } else {
      alert("pretest Json Failed to load");
      return;
    }
  });

  fetchJSONFile('data/citation.json', function (data) {
    if (data) {
      citationData = data;
    } else {
      alert("citation Json Failed to load");
      return;
    }
  });

  fetchJSONFile('data/pretest.json', function (data) {
    if (data) {
      pretestData = data;
    } else {
      alert("Pre-Test Json Failed to load");
      return;
    }
  });


  loadHomePage();
    //loadMenu();

    isMobileAndPortrait = checkIfMobileAndPortrait();
    isMobileAndLandscape = checkIfMobileAndLandscape();

    if(isMobileAndPortrait || isMobileAndLandscape) {
      $('.mobile-disable, .menu-bar .menu-icon').hide();
      $('#rowcontent').css('marginTop', '37px')
      $('#rowcontent').on('click', function() {
        $('#navigation').css('bottom', '-80px');
        $('.toggle-button2').css('bottom', '-40px');
        $('.menu-bar').animate({'top': '-55px'}, 100)
        barDisaplyed = true;
        callToggleDisplayBar(barDisaplyed)
      });
    }
  }

  function callToggleDisplayBar(barDisaplyed) {
    if(barDisaplyed) {
      clearTimeout(displayTime)
     displayTime = setTimeout(function() {
        $('#navigation').css('bottom', '0');
        $('.toggle-button2').css('bottom', '7px');
        $('.menu-bar').animate({'top': '0'}, 100)
      }, 5000);
    }
  }

  function checkIfMobileAndPortrait() {
    if ((window.innerWidth) <= 768 && (window.innerWidth < window.innerHeight)) {
      return true;
    }
    return false;
  }

  function checkIfMobileAndLandscape() {
    if ((window.innerWidth) <= 1024 && (window.innerWidth > window.innerHeight)) {
      return true;
    }
    return false;
  }


  function loadHomePage() {
    $(".content").load("screens/welcome.html");
    $(".navigation").load("screens/nav.html");
	//$(".navigation").html('<ul id="menu-ul"></ul>');
	// var div = document.createElement('p');
	// div.className = 'test';
	// $(div).html('Hi')
	
    //Enabling tooltip
    $("body").tooltip({ selector: '[data-toggle="tooltip"]' });

	/* if ($(itm).parent().parent().find('textarea')) {
    alert("find"); */


    /* }  */
    //Adjusting main content according to manu bar height if contents are more than expected i.e. more than 2 lines

    // var menuBarHeight = $('.menu-bar').height();
    // $('.main-content').css({"padding-top":menuBarHeight+"px"});

    /*$(window).resize(function(){
        var menuBarHeight = $('.menu-bar').height();
       $('.main-content').css({"padding-top":menuBarHeight+"px"});
     });*/

    //code added by sumanth
    if (appType != 'standalone') {
      setLMSData();
    }
  }

  function getMenuLength() {
    var len = 0;
    if (menuData && menuData.modules) {
      len = menuData.modules.length;
    }
    return len;
  }

  function getUrlFromMenu(index) {
    var len = getMenuLength();
    var url = null;
    for (var i = 0; i < len; i++) {
      if (menuData.modules[i].id === index) {
        if (menuData.modules[i].url) {
          url = menuData.modules[i].url;
        } else {
          return url;
        }

        return url;
      }
    }
    return url;
  }

  function getIndexObjFromMenu(str, pNode, btnNav) {
    var indexObj = {};
    var module_index = null;
    var topic_index = null;
    var page_index = null;
    var currentModuleName = str;
    var page_url = null;
    var header_id = null;
    var overlay_avail = false;
    var video_url = '';


    var len = getMenuLength();
    var index = null;
    for (var i = 0; i < len; i++) {
      if (menuData.modules[i].module) {
            // first check if name it self is a module
            if (menuData.modules[i].module === str) {
              module_index = menuData.modules[i].id;
              overlay_avail = menuData.modules[i].overlay;
              video_url = menuData.modules[i].video_url;

              if (menuData.modules[i].url) page_url = menuData.modules[i].url;
              break;
            } else {

              if (menuData.modules[i].topics.length) {
                var topicsLen = menuData.modules[i].topics.length;
                for (var j = 0; j < topicsLen; j++) {


                  if (menuData.modules[i].topics[j].name == str) {
                    module_index = menuData.modules[i].id;
                    if (!menuData.modules[i].topics[j].url) {
                      alert("Check For Page URL for :" + menuData.modules[i].topics[j].name);
                      return indexObj;
                    }
                    page_url = menuData.modules[i].topics[j].url;
                    topic_index = menuData.modules[i].topics[j].id;

                    if (menuData.modules[i].topics[j].type) {
                      header_id = menuData.modules[i].topics[j].id;
                    }
                    break;
                  }

                  if ((menuData.modules[i].topics[j].pages) && (menuData.modules[i].topics[j].pages.length)) {
                    var pageLen = menuData.modules[i].topics[j].pages.length;
                    for (var k = 0; k < pageLen; k++) {
                      if ((pNode != null) && (menuData.modules[i].topics[j].pages[k].commonTopic)) {
                        if ((menuData.modules[i].topics[j].name == pNode) && (menuData.modules[i].topics[j].pages[k].commonTopic == str)) {
                          module_index = menuData.modules[i].id;
                          page_index = menuData.modules[i].topics[j].pages[k].id;
                          page_url = menuData.modules[i].topics[j].url;
                          topic_index = menuData.modules[i].topics[j].id;
                          break;
                        }
                      } else if (btnNav && (menuData.modules[i].topics[j].pages[k].commonTopic)) {
                        if (menuData.modules[i].topics[j].pages[k].name == str) {
                          module_index = menuData.modules[i].id;
                          page_index = menuData.modules[i].topics[j].pages[k].id;
                          page_url = menuData.modules[i].topics[j].url;
                          topic_index = menuData.modules[i].topics[j].id;
                        }
                      } else {
                        if (menuData.modules[i].topics[j].pages[k].name == str) {
                          module_index = menuData.modules[i].id;
                          page_index = menuData.modules[i].topics[j].pages[k].id;
                          page_url = menuData.modules[i].topics[j].url;
                          topic_index = menuData.modules[i].topics[j].id;
                          break;
                        }
                      }

                    }
                  } else {
                            //Look for topic url if topics doesn't have pages
                            if (menuData.modules[i].topics[j].name == str) {
                              if (!menuData.modules[i].topics[j].url) {
                                alert("Missing URL for :" + menuData.modules[i].topics[j]);
                                return indexObj;
                              }
                              module_index = menuData.modules[i].id;
                              topic_index = menuData.modules[i].topics[j].id;
                              page_url = menuData.modules[i].topics[j].url;
                              break;
                            }

                          }

                        }
                      }
                    }
                  } else {
                    alert("Module name is missing for :" + menuData.modules[i]);
                    break;
                  }
                }
                indexObj.module_index = module_index;
                indexObj.page_index = page_index;
                indexObj.topic_index = topic_index;
                indexObj.page_url = page_url;
                indexObj.currentModuleName = currentModuleName;
                indexObj.header_id = header_id;
                indexObj.overlay_avail = overlay_avail;
                indexObj.video_url = video_url;

                return indexObj;
              }

              function checkIfPrevNodeExists(prevNode, i, j, k) {
                if (menuData.modules[i].topics[j + 1]) {
                  if (menuData.modules[i].topics[j + 1].name == prevNode) {
                    return true;
                  }
                }
                if (menuData.modules[i].topics[j - 1]) {
                  if (menuData.modules[i].topics[j - 1].name == prevNode) {
                    return true;
                  }
                }
                if (menuData.modules[i].topics[j].pages[k + 1]) {
                  if (menuData.modules[i].topics[j].pages[k + 1].name == prevNode) {
                    return true;
                  }
                }
                if (menuData.modules[i].topics[j].pages[k - 1]) {
                  if (menuData.modules[i].topics[j].pages[k - 1].name == prevNode) {
                    return true;
                  }
                }
                return false;
              }

              function fetchNodeNames() {
                var _cnt = 1;
                var _str = '';

                $('#menu-ul li').each(function (index) {

                  if (!$(this).hasClass("collapsed")) {
                    _str = String($(this)[0].firstChild.textContent);

                    if (_str == 'Learning Points') {
                      _str = _str + _cnt;
                      _cnt++;
                    }
                    menuNodeArr.push(_str);
                    var obj = [];
                    obj.page = _str;
                    if (index == 0) {
                      obj.visited = 1;
                    } else {
                      obj.visited = 0;
                    }
                    if ($(this).hasClass("headerNav")) {
                      obj.type = "header";
                    } else {
                      obj.type = "page";
                    }

                    pageStatusListArray.push(obj);
            //menuNodeArr.push(String($(this)[0].firstChild.textContent));
          } else {
            if ($(this).hasClass("subNode_topics_li")) {
              _str = String($(this)[0].firstChild.textContent);
              if (_str == 'Learning Points') {
                _str = _str + _cnt;
                _cnt++;
              }
              menuNodeArr.push(_str);
              obj.page = _str;
              if (index == 0) {
                obj.visited = 1;
              } else {
                obj.visited = 0;
              }
              if ($(this).hasClass("headerNav")) {
                obj.type = "header";
              } else {
                obj.type = "page";
              }
              pageStatusListArray.push(obj);
                //menuNodeArr.push(String($(this)[0].firstChild.textContent));
              }
            }
          });
              }

              function hightlightSelectedNode(str) {
                $('#menu-ul li').each(function (index) {
                  if ($(this)[0].firstChild.textContent === str) {

                    $('#menu-ul li').removeClass('selected');
                    $(this).addClass('selected');
                    $(this).removeClass('visited');   /* updated on 13-May-2016 */
                    $(this).parents('ul').css("display", "block");
            //console.log(pageStatusListArray);
            return false;

          }
        });
              }

              var $prev = null;


              function grayOutVisitedLi() {
                if ($prev == null) {
                  $prev = $('#menu-ul').find('.selected');
        //$prev.addClass('visited');		
      } else {
        //$prev.addClass("visited");
      }
    }

    function getMenuNodeIndex(str) {

	// str1 = str.replace(/ /g,"_");
	//alert(str1);
	// $('#' + str1).css('width','100%');	
	// $('#' + str1).html('100%');
 //    $('#' + str1 + '_icon').removeClass("progress-icon").addClass("progress-icon button-open2");

	//$('#' + str1).replaceClass('progress-icon', 'progress-icon button-open2');
	//$('#'progress-icon).addClass('progress-icon button-open2');
	var myInput = document.getElementById('myInput');
	
  for (var i = 0; i < menuNodeArr.length; i++) {
    if (menuNodeArr[i] == str) {
      return i;
    }
  }
}


function updateMenuVisited(str) {

  $('#menu-ul li').each(function (index, element) {

    for (var i = 0; i < pageStatusListArray.length; i++) {
      if ($(this)[0].firstChild.textContent == pageStatusListArray[i].page && pageStatusListArray[i].visited == 1) {
        if (!$(this).hasClass('visited')) {
                    // $(this).css({ "color": "#BEBEBE" });
                    // $(this).addClass('visited');
                  }

                  if ($(this).hasClass('selected')) $(this).removeClass('selected');
                }
              }

            });
  updateMenuVisiting(str);
}

function updateMenuVisiting(nextNode) {
  $('#menu-ul li').each(function () {
    if ($(this)[0].firstChild.textContent == nextNode) {

      var audioElement = document.getElementById('audio1');
      if($(this)[0].dataset.audio === 'true') {
        audioElement.src = $(this)[0].dataset.url
        $('#play').show();
        $('#stop').hide();
      } else {
        audioElement.pause();
        $('#play').hide();
        $('#stop').hide();
      }

      $(this).addClass("selected");
      $(this).removeClass("visited");
      if ($(this).parent().hasClass('nested')) {
        $(this).parent().css({ "display": "block" });
      }
      if ($(this).parent().parent().hasClass('nested')) {
        $(this).parent().parent().addClass("collapsed expanded");
        $(this).parent().parent().find('ul').css({ "display": "block" });
      }
    }
  });
}

function highlightNextNode(str, direction) {
  $('#menu-ul li').each(function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
      if (direction == "next") {				
        if (next($(this)).hasClass("nested")) {
          if (next($(this)).hasClass('subNode_topics_li')) {
            next($(this)).toggleClass('visited');
            next($(this)).addClass('selected');


            next($(this)).parents('ul').css("display", "block");
            return false;
          } else {
            next(next(next($(this)))).toggleClass('visited');
            next(next(next($(this)))).addClass('selected');
            next(next(next($(this)))).parents('ul').css("display", "block");
            return false;
          }
        } else {
          if (next($(this)).hasClass('subNode_topics_li')) {
            next($(this)).toggleClass('visited');
            next($(this)).addClass('selected');
            next($(this)).parents('ul').css("display", "block");
            return false;
          } else if (next($(this)).hasClass('subNode_topics_pages_ul')) {
            next(next($(this))).addClass('selected');
            next(next($(this))).parents('ul').css("display", "block");
            return false;
          } else {
            next($(this)).toggleClass('visited');
            next($(this)).addClass('selected');
            next($(this)).parents('ul').css("display", "block");
            return false;
          }
        }


      } else {

        if (previous($(this)).hasClass("nested")) {
          if (previous($(this)).hasClass('subNode_topics_li')) {
            previous($(this)).toggleClass('visited');
            previous($(this)).addClass('selected');
            previous($(this)).parents('ul').css("display", "block");
            return false;
          } else {
            previous(previous(previous($(this)))).toggleClass('visited');
            previous(previous(previous($(this)))).addClass('selected');
            previous(previous(previous($(this)))).parents('ul').css("display", "block");
            return false;
          }
        } else {
          if (previous($(this)).hasClass('subNode_topics_li')) {
            previous($(this)).toggleClass('visited');
            previous($(this)).addClass('selected');
            previous($(this)).parents('ul').css("display", "block");
            return false;
          } else if (previous($(this)).hasClass('subNode_topics_pages_ul')) {
            previous(previous($(this))).toggleClass('visited');
            previous(previous($(this))).addClass('selected');
            previous(previous($(this))).parents('ul').css("display", "block");
            return false;
          } else if (previous($(this)).hasClass('subNode_topics_ul')) {
            previous(previous(previous($(this)))).toggleClass('visited');
            previous(previous(previous($(this)))).addClass('selected');
            previous(previous(previous($(this)))).parents('ul').css("display", "block");
          } else {
            previous($(this)).toggleClass('visited');
            previous($(this)).addClass('selected');
            previous($(this)).parents('ul').css("display", "block");
            return false;
          }
        }



      }
      return false;
    }
  });
}

function highlightNavigatedNode(str, prevNode, direction) {
  $('#menu-ul li').each(function () {
    if (prevNode != "Learning Points") {
      if ($(this)[0].firstChild.textContent == prevNode) {
        if (direction == "pre") {
          $li = previous($(this));
        } else {
          $li = next($(this));
        }
        $('#menu-ul li').removeClass('selected');
        $li.addClass('selected');
        $li.parents('ul').css("display", "block");

        return false;
      }
    } else {
      hightlightSelectedNode(str);
    }

  });
}

function next(selector) {
  var $element = $(selector);

  return $element
  .children(":eq(0)")
  .add($element.next())
  .add($element.parents().filter(function () {
    return $(this).next().length > 0;
  }).next()).first();
}

function previous(selector) {
  var $element = $(selector);

  return $element
  .prev().find("*:last")
  .add($element.parent())
  .add($element.prev())
  .last();
}

function getModuleMenuArray(str, direction, bool) {
  var index;
  var len = menuNodeArr.length;
  for (var i = 0; i < len; i++) {
    if (menuNodeArr[i] === str) {

      if (direction == "pre") {
        if (i == 1) {
          if (pageStatusListArray[0].type == "page") {
            index = 0;
            break;
          }
        } else {
          for (var j = i; j > 0; j--) {

            if (pageStatusListArray[j - 1].type == "page") {
              index = j - 1;
              break;
            } else {
              grayOutNode(pageStatusListArray[j].page);
            }
          }

        }

      } else if (direction == "next") {
        for (var j = i + 1; j < pageStatusListArray.length; j++) {
          if (pageStatusListArray[j].type == "page") {
            index = j;
                        // console.log("highlight next node :" +pageStatusListArray[j].page);
                        break;
                      } else {
                        // console.log("highlight node in between:" +pageStatusListArray[j].page);
                        grayOutNode(pageStatusListArray[j].page);
                      }
                    }

                  } else {
                    index = i;
                  }

                  break;
                }
              }

              return menuNodeArr[index];
            }

            function grayOutNode(str) {
              var _index = getMenuNodeIndex(str);
              pageStatusListArray[_index].visited = 1;
              updateMenuVisited();
            }



            function getNextNodeToGo(str, direction) {
              var index;
              var len = menuIndexArray.length;
              for (var i = 0; i < len; i++) {
                if (menuIndexArray[i] === str) {
                  if (direction == "pre") {
                    if ((i--) >= 0) {
                      index = (i--);
                    }

                  } else if (direction == "next") {
                    if ((i++) < len) {
                      index = (i++);
                    }
                  } else {
                    index = i;
                  }

                  break;
                }
              }

              return menuIndexArray[index];
            }




            function checkValidModulePage(str) {
              var len = menuNodeArr.length;
              for (var i = 0; i < len; i++) {
                if (menuNodeArr[i] == str) {
                  return true;
                }
              }
              return false;
            }



            /* Dynamically Populating Content to Popup Model */
            $("#myModal").on("show.bs.modal", function (e) {
              var link = $(e.relatedTarget);
    //Reset custom added Properties initially 
    $(this).find(".modal-title").text("");
    // $(this).find(".modal-dialog").css({"transform":"translateY(none)"});
    $(this).find(".modal-title").css({ "color": "#F4F2F3", "font-size": "100%" });
    $(this).find(".modal-dialog").css({ "width": "80%", "padding-bottom": "0", "max-height": "100vh" });

    //$(this).find(".modal-dialog").css({"transform":"translateY(45%)"});
    //$(this).find(".modal-content").css({"top":"auto","background-color":"#005282","color":"#000"});
    $(this).find(".modal-header").css({ "padding": "10px" });
    //$(this).find(".modal-content").css({"height":"auto","overflow":"hidden"});
    $('.modal-backdrop').removeClass('opacity0');
    $(this).find(".modal-header .close").removeClass("closeCustom");
    $(this).find(".modal-title").removeClass("titleCustom");
    $(this).find(".modal-content").removeClass("contentCustom");
    $(this).find(".modal-dialog").removeClass("dialogCustom");
    $(this).find(".modal-body").children().remove();




    if (link[0].id == "typeImg" && link[0].src != undefined) {
      var ht = window.innerHeight - (window.innerHeight) * 0.25 + "px";
      $(this).find(".modal-dialog").css({ "max-height": ht });

      var credTxt = "";
      var title = "";
      var data;
      var html = "<div class='' style='text-align:center;max-height:55vh;overflow:auto;'><img src=" + link[0].src + " id='popupimg' style='max-width:120vw;'></div><div class='creditLine'>" + credTxt + "</div>";

        //img.appendTo($(this).find(".modal-body"));
        $(this).find(".modal-body").append(html);

        if (link[0].getAttribute("data-info")) {
          data = link[0].getAttribute("data-info");
        }

        if (data != undefined) {
          var titleStr = (data).split('|');
          if (titleStr[0] && titleStr[0] != "none") {
            title = titleStr[0];
          }
          if (titleStr[1]) {
            credTxt = titleStr[1];
          }

          $(this).find(".modal-title").html(title);
          $(this).find(".creditLine").text(credTxt);
          if (window.innerWidth < 768) {
            $(this).find(".modal-dialog").css({ "width": "90%", "transform": "translateY(1vh)", "margin-top": "4%" }); /* changed */
            $(".popupImgCont").find('img').css({ "max-width": "80vw" });
          } else {
            $(this).find(".modal-dialog").css({ "width": "60%", "transform": "translateY(1vh)", "margin-top": "4%" });  /* changed */
          }

            // $(this).find(".modal-content").css({"height":"80vh","overflow":"scroll"});
          }
        }

        if (link[0].id == "typeTable") {
          var ht = window.innerHeight - (window.innerHeight) * 0.20 + "px";
          var data;
          if (link[0].getAttribute("data-info")) {
            data = link[0].getAttribute("data-info");
          }
          if (data != undefined) {
            var str = data;
            var arr = str.split('|');
            var title = "";
            var src = "";
            if (arr && arr.length > 1) {
              title = arr[0];
              src = arr[1];
              $(this).find(".modal-body").load(src);

              $(this).find(".modal-title").html(title);
              if (window.innerWidth <= 768) {
                $(this).find(".modal-dialog").css({ "width": "95%", "transform": "translateY(15vh)", "padding-bottom": "10%", "max-height": "none" });
              } else {
                $(this).find(".modal-dialog").css({ "width": "60%", "transform": "translateY(15vh)", "padding-bottom": "10%", "max-height": "none" });
              }

            }
          }




        }

        if (link[0].id == "typeText") {
          var data;
          if (link[0].getAttribute("data-info")) {
            data = link[0].getAttribute("data-info");
          }

          if (data != undefined) {
            $(this).find(".modal-title").html(data);
            $(this).find(".modal-header .close").addClass("closeCustom");
            $(this).find(".modal-title").addClass("titleCustom");
            $(this).find(".modal-content").addClass("contentCustom");
            $(this).find(".modal-dialog").addClass("dialogCustom");

            if (window.innerWidth < 767) {
              $(this).find(".modal-dialog").css({ "width": "70%", "transform": "translateY(2vh)", "margin-top": "4%" }); /* changed */
            } else {
              $(this).find(".modal-dialog").css({ "width": "40%" });
              $(this).find(".modal-dialog").css({ "transform": "translateY(2vh)", "margin-top": "4%" }); /* changed */
            }

            setTimeout(function () {
              $('.modal-backdrop').addClass('opacity0');
            }, 10);
          }
        }

        if (link[0].id == "typeImgText") {
          var data;
          if (link[0].getAttribute("data-info")) {
            data = link[0].getAttribute("data-info");
          }
          if (data != undefined) {
            var str = data;
            var arr = str.split('|');
            var title = "";
            var src = "";
            var credTxt = "";

            if (arr && arr.length > 1) {
              title = arr[0];
              src = arr[1];
              if (arr[2]) {
                credTxt = arr[2];
              }

              var ht = window.innerHeight - (window.innerHeight) * 0.20 + "px";
              $(this).find(".modal-dialog").css({ "max-height": ht });
                // var html = "<div class='popupImgCont'><img src="+src+" id='popupimg'></div><div class='creditLine'>"+credTxt+"</div>";
                var html = "<div class='' style='text-align:center;max-height:55vh;overflow:auto;'><img src=" + src + " id='popupimg' style='max-width:120vw;'></div><div class='creditLine'>" + credTxt + "</div>";

                //img.appendTo($(this).find(".modal-body"));
                $(this).find(".modal-body").append(html);
                $(this).find(".modal-title").html(title);
                $(this).find(".creditLine").text(credTxt);



                if (window.innerWidth <= 768) {
                  $(this).find(".modal-dialog").css({ "width": "95%", "transform": "translateY(15vh)" });
                } else {
                  $(this).find(".modal-dialog").css({ "width": "60%", "transform": "translateY(15vh)" });
                }




              }
            }

          }


        });

/* Dynamically Populating Content to pre-test */

function populatePretestPage(qn) {

  var question = pretestData.questions[qn].question;
  var id = pretestData.questions[qn].id;
  var optionsStr = '';
  var options = pretestData.questions[qn].choices;
  var choiceLen = pretestData.questions[qn].correct.length;
  $.each(options, function(key, value) {
    if(pretestData.questions[qn].multi) {
      optionsStr += '<label class="radio"><input value="' + key + '" type="checkbox" name="' + id + '">' + value + '</label>';
    } else {
      optionsStr += '<label class="radio"><input value="' + key + '" type="radio" name="' + id + '">' + value + '</label>';
    }
  });

  var qnStr = '<label class="control-label">' + question + '</label>';
  $('.pre-test').find('.qn-block').html(qnStr + optionsStr);
  $('.pre-test').find('.qn-block').attr('data-id', qn)
  $('.pre-test').find('.qn-block').attr('data-multi', pretestData.questions[qn].multi)

  if(pretestData.questions[qn].multi) {
    $('.pre-test').find('.qn-block').append('<span><strong>Note:</strong> Select atleast '+choiceLen+' choices</span>')
  }

    //Display question number against total questions in the bottom 
    $(".postTestNav").css({ "display": "block" });
    $(".postTestNav").text(qn + 1 + " of " + pretestData.questions.length);
  }

  function validateAnswers() {
    var ansKeyLen = pretestKey.length;
    pretestMarkScored = 0;
    pretestTotalQn = ansKeyLen;

    var unansweredKeysArr = checkIfAllKeyAnswered();
    if (unansweredKeysArr.length > 0) {
      var str = "";
      for (var i = 0; i < unansweredKeysArr.length; i++) {
        if (i == (unansweredKeysArr.length - 1)) {
          str = str + unansweredKeysArr[i];
        } else {
          str = str + unansweredKeysArr[i] + ", ";
        }

      }
      swal("You have not answered question(s): " + str); /* updated */
      return;
    }
    for (var i = 0; i < ansKeyLen; i++) {
      validateQn(pretestKey[i].id, pretestKey[i].key);
      if (i == (ansKeyLen - 1)) {
            //hide submit button
            $('.submitPara').css('display', 'none');
            //$('.popupInfo').css('display','block');
            //$('.popupInfo').html("<div><p class='pretest-msg'>You have completed your Pre-test.</p>
            //<p class='pretest-score'>You have scored "+pretestMarkScored+"/"+pretestTotalQn+"</p></div>")

            swal({
              title: "You have completed your Pre-test.",
              text: "<span style='font-size:14pt;color:#005282;'>You have scored " + postQnAnsObj.totalScore + "/" + pretestTotalQn + "</span>",
              html: true
            });

          }
        }
      }


      function checkIfAllKeyAnswered() {
        var unAnsKeysArr = new Array();
        var ansKeyLen = pretestKey.length;
        for (var i = 0; i < ansKeyLen; i++) {
          if (!checkIfAKeyAnswered(pretestKey[i].id)) {
            console.log('if check if a key answered')
            // unAnsKeysArr.push(i + 1);
          }
        }

        return unAnsKeysArr;
      }

      function checkIfAKeyAnswered(key) {
        var radios = document.getElementsByName(key);
        var radiosLen = radios.length;
        for (var i = 0; i < radiosLen; i++) {
          if (radios[i].checked) {
            return true;
          }
        }

        return false
      }

      function checkIfAKeyAnswered(key) {
        $('input').click(function () {
          $('input:not(:checked)').parent().removeClass("checked");
          $('input:checked').parent().addClass("checked");
        });
        $('input:checked').parent().addClass("checked");
      };

      function validateQn(key, value) {
        var radios = document.getElementsByName(key);
    // var checkedFlag = false;
    for (var i = 0; i < radios.length; i++) {

        //Check if span is already there which contains msgs ,remove msg
        if (radios[i].parentElement.lastChild) {
          if (radios[i].parentElement.lastChild.nodeName == "SPAN") {
            radios[i].parentElement.removeChild(radios[i].parentElement.lastChild);
          }
        }
        if (radios[i].checked) {
          if (radios[i].value == value) {
            console.log("correct answer");
            var span = document.createElement("span");
            span.className = "glyphicon glyphicon-ok correctMsg";
            radios[i].parentElement.appendChild(span);
            pretestMarkScored++;
          } else {
            console.log("In-correct answer");
            var span = document.createElement("span");
            span.className = "glyphicon glyphicon-remove incorrectMsg";
            radios[i].parentElement.appendChild(span);
          }
            //checkedFlag = true;
          }
          radios[i].disabled = true;
        }
    //return checkedFlag;
  }


  /*  Post-Test Data Navigation & question handling */
var review = [], wholeReview = [];
  function validatePostAns() {
    var keys = $(".radio").find("input");
    if (!keys[0].getAttribute("name")) {
      alert("No names provided for radio group.Please validate");
      return;
    }

    var key = keys[0].getAttribute("name");
    var value = null;
    var rational = '';
    var answer = '';

    if (!postQuizData.questions.length) {
      alert("Not a validate POST data JSON.Missing questions");
      return;
    }
    var nodeLen = postQuizData.questions.length;
    //Update result Obj with total test questions
    postQnAnsObj.totalQn = nodeLen;
    var nodePos = null;
    for (var i = 0; i < nodeLen; i++) {
      if (postQuizData.questions[i].id == key) {
        value = postQuizData.questions[i].correct;
        if (postQuizData.questions[i].rational) {
          rational = postQuizData.questions[i].rational;
        }
        if(postQuizData.questions[i].multi) {
          for(var j=0;j<value.length;j++) {
            answer += postQuizData.questions[i].choices[value[j]] + '\n<br/>';
          }
        } else {
          answer = postQuizData.questions[i].choices[value];  
        }
        
        nodePos = i;
            /*console.log("value :" +value);
            console.log("rational :" +rational);
            console.log("answer :" +answer);*/
            break;
          }
        }
        if (value == null) {
          alert("Not a validate POST data JSON.Missing Answers");
          return;
        }

        var radios = document.getElementsByName(key);
        var checkedFlag = false;
        var result = null;
        if(postQuizData.questions[i].multi) {
          for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              console.log(radios[i].length)
              review.push(radios[i].value)
            }
          }
          wholeReview.push(review)
        } else {
          for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              wholeReview.push(radios[i].value)
            }
          }
        }
        
          scormAdaptor_setreview(wholeReview)
          scormAdaptor_setRecalreview(wholeReview)

        var infoObj = checkPostTestAns(key, value);
        // if (infoObj.attempted == false) {
        //   swal("Please select an answer to proceed!");
        //   return
        // }
        postTstQnDone = true;
    //update Quiz Score
    if (infoObj.result == "Correct") {
      postQnAnsObj.totalScore++;
    }
    // Hide Submit button to avoid re-attemt
    $(".form").find(".submitPara").remove();
    // $(".form").find(".resultBlock").css({ "display": "block" });

    /* if(infoObj.result == "Correct"){
         if(rational != ""){
             var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' +answer+'</p></br><p class="expPara"><span class="ansTxt">Rationale:</span> '+ rational +'</p>';
         }else{
             var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' +answer+'</p>';
         }
         
       }else{*/
        // if (rational != "") {
        //   var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' + answer + '</p></br><p class="expPara"><span class="rationalTxt">Rationale:</span> ' + rational + '</p>';
        // } else {
        //   var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' + answer + '</p>';
        // }

    // }
    // $(".resultBlock").html(resultHtml);
    //console.log("nodePos :"+nodePos);
    //Display Finish Button
    if (nodePos == (nodeLen - 1)) {
      $('.finishPara').css({ 'display': 'block' });
      $('.nav-next').css({ "display": "none" });
    }
  }


  /*  Pre-Test Data Navigation & question handling */

  function validatePreAns() {
    var keys = $(".radio").find("input");
    if (!keys[0].getAttribute("name")) {
      alert("No names provided for radio group.Please validate");
      return;
    }

    var key = keys[0].getAttribute("name");
    var value = null;
    var rational = '';
    var answer = null;

    if (!pretestData.questions.length) {
      alert("Not a validate POST data JSON.Missing questions");
      return;
    }
    var nodeLen = pretestData.questions.length;
    //Update result Obj with total test questions
    postQnAnsObj.totalQn = nodeLen;
    var nodePos = null;
    for (var i = 0; i < nodeLen; i++) {
      if (pretestData.questions[i].id == key) {

        value = pretestData.questions[i].correct;

        if (pretestData.questions[i].rational) {
          rational = pretestData.questions[i].rational;
        }

        answer = pretestData.questions[i].choices[value];
        nodePos = i;
            /*console.log("value :" +value);
            console.log("rational :" +rational);
            console.log("answer :" +answer);*/
            break;
          }
        }
        if (value == null) {
          alert("Not a validate POST data JSON.Missing Answers");
          return;
        }

        var infoObj = checkPreTestAns(key, value);
        if (infoObj.attempted == false) {
          swal("Please select an answer to proceed!");
          return
        }
        postTstQnDone = true;
    //update Quiz Score

    if (infoObj.result == "Correct") {
      postQnAnsObj.totalScore++;
    }
    // Hide Submit button to avoid re-attemt
    $(".form").find(".submitPara").remove();
    $(".form").find(".resultBlock").css({ "display": "block" });

    /* if(infoObj.result == "Correct"){
         if(rational != ""){
             var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' +answer+'</p></br><p class="expPara"><span class="ansTxt">Rationale:</span> '+ rational +'</p>';
         }else{
             var resultHtml = '<p class="ansPara"><span class="ansTxt">Answer: </span>' +answer+'</p>';
         }
         
       }else{*/


    // }
    // $(".resultBlock").html(resultHtml);
    //console.log("nodePos :"+nodePos);
    //Display Finish Button
    if (nodePos == (nodeLen - 1)) {
      $('.finishPara').css({ 'display': 'block' });
        // $('.nav-next').css({ "display": "none" });
      }
    }


    function checkPostTestAns(key, value) {
      var radios = document.getElementsByName(key);
      var checkedFlag = false;
      var result = null;
      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          if(typeof value == 'object') {
            for(var j=0;j<value.length;j++) {
              if (radios[i].value == value[j]) {
                result = "Correct";
                radios[i].className = 'correct'
              } else {
                result = "Wrong";
                radios[i].className = 'incorrect'
              }
            }
          } else {
            if (radios[i].value == value) {
              result = "Correct";
              radios[i].className = 'correct'
            } else {
              result = "Wrong";
              radios[i].className = 'incorrect'
            }
          }
          checkedFlag = true;
          disableRadios(radios);
        }
      }

      // if(typeof value == 'object') {
      //   for(var j=0;j<value.length;j++) {
      //     radios[value[j]].className = 'correct'
      //   }
      // } else {
      //   radios[value].className = 'correct'
      // }

      // $('.qn-block .radio').each(function() {
      //   if($(this).find('.correct')) {
      //     var span = document.createElement("span");
      //     span.className = "glyphicon glyphicon-ok correctMsg";
      //     $(this).find('.correct').parent().append(span)
      //   }
      //   if($(this).find('.incorrect')) {
      //     var span = document.createElement("span");
      //     span.className = "glyphicon glyphicon-remove incorrectMsg";
      //     $(this).find('.incorrect').parent().append(span)
      //   }
      // })

      return { "attempted": checkedFlag, "result": result };
    }

    function checkPreTestAns(key, value) {
      var radios = document.getElementsByName(key);
      var checkedFlag = false;
      var result = null;

      for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
          if(typeof value == 'object') {
            for(var j=0;j<value.length;j++) {
              if (radios[i].value == value[j]) {
                result = "Correct";
                radios[i].className = 'correct'
              } else {
                result = "Wrong";
                radios[i].className = 'incorrect'
              }
            }
          } else {
            if (radios[i].value == value) {
              result = "Correct";
              radios[i].className = 'correct'
            } else {
              result = "Wrong";
              radios[i].className = 'incorrect'
            }
          }

          checkedFlag = true;
          disableRadios(radios);
        }
      }
      if(typeof value == 'object') {
        for(var j=0;j<value.length;j++) {
          radios[value[j]].className = 'correct'
        }
      } else {
        radios[value].className = 'correct'
      }

      $('.qn-block .radio').each(function() {
        if($(this).find('.correct')) {
          var span = document.createElement("span");
          span.className = "glyphicon glyphicon-ok correctMsg";
          $(this).find('.correct').parent().append(span)
        }
        if($(this).find('.incorrect')) {
          var span = document.createElement("span");
          span.className = "glyphicon glyphicon-remove incorrectMsg";
          $(this).find('.incorrect').parent().append(span)
        }
      })

      return { "attempted": checkedFlag, "result": result };
    }

    function disableRadios(radios) {
      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
      }
    }

    function showReview() {
      reviewQn = true;
      populateQuestion(0);
      scormAdaptor_setreview(null)
      $('.finishPara').hide();
    }

    /*------------- Popup box Post Test Operations ---------------------*/

    function showFinalScore() {

      var score = postQnAnsObj.totalScore;
      var outOf = postQnAnsObj.totalQn;

      /*******************Sumanth Added below code*******************/
      var _percent = score / outOf * 100;

      swal({
        title: "You have now completed the module and final score is " + score + "/" + outOf, 
        text: "",
        type: "",
        showCancelButton: false,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "OK",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: false
      },
      function (isConfirm) {
        if (isConfirm) {
          var score = postQnAnsObj.totalScore;
          var outOf = postQnAnsObj.totalQn;
          console.log('Total answered ' + postQnAnsObj.totalScore + ' Out of '+ outOf)

          /*******************Sumanth Added below code*******************/
          var _percent = score / outOf * 100;

          if (appType != 'standalone') {
					//if(passScore >= _percent) { 

           scormAdaptor_setscore(_percent);

           scormAdaptor_complete();
					// }
					//alert(_percent)
					//scormAdaptor_commit(); 
				}
          var answers = scormAdaptor_getRecalreview();
          
          var result='', rational='', multi ='', crct='';
          for(var i=0;i<postQuizData.questions.length;i++) {
            if(postQuizData.questions[i].correct.length >1) {
              for(var j=0;j<postQuizData.questions[i].correct.length;j++) {
                multi += postQuizData.questions[i].choices[postQuizData.questions[i].correct[j]] +'<br/>'
                crct += postQuizData.questions[i].choices[answers[i][j]] +'<br/>'
              }
              result += '<p><strong>Question:</strong><br/>'+postQuizData.questions[i].question+'</p><p><strong>Your Answer:</strong><br/>'+crct+'</p><p><strong>Correct Answer:</strong><br/>'+multi+'</p><p><strong>Rational:</strong><br/>'+postQuizData.questions[i].rational+'</p><br/>';
            } else {
              crct = postQuizData.questions[i].choices[answers[i]] +'<br/>'
              result += '<p><strong>Question:</strong><br/>'+postQuizData.questions[i].question+'</p><p><strong>Your Answer:</strong><br/>'+crct+'</p><p><strong>Correct Answer:</strong><br/>'+postQuizData.questions[i].choices[postQuizData.questions[i].correct]+'</p><p><strong>Rational:</strong><br/>'+postQuizData.questions[i].rational+'</p><br/>';
            }
          }
          $('.post-test-quiz .qn-block, .finishPara').remove()
        $('.post-test-quiz #resultBlock').html(result + '<input type="submit" value="Finish" onclick="handleWindowClose()" class="finishTest"/>');
        $('.post-test-quiz #resultBlock').show()
        

				/*******************Sumanth code ends here *******************/

          

				postQnAnsObj.completedTest = true;
				swal.close();

        $('html, body').animate({
            scrollTop: $('#rowcontent').offset().top
          }, 500)

        console.log('Total scored in %', scormAdaptor_getscore('_score'))

				// var msgStr = '<div class="postTstPopUp"><h1>You have Scored '+score+"/"+outOf+'</h1></div>';
				// popup(msgStr);
      } else {

                //swal("Cancelled", "Your imaginary file is safe :)", "error");
              }
            });
    }
function handleWindowClose() {
  window.close();
}
    $(document).on('click', '.sa-confirm-button-container .confirm', function() {
      console.log($(window).width())
      if($(window).width()<1024) {
        var pretestId = $('.menu-wrap2 .progress-wrapper-main .progress-label.selected').text()
        visitedPage.push(pretestId)
        if(pretestId == 'Pre-test') {
          $('#'+pretestId+'_icon').next().addClass('completed');
          $('#'+pretestId+'_icon').addClass('button-open2');
          $('#'+pretestId).css('width','100%').text('100%');
          $('.menu-wrap2 .progress-wrapper-main .progress-label.completed').removeClass('selected')
          $('#'+pretestId+'_icon').parent().next().find('.progress-label').addClass('selected');
          $('.nav-next').trigger('click');
          var obj = getIndexObjFromMenu($('.menu-wrap2 .progress-wrapper-main .progress-label.selected').text());
          navigateToIndex(obj);
        }
      } else {
        var pretestId = $('#menu-ul li.selected').attr('data-id');
        visitedPage.push(pretestId)
        if(pretestId == 'Pre-test') {
          $('#menu-ul li.selected').addClass('completed');
          $('#menu-ul li.selected').find('div').animate({'width': '100%'}, 500);
          $('#menu-ul li.selected').find('span').css('left','86%').text('100%');
          $('#menu-ul li.selected').next().trigger('click').addClass('selected');
          $('#menu-ul li.completed').remove('selected')

          // var obj = getIndexObjFromMenu(pretestId);
          // navigateToIndex(obj);
        }
      }
      
      postQnAnsObj.totalScore = 0 
    });

    $(document).ready(function () {
    // Enable tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // if user clicked on button, the overlay layer or the dialogbox, close the dialog  
    $('a.btn-ok, #dialog-overlay, #dialog-box').click(function () {
      $('#dialog-overlay, #dialog-box').hide();
      return false;
    });
    // if user resize the window, call the same function again
    // to make sure the overlay fills the screen and dialogbox aligned to center    
    $(window).resize(function () {
        //only do it if the dialog box is not hidden
        if (!$('#dialog-box').is(':hidden')) popup();
        var device = detectZoom.device();
        if (device < 1) {
          $(".menu-cont").css({ "display": "block" });
          $(".content-right-panel").css({ "display": "block" });

        }
      });

  });

//Popup dialog
function popup(message) {
    // get the screen height and width  
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    // calculate the values for center alignment
    /*var dialogTop =  (maskHeight/3) - ($('#dialog-box').height());*/
    var dialogTop = '30%';
    var dialogLeft = (maskWidth / 2) - ($('#dialog-box').width() / 2);

    // assign values to the overlay and dialog box
    $('#dialog-overlay').css({ height: maskHeight, width: maskWidth }).show();
    $('#dialog-box').css({ top: dialogTop, left: dialogLeft }).show();

    // display the message
    $('#dialog-message').html(message);

  }


  /*------------- Popup box Post Test Operations ends ---------------------*/


/*$(".header_exit").on("click", function(event){

    swal({   title: "Are you sure, you want to exit?",   text: "You might fail in the test",  
     type: "warning", 
     showCancelButton: true,   
     confirmButtonColor: "#DD6B55",   
     confirmButtonText: "Yes, Exit the test!",   
     closeOnConfirm: false }, 
        function(){   
            swal("Test Cancelled", "You have exit the course.", "success"); 
        });
});
*/


/*----------------------- Mobile specific operation----------------------------------------*/

$(window).on("orientationchange", function () {
  if (window.innerWidth > window.innerHeight) {
        //Landscape Mode
        toggleFlag = false;
      } else {
        //Portrait mode
        toggleFlag = true;
      }
      toggleMenu();
    });


/*----------------------- Citation operation----------------------------------------*/
var fromName = null;
var prevClass = null;

function gotoCite(elem, origin) {
  var citeClass = elem.className.split(" ")[0];
  var citeNameAttr = null;
  if ($(elem).attr("name")) {
    citeNameAttr = $(elem).attr("name");
  }
  if ((prevClass == citeClass) && (fromName != null)) {
    citeNameAttr = fromName;
  }
  var citeObj = getCitationObj(citeClass, citeNameAttr);
  if (citeObj == null) {
    alert("Invalid Citation.Please check attributes");
    return;
  }
  var toUrl = null;
  var direction = "same";

  if (origin == "to") {
    toUrl = citeObj.to;
    if (citeObj.type && citeObj.type == "same") {
      var scrollToId = "#" + citeObj.idFrom;
    } else {
      var scrollToId = "#" + citeObj.id;
      if ($(elem).attr("name")) {
        fromName = $(elem).attr("name");
        prevClass = citeObj.class;
      }
    }
  } else {
    toUrl = citeObj.from;
    var currClass = citeObj.class;
    if (currClass != prevClass) {
      fromName = null;
      prevClass = null;
    }
    if (citeObj.type && citeObj.type == "same") {
      var scrollToId = "#" + citeObj.idTo;
    } else {
      if (!fromName) {
        var scrollToId = "#" + citeObj.id;
      }

    }
  }

  if (checkValidModulePage(toUrl) && (toUrl != null)) {
    var obj = getIndexObjFromMenu(toUrl);
    navigateToIndex(obj);
    if (isMobileAndPortrait) {
      toggleFlag = true;
      toggleMenu();
    }
    var str = getModuleMenuArray(currentModuleName, direction);
    hightlightSelectedNode(str);


    setTimeout(function () {
      if (scrollToId) {
        scroll(scrollToId, '.main-content');
      } else {
        scrollByName(fromName, '.main-content')
      }
    }, 200);
  }

}

function getCitationObj(keyClass, nameAttr) {
  var citeObj = null;
  var citeLen = citationData.citations.length;
  for (var i = 0; i < citeLen; i++) {
    if (citationData.citations[i].class == keyClass) {
      if (nameAttr != null) {
        if (citationData.citations[i].originId) {
          if (citationData.citations[i].originId == nameAttr) {
            citeObj = citationData.citations[i];
            return citeObj;
          }
        } else {
          alert("Please feed originId into respective node of citation.json")
        }
      } else {
        citeObj = citationData.citations[i];
        return citeObj;
      }

    }
  }

  return citeObj;
}


function submitTimeOut(itm, id) {
  var originalname = id; /* added */
  if ($(itm).parent().parent().find('textarea')) {
    var txt = $(itm).parent().parent().find('textarea').val();
    if (txt.length == 0) {
      swal("Please input something to Save");
    } else {

      /*************** Impelsys Added ******************/
      localStateValues = localStorage.optionState ? JSON.parse(localStorage.optionState) : {};
      localStateValues[id] = txt;
      localStorage.optionState = JSON.stringify(localStateValues);
      /*************************************************/
      /**************************Sumanth Added below code*******************/
      if (appType != 'standalone') {
        var _lNum = id.split('_')[1];
                //var _questionText = $('#timeoutQuestion_'+_Id).text();
                var _qType = "fill-in";
                var _userAns = $('#' + id).val();

                scormAdaptor_setInteraction(_lNum, id, _qType, _userAns);
              }
              /**************************Sumanth Code end here*********************/
              $(itm).css({ "color": "#808080" });
            //$(itm).disabled();
            swal({
              title: 'Your activity has been saved.',
              text: 'You can find it in "My Modules".'
            },
            function () {
                    closeMobileDeviceKeyBoard();//added
                    if (visibleTextarea != null) {
                      setTimeout(function () {
                            resetPosition(document.getElementById(id));//added
                          }, 500);

                    }
                    document.getElementById(id).blur();
                    visibleTextarea = null;
                  });
            if (isMobile()) {
              $('input[type="submit"]').prop('disabled', true);
                //id.blur();
              }
            }
          }
        }
        function closeMobileDeviceKeyBoard() {
          try {
            window.parent.cordova.plugins.Keyboard.close();
          } catch (e) { }
        }

/* function resetSaveBtn(itm) {
    var saveBtn = $(itm).parent().parent().find('input');
    if (saveBtn) {
        saveBtn.css({ "color": "#FFFFFF" });
    }
	
  } */

// This function is already calling when clicking of the textarea <textarea>

function resetSaveBtn(itm) {

  $('input[type="submit"]').prop('disabled', false); /* added */
    //$("#" + crt).removeAttr("readonly", "readonly");
    var titm = $(itm).attr('id');
    $("#" + titm).focus();
    visibleTextarea = titm;
    /* $('.menu-bar .icon').css('display','block');
    $('.menu-bar .headline').css('width','76%');
    $('.menu-bar p').css('font-size','1em'); */
    //$('textarea[name="textadd"]').css('cursor','pointer'); /* added */
    // It is recommended  to call only if mobile devices 
    resetPosition(itm);

    var saveBtn = $(itm).parent().parent().find('input');
    if (saveBtn) {
      saveBtn.css({ "color": "#FFFFFF" });
    }
    setTimeout(function () {
      resetPosition(itm);
    }, 500);
  }

// ******* IMPELSYS ADDED ********
document.addEventListener("touchend", function (e) {
  if (e.target.nodeName.toString().toUpperCase() == 'TEXTAREA') {
    console.log("Element Type" + e.target.nodeName.toString() + ", Element Id " + e.target.id);
    doUpdateIframeFocus();
  }
  else if (e.target.nodeName.toString().toUpperCase() == 'INPUT') {
    if (!e.target.disabled && e.target.id.trim().slice(0, 7) == "btnsave" && !isiOS()) {
      setTimeout(function () {
        e.target.click();
        setTimeout(function () {
          resetPosition($(e.target).parent().parent().find('textarea')[0]);
        }, 600);
      }, 300);
    }
  }
  else if(visibleTextarea!=null){
    var localTextarea = visibleTextarea;
    try{
     setTimeout(function(){
      resetPosition(document.getElementById(localTextarea));
      visibleTextarea=null;

    },600);

   }catch(e){}
 }
});

// Scrolling the textarea to the header
function resetPosition(timeid) {

  if (isMobile()) {
        //if (true) {
        //var to = document.getElementById("timeout_2").getBoundingClientRect();

        // If add the id for the textarea tag it will be good for with out having any issues with class name index
        //var timeoutElement = document.getElementsByClassName("form-control custom-control")[0].getBoundingClientRect();
        //var timeoutElement = document.getElementById(timeid).getBoundingClientRect();
        var timeoutElement = timeid.getBoundingClientRect();
        //col-md-10 col-sm-10 col-xs-10 no-padding headline

        // If add the id for the this div tag it will be good for with out having any issues with class name index
        
        //var headertop = document.getElementsByClassName("col-md-10 col-sm-10 col-xs-10 no-padding headline")[0].getBoundingClientRect();
        var titleHeader = document.getElementById("titleHeader").getBoundingClientRect();
        /* var headertop = position.getBoundingClientRect(); */

        //document.getElementsByClassName("row main-content")[0].scrollTop = document.getElementsByClassName("row main-content")[0].scrollTop+timeoutElement.top-headertop.bottom-((headertop.bottom/100)*20);

        document.getElementsByClassName("row main-content")[0].scrollTop = document.getElementsByClassName("row main-content")[0].scrollTop + timeoutElement.top - titleHeader.bottom - ((titleHeader.bottom / 100) * 10);
        //timeid.focus();
        var originalVal = timeid.value;
        timeid.value = timeid.vlaue + " ";
        timeid.value = originalVal;
        /* $("#"+crt).select(); */
      }
    }

// ******* detecting the device type ***********
function isMobile() {
  var isMobileFlag = false;
  try {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //console.log("Mobile");
            isMobileFlag = true;
          }
          else if (!isMobileFlag) {
            try {
              isMobileFlag = /iPhone|iPad|iPod/i.test(navigator.platform);
                // console.log("Mobile");
              }
              catch (e) {
                isMobileFlag = false;
              }
            }
            else if (!isMobileFlag) {
              try {
                document.createEvent("TouchEvent");
                isMobileFlag = true;
              }
              catch (e) { }
            }

          } catch (e) { }
          return isMobileFlag;
        }

        function isiOS() {
          var isiOSFlag = false;
          try {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            //console.log("Mobile");
            isiOSFlag = true;
          }
          else if (!isiOSFlag) {
            try {
              isiOSFlag = /iPhone|iPad|iPod/i.test(navigator.platform);
                // console.log("Mobile");
              }
              catch (e) {
                isiOSFlag = false;
              }
            }

          } catch (e) { }
          return isiOSFlag;
        }

// ****** Check iframe focus *********
function doUpdateIframeFocus(itm) {
  if (window.parent) {
    try {
      window.parent.document.getElementById('launchFrame').contentWindow.focus();
    } catch (e) {
      itm.focus();
    }
  }
  else {
    itm.focus();
  }
}

var text_max = 255;

function textCounter(itm) {
  if ($(itm).parent().parent().find('textarea')) {
    var txt = $(itm).parent().parent().find('textarea').val();

    var text_length = $(itm).parent().parent().find('textarea').val().length;
    var text_remaining = text_max - text_length;
    $('.textCounter').html(text_remaining + ' characters remaining');
  }
}