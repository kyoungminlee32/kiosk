/* =================================================================================
* 2017 고도화 신규 작업
* ==================================================================================
*/

/**
	* 개발단에 정의된 Device Check
	* -----------------------------------------
	* opa.exeStatus = 2; 안드로이드 Web
	* opa.exeStatus = 3; 안드로이드 App
	* opa.exeStatus = 4; 아이폰 Web
	* opa.exeStatus = 5; 아이폰 App
	* opa.exeStatus = 8; 기타 Web
	* opa.exeStatus = 9; 기타 App
*/

/**
* Pub 공통 함수
* -----------------------------------------
*/
(function(context) {
	"use strict";
	var Pub = Pub || {
		VERSION : '1.0'
		, AUTHOR : 'Goang'
	}
	Pub.option = {

	}
	Pub.scroll = {
		option : {
			memory : $(window).scrollTop()
			, tmp : $(window).scrollTop()
			, direct : 'up'		//up, down
			, position : 'top'	//top, middle, bottom
		}
		, watch : function(_prevCallBack, _lastCallBack){
			var _option = this.option;
			var scrollInterval , checkNum = 0 , tmpNum = 0 , flag = false , aniSpeed = 100 ;
			var scrollEndCheck=function(_lastCallBack){
				clearInterval(scrollInterval);
				scrollInterval = setInterval(function(){
					if(tmpNum == checkNum){
						clearInterval(scrollInterval);
						checkNum = tmpNum = 0;
						Pub.scroll.position();
						if(_lastCallBack) _lastCallBack();
						setTimeout(function(){flag=false; }, aniSpeed);
					}
					tmpNum = checkNum;
				},10);
			};
			$(window).scroll(function(event) {
				_option.tmp = $(window).scrollTop();
				if(_option.memory >= _option.tmp){
					if(_option.direct == 'down') _option.direct = 'up';// ↑
				}else{
					if(_option.direct == 'up') _option.direct = 'down';// ↓
				}
				_option.memory = _option.tmp;
				checkNum++;
				if(!flag) {
					flag=true;
					if(_prevCallBack) _prevCallBack();
					scrollEndCheck(_lastCallBack);
				}
			});

			/*$(document).on({
				touchstart : function(){
					_option.tmp = $(window).scrollTop();
				} 
				, touchmove : function(){
					// _option.tmp = $(window).scrollTop();
					_option.tmp = $(window).scrollTop();
					if(_option.memory >= _option.tmp){
						if(_option.direct == 'down') _option.direct = 'up';// ↑
					}else{
						if(_option.direct == 'up') _option.direct = 'down';// ↓
					}
					_option.memory = _option.tmp;


					var sPos = Pub.scroll.getPosition();
					Pub.scroll.setPosition(sPos);
					if(sPos == 'top'){
						$('#footer .topScroll').removeClass('top_show');
					}else{
						$('#footer .topScroll').addClass('top_show');
					}
				} 
				, touchend : function(){
					//console.log('touchEnd')
					Pub.scroll.position();
					_option.memory = _option.tmp;
					scrollEndCheck(_lastCallBack);
				}
			})*/
		}
		, end : function(_callback){
			var scrollEndID , checkNum = 0 , tmpNum = 0 , flag = false , aniSpeed = 100
			, check=function(_callback){
				clearInterval(scrollEndID);
				scrollEndID = setInterval(function(){
					if(tmpNum == checkNum){
						clearInterval(scrollEndID);
						checkNum = 0;
						tmpNum = 0;
						if(_callback) _callback();
						setTimeout(function(){flag = false; }, aniSpeed);
					}
					tmpNum = checkNum;
				},200);
			};
			$(window).scroll(function(event) {
				checkNum++;
				if(!flag) {
					flag=true;
					check(_callback);
				}
			});
		}
		, position : function(){
			var _option = this.option;
			_option.tmp = $(window).scrollTop();
			var $body = $('body')
				, top = $body.scrollTop() + $body.innerHeight()
				, top2 = $body[0].scrollHeight-50
			;

			if(_option.tmp <=1) _option.position = 'top';
			else if(top >= top2) _option.position = 'bottom';
			else _option.position = 'middle';

			return _option.position;
		}


		, getPosition : function(){
			return this.option.position;
		}
		, getDirect : function(){
			return this.option.direct;
		}
		, setPosition : function(_position){
			var _this = this;
			if(_position == 'top') {
				$(document).scrollTop(0);
			} else if(_position == 'bottom') {
				$(document).scrollTop($(document).height());
			}else{
			}
			return false;
		}
		
	}
	Pub.resize ={
		end : function(_callback){
			var resizeID , checkNum = 0 , tmpNum = 0 , flag = false , delay = 600
			,check = function(){
				clearInterval(resizeID);
				resizeID = setInterval(function(){
					if(tmpNum == checkNum){
						clearInterval(resizeID);
						checkNum = 0;
						tmpNum = 0;
						if(_callback) _callback();
						setTimeout(function(){
							flag = false;
							return false;
						}, delay);
					}
					tmpNum = checkNum;
				},200);
			};
			$(window).resize(function(event) {
				checkNum++;
				if(!flag) {
					flag=true;
					check();
				}
			});
		}
	}
	Pub.tab = {
		handler : function(_tabNav, _tabCon, _num, _callback){
			var _this = this;
			var activeNum = _num
				, $tabNav = $(_tabNav)
				, $tabCon = $(_tabCon)
				, contentToggle = (function(){
					return function() {
						$tabCon.hide();
						if(Pub.util.isValid(activeNum)){ // num 이 있을경우만
							Pub.accessbility.tab(_tabNav, _num);
							$tabCon.eq(activeNum).show();
						}
					}
				})()
			;
			$tabNav.on('click','a',function(){
				activeNum = $(this).parent().index();
				Pub.accessbility.tab(_tabNav, activeNum);
				contentToggle();
				if(_callback) _callback(activeNum);
				return false;
			});
		}
		, init : function(_target, _viewNum){
			var $tab = $(_target).find("> .tabBtn")
				, viewNum = (_viewNum == "undefined" || _viewNum == "" || _viewNum == null) ? 3 : _viewNum
			;
			var _wrapper = String()
				+ '<div class="slide_tab categroy_tab">'
				+ 	'<div class="slider_wrap">'
				+ 	'</div>'
				+ '</div>'
			;
			var _btns = String()
				+ 	'<a href="javascript:void(0);" class="controls prev_btn" role="button"><span class="screen_out">목록 좌측이동</span></a>'
				+ 	'<a href="javascript:void(0);" class="controls next_btn" role="button"><span class="screen_out">목록 우측이동</span></a>'
			;

			//하나일 경우에 리턴
			if($tab.find('> a').size() <= 1) {
				var $a = $tab.find('> a')
				$tab.addClass('solo_tab');
				$a.wrapAll('<ul><li></li></ul>');

				return false;
			}

			//하나 이상일 경우
			$tab.wrapAll(_wrapper);
			$tab.parent().before(_btns);

			$tab.find('> a').each(function() {
				var $a = $(this);
				$a.wrapAll('<li class="item"></li>');
				if($a.hasClass('on')){
					$a.parent().addClass('active');
				}
			});

			Pub.tab.slider({
				'target' : $tab
				, 'viewNum' : viewNum
				, 'activeNum' : null
				, 'tabContent' : _target.find('.tabAreaBox')
			});
		}
		, slider : function(option){
			var aWrapElement ='li';//링크를 감싸고 있는 요소 정의
			var _target = option.target
				, _viewNum = option.viewNum
				, _activeNum = option.activeNum
				, _tabContent = option.tabContent
			;
			var $slider = _target
				, $item = $slider.find(aWrapElement)
				, $prevBtn = $('.prev_btn', $slider.parent().parent())
				, $nextBtn = $('.next_btn', $slider.parent().parent())
				, viewNum = (_viewNum == "undefined" || _viewNum == "" || _viewNum == null) ? 3 : _viewNum
				, itemIndex = (_activeNum == null || _activeNum == undefined || _activeNum === '' || _activeNum == 'undefine')
							? $slider.find(aWrapElement+'.active').index() : _activeNum
				, totalNum = Number($item.size()-1)
				, totalPage = Math.floor(totalNum / _viewNum)-1
				, curPage = Math.floor(itemIndex/_viewNum)
			;

			$slider.find(aWrapElement).eq(itemIndex).addClass('active').siblings().removeClass('active');

			//No Paging
			if(totalPage <0 ){
				$prevBtn.addClass('fadeout');
				$nextBtn.addClass('fadeout');
				$slider.parent().css({'margin' : 0});
			}else{
				btnShowHide();
			}
			//전체 Tab이 viewNum 보다 작을때
			if(totalNum < viewNum-1) viewNum = totalNum+1;

			var $owlSlider = $slider.owlCarousel({
				items : viewNum
				, smartSpeed : 100
				, autoPlay : false
				, pagination : true
				, mouseDrag : true
				, startPosition : itemIndex
				, nav : true
				, responsive : true
				, itemElement : (aWrapElement == "li") ? 'ul' : 'div'
				, onInitialized : function(){
					$slider.parent().parent().css("visibility", 'visible');//초기 화면 깨지는 현상 방지
				}
			});

			var $owlData = $slider.data('owlCarousel');

			// //전체 Tab이 하나일때 
			// if(totalNum == 0){
			// 	$(this).parent().parent().css({'width': 50+'%'})	
			// 	console.log('totalNum :'+ totalNum)
			// }

			function goPage(){
				if(curPage <0) curPage =0;
				$owlData.to(curPage);
			}

			function btnShowHide(){
				$prevBtn.removeClass('fadeout');
				$nextBtn.removeClass('fadeout');
				if(itemIndex == 0) $prevBtn.addClass('fadeout');
				else if(itemIndex >= totalNum-(viewNum-1)) $nextBtn.addClass('fadeout');
			}

			//EventHandler : 버튼 클릭시
			$prevBtn.on('click', function(){
				curPage--;
				goPage();
				return false;
			});

			$nextBtn.on('click', function(){
				curPage++;
				goPage();
				return false;
			});

			//EventHandler : Drag 완료시 , 버튼 클릭완료시
			$owlSlider.on('changed.owl.carousel', function(e){
				itemIndex = e.item.index;
				curPage = e.page.index;
				btnShowHide();
				return false;
			});

			//Drag or Click Flag
			var dragFlag = false;
			var dragTime;
			$owlSlider.on('drag.owl.carousel', function(e){
				dragTime = new Date().getTime();
			});
			$owlSlider.on('dragged.owl.carousel', function(e){
				var endTime = new Date().getTime() - dragTime;
				if(endTime >300) dragFlag = true;
				else dragFlag = false;
			});

			//a링크가 아닌 페이지내 탭용으로 클릭시
			if(_tabContent){
				var $aWrap = $owlSlider.find('.owl-item').find(aWrapElement);
				var $a = $aWrap.find('a');
				var $a_active = $aWrap.eq(itemIndex).find('a');
				var $tabCon = _tabContent;
				
				$a.attr('title', '선택하기');
				$a_active.attr('title', '선택됨');

				//컨텐트가 하나 밖에 없을때 강제로 처음 컨텐트 show : 20170929 수정
				if($tabCon.size() <=1) { 
					$tabCon.eq(0).show();
				}else{
					$tabCon.hide().eq(itemIndex).show();
				}

				$a.on('click', function(index){
					if(dragFlag) return false;
					var urlStr = $(this).attr('href').substr(0,4);
					if(urlStr != 'http'){
						var $btn = $(this).parent().parent();
						var clickNum = $btn.index();
						
						$btn.find(aWrapElement).addClass('active').find('a').attr({'title' : '선택됨', 'aria-selected' : true });
						$btn.siblings().find(aWrapElement).removeClass('active').find('a').attr({'title' : '선택하기', 'aria-selected' : false });

						//컨텐트가 하나 밖에 없을때 강제로 처음 컨텐트 show : 20170929 수정
						if($tabCon.size() <=1) {
							$tabCon.eq(0).show();
						}else{
							$tabCon.hide().eq(clickNum).show();
						}
						return false;
					}else{
						//탭과 a링크 혼용일경우
						// window.location.href=$(this).attr('href');
					}
					// return false;
				});
				
				//Expend Clickable
				$aWrap.on('click', function(index){
					if(!dragFlag) $(this).find('a').trigger('click');
					return false;
				});
			}
		}
	}
	Pub.util = {
		isValid : function(variables) {
			if (variables == null || variables == undefined || variables === '' || variables == 'undefine') return false;
			else return true;
		}
		, checkBrowser : function(){
			var $html = $('html'), browserStr = null;

			//Pubble Test용
			if(typeof(opa) == 'undefined'){ 
				if ((/iphone|ipad/gi).test(navigator.appVersion)) browserStr = 'ios web';
				else if ((/android/gi).test(navigator.appVersion)) browserStr = 'android web';
			}else{
				//개발단 정의 함수 사용 (서버단에서 확인 가능)
				if(opa.exeStatus == 2) browserStr = 'android web';
				else if(opa.exeStatus == 3) browserStr = 'android app';
				else if(opa.exeStatus == 4) browserStr = 'ios web';
				else if(opa.exeStatus == 5) browserStr = 'ios app';
				else if(opa.exeStatus == 8) browserStr = 'etc web';
				else if(opa.exeStatus == 9) browserStr = 'etc app';
			}

			//html에 디바이스 클래스 삽입
			$html.addClass(browserStr);
		}
		, version : function(_ver){
			//테스트 용 (페이지 하단 버튼 삽입)
			$('#container').append('<div class="testBBBBBBtn" style="width:10px;height:10px; background:#efefef"></div>');
			$('.testBBBBBBtn').on('click', function(){
				alert('퍼블 Test version : '+ _ver);
			});
		}
	}
	Pub.accessbility = {
		tab : function(_tabNav, _num){
			var activeNum = _num
				, activeClass = 'on'
				, $tabNav = $(_tabNav)
				, $navItem = $tabNav.find("li")
				, active = function(){
					if (! Pub.util.isValid(activeNum)) return false;
					$navItem.removeClass(activeClass)
						.find('a')
						.removeClass(activeClass)
						.attr('title', '')
						.attr('aria-selected', false)
					;
					$navItem.eq(activeNum).addClass(activeClass)
						.find('a')
						.attr('title', '현재탭')
						.attr('aria-selected', true)
						.addClass(activeClass)
					;
				}
				, init = (function(){
					$navItem.each(function(index){
						var $li = $(this);
						var $a = $li.find('a');
						$a.attr('role', 'tab').attr('title', '').attr('aria-selected', 'false');
						//_num 없을경우 : 페이지 내 activeClass 활성화
						if(! Pub.util.isValid(activeNum)){
							if($li.hasClass(activeClass) || $a.hasClass(activeClass)) {
								activeNum = index;
								return false;
							}
						}
					});
					active();
				})()
			;
		}
		, table : {
			addCaption : function(){
				$("table").each(function() {
					var ARth = []
						, $caption = $(this).find('caption')
						, captionStr = $caption.text()
						, $th = $(this).find('th')
						, joinStr = ''
					;
					$th.each(function(i) {
						var thTxt = $(this).text().replace(/\s/g, "").replace('필수항목', '');
						ARth[i] = (thTxt);
					});
					joinStr = ARth.join(', ');
					$(this).removeAttr('summary');
					if($caption.length > 0) {
						$caption.text('').text(joinStr + ' (의)로 이루어진 정보테이블입니다.');
					} else{
						$(this).prepend('<caption>'+joinStr+ ' 항목으로 이루어진 정보테이블입니다.</caption>');
					}
				});
			}
		}
		,step : function(_target){
			var $target = $(_target)
				, $item = $target.find('li')
				, totalStep = $item.size()
				, curStep = 0
				, hiddenClass = 'screen_out' // 접근성 hidden 클래스
			;
			$item.each(function(index){
				var _txt = parseInt($(this).text());
				$(this).text(_txt);//0제거
				if($(this).hasClass('on') || $(this).children().hasClass('on')) curStep = index + 1;
			});
			var html = '<div class=\"'+hiddenClass+'\">전체' + totalStep + '단계중 현재'+ curStep +'단계</div>';
			$target.before(html);
		}
		, folding : function(_target){
			// console.log('folding:accessbility')
		}
	}

	context.Pub = Pub;
})(window);



/**
	* Layout Setup (공통)
	* -----------------------------------------
	* page
	* 	Layout.init() //초기 실행
	* 	list, detail, common, process
	* -----------------------------------------
	* Fix Class :
	* 	- List
	* 		serch_fix
	* 	- Detail
	* 		Container : title_fix, tab_fix, footer_fix
	* 		footer : down
	* -----------------------------------------
	* component
	* 	list searchTap
	* -----------------------------------------
	* slider
	* 	head : list
	* 	tab : detail
	* 	- @param _target		:
	* 	- @param _viewNum	: 한 화면에 보여지는 탭 갯수 (Default: 3)
	* -----------------------------------------
	* gnb  
	*	-  로케이션 활성화 
	*		Layout.gnb.handler({
	*			depth1 : 3 
	*			, depth2 : 3
	*			, depth3 : 3
	*			, callBack : testFN 
	*		});
	* -----------------------------------------
	* footer
	* 	강제로 Show, Hide
	* -----------------------------------------
	* header
	* 	강제로 Show, Hide
	* -----------------------------------------
	* scroll
*/

var Layout = (function(){
	var jMap = {}
	, vMap = {}
	, setMap = function(){
		jMap = {
			body : $('body')
			, header : $('#header')
			, wrap : $('#wrap')
			, container : $('#container')
			, content : $('#content')
			, contentWrap : $('#container .content_wrap')
			, footer : $('#footer')
			, topBtn : $('#footer .topScroll')
		}
		, vMap = {
			pageType : 'common' //default, list, detail, process
			, isFootShow : false //footer 강제로 보이게 설정 : (더보기 등)
			, titleOption : 'change' //1. change : header과 Change, 2. fix : 스크롤시 타이틀 영역 FIX
			// , is_iScroll : true
		}
	}
	, skip ={
		//skip
	}
	, gnb ={
		handler :function(option){
			var _depth1 = option.depth1
				, _depth2 = option.depth2
				, _depth3 = option.depth3
				, _callBack = option.callBack
			;
			var $gnbMenu = $('.gnb_menu')
				, $depth1 = $gnbMenu.find('.gnbArea .depth1')
				, $gnbList =$depth1.find(' > li')
				, $depth2 = $gnbMenu.find('.gnbSubArea .depth2')
				, $gnbList2 =$depth2.find(' > ul > li')
				, listSize = $gnbList.size()
				, gnbScroll= null
				, gnbScroll_right = null
				, conH = $(window).height()- 161
			;

			//init
			if(_depth1 ==null || _depth1 == undefined || _depth1 == "" || _depth1 > listSize) _depth1= 0; 
			$gnbList.eq(Number(_depth1)).addClass('on').find('a').attr('title', '선택됨');
			$depth2.eq(Number(_depth1)).addClass('on')
				.find('> ul > li').eq(Number(_depth2)).addClass('on')
				.find('>ul > li').eq(Number(_depth3)).find('a').addClass('on')
			;


			//iScroll
			var is_iScroll = true;
			if (navigator.userAgent.match('LG') != null) is_iScroll = false;

			if(is_iScroll){
				$depth1.wrapAll('<div id="gnbL">');
				$('#gnbL').css({
					'height': conH
					, 'overflow' : 'hidden'
					, 'position' : 'relative'

				});
				$('#scrollWrap02').css({
					'height': conH
					, 'overflow' : 'hidden'
				});

				gnbScroll = new IScroll('#gnbL', {
					mouseWheel: true
					// , scrollbars: true //스크롤후 스크롤바 자동 숨기기
					, preventDefault : false
					, disablePointer : true //Android 용
				});

				gnbScroll_right = new IScroll('#scrollWrap02', {
					mouseWheel: true
					// , scrollbars: true
					, preventDefault : false
					, disablePointer : true
				});
			}


			//1Depth
			$gnbList.each(function(){
				$(this).on('click', ' > a' , function(e){
					var index = $(this).parent().index();
					$(this).parent().addClass('on').siblings().removeClass('on');
					$(this).attr('title', '선택됨').parent().siblings().find('a').attr('title','');
					$depth2.eq(index).addClass('on').siblings().removeClass('on');
					$('.gnbSubArea').scrollTop(0);

					//개발에 파람 던짐
					if(option.callBack){
						option.callBack({
							'depth1' : index
						});
					}

					if(is_iScroll) gnbScroll_right.refresh();//iscroll

					return false;
				});
			});

			//2Depth
			$gnbList2.each(function(){
				if($(this).find('.depth3').length > 0){
					var $alink = $(this).find('>a');
					$alink.attr('title', '펼치기');
					$alink.on('click', function(e){
						var _this = $(this);
						var _parent = $(this).parent();
						if(_parent.hasClass('on')){
							_this.attr('title', '펼치기');
							_parent.removeClass('on');
						}else{
							_this.attr('title', '접기');
							_parent.addClass('on').siblings().removeClass('on').find('a').attr('title', '펼치기');
						}
						if(is_iScroll) gnbScroll_right.refresh();//iscroll
						return false;
					});
				}
			});
		}
	}
	, header = {
		show : function(){
			// jMap.header.removeClass('up');
		}
		, hide : function(){
			// jMap.header.addClass('up');
		}
		, prev : function(){
			jMap.header.addClass('prev');
		}
		, titleChange : function(_target){
			if(vMap.titleOption =='change') {
				var startFixPos = jMap.header.outerHeight()
					, $h1 = jMap.header.find('.title')
					, memoryTitle = $h1.text()
					, changeTitle = _target.text()
				;
				$h1.after('<strong class="change_title">'+changeTitle+'</strong>');
				$(window).scroll(function(){
					var s = $(this).scrollTop();
					if(s >= startFixPos){
						jMap.header.addClass('title_fix');
					}else{
						jMap.header.removeClass('title_fix');
					}
				}).scroll();
			}else{
				jMap.header.addClass('nofix');
				fixed(_target, jMap.container);
			}
			jMap.content.eq(0).css('padding-top', jMap.header.outerHeight());
		}
		, borderAnimation : function(_target){
			$(window).scroll(function(){
				var s = $(this).scrollTop();
				if(s >= jMap.header.outerHeight()){
					jMap.header.addClass('ani_border');
				}else{
					jMap.header.removeClass('ani_border')
				}
			}).scroll();
		}
	}
	, footer = {
		show : function(){
			jMap.container.addClass('footer_fix');
			jMap.footer.removeClass('down');
		}
		, hide : function(){
			jMap.container.removeClass('footer_fix');
			jMap.footer.addClass('down');
		}
		, scrollWatch : function(){
			// jMap.topBtn.hide();
			var $footBtn = $('#footer .etcBtn');
			// $footBtn.addClass('top_show');

			// 1. 첫 로드시 풋터 보임, 2. 페이지 아래로 이동시 : 숨김, 3. 페이지 위로 이동시 : 보임
			var pScroll = Pub.scroll;
			pScroll.watch(null , function(){
				var sPos = pScroll.getPosition();
				pScroll.setPosition(sPos);

				if(sPos == 'top' || sPos == 'bottom') {
					footer.show();
					header.show();
				}
				if(sPos != 'top'){
					$footBtn.addClass('top_show'); //top_btn hide()
				}else{
					$footBtn.removeClass('top_show');//top_btn show();
				}
				return false;
			});

			$(window).scroll(function(){
				// console.log('Pub :'+Pub.scroll.option.tmp, Pub.scroll.option.memory);
				Pub.scroll.position();
				var sDirct = pScroll.getDirect();
				var sPos = pScroll.getPosition();
				if(! jMap.isFootShow){ //풋터 강제로 보여지는지 여부
					if(sDirct == 'up'){// ↑
						if(sPos != 'top') {
							footer.show();
							header.hide();
						}
					}else{// ↓
						if(sPos != 'bottom') {
							footer.hide();
							header.show();
						}
					}
				}
			});
		}
		, reset : function(){
			var _option = Pub.scroll.option;
			_option.memory =0;
			_option.tmp = 0;
			_option.direct = 'up';
			_option.position ='top';
			$(document).scrollTop(0);
		}
	}
	, component ={
		search : function(){// (사용안함)
			//상품명 검색, 맞춤검색 탭관련
			var $searchArea = $('.search_area')
				, $productSearch = $('.tab_con.order_search') // 상품명 검색
				, $orderSearch = $('.tab_con.order_search') // 맞춤 검색
				, $tabFoot = $orderSearch.find('.tab_foot')
				, $tabBody = $orderSearch.find('.tab_body')
				, $tabNav = $('> .tab_nav', $searchArea)
				, $tabCon = $('> .tab_contents > .tab_con', $searchArea)
				, $closeBtn = $tabCon.find('.close_btn')
				, $searchBtn = $tabCon.find('.search_btn')

				//검색결과 : 수익률 순 버튼 , 최다판매순 등등
				, $searchDetail = $('.search_detail')
				, $searchFrm =  $searchDetail.find('.result_box')
				, $searchResultBtn = $searchFrm.find('a')

				//3,6,12개월
				, $monthFrm = $('.month_box')
				, $monthBtn = $monthFrm.find('a')

				//맞춤검색 투자지역펀드 휴형  탭관련
				, $tabNav2 = $('.order_search .type_section > .tab_nav')
				, $tabCon2 = $('.order_search .type_section > .tab_contents .tab_con')

				, tabOpenFlag = false//검색 탭 컨텐트 열려 있는지 여부 확인
				, saveScroll = Pub.scroll.option.memory //탭 열려졌을때 스크롤 저장
			;

			$searchArea.after('<div class="search_dimm "></div>');

			//탭
			Pub.tab.handler($tabNav, $tabCon, null, searchHandler);
			Pub.tab.handler($tabNav2, $tabCon2, 0);

			function FNdimed(_flag){
				if(_flag) $('.search_dimm').addClass('on');
				else $('.search_dimm').removeClass('on');
			}

			function searchHandler(_clickNum){
				var goTop = jMap.contentWrap.offset().top;
				if(! tabOpenFlag) saveScroll = $(window).scrollTop();//스크롤 기억

				//z-index 재정렬
				jMap.header.css({'z-index' : 99});
				jMap.footer.css({'z-index' : 97});
				$('html, body').stop() .animate({'scrollTop': goTop}, 'easeInOutExp', function(){
					FNdimed(true);
					//Fixed
					$('html, body').css({'overflow-y' : 'hidden'});
					jMap.container.addClass('layer_fix');
					$tabFoot.addClass('fixed'); //맞춤검색일때만  닫기 버튼 하단에 Fix
					var conH = $(window).height() - jMap.header.height() - $tabNav.height() - $tabFoot.height() -82;
					$orderSearch.find('.tab_body').css({
						'overflow-y' : 'scroll'
						, 'height' : conH
					});
					tabOpenFlag = true;
				});
				return false;
			}

			// 맞춤검색 리셋
			function clearFix(){
				//z-index 재정렬
				jMap.header.css({'z-index' : 99});
				jMap.footer.css({'z-index' : 101});

				//맞춤검색일때만
				$('html,body').removeAttr('style');
				jMap.container.removeClass('layer_fix');
				$tabFoot.removeClass('fixed');
			}

			//Eventhandler
			//탭컨텐트 안 Close Event
			$closeBtn.on('click', function(){
				var index = $(this).closest($('.tab_con')).index();
				var $curNav = $closeBtn.closest('.search_area').find(' .tab_nav li').eq(index);
				$curNav.removeClass('on');
				$curNav.find('a')
					.attr('title', '선택하기')
					.attr('aria-selected', 'false')
					.focus()
				;
				$closeBtn.closest('.tab_con').hide();
				clearFix();//맞춤검색 리셋
				FNdimed(false);

				$("html, body").stop().animate({scrollTop: saveScroll } ,'easeInOutExp', function(){});

				tabOpenFlag = false;
				return false;
			});

			//탭컨텐트 안 search Event
			$searchBtn.on('click', function(){
				$closeBtn.trigger('click');
				return false;
			});

			//
			$searchResultBtn.on('click', function(index){
				$(this).toggleClass('on')
					.attr('title', '선택됨')
					.attr('aria-selected', 'true')
					.siblings('a').removeClass('on')
					.attr('title', '선택하기')
					.attr('aria-selected', 'false')
				;
				if($(this).hasClass('btn_rate on')){
					$monthFrm.show();
				}else{
					$monthFrm.hide();
				}
				return false;
			});

			$monthFrm.find('a').on('click', function(){
				$(this).addClass('blue').removeClass('gray')
					.attr('title', '선택됨')
					.attr('aria-selected', 'true')
					.siblings().removeClass('blue').addClass('gray')
					.attr('title', '선택하기')
					.attr('aria-selected', 'false')
				;
				return false;
			});
		}
	}
	, slider ={
		head : function(_target){
			var owl = _target;
			owl.each(function(){
				var _this = $(this);
				_this.owlCarousel({
					loop:true
					, items:1
					, autoplay:false
					, autoplayTimeout:3000
					, navigation:false
					, itemElement : 'ul'
					, onInitialized : function(){
					}
				});
			});
		}
	}
	//_parent : padding or maaring-top 주어야 될 상위 클래스
	//_fixPos :  스크롤시 fixed 되는 시작점 
	, fixed = function(_target, _parent, _fixPos, _callback) {
		var $target = $(_target); 
		var $parent = _parent; 
		var targetY = $target.offset().top;
		var targetH = $target.outerHeight();

		if(! Pub.util.isValid(_fixPos)) _fixPos = 0;

		var startFixPos = targetY - _fixPos; //fixed 되는 시작점 : 어느 위치에서 fixed 되는지
		var prevTargetStyle = $target.attr('style');
		var prevParentStyle = $parent.attr('style');

		if(!Pub.util.isValid(prevTargetStyle)) prevTargetStyle = '';
		if(!Pub.util.isValid(prevParentStyle)) prevParentStyle = '';

		$(window).scroll(function(){
			var s = $(this).scrollTop();
			if(s >= startFixPos){
				targetH = $target.outerHeight();
				$target.css({
					'top' : _fixPos
					, 'z-index' : 99
					, 'position' : 'fixed'
					, 'left' : 0
					, 'right' : 0
				});
				$parent.css({'padding-top' : targetH });
				$parent.addClass('fix_'+$target[0].className);
			}else{
				$target.attr('style', prevTargetStyle);
				$parent.attr('style', prevParentStyle);
				$parent.removeClass('fix_'+$target[0].className);
			}
			if(_callback) _callback();
		}).scroll();
	}
	, page = {
		common: function(){
			//타이틀 Change Fix
			var ARtitleFix = [
				jMap.content.find('.wrap h1').eq(0)
				,jMap.content.find('.section h1').eq(0)
				//, jMap.content.find('.titH').eq(0)
				, jMap.content.find('.title_fix').eq(0)
				, jMap.content.find('.top_info_box>.titH').eq(0)
			];


			for(var i=0; i <= ARtitleFix.length-1; i++){
				if(ARtitleFix[i].length >0) {
					header.titleChange(ARtitleFix[i]);
					return false;
				}
			}

			//----------------------------------------------------
			//Header Fix & Visual Fix 분기
			var fix_pos = jMap.header.outerHeight()
				, conMargin = fix_pos
				, $visual = jMap.content.find('.fix_visual_area')
			;
			if($visual.length){//비쥬얼 영역이 있을경우
				jMap.container.addClass('visual_fix');
				var $visual = $('.fix_visual_area')
					, bgCol = $visual.find('.slider').css('background')
				;
				conMargin = fix_pos + $visual.height()
				$visual.css({'background' :  bgCol});
				$visual.next().css({
					'z-index': 10
					, 'position' : 'relative'
					, 'background' :'#fff'
				});
			}
			//padding-top 설정 : content_wrap 없을경우 제일 첫 div 에 설정
			jMap.content.eq(0).css('padding-top', conMargin);

			header.borderAnimation();
			return false;
		}
		, tab_fix : function(){
			//한화면에 탭이 하나 이상 있을경우 첫 탭만 Fix
			var $fix_target = $('.tab_area').eq(0).find('> .tabBtn')
				, fix_pos = jMap.header.outerHeight()
			;
			fixed($fix_target, jMap.container, fix_pos);
			$('.tabAreaBox').css({'min-height' : $(window).height()});//탭 클릭시 상단으로 붙는 현상 방지

			var $title = jMap.container.find('.Product_info h1');
			header.titleChange($title);
		}
		, process : function(){
			Pub.accessbility.step($('.step_top ul'));
			var $title = jMap.container.find('h1');
			header.titleChange($title);

			//h2 타이틀 0 삭제
			var $h2 = $('.step_area').find('h2');
			$h2.text($h2.text().replace('0', ""));
		}
		/*, retire : function(){//은퇴설계
			var $fix_target = $('#container .step_area')
				, fix_pos = jMap.header.outerHeight()
			;
			jMap.content.eq(0).css('padding-top', jMap.header.outerHeight());

			fixed($fix_target, jMap.container, fix_pos);
		}*/
		, list : function(){
			var $fix_target = $('#container .srch_area')
				, fix_pos = jMap.header.outerHeight()
				, $visual = $('.fix_visual_area')
				, bgCol = $visual.find('.slider').css('background')
			;
			// $visual.css({'background' :  bgCol});

			jMap.content.eq(0).css('padding-top', jMap.header.outerHeight());

			// fixed($fix_target, jMap.container, fix_pos);
		}
		, detail_test : function(){
		// , detail : function(){
			jMap.header.addClass('nofix');
			

			var headerH = $("#header").outerHeight();
			var tabH = $(".box_info_detail .fix_title").outerHeight(),
				tabPos = $(".box_info_detail").outerHeight(),
				tabScorllTop = tabPos-tabH+headerH,
				tabPadding =  $(".categroy_tab").height()
			;
			jMap.content.eq(0).css('padding-top', jMap.header.outerHeight());

			$(window).scroll(function(){
				var scrollTop = $(this).scrollTop();
				var wHeight = $(window).height();

				//스크롤시 재정의
				headerH = $("#header").outerHeight();
				tabH = $(".box_info_detail .fix_title").outerHeight()
				tabPos = $(".box_info_detail").outerHeight()
				tabScorllTop = tabPos-tabH+headerH
				tabPadding =  $(".categroy_tab").height()


				function reset(){
					$(".categroy_tab").removeClass("fixedPos");
					$(".categroy_tab").css({top:"auto"});
					$(".tab_area").css({paddingTop:0 });

					jMap.isFootShow = false;
					jMap.footer.find('.footer_type01').show();
					jMap.footer.find('.box_btn').hide();
					if(Pub.scroll.option.direct == 'up') jMap.footer.removeClass('down');
					else jMap.footer.addClass('down');


					jMap.header.removeClass('nofix');
				}

				// if(scrollTop > 10  ){
				// 	// $("html, body").stop().animate({scrollTop:tabScorllTop}, 200);
				// 	$("html, body").stop().scrollTop(tabScorllTop);//({scrollTop:tabScorllTop}, 200);
				// }

				// $('header').css('z-index' : 99)

				if(scrollTop > headerH){ //header 위치
					/*	
					$(".fix_title").addClass("fixedPos").css({'padding-bottom' : 10});
					$(".info_top").css({paddingTop : tabH});
					*/
					$(".fix_title").addClass("add_border");//타이틀 픽스일경우 아래 라인 보임 (탭 픽스전까지)

					if(scrollTop >= tabScorllTop){//tab 위치
						$(".fix_title").addClass("fixedPos").css({'padding-bottom' : 10});
						$(".info_top").css({
							paddingTop : tabH
							, 'z-index' : 1000
						});
						jMap.header.addClass('nofix');

						$(".fix_title").removeClass("add_border");
						$(".categroy_tab").addClass("fixedPos");

						tabH = $(".box_info_detail .fix_title").outerHeight();//재설정
						$(".categroy_tab").css({top:tabH});
						$(".tab_area").css({paddingTop:tabPadding });

						jMap.isFootShow = true;
						jMap.footer.find('.footer_type01').hide();
						jMap.footer.find('.box_btn').show();
						jMap.footer.removeClass('down');
					}else{
						$(".fix_title").addClass("add_border");

						// reset();
					}
				}else{// 상위
					$(".fix_title").removeClass("fixedPos").css({'padding-bottom' : 0});
					$(".fix_title").removeClass("add_border");
					$(".info_top").css({paddingTop:0 });

					//수정
					reset();
				}
			}).scroll();



			//TEST
			var startScroll = null;
			var endScroll = null;

			//Drag or Click Flag
			var touchSpeed = false;
			var touchFlag =false;
			var touchTime;


			//Touch 와 Scroll 분기
			$(document).on('touchstart', function(){
				touchFlag = true;
				startScroll = $(window).scrollTop();
				touchTime = new Date().getTime();
			});
			$(document).on('touchmove', function(){
				// console.log('touchMove')
			});

			$(document).on('touchend', function(){
				touchFlag = false;

				endScroll = $(window).scrollTop();

				if(Pub.scroll.option.direct == 'up'){
					if(endScroll < tabPos) $("html, body").stop().animate({scrollTop:0}, 200);
					// console.log('up')
				}

				if(Pub.scroll.option.direct == 'down'){
					if(endScroll > 0 && endScroll < tabScorllTop) {
						$("html, body").stop().animate({scrollTop: tabScorllTop}, 'easeInOutExp');
						// $('.box_info_detail').not('.fix_title').css('opacity', 0)
					}
					else if(endScroll < headerH ){$("html, body").stop().animate({scrollTop:0}, 200);}
					// if(endScroll > headerH && endScroll < tabPos) $("html, body").stop().animate({scrollTop:tabScorllTop}, 200);
					console.log('down')
				}

				
				// var endTime = new Date().getTime() - touchTime;
				// if(endTime >300) touchSpeed = true;
				// else touchSpeed = false;
				
			});

			Pub.scroll.end(function(){

			});

		}
		// , detail_ori : function(){
		, detail : function(){
			jMap.header.addClass('nofix');
			var headerH = $("#header").outerHeight();
			var tabH = $(".box_info_detail .fix_title").outerHeight(),
				tabPos = $(".box_info_detail").outerHeight(),
				tabScorllTop = tabPos-tabH+headerH,
				tabPadding =  $(".categroy_tab").height()
			;

			$(window).scroll(function(){
				var scrollTop = $(this).scrollTop();
				var wHeight = $(window).height();

				//스크롤시 재정의
				headerH = $("#header").outerHeight();
				tabH = $(".box_info_detail .fix_title").outerHeight();
				tabPos = $(".box_info_detail").outerHeight();
				tabScorllTop = tabPos-tabH+headerH;
				tabPadding =  $(".categroy_tab").height();

				function reset(){
					$(".categroy_tab").removeClass("fixedPos");
					$(".categroy_tab").css({top:"auto"});
					$(".tab_area").css({paddingTop:0 });

					jMap.isFootShow = false;
					jMap.footer.find('.footer_type01').show();
					jMap.footer.find('.box_btn').hide();
					if(Pub.scroll.option.direct == 'up') jMap.footer.removeClass('down');
					else jMap.footer.addClass('down');
				}
				
				if(scrollTop > headerH){ //header 위치
					$(".fix_title").addClass("fixedPos").css({'padding-bottom' : 10});
					$(".fix_title").addClass("add_border");//타이틀 픽스일경우 아래 라인 보임 (탭 픽스전까지)
					$(".info_top").css({paddingTop : tabH});

					if(scrollTop >= tabScorllTop){//tab 위치
						$(".fix_title").removeClass("add_border");
						$(".categroy_tab").addClass("fixedPos");

						tabH = $(".box_info_detail .fix_title").outerHeight();//재설정
						$(".categroy_tab").css({top:tabH});
						$(".tab_area").css({paddingTop:tabPadding });

						jMap.isFootShow = true;
						jMap.footer.find('.footer_type01').hide();
						jMap.footer.find('.box_btn').show();
						jMap.footer.removeClass('down');
					}else{
						$(".fix_title").addClass("add_border");

						reset();
					}
				}else{// 상위
					$(".fix_title").removeClass("fixedPos").css({'padding-bottom' : 0});
					$(".fix_title").removeClass("add_border");
					$(".info_top").css({paddingTop:0 });

					//수정
					reset();
				}
			}).scroll();
		}
	}
	//====================================================
	, init = function(_page){
		setMap();

		vMap.pageType = _page || 'common';
		if(jMap.content.find('.step_area').eq(0).length>0) vMap.pageType ='process';//process Type 구분

		if(jMap.wrap.find(".product_list_wrap").length){
			vMap.pageType  = 'list';
		}
		if(jMap.wrap.find(".con_product_detail").length){
			vMap.pageType = "detail"
		}
		if(jMap.wrap.find(".mainContents").length){
			jMap.wrap.addClass('main');
		}
		if(jMap.wrap.find(".loginContents").length){
			jMap.wrap.addClass('login');
		}

		if(jMap.wrap.find(".con_retire").length){//은퇴설계 
			jMap.wrap.addClass('retire');
			//if(jMap.content.find('.step_area').eq(0).length>0) page.retire();
		}

		jMap.wrap.addClass(vMap.pageType);
		page[vMap.pageType]();
		footer.scrollWatch();

		//탭
		if(!jMap.wrap.hasClass('main')){//메인 탭 예외 케이스
			var $tabs = $('.tab_area');
			if($tabs.length>0){
				//pageCall 클래스가 있을경우 
				//페이지단에서 탭 직접 호출 
				//ex : Pub.tab.init($('.tab_area');
				$tabs.each(function(){
					if(! $(this).hasClass('pageCall')){
						Pub.tab.init($(this));
					}
				});
			}
		}

		//gnb
		// gnb.handler({});
		Pub.util.checkBrowser();
	}
	return {
		init : init
		, fixed : fixed
		, footer : footer
		, gnb : gnb
	}
})();


/**
	* 맞춤검색 레이어 팝업 (은행, 상호, 공통)
	* -----------------------------------------
	* 예금, 펀드, 대출, 보험 
*/
$(document).ready(function() {
	(function(){
		var is_iScroll = false; //iScroll 사용여부
		var $searchPop = $('.divPopBackArea.search_popup');
		if(!$searchPop.length){
			return null;
		}

		var conH = $(window).height();
		var scrollContentH = conH - (50+38-30)
		$searchPop.find('.srch_sort .s_inr').css({'min-height' : scrollContentH });
		$searchPop.find('.srch_sort .s_ct').css({'padding-bottom' : 100 });
		//맞춤검색 iScroll 적용
		$searchPop.find('.srch_sort .s_inr').eq(1).find('.s_ct').wrapAll('<div id="iScroll_pop"></div>');

		// iScroll
		$('#iScroll_pop').css({
			'height': scrollContentH
			,'min-height' : scrollContentH
			, 'overflow' : 'scroll'
			, 'position' : 'relative'
		});

		if(is_iScroll){
			// iScroll
			$('#iScroll_pop').css({
				'overflow' : 'hidden'
			});

			var popScroll = new IScroll('#iScroll_pop', {
				mouseWheel: true
				, scrollbars: false //스크롤후 스크롤바 자동 숨기기
				, preventDefault : false
				, disablePointer : true //Android 용
			});
		}

		//탭 컨트롤
		var $btn = $searchPop.find('.srch_bar button');
		function serachBtnCtrl(_str, _num){
			var $view = $btn.parent().next().find('>div');
			if(_str=="on"){
				$btn.eq(_num).addClass('on').attr('title','선택됨').siblings().removeClass('on').removeAttr('title');
				$view.eq(_num).addClass('on').siblings().removeClass('on');
			}else{
				$btn.removeClass('on').removeAttr('title');
				$view.removeClass('on');
			}
		}
		$btn.click(function(){
			var num = $(this).index();
			serachBtnCtrl("on", num);
			if(num==1 && is_iScroll) popScroll.refresh();
		});

		//Event Handler
		// Open : 맞춤검색 
		$('.srch_area button.btn').on('click', function(){
			$('.divPopBackArea.search_popup').addClass('on');
			$('html, body').css({'overflow-y': 'hidden'});
			$searchPop.focus()
			return false;
		});

		//Close : X
		$(document).find('.close_btn, .b_area button', $searchPop).on('click', function(){
			$('.divPopBackArea.search_popup').removeClass('on');
			$('html, body').css({'overflow-y': ''});
			$('.srch_area button.btn').focus();
			return false;
		});

	})();
});


/**
	* IOS BUG  Header Fix 관련
	* -----------------------------------------
	* 공통
	* - 모바일 키보드 나올때 header  또는 footer 날림
*/
$(document).ready(function() {
	// if(! $('html').hasClass('ios')) return null;
	$(document)
		.on('focusin', 'input[type="text"], input[type="password"], input[type="number"], select, textarea', function(){
			$('#header').css({'position' : 'absolute', 'top' : 0});
			$('#footer').hide();
			$('.login_btm').hide();
			return false;
		})
		.on('focusout', 'input[type="text"], input[type="password"], input[type="number"], select, textarea', function(){
			//타임아웃 : 얼럿창 나올 시 header 가 중간에 걸쳐 있는 버그 제제 위해 
			setTimeout(function(){
				$('#header').css({'position' : 'fixed', 'top' : ''});
				$('#footer').show();
				$('.login_btm').show();
			}, 360)
			return false;
		})
	;

});



/**
* Test 함수 (개발에서 따로 재정의 할 함수)
* -----------------------------------------
* - check_productList : 상품목록 에서 비교하기 클릭시 2개이상일 경우 더보기 버튼 보임
*/
(function(context) {
	var Test = Test || {
		check_productList : function(_target){
			var chkNum=0;
			_target.each(function(index){
				$(this).change(function(){
					if($(this).is(':checked')){
						chkNum ++;
						if(chkNum ==2){
							$('.footer_nav').hide();
							$('.footer_type03').show();
							Layout.footer.show(); //[풋터 보임]
						}
						if(chkNum > 2){
							alert('상품 비교는 2개 상품을 선택하셔야 합니다.');
							$(this).removeAttr('checked',  false);
							chkNum = 2;
						}
					}else{
						if(chkNum > 0) chkNum --;
						$('.footer_nav').show();
						$('.footer_type03').hide();
						Layout.footer.hide(); //[풋터 숨김]
					}
					return false;
				});
			});
		}
		//팝업 상품목록 비교하기(탭 있을때) : popup_process01.html
		, check_productList_pop : function(_target){
			var chkNum=0;
			_target.each(function(index){
				$(this).change(function(){
					if($(this).is(':checked')){
						chkNum ++;
						if(chkNum ==2){
							$('.btn_area a').hide();
							$('.btn_area .compare_btn').show(); //[비교하기 버튼 보임]
						}
						if(chkNum > 2){
							alert('상품 비교는 2개 상품을 선택하셔야 합니다.');
							$(this).removeAttr('checked',  false);
							chkNum = 2;
						}
					}else{
						if(chkNum > 0) chkNum --;
						$('.btn_area a').show();
						$('.btn_area .compare_btn').hide(); //[비교하기 버튼 숨김]
					}
					return false;
				});
			});
		}
		, ib_select : function(){
			var $lb = $('.product_list .list_area .vs_chk'),
				num = $lb.find("input:checked").length
			;
			$lb.find("input").click(function(event) {
				if($(this).is(":checked")){
					num+=1;
					if(num > 1){
						// fixedBtnCtrl(".btnVS", "active")
						$('.footer_type03').show();
						Layout.footer.show(); //[풋터 보임]
					}
					if(num>2){
						num = 2;
						return false;
					}
				}else{
					num-=1;
					if(num<=1){
						// fixedBtnCtrl(".btnVS", "off")
						$('.footer_type03').hide();
						Layout.footer.hide(); //[풋터 숨김]
					}
				}
			});
		}
	}
	context.Test = Test;
})(window);



/**
* EventHandler
* -----------------------------------------
*/
$(document).ready(function() {
	//My 금융 열기
	$(document).on('click', '#footer .footMybank a', function(){
		myPageBtn();
	});


	//Footer 상담하기 버튼  열기 닫기
	$('html, body').on('click', '.etcMymenu', function(){
		$('body,html').css('overflow-y','hidden');
		$('.productMenuPop').addClass('motion');
	});
	$('html, body').on('click', 'a.counselPopClose', function(){
		$('html,body').removeAttr('style');
		$('.productMenuPop').removeClass('motion');
	});


	//전체메뉴
	$('html, body').on('click', '.btn_all_menu', function(){
		jQuery('.allGnbBackArea').show();
		jQuery('.allGnbBackArea').stop().animate({right:'0%'},500);
		jQuery('body, html').css('overflow-y','hidden');
		return false;
	});

	//접근성 테이블 :캡션 삽입
	Pub.accessbility.table.addCaption();

	sub_tab(); //2depth 탭 호출


	//GNB
	$('html, body').on('click', '.top_gnb', function(){
		$('.allGnbBack').addClass('on')
		$('.allGnbBack .title').attr('tabindex',0).focus();
		$('body, html').css('overflow-y','hidden');
		return false;
	});

	//GNB close
	$('html, body').on('click', '.gnb_close', function(){
		$('.allGnbBack').removeClass('on');
		$('.top_gnb').focus()
		// jQuery('.allGnbBackArea').stop().animate({right:'-100%'},500,function(){jQuery('.allGnbBackArea').hide()});
		$('html,body').removeAttr('style');
		return false;
	});


	//푸쉬알림 배경 (nhbank 만 사용)
	if($('#content').hasClass('push_list_wrap')) {
		$('#wrap').css('background','#f4f4f4')
	}

	//상품공시실 타이틀영역
	var titArea = $('#content h1').hasClass('public');
	if(titArea == true){
		$('.public').parent('.section').css('padding','0');
	}

	//full팝업 여백제거
	var full = $('.pop_type01').hasClass('pop_full');
	if(full==true){
		$('.divPopBackArea.dev2017').css('padding','0');
	}
});







/* =================================================================================
* 2017 고도화 신규 작업
* ==================================================================================
*/

//하단 고정 버튼 컨트롤
function fixedBtnCtrl(_target, _str){//버튼선택자, 상태 값
	if(_str=="active"){
		$(_target).addClass('fixed_btn');
		$("#footer").hide();
	}else{
		$(_target).removeClass('fixed_btn');
		$("#footer").show();
	}
	if(_target==".btnVS"){
		$(".btns_prev_top").addClass("resizePos");
		$(".quick_cetner .btn_quick_control").removeClass('down');
		if($(this).scrollTop() > $(window).height()){
			$(".quick_cetner .btn_quick_control").addClass("resizePos")
		}
	}
}


// 상품목록 검색영역 컨트롤
function search_area(){
	// 상품목록 슬라이드 
	$('.slider').each(function(){
		var owl = $(this);
		owl.owlCarousel({
			loop:true
			, items:1
			, autoplay:true
			, autoplayTimeout:3000
			, navigation:true
		});

		var $ctrl = owl.parents('.prod_slider').find('.b_control'),
			$dots = $ctrl.parents('.prod_slider').find('.slider .owl-controls');
		$ctrl.appendTo($dots);

		$('.play').on('click',function(){
			$(this).removeClass('on').siblings().addClass('on');
			var $owl = $(this).parents('.prod_slider').find('.slider');
			$owl.trigger('play.owl.autoplay',[3000])
		})
		$('.stop').on('click',function(){
			$(this).removeClass('on').siblings().addClass('on');
			var $owl = $(this).parents('.prod_slider').find('.slider');
			$owl.trigger('stop.owl.autoplay',[3000])
		})

		owl.on('changed.owl.carousel',function(event){
			if(owl.find('.play').hasClass('on')){
				owl.find('.play').removeClass('on').siblings().addClass('on');
			}
		})
	})

	// 펀드유형
	$('.tab_nav input').on('click',function(){
		var $that = $(this).parent('li'),
			$idx = $that.index(),
			$view = $that.parents('.tab_nav').next('.tab_contents').find('>div');
		if(!$that.hasClass('on')){
			$that.addClass('on').siblings().removeClass('on');
			$view.eq($idx).addClass('on').siblings().removeClass('on');
		}
	})
	// 토글 버튼(수익률)
	$('.sort_bx .b_arw').on('click',function(){
		var $that = $(this).parent('li');
		if(!$that.hasClass('on')){
			$('html').addClass('st_wrap')
			$that.addClass('on').attr('title','선택됨').siblings().removeClass('on').removeAttr('title');
		}else{
			$that.removeClass('on').removeAttr('title');
			$('html').removeClass('st_wrap')
		}
	});

	// 수익률 조건선택
	$('.month_list button').on('click', function() {
		var $that = $(this);
		if(!$that.hasClass('on')){
			$that.addClass('on').attr('title','선택됨').parent('li').siblings().find('button').removeClass('on').removeAttr('title');
		}
	});
	// 상품선택 비교하기 버튼
	$('.month_list button').on('click', function() {
		var $that = $(this);
		if(!$that.hasClass('on')){
			$that.addClass('on').attr('title','선택됨').parent('li').siblings().find('button').removeClass('on').removeAttr('title');
		}
	});
}




// 게시판 목록 하위메뉴 show hide
function board_list(){
	var $list = $('.board_list li a');
	$list.on('click',function(){
		var $btn = $(this),
			$ul = $btn.next('ul');
		if($ul.length > 0){
			if(!$btn.hasClass('on')){
				$btn.addClass('on').attr('title','하위메뉴 있음, 펼쳐짐');
				$ul.slideDown();
			}else{
				$btn.removeClass('on').attr('title','하위메뉴 있음, 닫힘');
				$ul.slideUp();
			}
		}
	})
}

// 베스트 상품 슬라이드
function best_slider(target){
	target.each(function(){
		var owl = $(this).find('.slider');
		owl.each(function(){
			var owl = $(this);
			owl.owlCarousel({
				loop:true
				, items:1
				, autoplay:true
				, autoplayTimeout:3000
				, nav:true
			});

			var $ctrl = owl.parents('.best_prod_slider').find('.b_control'),
				$dots = $ctrl.parents('.best_prod_slider').find('.slider .owl-controls');
			$ctrl.appendTo($dots);

			$('.play').on('click',function(){
				$(this).removeClass('on').siblings().addClass('on');
				var $owl = $(this).parents('.best_prod_slider').find('.slider');
				$owl.trigger('play.owl.autoplay',[3000])
			})
			$('.stop').on('click',function(){
				$(this).removeClass('on').siblings().addClass('on');
				var $owl = $(this).parents('.best_prod_slider').find('.slider');
				$owl.trigger('stop.owl.autoplay',[3000])
			})

			owl.on('changed.owl.carousel',function(event){
				if(owl.find('.play').hasClass('on')){
					owl.find('.play').removeClass('on').siblings().addClass('on');
				}
			})

		});
	})
}


//베스트 금융상품  탭 컨트롤
function best_pro_list(tab,par,view_bx){
	tab.on('click',function(){
		var $li = $(this).parent('li'),
			$view = $(this).parents(par).next(view_bx).find('>div'),
			$idx = $li.index();
		if(!$li.hasClass('active')){
			$li.addClass('active').attr('title','현재 선택된 탭').siblings().removeClass('active').removeAttr('title');
			$view.eq($idx).addClass('active').siblings().removeClass('active');
		}
	});
}

// 2depth tab 
function sub_tab(num){
	var _target = $(".sub_tab_area");
	if(_target.length>0){
		_target.each(function() {
			var _tabs = $(this).find(".sub_tab");
			function setDefault(num){
				_tabs.find("a").eq(num).addClass('on').attr('title','현재 선택된 탭').siblings('a').removeClass('on').removeAttr('title');
				_tabs.siblings('.s_view').hide().eq(num).show();
			}
			if(num!=null){
				setDefault(num);
			}else{
				var onNum = _tabs.find("a.on").index();
				if(onNum == null || onNum == undefined || Number(onNum) <0) setDefault(0);
				else setDefault(onNum);
				
			}
			_tabs.find("a").click(function(e){
				e.stopPropagation();
				var $idx = $(this).index();
				$(this).addClass('on').attr('title','현재 선택된 탭').siblings('a').removeClass('on').removeAttr('title');
				$(this).parents(".sub_tab").siblings('.s_view').hide().eq($idx).show()
			});
		});
	}
}

// 목록 상품선택 비교하기 버튼
function lb_sect(){
	var $lb = $('.product_list .list_area .vs_chk'),
		num = $lb.find("input:checked").length;
		$lb.find("input").click(function(event) {
			if($(this).is(":checked")){
				num+=1;
				if(num > 1){
					fixedBtnCtrl(".btnVS", "active")
				}
				if(num>2){
					num = 2;
					return false;
				}
			}else{
				num-=1;
				if(num<=1){
					fixedBtnCtrl(".btnVS", "off")
				}
			}
			//console.log(num);
			//console.log($(this).prop("checked"));
		});
}

//푸시 체크박스 선택
$.pushListDel = function(_str){
	var _target = $(".push_bx");
	var str = _str;
	function inputCtrl(str){
		if(str=="active"){
			_target.addClass('active');
			fixedBtnCtrl(".chkDel", "active");//하단버튼 활성화
		}else{
			_target.removeClass('active');
			fixedBtnCtrl(".chkDel", "off");
		}
	}
	inputCtrl(str); //초기값 실행
	_target.find(".b_del").click(function(){
		inputCtrl("active");
	});
	$(".push_list_wrap .btnCancel").click(function() {
		inputCtrl("off");
	});
}



/**
* PDF Viewer 체크박스  일괄 적용 (2017.1011)
* -----------------------------------------
* (은행, 상호 공통)
*/

//init : 버튼 텍스트 일괄 변경 : 내용보기 > 확인하기
$(document).ready(function() {
	(function(){
		var $target = $('.terms_area>dl>dt>a');
		if($target.length){
			$target.each(function(){
				$(this).text('확인하기');
			});
		}
	})();
});

//1. 버튼전체 체크 
//2. 체크박스 전체 체크
function tearmsConfirm(){
	$('.check_type03').each(function(){
		if($(this).hasClass('noSelect')){
			$(this).find('label').text('확인완료');
			$(this).find('input[type=checkbox]').attr('disabled',true);
			$(this).find('input[type=checkbox]+label').css('background-color','#666');
		}
	});

	var $target = $('.terms_area.noSelect');
	if($target.length){
		$target.each(function(){
			var $a = $(this).find('>dl>dt>a');
			var $chks = $(this).find('input[type=checkbox]');

			$a.css('background-color', '#666');
			$a.text('확인완료');

			$chks.each(function(){
				$(this).attr('checked', true);
				$(this).attr('disabled', true);// 재 클릭 금지
				$(this).addClass('confirm');// disabled 체크박스 디자인 변경
			});
		});
	}
}

//1. 버튼전체 체크 
//2. 확인하기 버튼 있는 체크박스만 전체 체크
function tearmsConfirm_btnOnly(){
	$('.check_type03').each(function(){
		if($(this).hasClass('noSelect')){
			return false;
		}
		$(this).find('label').text('확인완료');
		$(this).find('input[type=checkbox]').attr('disabled',true);
		$(this).find('input[type=checkbox]+label').css('background-color','#666');
	});

	var $target = $('.terms_area>dl>dt>a');
	if($target.length){
		$target.each(function(){
			var $a = $(this);
			var $chks = $(this).parent().parent().parent().find('input[type=checkbox]');

			$a.css('background-color', '#666');
			$a.text('확인완료');

			$chks.each(function(){
				$(this).attr('checked', true);
				$(this).attr('disabled', true);// 재 클릭 금지
				$(this).addClass('confirm');// disabled 체크박스 디자인 변경
			})
		});
	}
}