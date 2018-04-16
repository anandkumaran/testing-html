/*************** Impelsys Added ******************/
function updatelocalValue() {
    if (localStorage.optionState) {
        localStateValues = JSON.parse(localStorage.optionState);
        for (option in localStateValues) {
            if (localStateValues[option]) {
                $('#' + option).val(localStateValues[option]);
            }
        }
    }
}
updatelocalValue();
/************************************************/
$(".navigation").on("click", function(e) {
    var direction = "";
	//alert("ok")
    if ($(e.target).hasClass('nav-pre-txt') || ($(e.target).hasClass('glyphicon-menu-left'))) {
        direction = "pre"
        handleNavigation(direction);
    }
    if ($(e.target).hasClass('nav-next-txt') || ($(e.target).hasClass('glyphicon-menu-right'))) {
        direction = "next";
		//alert("hi")
		//$menuWrap = $('.menu-wrap2 menu-show2'),
		$('.menu-wrap2').removeClass('menu-show2');
		$('.toggle-button2').removeClass('button-open2');
        handleNavigation(direction);
    }
    if ($(e.target).hasClass('next-btn') || ($(e.target).hasClass('next-page'))) {
        direction = "next"
		
    }
 /* 	if ($("#myModal").hasClass('in')){
		$("body").removeClass('modal-open');
		$("#myModal").removeClass('in');    
		$("#myModal").find(".modal-header .close").removeClass("closeCustom");
		$("#myModal").find(".modal-title").removeClass("titleCustom");
		$("#myModal").find(".modal-content").removeClass("contentCustom");
		$("#myModal").find(".modal-dialog").removeClass("dialogCustom");
		$("#myModal").find(".modal-body").children().remove();
		}  */
		document.getElementsByClassName("close")[0].click();
		
});

$(".intro-image").on("click", function(e) {
	
    var direction = "";
    if ($(e.target).hasClass('next-btn') || ($(e.target).hasClass('next-page'))) {
        direction = "next";
		
    }
		
});

function handleNavigation(direction) {
    visitedPage.push(currentModuleName)
    if (!postTestStart) {
        var str = getModuleMenuArray(currentModuleName, direction, true);
        if(currentModuleName != 'Pre-test' && currentModuleName != 'Post-test') {
            cur = currentModuleName.replace(/ /g,"_");
            $('#menu-sidebar2 .progress-wrapper-main .progress-label').removeClass('selected')
            $('#'+cur+'_span').parent().removeClass('selected')
            $('#'+cur+'_span').parent().addClass('completed');
            $('#'+cur+'_ani').animate({'width': '100%'}, 500);
            $('#'+cur+'_span').css('left','86%').text('100%');
            $('#'+cur+'_icon').next().addClass('completed');
            $('#'+cur+'_icon').next().removeClass('selected');
            $('#' + cur).css('width','100%');  
            $('#' + cur).html('100%');
            $('#' + cur + '_icon').addClass("button-open2");
            $('#' + cur + '_icon').parent().next().find('.progress-label').addClass('selected');
        } else {
            cur = currentModuleName.replace(/ /g,"_");
            $('#'+cur+'_icon').next().removeClass('selected');
            $('#' + cur + '_icon').parent().next().find('.progress-label').addClass('selected');
        }
        
        var obj = getIndexObjFromMenu(str, null, true);
        /*highlightNextNode(str,direction);*/


        var _index = getMenuNodeIndex(str);
        if (pageStatusListArray[_index] != undefined) {
            pageStatusListArray[_index].visited = 1;
        }
        updateMenuVisited(str);


        //highlightNextNode(str,direction);

        navigateToIndex(obj);
    } else {
        handlePostTestNavigation(direction);
    }
}

var firstTime = true;

function handlePostTestNavigation(direction) {
    /*console.log("Loading question "+ currentPostQn);
    console.log("Json Length "+ postQuizData.questions.length);*/
    if (!direction) {
        return;
    }
    if (!postTestQn) {
        if (direction == "pre") {
            var str = getModuleMenuArray(currentModuleName, direction);
            var obj = getIndexObjFromMenu(str);
            hightlightSelectedNode(str);
            navigateToIndex(obj);
        }
    }

    if (firstTime && (direction == "next")) {
        $(".nav-next").removeClass("visible-off").addClass("visible-on");
        postTestQn = true;
        disableMenuAndNavButtons();
        firstTime = false;
        postTstQnDone = true;
		$(".content").scrollTop(0); /* added */
    }

    if (postTestQn) {
        
        if (!postTstQnDone && !reviewQn) {
            if (!checkIfRadioClicked()) {
                swal("Please select an answer to proceed!");
            } else {
                swal("Please click Submit button");
            }
            return;
        }
        $(".content").css({ 'opacity': '0' });
        $(".content").load('screens/postQzTemplate.html', function(responseTxt, statusTxt, xhr) {
            if (statusTxt == "success") {
                $(this).find('.qn-block').empty();
                populateQuestion(currentPostQn);
                postTstQnDone = false;
                if (currentPostQn == (postQuizData.questions.length - 1)) {
                    $('.nav-next').css({ "display": "none" });
                    //This will end loading questions
                    currentPostQn = null;
                } else {
                    currentPostQn++;
					$(".main-content").scrollTop(0);
                }

            }
            if (statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        }).animate({ opacity: '1' });
		$(".content").scrollTop(0); /* added */
    }
}

function checkIfRadioClicked() {
  
    if (($(".radio").find("input")) == null || ($(".radio").find("input")) == undefined) return;
    var keys = $(".radio").find("input");
    var key = keys[0].getAttribute("name");
    var radios = document.getElementsByName(key);
    var checkedFlag = false;

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checkedFlag = true;
        }

    }
    return checkedFlag;

}

function disableMenuAndNavButtons() {
    $('.nav-pre').css({ "display": "none" });
    var $li = $('#menu-ul').find('li');
    $.each($li, function(key, val) {
        $(this).off("click");
		// $(this).css('color','rgb(190, 190, 190)');
		$(this).css('cursor','default');
        if (!$(this).hasClass("selected")) {
            $(this).addClass("disabledBtn");
        }
        if ($(this).hasClass("expanded")) {
            $(this).toggleClass("expanded");
            $(this).children().hide();
        }
    });
}

function populateQuestion(qn) {
    var question = postQuizData.questions[qn].question;
    var id = postQuizData.questions[qn].id;
    var optionsStr = '';
    var options = postQuizData.questions[qn].choices;
    var choiceLen = postQuizData.questions[qn].correct.length;
    var recal = scormAdaptor_getRecalreview();
    $.each(options, function(key, value) {
        if(postQuizData.questions[qn].multi) {
                optionsStr += '<label class="radio"><input id="qn_'+key+'" value="' + key + '" type="checkbox" name="' + id + '">' + value + '</label>';
        } else {
            optionsStr += '<label class="radio"><input id="qn_'+key+'" value="' + key + '" type="radio" name="' + id + '">' + value + '</label>';
        }
    });

    var qnStr = '<label class="control-label">' + question + '</label>';
    $('.post-test-quiz').find('.qn-block').html(qnStr + optionsStr);
    $('.post-test-quiz').find('.qn-block').attr('data-id', qn)
    $('.post-test-quiz').find('.qn-block').attr('data-multi', postQuizData.questions[qn].multi)

    if(postQuizData.questions[qn].multi) {
        $('.post-test-quiz').find('.qn-block').append('<span><strong>Note:</strong> Select atleast '+choiceLen+' choices</span>')
    }
    if(recal != '' && reviewQn) {
        $('.nav-next').show()
        if(postQuizData.questions[qn].multi) {
            var id = $('.post-test-quiz .qn-block').attr('data-id');
            id = parseInt(id);
            for(var i=0;i<recal[id].length;i++) {
                $('.post-test-quiz .qn-block .radio #qn_'+recal[id][i]).attr('checked', true);
                $('.post-test-quiz .qn-block .radio #qn_'+recal[id][i]).parent().addClass('checked')
            }
        } else {
            var id = $('.post-test-quiz .qn-block').attr('data-id');
            id = parseInt(id);
            qid = parseInt(recal[id]);
            $('.post-test-quiz .qn-block .radio #qn_'+qid).attr('checked', true)
            $('.post-test-quiz .qn-block .radio #qn_'+qid).parent().addClass('checked')
        }
    }
    if($('.post-test-quiz .qn-block').attr('data-id') == postQuizData.questions.length -1 && reviewQn) {
      $('.finishPara').show();
    }

    //Display question number against total questions in the bottom 
    $(".postTestNav").css({ "display": "block" });
    $(".postTestNav").text(qn + 1 + " of " + postQuizData.questions.length);
}




function scroll(element, parent) {

    var str = element.split('#');
    var elem = str[1];
    //alert(elem);

    var interval = setInterval(function() {
        var el = document.getElementById(String(elem));
        if (el) {
            $(parent).animate({ scrollTop: $(parent).scrollTop() + $(element).offset().top - $(parent).offset().top - 10 }, { duration: 'slow', easing: 'swing' });
            $('html,body').animate({ scrollTop: $(parent).offset().top - 10 }, { duration: 500, easing: 'swing' });
            window.clearInterval(interval);
        }
    }, 10);
}


function scrollByName(name, parent) {
    var interval = setInterval(function() {
        var el = document.getElementsByClassName(name)[0];
        if (el) {
            $(parent).animate({ scrollTop: $(parent).scrollTop() + $(el).offset().top - $(parent).offset().top - 10 }, { duration: 'slow', easing: 'swing' });
            $('html,body').animate({ scrollTop: $(parent).offset().top - 10 }, { duration: 500, easing: 'swing' });
            window.clearInterval(interval);
        }
    }, 10);
}


var previousTopicIndex = null;
var previousUrl = null;

function navigateToIndex(obj) {
    //resetting navigation & postTest flags
    navigationFlag = false;
    postTestStart = false;

    // Fetching current page to load info
    currentIndex = obj.module_index;
    currentTopicIndex = obj.topic_index;
    currentSubTopicIndex = obj.page_index;
    currentModuleName = obj.currentModuleName;
    var page_url = obj.page_url;



    $(".postTestNav").css({ "display": "none" });

    if (!(page_url) && (page_url == null)) return;

    if (previousUrl != page_url) {
        if ((previousTopicIndex != currentTopicIndex) || (currentTopicIndex == null)) {

            previousTopicIndex = currentTopicIndex;
            $(".content").css({ 'opacity': '0' });
            $(".content").load(page_url, function(responseTxt, statusTxt, xhr) {
                if (statusTxt == "success") {
                    toggleFlag = false;
                    navigationFlag = true;
                    previousUrl = page_url;

                    if (obj.header_id != null && obj.header_id != undefined) {
                        var toIndex = String(obj.header_id)
                        scroll("#" + toIndex, '.main-content');
                    } else {
                        $('.main-content').scrollTop(0);
                    }

                    showHideNavButtons(currentIndex);
                    if (currentModuleName == "Post-Test" || currentModuleName == "Post-test") {
                        postTestStart = true;
                    }
                    /************* Impelsys Added **************/
                    $(".content").css({ 'opacity': '1' });
                    if ($(".content").css("opacity") === "1") {
                        updatelocalValue();
                    }
                    /*******************************************/
                }
                if (statusTxt == "error")
                    alert("Error: " + xhr.status + ": " + xhr.statusText);
            }).animate({ opacity: '1' });

            if(obj.overlay_avail) {
                var wrap = document.createElement('div');
                wrap.className = 'overlay-wrap';

                var parent = document.createElement('div');
                parent.className = 'overlay-parent';

                var close = document.createElement('span');
                close.className = 'overlay-close';
                close.appendChild(document.createTextNode('x'));

                var video = document.createElement('video');
                video.id = currentModuleName.replace(/ /g,"_")+'_vid';
                video.controls = true;
                video.style.width = '100%';

                var source = document.createElement('source');
                source.type = 'video/mp4';
                source.src = obj.video_url;

                video.appendChild(source);

                var content = document.createElement('div');
                content.className = 'overlay-content';
                content.appendChild(video);

                parent.appendChild(close);
                parent.appendChild(content);
                wrap.appendChild(parent);

                var videoId = currentModuleName.replace(/ /g,"_")+'_vid';

                $('body').append(wrap);

                document.getElementById(videoId).play();
            } else {
                $('.overlay-wrap').remove();
            }
        }
    }



    if (currentSubTopicIndex != null) {
        var toIndex = String(currentSubTopicIndex);
        //alert('1: '+toIndex);
        scroll("#" + toIndex, '.main-content');
    } else {

        if ((obj.header_id != undefined) && (obj.header_id != null)) {
            var toIndex = String(obj.header_id)
                //alert('2: '+toIndex);
            scroll("#" + toIndex, '.main-content');
        } else {
            $('.main-content').scrollTop(0);
        }
    }

    /************************Code Added by Sumanth**************************/
    if (appType != 'standalone') {
        setLMSData();
    }
    /************************Code Ended by Sumanth**************************/
}

$(document).on('click', '.overlay-wrap .overlay-close', function() {
    $('.overlay-wrap').remove();
});

function showHideNavButtons(index) {
    var len = getMenuLength();
    if (currentIndex < 1) {
        $(".nav-pre").removeClass("visible-on").addClass("visible-off");
        //$(".nav-pre").removeClass("bounce-left");
        $(".nav-next").removeClass("visible-on").addClass("visible-off");
        // $(".nav-pre").addClass("bounce-right");
    } else if (currentIndex == (len - 1)) {
        // $(".nav-next").removeClass("visible-off").addClass("visible-off");
        // $(".nav-pre").removeClass("visible-off").addClass("visible-on");

    } else {
        $(".nav-next").removeClass("visible-off").addClass("visible-on");
        $(".nav-pre").removeClass("visible-off").addClass("visible-on");

    }
}
