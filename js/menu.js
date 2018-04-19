
function populateMenu(data){
    var totalModules = data.modules ? data.modules.length : 0;
   
    $(".menu-box").html('<ul id="menu-ul"></ul>');
    for( var i = 0; i < totalModules; i++ )
    { 
        var node = data.modules[i];

        var subNode = node.topics ? node.topics.length : 0;
        var li = document.createElement("li");
        var div = document.createElement('div');
        var strong = document.createElement('strong');
        li.appendChild(div);
        div.innerHTML = node.module;
        div.className = 'ani-progress';
        div.id = node.module.replace(/ /g,"_") + '_ani';
        if(i == 0){
            li.className = "menu-box-li selected";
            visitedPage.push(node.module)
        }else{
            li.className = "menu-box-li";
        }
        li.dataset.id = node.module.replace(/ /g,"_");
        li.dataset.title = node.module;
        li.id = 'topic_'+node.id;
        strong.appendChild(document.createTextNode(node.module));
        // li.appendChild(document.createTextNode(node.module));
        li.appendChild(strong);
        var span = document.createElement('span');
        li.appendChild(span)
        span.id = node.module.replace(/ /g,"_") + '_span'
        // add attributes to menu li for audio
        if(node.audio) {
            li.dataset.audio = true;
            li.dataset.url = node.audio_url;
        } else {
            li.dataset.audio = false;
        }
       // menuIndexArray.push(node.module);
        if(subNode > 0){
            li.classList.add("nested");
            var subNode_topics_ul = document.createElement("ul");
            subNode_topics_ul.classList.add("subNode_topics_ul");
            li.appendChild(subNode_topics_ul);
            for(var j = 0 ; j < subNode ; j++){

                var subNode_topics_li = document.createElement("li");
                subNode_topics_li.className = "subNode_topics_li";

                subNode_topics_li.appendChild(document.createTextNode(node.topics[j].name));
                subNode_topics_ul.appendChild(subNode_topics_li);
                if(node.topics[j].type && (node.topics[j].type == "header")){
                    subNode_topics_li.classList.add("headerNav");
                    
                }

              //  menuIndexArray.push(node.topics[j].name);
               
                var subNode_topics_pages = node.topics[j].pages ? node.topics[j].pages.length : 0;

                if(subNode_topics_pages > 0){
                   subNode_topics_li.classList.add("nested");
                    var subNode_topics_pages_ul = document.createElement("ul");
                     subNode_topics_pages_ul.classList.add("subNode_topics_pages_ul");
                     subNode_topics_li.appendChild(subNode_topics_pages_ul);

                     for(var k=0 ; k< subNode_topics_pages ; k++){
                        var subNode_topics_pages_li = document.createElement("li");
                        subNode_topics_pages_ul.appendChild(subNode_topics_pages_li);
                        if((node.topics[j].pages[k].commonTopic != undefined) || (node.topics[j].pages[k].commonTopic != null)){
                        subNode_topics_pages_li.appendChild(document.createTextNode(node.topics[j].pages[k].commonTopic));
                        }else{
                           subNode_topics_pages_li.appendChild(document.createTextNode(node.topics[j].pages[k].name)); 
                        }
                        subNode_topics_pages_li.classList.add("subNode_topics_pages_li");

                      //  menuIndexArray.push(node.topics[j].pages[k].name);
                     }
                }

            }
        }

        document.getElementById("menu-ul").appendChild(li);
    }
}


function populateMenuBottom(data){
    var totalModules = data.modules ? data.modules.length : 0;
   
    for( var i = 0; i < totalModules; i++ )
    { 
        var node = data.modules[i];
        var subNode = node.topics ? node.topics.length : 0;
        var wrap = document.createElement('div');
        var topicIcon = document.createElement('div');
        var topicLabel = document.createElement('div');
        var icon = document.createElement('span');
        var progress = document.createElement('div');
        var progressBar = document.createElement('div');

        wrap.className = 'progress-wrapper-main';
        wrap.id = 'menu_topic_'+node.id

        topicIcon.className = 'progress-icon';
        topicIcon.id = node.module.replace(/ /g,"_") + '_icon';

        icon.className = 'progress-icon-state1 glyphicon glyphicon-play';

        if(i == 0){
            topicLabel.className = "progress-label selected";
            visitedPage.push(node.module)
        }else{
            topicLabel.className = 'progress-label';
        }

        if(node.audio) {
            topicLabel.dataset.audio = true;
            topicLabel.dataset.url = node.audio_url;
        } else {
            topicLabel.dataset.audio = false;
        }

        topicLabel.id = 'link_topic_'+node.id
        topicLabel.appendChild(document.createTextNode(node.module));

        progress.className = 'progress';
        progressBar.className = 'progress-bar';
        progressBar.id = node.module.replace(/ /g,"_");
        progressBar.role = 'progressbar';
        progressBar.setAttribute('aria-valuenow', 0);
        progressBar.setAttribute('aria-valuemin', 0);
        progressBar.setAttribute('aria-valuemax', 100);
        progressBar.setAttribute('style', 'left: 0%');

        topicIcon.appendChild(icon)
        wrap.appendChild(topicIcon);
        wrap.appendChild(topicLabel);
        progress.appendChild(progressBar)
        wrap.appendChild(progress);

        document.getElementById("menu-sidebar2").appendChild(wrap);
    }
}


window.addEventListener("orientationchange", function() {
	$(".menu-cont").css({"display":"none"});
    $(".content-right-panel").css({"display" : "block"});
}, false);


function toggleMenu(header_id){	
    // Doing action for desktop 
	//document.getElementsByClassName("close")[0].click();
    if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
      // if(window.screenX != 0){
             if(!toggleFlag){
                $(".menu-cont").css({"display":"block"});
                $(".content-right-panel").css({"display" : "none"});
                $(".navigation").css({"display" : "none"});
                toggleFlag = true
            }else{
                $(".menu-cont").css({"display":"none"});
                $(".content-right-panel").css({"display" : "block"});
                $(".navigation").css({"display" : "block"});
                toggleFlag = false;
            } 
      // }
    } else{ 
        //handling Mobile
			
         if(!toggleFlag){
                $(".menu-cont").css({"display":"block"});
                $(".content-right-panel").css({"display" : "none"});
				// $('.main-content').scrollTop(0);
              //  if(window.innerHeight > window.innerWidth){ 
               //     $(".navigation").css({"display" : "none"});
                //}else{
                //    $(".navigation").css({"display" : "block"}); 
                //}
                    toggleFlag = true;
         }else{
                $(".menu-cont").css({"display":"none"});
                $(".content-right-panel").css({"display" : "block"});
                $(".navigation").css({"display" : "block"});
                if(header_id){
                     var toIndex = String(header_id)
                     scroll("#"+toIndex , '.main-content');
                }
                toggleFlag = false;
        }

    }
}


var $prevLi = null;
function prepareList() {
    $('#menu-ul').find('li:has(ul)')
    .click( function(event) {
        if (this == event.target) {
            $(this).toggleClass('expanded');
            $(this).children('ul').toggle('medium');

           /* setTimeout(function(){
                var menuHt = $('#menu-ul').height();
                var contentHt = $('.content-right-panel').height();
                if(menuHt > contentHt){
                    $('.content-right-panel').css({"height" : menuHt+45+"px"});
                }
            }, 500);*/
            
        }
        return false;
    })
    .addClass('collapsed')
    .children('ul').hide();

     var $li = $('#menu-ul').find('li').on('click', function(event){
        event.stopPropagation();
        postTestStart = false;
        var parentNode = null;
        var currentId = $('#menu-ul li.selected').attr('id').split('_')[1];

        for(var i=0;i<visitedPage.length;i++) {
            if(visitedPage[i] != event.target.firstChild.textContent && visitedPage[i]!='Post-test' && visitedPage[i] !='Pre-test') {
                str = visitedPage[i].replace(/ /g,"_");
                $('#'+str+'_span').parent().addClass('completed');
                $('#menu-ul').find('li.completed').removeClass('selected');
                $('#'+str+'_ani').animate({'width': '100%'}, 500);
                $('#'+str+'_span').animate({'left':'86%'}, 500).text('100%');
            }
        }

        if(event.target.firstChild.textContent){
          if(checkValidModulePage(event.target.firstChild.textContent) || (event.target.firstChild.textContent == "Learning Points")){
                if($(this).closest('ul').closest('li')){
                    if($(this).closest('ul').closest('li').contents().length > 0){
                        parentNode = ""+$(this).closest('ul').closest('li').contents().get(0).textContent;
                    }
                }
                
                var _index = getMenuNodeIndex(event.target.firstChild.textContent);

                pageStatusListArray[_index].visited = 1;
                updateMenuVisited();
                visitedPage.push(event.target.firstChild.textContent)
                //grayOutNode(event.target.firstChild.textContent);
                $li.removeClass('selected');
                // $(this).toggleClass('visited');
                $(this).addClass('selected');
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

                $(".menu-cont").css({"display":"none"});
                $(".navigation").css({"display":"block"});
                $(".content-right-panel").css({"display" : "block"});

                  var device = detectZoom.device();
                  if(device < 1){
                     $(".menu-cont").css({"display":"block"});
                     $(".content-right-panel").css({"display" : "block"});

                  }

                var obj = getIndexObjFromMenu(event.target.firstChild.textContent , parentNode);

                if(menuData.modules[currentId].after_overlay) {
                    loadAfterVideo(menuData.modules[currentId], event.target.firstChild.textContent)
                } else {
                    navigateToIndex(obj);
                }

                if(menuData.modules[_index].video_icon_footer) {
                    setTimeout(function() {
                        $('#nav-video').removeClass('hide');
                    }, 2000)
                    loadBetweenVideo(menuData.modules[_index])
                  } else {
                    $('#nav-video').addClass('hide');
                  }

                if(menuData.modules[currentId].video_btn_html) {
                    loadBetweenVideo(menuData.modules[currentId])
                }
                
                if(checkIfMobileAndPortrait()){
                    toggleFlag = true;
                    if(obj.header_id){
                        var header_id = obj.header_id;
                        toggleMenu(header_id);
                    }
                    else{
                        toggleMenu();
                    }
                }
               

                //Check if it's desktop & hamburger icon is visible
                 if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                       if(window.screenX != 0){
                            if($('.menu-bar .icon').css('display') == 'block'){
                                toggleFlag = true;
                                toggleMenu()
                            }
                       }
                }

          }
            
        }
     });

     var $li = $(document).on('click', '#menu-sidebar2 .progress-label', function(event){
        $('.menu-wrap2').removeClass('menu-show2');
        $('.toggle-button2').removeClass('button-open2');
        var currentId = $('#menu-sidebar2 .progress-wrapper-main .selected').attr('id').split('_')[2];
        event.stopPropagation();
        postTestStart = false;
        var parentNode = null;
        for(var i=0;i<visitedPage.length;i++) {
            if(visitedPage[i] != event.target.firstChild.textContent && visitedPage[i]!='Post-test' && visitedPage[i] !='Pre-test') {
                str = visitedPage[i].replace(/ /g,"_");
                $('#'+str+'_icon').next().addClass('completed');
                $('#'+str+'_icon').parent().addClass('completed');
                $('#'+str+'_icon').next().removeClass('selected');
                $('#' + str).parent().show();
                $('#' + str).animate({'left':'100%'}, 700).text('100%');

                $('#' + str + '_icon').removeClass("progress-icon").addClass("progress-icon button-open2");
            }
        }
        

        if(event.target.firstChild.textContent){
          if(checkValidModulePage(event.target.firstChild.textContent) || (event.target.firstChild.textContent == "Learning Points")){
                
                var _index = getMenuNodeIndex(event.target.firstChild.textContent);
                
                pageStatusListArray[_index].visited = 1;
                updateMenuVisited();
                visitedPage.push(event.target.firstChild.textContent)
                //grayOutNode(event.target.firstChild.textContent);
                $('#menu-sidebar2 .progress-label').removeClass('selected');
                // $(this).toggleClass('visited');
                $(this).addClass('selected');
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

                $(".menu-cont").css({"display":"none"});
                $(".navigation").css({"display":"block"});
                $(".content-right-panel").css({"display" : "block"});

                  var device = detectZoom.device();
                  if(device < 1){
                     $(".menu-cont").css({"display":"block"});
                     $(".content-right-panel").css({"display" : "block"});

                  }
               
                var obj = getIndexObjFromMenu(event.target.firstChild.textContent , parentNode);

                if(menuData.modules[currentId].after_overlay) {
                    loadAfterVideo(menuData.modules[currentId], event.target.firstChild.textContent)
                } else {
                    navigateToIndex(obj);
                }
                
                if(menuData.modules[currentId].video_icon_footer) {
                    setTimeout(function() {
                        $('#nav-video').removeClass('hide');
                    }, 2000)
                    loadBetweenVideo(menuData.modules[currentId])
                  } else {
                    $('#nav-video').addClass('hide');
                  }

                if(menuData.modules[currentId].video_btn_html) {
                    loadBetweenVideo(menuData.modules[currentId])
                }
                
                if(checkIfMobileAndPortrait()){
                    toggleFlag = true;
                    if(obj.header_id){
                        var header_id = obj.header_id;
                        toggleMenu(header_id);
                    }
                    else{
                        toggleMenu();
                    }
                }
               

                //Check if it's desktop & hamburger icon is visible
                 if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                       if(window.screenX != 0){
                            if($('.menu-bar .icon').css('display') == 'block'){
                                toggleFlag = true;
                                toggleMenu()
                            }
                       }
                }

          }
            
        }
     });
}

function hideOtherExpandedList(itm){
        //console.log(itm);
        var bool = true;
        var items = $('#menu-ul').find('li:has(ul)').find('li:has(ul)').not(itm);
        $.each( items, function( key, value ) {
              if($(this).hasClass('expanded')){
                bool = false;
                $(this).toggleClass('expanded').addClass('collapsed').children().hide();
               }
        });    
}



function resetMenuList(){
    // Reset List states
    //TO DO : only reset if menu is expanded
    $('.menu-box').css({"transform":"translateX(-100%)"});
     $('.menu-box').removeClass("menu-box-open").addClass("menu-box-close");
    $('#menu-ul').find('.expanded').toggleClass('expanded');
    $('#menu-ul').find('li:has(ul)').children('ul').hide();
}








