$(document).ready( function() {

	//    topMenu(); //탑메뉴 hammer.js 실행을 위해 실제 실행이 되는 페이지에서만 함수를 호출해야함.(gnb가 존재하는 페이지)
	//    myFincTabMenu(); //MY금융센터 탭메뉴
	//    topMenuNew(); //박스형 탑메뉴
	//    SerchListRoling(); //예금검색 롤링이벤트
	//    EventListRoling(); //이벤트검색 롤링이벤트

	subMainProd(); //서브메인 상품이미지 롤링
	subProdRoling(); //서브메인 상품이미지 롤링
	//planProdRoling($('#main_roll01')); //상품기획전 이미지 롤링
	//planProdRoling();
	loginSubmenu(); //로그인 서브메뉴 클릭
	foldUpDown(); //div로 감싼 dl구조 열고 닫기 열기에 on클래스가 잆어야 함.
	CustomSearchBtn(); //맞춤검색버튼
	footerEvent(); //footer이벤트
	// allMenuEvent(); //전체메뉴 이벤트 //2017 고도화 주석
	//fundRolingEvent(); //펀드화면의 상품이미지 롤링 이벤트
	infoCodeView(); //안내메시지 팝업 코드보이기
	checkConfirm(); //약관,설명 확인하기 버튼
	illegalConfirm(); //불법,탈법 차명거래금지 버튼
	btnToggle(); //앱설정 토글버튼
	visitTableShow(); //영업점방문예약내역 이벤트
	customFundComs(); //맞춤형펀드 이벤트
	myFincCounBtn(); // my금융센터 만기도래상품 상담버튼
	myCounsBtn(); // my금융센터 상담버튼
	//custMenuNew(); //고객지원박스형메뉴

	//eventProdRoling(); //통합메인 이벤트 롤링(은행 전용) -
	gatePageRoling(); //게이트페이지 이벤트 롤링
	// allNewGnbEvent(); //수정GNB이벤트 //2017 고도화 주석
	zipSchEvent(); //주소검색이벤트
	atteProdRoling(); //추천기획전 요즘뜨는상품 롤링(은행 전용)
	// fontSizeChange();  // 글자크기 수정  2016-06-30 해당 function 을 작동하게 하는 태그 없음
	prodQnaOpenClose(); //상세화면 Q&A 열기/닫기
	//coachPageEvent(); // 코칭페이지
	//topMenu2(); //my금융센터 swipe rolling
	sortingCtrl(); /*레이어 뒷 배경 스크롤 막기/풀기 2016-07-06 최원혁 추가*/
	searchLyClose();/*맞춤검색 팝업 닫기 2016-07-21 최원혁 추가*/


	//화면 최상단으로 이동 (2017 고도화 작업)
	/*jQuery('.topScroll').bind('click',function(){
		console.log('topScroll')
		jQuery('body').stop().animate({'scrollTop':'0'},300);
		return false;
	});*/
	$('html, body').on('click', '.topScroll', function(){//2017 고도화 작업
		jQuery('html, body').stop().animate({'scrollTop':'0'},300);
		return false;
	});


	//[Folding] 약관 등 내용보기 열기/닫기 - (2017 고도화 작업 - 접근성수정)
	/*
	jQuery('.terms_area>dl>dt>a').bind('click',function(){
		var terms_areaDD = jQuery(this).parent().parent().find('dd');
		if(terms_areaDD.css('display') == 'none'){
			terms_areaDD.show();
		}else{
			terms_areaDD.hide();
		};
	});
	*/
	(function(){
		var $target = $('.terms_area>dl>dt>a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent().find('dd');

				if($con.css('display') == 'none') $a.attr('title', '펼치기');
				else $a.attr('title', '접기');

				$a.on('click',function(){
					var terms_areaDD = $(this).parent().parent().find('dd');
					if(terms_areaDD.css('display') == 'none'){
						terms_areaDD.show();
						$(this).attr('title', '접기');
						$(this).css('background-color', '#666');
						$(this).text('확인완료');
					}else{
						terms_areaDD.hide();
						$(this).attr('title', '펼치기');
					};
				});
			});
		}
	})();


	//대출금상환 열기/닫기 (사용중인 화면없음)
	jQuery('.Product_list01>dl>dt>a').bind('click',function(){
		//        alert();
		var noticeDD = jQuery(this).parent().parent();
		if(noticeDD.attr('class') == 'on'){
			noticeDD.removeClass('on');
		}else{
			noticeDD.addClass('on');
		};
	});

	//이 상품을 가입하면 받을 수 있는 금리 열기/닫기 (사용중인 화면없음)
	jQuery('.Product_list02_01>dl>dt>a, .Product_list02_02>dl>dt>a').bind('click',function(){
		var noticeDD = jQuery(this).parent().parent();
		if(noticeDD.attr('class') == 'on'){
			noticeDD.removeClass('on');
		}else{
			noticeDD.addClass('on');
		};
	});


	//[Folding] 알아두세요, 서식자료 열기/닫기 - (2017 고도화 작업 - 접근성수정)
	/*
	jQuery('.notice>dl>dt>a, .Filedown>dl>dt>a').bind('click',function(){
		var noticeDD = jQuery(this).parent().parent();
		if(noticeDD.attr('class') == 'on'){
			noticeDD.removeClass('on');
			jQuery(this).find('span').text('펼치기');
		}else{
			noticeDD.addClass('on');
			jQuery(this).find('span').text('닫기');
		};
	});
	*/
	(function(){
		var $target = $('.notice>dl>dt>a, .Filedown>dl>dt>a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) $a.find('span').text('접기');
				else $a.find('span').text('펼치기');

				$a.on('click',function(){
					var noticeDD = $(this).parent().parent();
					if(noticeDD.attr('class') == 'on'){
						noticeDD.removeClass('on');
						$(this).find('span').text('펼치기');
					}else{
						noticeDD.addClass('on');
						$(this).find('span').text('접기');
					};
				});
			});
		}
	})();

	//[Folding] 상세화면 추천상품 Q&A 열기/닫기 - (2017 고도화 작업 - 접근성수정)
	/*jQuery('.Product_list03 dl dt a, .productInfo dl dt a').bind('click',function(){
		var prod_areaDD = jQuery(this).parent().parent();
		if(prod_areaDD.attr('class') == 'on'){
			prod_areaDD.removeClass('on');
			jQuery(this).find('span.Ic').text('펼치기');
		}else{
			prod_areaDD.addClass('on');
			jQuery(this).find('span.Ic').text('닫기');
		};
	});*/
	(function(){
		var $target = $('.Product_list03 dl dt a, .productInfo dl dt a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) $a.find('span.Ic').text('접기');
				else $a.find('span.Ic').text('펼치기');

				$a.on('click',function(){
					var prod_areaDD = $(this).parent().parent();
					if(prod_areaDD.attr('class') == 'on'){
						prod_areaDD.removeClass('on');
						$(this).find('span.Ic').text('펼치기');
					}else{
						prod_areaDD.addClass('on');
						$(this).find('span.Ic').text('접기');
					};
				});
			});
		}
	})();


	//[Folding] 기타 열기/닫기 - (2017 고도화 작업 - 접근성수정)
	/*jQuery('.fund_list>dl>dt>a, .analysis_info>dl>dt>a').bind('click',function(){
		var noticeDD = jQuery(this).parent().parent();
		var ddName = noticeDD.attr('class');
		if(ddName.match('on')){
			noticeDD.removeClass('on');
			jQuery('span',this).text('펼치기');
		}else{
			noticeDD.addClass('on');
			jQuery('span',this).text('닫기');
		};
	});*/
	(function(){
		var $target = $('.fund_list>dl>dt>a, .analysis_info>dl>dt>a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) $a.find('span.Ic').text('접기');
				else $a.find('span.Ic').text('펼치기');

				$a.on('click',function(){
					var noticeDD = $(this).parent().parent();
					var ddName = noticeDD.attr('class');
					if(ddName.match('on')){
						noticeDD.removeClass('on');
						$('span',this).text('펼치기');
					}else{
						noticeDD.addClass('on');
						$('span',this).text('접기');
					};
				});
			});
		}
	})();



	//[Folding] 고객성향분석 열기/닫기 (2017 고도화 작업 - 접근성수정)
	/*jQuery('.Info_list>dl>dt>a, .analysis_info>dl>dt>a').bind('click',function(){
		var noticeDD = jQuery(this).parent().parent();
		var ddName = noticeDD.attr('class');
		if(ddName.match('on')){
			noticeDD.removeClass('on');
			jQuery('span',this).text('펼치기');
		}else{
			noticeDD.addClass('on');
			jQuery('span',this).text('닫기');
		};
	});*/
	(function(){
		var $target = $('.Info_list>dl>dt>a, .analysis_info>dl>dt>a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) $a.find('span.Ic').text('접기');
				else $a.find('span.Ic').text('펼치기');

				$a.on('click',function(){
					var noticeDD = $(this).parent().parent();
					var ddName = noticeDD.attr('class');
					if(ddName.match('on')){
						noticeDD.removeClass('on');
						$('span.Ic',this).text('펼치기');
					}else{
						noticeDD.addClass('on');
						$('span.Ic',this).text('접기');
					};
				});
			});
		}
	})();



	//[탭] (2017 고도화 작업 - 접근성수정)
	/*jQuery('.tab_area .tabBtn>a').bind('click',function(){
		var me = jQuery(this);
		var para = me.siblings();
		var tabCnt = me.index();
		var box = me.parent().parent();
		para.removeClass('on');
		me.addClass('on');
		box.find('>.tabAreaBox').hide();
		box.find('>.tabAreaBox').eq(tabCnt).show();
	});*/
		/* 2017 고도화 작업 탭 수정 
*/

	//2017 고도화 작업 탭 컨트롤 수정	
	(function(){
		var $tabs = $('.tab_area');
		if($tabs.length){
			$tabs.each(function(){
				var $target = $(this).find('.tabBtn a');
				//$target.wrapInner('<span></span>');
				$target.each(function(){
					var $a = $(this);
					var $con = $(this).parents(".tab_area");

					$a.attr('role', 'tab');
					if($a.hasClass('on')) $a.attr({'title' : '선택됨', 'aria-selected' : true });
					else $a.attr({'title' : '선택하기', 'aria-selected' : false });

					$a.on('click',function(){
						var tabCnt = $(this).index();
						var box = $(this).parents(".tabBtn");
						$(this)
							.addClass('on')
							.attr({'title' : '선택됨', 'aria-selected' : true })
							.siblings().removeClass('on')
							.attr({'title' : '선택하기', 'aria-selected' : false })
						;
						box.siblings('.tabAreaBox').hide().eq(tabCnt).show();
					});
				});
			});
		}
	})();

	//별점주기
	jQuery('.starPointSelct>a').bind('click',function(){
		if(jQuery(this).hasClass('on')){
			jQuery(this).removeClass('on');
			jQuery(this).addClass('off');
		}else{
			jQuery(this).removeClass('off');
			jQuery(this).addClass('on');
		};
	});

	//상담하기 버튼(은행/상호 공통)
	jQuery('.footer_type03>.footCounsel').on('click',function(){
		var test = jQuery(this).parent();
		var appHtml = "<div class='butPopBackArea counsel'></div>"
		if(test.attr('class').match('on')){
			btnCounselEnd(test);
		}else{
			test.addClass('on');
			test.before(appHtml);
			jQuery('.footCounsel>div.openBtn').show();
			jQuery('.footer_type03 a.btn_com').css('z-index','98');
			jQuery('.footer_type03 a.btn_sky,.footer_type03 a.btn_act').css('position','absolute');
			jQuery('.footer_type03 a.btn_act').css('right','0');
			jQuery('.footer_type03 a.showBtn').css('z-index','99');
		};

		//상담하기 종료처리
		jQuery('div.butPopBackArea').on('click',function(){
			btnCounselEnd(test);
		});
	});


	function btnCounselEnd(test) {
		test.removeClass('on');
		jQuery('.footer_type03 a.btn_com').css('z-index','').css('position','').css('right','');
		jQuery('.footCounsel>div.openBtn').hide();
	};

	//관심상품 등록
	jQuery('.SliderAreaBbox .Interest').bind('click',function(){
		var onChk = jQuery('.SliderArea');
		if(onChk.attr('class').match('Slideon')){
			onChk.removeClass('Slideon');
		}else{
			onChk.addClass('Slideon');
		};
	});

	//비교함담기 등록
	jQuery('.fundSele label').bind('click',function(){
		var onChk = jQuery('input:radio[id="ra11_01"]').is(":checked");
		//        alert(onChk);
		if(onChk){
			jQuery('.ra11_01').show();
			jQuery('.ra11_02').hide();
		}else{
			jQuery('.ra11_01').hide();
			jQuery('.ra11_02').show();
		};
	});

	// 레이어팝업 닫기
	jQuery('.exit').bind('click',function(){
		jQuery('.divPopBackArea').hide();
		_rollback_callback();
	});

	// 권유직원번호/개설영업점 선택
	jQuery('.showHideBox .pot').hide();
	jQuery('.showHideBtn label').bind('click',function(){
		var onChk = jQuery('input:radio[id="rad01_01"]').is(":checked");
		//        alert(onChk);
		if(onChk){
			jQuery('.showHideBox .per').hide();
			jQuery('.showHideBox .pot').show();
		}else{
			jQuery('.showHideBox .per').show();
			jQuery('.showHideBox .pot').hide();
		};
	});

	//상품리스트 상품보기조건
	var searchBtnBox = $('.conditionBox'),
		searchBtn = searchBtnBox.find('li > a'),
		searchView = $('.conditionView'),
		addHTML = "<div class='topMenuBackArea'></div>",
		tabBox1 = $('.conditionView.ProdView'),
		tabBox2 = $('.conditionView.PopularProduct'),
		tabBox3 = $('.conditionView.CustomSearch');
		//console.log(searchBtn.parent().eq(0).first());
	setTimeout(conditionViewHide,200); //일정시간 후 검색박스를 숨겨준다.
	//    searchView.hide();
	searchBtnBox.after(addHTML);
	$('.topMenuBackArea').hide();
	searchBtn.bind('click',function(){
		//        alert($(this).parent().index());
		if($(this).parent().index() == '0' && tabBox1.css('display') == 'none'){
			searchView.slideUp();
			tabBox1.slideDown();
			searchBtnBox.addClass('clickPosition');
			$('.topMenuBackArea').show();
		}
		else if($(this).parent().index() == '1' && tabBox2.css('display') == 'none'){
			searchView.slideUp();
			tabBox2.slideDown();
			searchBtnBox.addClass('clickPosition');
			$('.topMenuBackArea').show();
		}else if($(this).parent().index() == '2' && tabBox3.css('display') == 'none'){
			searchView.slideUp();
			tabBox3.slideDown();
			searchBtnBox.addClass('clickPosition');
			$('.topMenuBackArea').show();
		};
	});

	//상품리스트 상품보기조건 닫기
	$('.conditionView a.CloseBt').bind('click',function(){
		$('.topMenuBackArea').hide();
		tabBox1.hide();
		tabBox2.hide();
		tabBox3.hide();
		searchBtnBox.removeClass('clickPosition');
	});

	//상품보기조건 항목선택
	$('div.wrap ul.list>li>a').bind('click',function(){
		$('div.wrap ul.list>li').removeClass('on');
		$(this).parent().addClass('on');
	});

	// 환율계산기 문구변경 //
	jQuery('.fund_list input[name="exch"]').bind('click',function(){
		//        alert(myPgWh);
		var onChk = jQuery('input:radio[id="rd_01"]').is(":checked");
		var chgTxtClss = jQuery('.fund_list .changeTxt');
		var purTxt = '구매';
		var panTxt = '판매';
		if(onChk){
			chgTxtClss.text(purTxt);
		}else{
			chgTxtClss.text(panTxt);
		};
	});

	// 마이페이지 닫기 (2017 고도화 : comm_html_ext.2017.go.js 로 이동)
	/*$('html, body').on('click', '.myPageBackArea .myPageClose', function(){
		$('.myPageBackArea').stop().animate({left:'-100%'},500,function(){
			// $('header a.top_user').focus();
			$('#footer .footMybank a').focus();
			jQuery('.myPageBackArea').hide();
		});
		// jQuery('body,html').css('overflow-y','auto');
		$('html, body').removeAttr('style');
	});*/


	/*글자 크기 수정 (localStorage에 담겨있는 값 자동 셋팅) */
	/*jQuery("body").css("zoom",localStorage.getItem("zoom")); 2016-06-30
	jQuery("#wrap").css("overflow-x",localStorage.getItem("wrapOver"));
	jQuery("#body").css("overflow-x",localStorage.getItem("bodyOver"));*/


	//[Folding]  퇴직연금 부분  스크립트 추가 2016-05-13  (2017 고도화 작업 - 접근성수정)
	/*
	jQuery('.ps_list_new dl dt a').bind('click',function(){
		 var prod_areaDD = jQuery(this).parent().parent();
		 if(prod_areaDD.attr('class') == 'on'){;
			 prod_areaDD.removeClass('on');
			 prod_areaDD.addClass('off');
			 jQuery(this).find('span.Ic').text('펼치기');
		 }else{
			 prod_areaDD.removeClass('off');
			 prod_areaDD.addClass('on');
			 jQuery(this).find('span.Ic').text('닫기');
		 };
	});
	*/
	(function(){
		var $target = $('.ps_list_new dl dt a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) {
					$a.attr('title', '접기');
					$a.find('span.Ic').text('접기');
				} else {
					$a.attr('title', '펼치기');
					$a.find('span.Ic').text('펼치기');
				}

				$a.bind('click',function(){
					var prod_areaDD = $(this).parent().parent();
					if(prod_areaDD.attr('class') == 'on'){
						prod_areaDD.removeClass('on');
						prod_areaDD.addClass('off');
						$(this).find('span.Ic').text('펼치기');
						$(this).attr('title', '펼치기');
					}else{
						prod_areaDD.removeClass('off');
						prod_areaDD.addClass('on');
						$(this).find('span.Ic').text('접기');
						$(this).attr('title', '접기');
					};
				});
			});
		}
	})();

});





	/* 마이페이지 열기  (2017 고도화 : comm_html_ext.2017.go.js 로 이동)*/
	/*function myPageBtn(){
		jQuery('.myPageBackArea').show();

		var owl01 = $('#myroll_div');//2017-10-25 
		owl01.owlCarousel({
			loop:false,
			items:3,
			autoplay:false,
			autoplayTimeout:3000,
			autoplayHoverPause:false,
			navigation:true,
			slideBy : 3
			// animateOut: 'fadeOut'
		});

		// var owl_control = $('.owl-controls');
		var owl_control = $('.myPageBackArea .owl-controls'); //2017 고도화 작업 (slide 충돌로 상세 클래스 삽입)
		owl_control.each(function(){
			var owl = $(this);
			var ow = parseInt(owl.width())/2;
			owl.css('margin-left',-ow+"px");
		});

		jQuery('.myPageBackArea').stop().animate({left:'0%'},500, function(){
		});
		jQuery('body,html').css('overflow-y','hidden');
	};*/

	//화면로딩시 마이페이지 넣기
	function myPageOut(){
		var myPgWh = jQuery('.myPageBackArea').width();
		jQuery('.myPageBackArea').css('left',myPgWh);
	};

	//메인메뉴(은행/상호 공통)
	function topMenu(){
		var el = document.querySelector("ul.gnb");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		gnbWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.wrap').width(); //전체 넓이
		var gnbWidth = jQuery('.gnb').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('.gnb').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				if(moveCount > 0){
					moveCount = 0;
					jQuery('.gnb').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('.gnb').css({left:moveCount});
				};
			};
		});

		//gnb 클릭
		jQuery('.gnb>li>a').on('click',function(){
			var gnbLi = jQuery('.gnb>li');
			gnbLi.removeClass('on');
			jQuery(this).parent().addClass('on');

		});
	};

	//메뉴전체 넓이 값 구하기
	function gnbWidthCount(){
		var liLang = jQuery('.gnb>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('.gnb>li').eq(i).outerWidth();
			Math.ceil(gnbWidth);
		};
		jQuery('.gnb').css('width',gnbWidth+1);
	};

	//박스형 탑메뉴
	function topMenuNew(){
		var el = document.querySelector("ul.Submain_gnb");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		subMainGnbWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.wrap').width(); //전체 넓이
		var gnbWidth = jQuery('.Submain_gnb').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('.Submain_gnb').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				jQuery('.SubmainBt').show();
				if(moveCount > 0){
					moveCount = 0;
					jQuery('.Submain_gnb').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('.Submain_gnb').css({left:moveCount});
					jQuery('.SubmainBt').hide();
				};
			};
		});

		//gnb 클릭
		jQuery('.Submain_gnb>li>a').on('click',function(){
			var gnbLi = jQuery('.Submain_gnb>li');
			gnbLi.removeClass('on');
			jQuery(this).parent().addClass('on');

		});
	};

	//박스형 메뉴 전체 넓이 값 구하기
	function subMainGnbWidthCount(){
		var liLang = jQuery('.Submain_gnb>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('.Submain_gnb>li').eq(i).outerWidth();
			Math.ceil(gnbWidth);
		};
		jQuery('.Submain_gnb').css('width',gnbWidth+1);
	};

	//서브메인 상품이미지 롤링(상호/은행 공통)
	function subMainProd(){
		var moveLi = jQuery('.Roling_Top>ul>li');
		var PlanningLang = moveLi.length; //전체 이미지 갯수
		//        alert(PlanningLang);
		var movePoint = 0; //현재위치값
		var moveCount = ''; //현재보이는Li
		var pointMove = ''; //현재보이는Li width
		var moveCountPrev = ''; //이전 Li
		var moveCountNext = ''; //다음 Li

		//왼쪽클릭
		jQuery('.Roling_Area').on('click','.Roling_Top a.left_BennerBt',function(){
			leftMove();
		});
		//오른쪽클릭
		jQuery('.Roling_Area').on('click','.Roling_Top a.right_BennerBt',function(){
			rightMove();
		});
		//왼쪽으로 이동
		function leftMove(){
		//            alert(movePoint);
			if(movePoint > 0){
				moveCount = moveLi.eq(movePoint);
				moveCountPrev = moveLi.eq(movePoint-1);
				pointMove = moveCount.width();
				moveCountPrev.css('display','block').css('left','-100%');
				moveCount.animate({left:+pointMove},500,function(){moveCount.hide()});
				moveCountPrev.animate({left:'0'},500);
				movePoint -= 1;
			};
		};
		//오른쪽으로 이동
		function rightMove(){
		//            alert(movePoint);
			if(movePoint < PlanningLang-1){
				moveCount = moveLi.eq(movePoint);
				moveCountNext = moveLi.eq(movePoint+1);
				pointMove = moveCount.width();
				moveCountNext.css('display','block').css('left','100%');
				moveCount.animate({left:-pointMove},500,function(){moveCount.hide()});
				moveCountNext.animate({left:'0'},500);
				movePoint += 1;
			};
		};
	};

	//서브메인 상품이미지 롤링(상호/은행 공통)
	function subProdRoling(){
		var moveLi = jQuery('.Planning_inBox>ul>li');
		var PlanningLang = moveLi.length; //전체 이미지 갯수
		//        alert(PlanningLang);
		var movePoint = 0; //현재위치값
		var moveCount = ''; //현재보이는Li
		var pointMove = ''; //현재보이는Li width
		var moveCountPrev = ''; //이전 Li
		var moveCountNext = ''; //다음 Li

		//왼쪽클릭
		jQuery('.PlanningBt_Lbt').on('click',function(){
			leftMove();
		});
		//오른쪽클릭
		jQuery('.PlanningBt_Rbt').on('click',function(){
			rightMove();
		});
		//왼쪽으로 이동
		function leftMove(){
		//            alert(movePoint);
			if(movePoint > 0){
				moveCount = moveLi.eq(movePoint);
				moveCountPrev = moveLi.eq(movePoint-1);
				pointMove = moveCount.width();
				moveCountPrev.css('display','block').css('left','-100%');
				moveCount.animate({left:+pointMove},500,function(){moveCount.hide()});
				moveCountPrev.animate({left:'0'},500);
				movePoint -= 1;
			};
		};
		//오른쪽으로 이동
		function rightMove(){
		//            alert(movePoint);
			if(movePoint < PlanningLang-1){
				moveCount = moveLi.eq(movePoint);
				moveCountNext = moveLi.eq(movePoint+1);
				pointMove = moveCount.width();
				moveCountNext.css('display','block').css('left','100%');
				moveCount.animate({left:-pointMove},500,function(){moveCount.hide()});
				moveCountNext.animate({left:'0'},500);
				movePoint += 1;
			};
		};
	};


	//왼쪽으로 이동
	function leftMove(obj,mPoint,pl,mLi){
		var owl = $(obj);
		var movePoint = mPoint;
		var PlanningLang = pl;
		var moveLi = $(mLi);
		var pageWrap  = owl.siblings('.roll_page');
		var page = pageWrap.children('span');
		var moveCount = ''; //현재보이는Li
		var pointMove = ''; //현재보이는Li width
		var moveCountPrev = ''; //이전 Li
		var moveCountNext = ''; //다음 Li

		if (movePoint == 0){movePoint = movePoint + PlanningLang;}
		if(movePoint > 0){
			if (movePoint == 3){ //20160412
				moveCount = moveLi.eq(0);
			} else {
			moveCount = moveLi.eq(movePoint);
			}
			page.removeClass('on');
			moveCountPrev = moveLi.eq(movePoint-1);
			pointMove = moveCount.width();
			moveCountPrev.css('display','block').css('left','-100%');
			moveCount.animate({left:+pointMove},500,function(){moveCount.hide()});
			moveCountPrev.animate({left:'0'},500);
			page.eq(movePoint-1).addClass('on');
			movePoint -= 1;
		};
		return movePoint;
	};

	//오른쪽으로 이동
	function rightMove(obj,mPoint,pl,mLi){
		var owl = $(obj);
		var movePoint = mPoint;
		var PlanningLang = pl;
		var moveLi = $(mLi);
		var pageWrap  = owl.siblings('.roll_page');
		var page = pageWrap.children('span');
		var moveCount = ''; //현재보이는Li
		var pointMove = ''; //현재보이는Li width
		var moveCountPrev = ''; //이전 Li
		var moveCountNext = ''; //다음 Li

		if (movePoint == PlanningLang-1){movePoint = movePoint - PlanningLang;} //20160412
		if(movePoint < PlanningLang-1){
			moveCount = moveLi.eq(movePoint);
			page.removeClass('on');
			moveCountNext = moveLi.eq(movePoint+1);
			pointMove = moveCount.width();
			moveCountNext.css('display','block').css('left','100%');
			moveCount.stop().animate({left:-pointMove},500,function(){moveCount.hide() ; });
			moveCountNext.stop().animate({left:'0'},500);
			page.eq(movePoint+1).addClass('on');
			movePoint += 1;
		};
		return movePoint;
	};


	//추천기획전 상품이미지 롤링(상호/은행 공통)
	/*
	function planProdRoling(obj){
		var moveLi = jQuery(obj).find('>ul>li');
		var moveWrap = moveLi.parents(obj);
		var lBtn = moveWrap.children('.left_BennerBt');
		var rBtn = moveWrap.children('.right_BennerBt');
		var pauseBtn = moveWrap.children('.roll_page').children('a');
		var PlanningLang = moveLi.length; //전체 이미지 갯수
		var movePoint = 0; //현재위치값
		var _timer = setTimeout(function(){rBtn.trigger('click')},2800);

		for (i=0;i < PlanningLang; i++){

			// 2016-05-26 최원법 추가
			num = i+1;

			if (i == '0'){
				moveWrap.children('.roll_page').append('<span class="on">'+num+'번째 배너'+'</span>');
			} else {
				moveWrap.children('.roll_page').append('<span>'+num+'번째 배너'+'</span>');
			}
		}


		//왼쪽클릭
		lBtn.on('click',function(){
			var owl = jQuery(this);
			var btn_stop = owl.parent().children('.roll_page').children('a');
			var btn_state = btn_stop.attr('class');
				clearTimeout(_timer);
				movePoint = leftMove(owl,movePoint,PlanningLang,moveLi);

			if (btn_state == 'go_roll'){
				btn_stop.attr('class', 'go_roll');
				btn_stop.text('자동롤링 중지');
			_timer = setTimeout(function(){rBtn.trigger('click')},2800);
			}
		});

		//오른쪽클릭
		rBtn.on('click',function(){
			var owl = jQuery(this);
			var btn_stop = owl.parent().children('.roll_page').children('a');
			var btn_state = btn_stop.attr('class');
				clearTimeout(_timer);
				movePoint = rightMove(owl,movePoint,PlanningLang,moveLi);

			if (btn_state == 'go_roll'){
				btn_stop.attr('class', 'go_roll');
				btn_stop.text('자동롤링 중지');
			_timer = setTimeout(function(){rBtn.trigger('click')},2800);
			}
		});

		// 정지버튼 20160414
		pauseBtn.on('click',function(e){
			e.preventDefault();
			var owl = jQuery(this);
			var run_state = owl.attr('class');

			if (run_state == 'stop_roll'){
				owl.attr('class', 'go_roll');
				owl.text('자동롤링 중지');
				_timer = setTimeout(function(){rBtn.trigger('click')},800);

			}else {
				owl.attr('class', 'stop_roll');
				owl.text('자동롤링 시작');
				clearTimeout(_timer);
			}
		});
	};
	*/

	//추천기획전 요즘뜨는상품 롤링(은행 전용)
	function atteProdRoling(){
		var moveLi = jQuery('.BESTPlanning .inBox>ul>li');
		var PlanningLang = moveLi.length; //전체 이미지 갯수
		//        alert(PlanningLang);
		var movePoint = 0; //현재위치값
		var moveCount = ''; //현재보이는Li
		var pointMove = ''; //현재보이는Li width
		var moveCountPrev = ''; //이전 Li
		var moveCountNext = ''; //다음 Li

		//왼쪽클릭
		jQuery('.BESTPlanning .PlanningBt_Lbt').on('click',function(){
			leftMove();
		});
		//오른쪽클릭
		jQuery('.BESTPlanning .PlanningBt_Rbt').on('click',function(){
			rightMove();
		});
		//왼쪽으로 이동
		function leftMove(){
			//            alert(movePoint);
			if(movePoint > 0){
				moveCount = moveLi.eq(movePoint);
				moveCountPrev = moveLi.eq(movePoint-1);
				pointMove = moveCount.width();
				moveCountPrev.css('display','block').css('left','-100%');
				moveCount.animate({left:+pointMove},500,function(){moveCount.hide()});
				moveCountPrev.animate({left:'0'},500);
				movePoint -= 1;
			};
		};
		//오른쪽으로 이동
		function rightMove(){
			//            alert(movePoint);
			if(movePoint < PlanningLang-1){
				moveCount = moveLi.eq(movePoint);
				moveCountNext = moveLi.eq(movePoint+1);
				pointMove = moveCount.width();
				moveCountNext.css('display','block').css('left','100%');
				moveCount.animate({left:-pointMove},500,function(){moveCount.hide()});
				moveCountNext.animate({left:'0'},500);
				movePoint += 1;
			};
		};
	};

	//로그인 서브메뉴 클릭
	function loginSubmenu(){
		jQuery('.login.submenu>li>a').on('click',function(){
			jQuery('.login.submenu>li').removeClass('on');
			jQuery(this).parent().addClass('on');
		});
	};

	//[Folding] div로 감싼 dl구조 열고 닫기 열기에 on클래스가 있어야 함. (2017 고도화 작업 - 접근성수정)
	/*function foldUpDown(){
		jQuery('.foldUpDown>dl>dt>a').on('click',function(){
			if(jQuery(this).parent().parent().hasClass('on')){
				jQuery(this).parent().parent().removeClass('on');
			}else{
				jQuery(this).parent().parent().addClass('on');
			};
		});
	};*/
	function foldUpDown(){
		var $target = $('.foldUpDown>dl>dt>a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) $a.attr('title', '접기');
				else $a.attr('title', '펼치기');

				$a.on('click',function(){
					if($(this).parent().parent().hasClass('on')){
						$(this).parent().parent().removeClass('on');
						$(this).attr('title', '펼치기');
					}else{
						$(this).parent().parent().addClass('on');
						$(this).attr('title', '접기');
					};
				});
			});
		}
	};


	// 맞춤검색 검색버튼
	//[Tab_Button] ex. mfpd0300r_02.html
	function CustomSearchBtn(){
		jQuery('.subDivTabButtonBox>li>a').on('click',function(){
			jQuery(this).parent().parent().find('a').removeClass('on');
			jQuery(this).addClass('on');
		});
	};

	//전체메뉴 이벤트(은행,상호 공통)
	function allMenuEvent(){
		//스크롤 적용을 위한 높이값 계산
		var htmlHei = jQuery('html').height();
		var menuHei = jQuery('.allGnbMenuArea>.lnb>div').height();
		var listHei = jQuery('.gnbSubMenuArea').height();
		//        jQuery('.allGnbMenuArea>.lnb>div').css('height',htmlHei-175);
		//        jQuery('.gnbSubMenuArea').parent().css('height',htmlHei-107);
		//메뉴클릭
		jQuery('.allGnbMenuArea>.lnb>div>ul>li>a').on('click',function(){
			var count = jQuery(this).parent().index();
			//            alert(count);
			var point = jQuery(this).parent().parent().parent().parent().parent();
			point.find('.scrollable.list').hide();
			point.find('.scrollable.list').eq(count).show();
			//            var poCount = point.find('.gnbSubMenuArea').eq(count).height(); //현재 선택된 메뉴의 높이
			//            point.find('.gnbSubMenuArea').eq(count).parent().css('height',htmlHei-60);
			jQuery(this).parent().parent().find('li.on').removeClass('on');
			jQuery(this).parent().addClass('on');
		});
		//상단 마켓,뱅킹 선택
		jQuery('.selectBank>li>a').on('click',function(){
			var chClass = jQuery(this).attr('class');
			jQuery('.selectBank>li>a').removeClass('on');
			jQuery(this).addClass('on');
			if(chClass.match('sang')){
				jQuery('.allGnbMenuArea').hide();
				jQuery('.allGnbMenuArea.sang').show();
			}else{
				jQuery('.allGnbMenuArea').hide();
				jQuery('.allGnbMenuArea.bank').show();
			};
		});
		//상단 은행,상호 선택
		jQuery('.lnb>a').on('click',function(){
			var chClass = jQuery(this).attr('class');
			if(chClass.match('bank')){
				jQuery('.allGnbMenuArea.bank').show();
				jQuery('.allGnbMenuArea.sang').hide();
			}else{
				jQuery('.allGnbMenuArea.bank').hide();
				jQuery('.allGnbMenuArea.sang').show();
			};
			return false;// 2017 고도화 작업
		});
		//전체 메뉴 열기/닫기
		// jQuery('.top_menu').bind('click',function(){
		// 	jQuery('.allGnbBackArea').show();
		// 	jQuery('.allGnbBackArea').animate({right:'0%'},500);
		// 	jQuery('body,html').css('overflow-y','hidden');
		// });
		// 2017 고도화 작업
		$('html, body').on('click', '.top_gnb', function(){
			// console.log('top_menu')
			jQuery('.allGnbBackArea').show();
			jQuery('.allGnbBackArea').stop().animate({right:'0%'},500);
			jQuery('body, html').css('overflow-y','hidden');
			// return false;
		});

		//전체 메뉴 열기/닫기
		// jQuery('.allGnbClose').bind('click',function(){
		// 	jQuery('.allGnbBackArea').animate({right:'-100%'},500,function(){jQuery('.allGnbBackArea').hide()});
		// 	jQuery('body,html').css('overflow-y','auto');
		// });
		// 2017 고도화 작업
		$('html, body').on('click', '.allGnbClose', function(){
			jQuery('.allGnbBackArea').stop().animate({right:'-100%'},500,function(){jQuery('.allGnbBackArea').hide()});
			$('html,body').removeAttr('style');
			return false;
		});
	};

	//footer이벤트(은행,상호 공통)
	function footerEvent(){
		//폰트키우기
		jQuery('.fontSize>a').on('click',function(){
			if (jQuery('.fontSizeBtn').css('display')=='none'){
				jQuery('.fontSizeBtn').show();
			}else{
				jQuery('.fontSizeBtn').hide();
			};
		});

		//더보기 버튼
		jQuery('.footMore>a').on('click',function(){
			if (jQuery('.footMoreBackBg').css('display')=='none'){
				jQuery('.footMoreBackBg').show();
			}else{
				jQuery('.footMoreBackBg').hide();
			};
		});
	};

	//펀드화면의 상품이미지 롤링 이벤트(은행전용)
	function fundRolingEvent(){
		fundImgWidthCount(); //서브메인 상품이미지 전체 넓이 값 구하기
		fundRoling();
		//메뉴선택
		jQuery('.FundRoling_Top>ul>li>a').on('click',function(){
			var count = jQuery(this).parent().index();
			jQuery('.FundRoling_Top>ul>li.on').removeClass('on');
			jQuery(this).parent().addClass('on');
			jQuery('.FundRoling_Bottom>ul').removeClass('on');
			jQuery('.FundRoling_Bottom>ul').hide();
			jQuery('.FundRoling_Bottom>ul').eq(count).show();
			jQuery('.FundRoling_Bottom>ul').eq(count).addClass('on');
			fundImgWidthCount(); //서브메인 상품이미지 전체 넓이 값 구하기
			if(count == 0){ // 선택에 따라 높이 조절
				jQuery('.FundRoling_Area').css('height','255px');
			}else{
				jQuery('.FundRoling_Area').css('height','180px');
			};
			fundRoling();
		});

		//상품이미지 롤링
		function fundRoling(){
			var count = jQuery(".FundRoling_Bottom>ul.on").index();
			//                alert(count);
			if(count == 0){
				//                alert('0');
				var el = document.querySelector(".FundRoling_Bottom>ul.FundRating");
				var mc = new Hammer(el,{touchAction: 'auto'});
				mc.get('pinch').set({ enable: true });
				var gnbWidth = jQuery('.FundRoling_Bottom>ul.FundRating').width(); //메뉴전체 넓이
				//                alert(gnbWidth);
				var rolUl = jQuery('.FundRoling_Bottom>ul.FundRating');
			}else if(count == 1){
				//                alert('1');
				var el = document.querySelector(".FundRoling_Bottom>ul.Type");
				var mc = new Hammer(el,{touchAction: 'auto'});
				mc.get('pinch').set({ enable: true });
				var gnbWidth = jQuery('.FundRoling_Bottom>ul.Type').width(); //메뉴전체 넓이
				var rolUl = jQuery('.FundRoling_Bottom>ul.Type');
			}else if(count == 2){
				//                alert('2');
				var el = document.querySelector(".FundRoling_Bottom>ul.Region");
				var mc = new Hammer(el,{touchAction: 'auto'});
				mc.get('pinch').set({ enable: true });
				var gnbWidth = jQuery('.FundRoling_Bottom>ul.Region').width(); //메뉴전체 넓이
				var rolUl = jQuery('.FundRoling_Bottom>ul.Region');
			};
			//        alert('mainMenu');
			fundImgWidthCount(); //MY금융센터 탭메뉴 전체 넓이 값 구하기
			var warpWidth = jQuery('.FundRoling_Bottom').width(); //전체 넓이

			var movePoint = 0; //현재위치
			var moveCount = 0; //전체움직인거리
			var pointMove = 0; //현재움직일거리

			mc.on("hammer.input", function(ev) {
				if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
					ev.deltaX = ev.deltaX + moveCount;
					rolUl.css({left:ev.deltaX});
				}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
					moveCount = moveCount + ev.deltaX;
					if(moveCount > 0){
						moveCount = 0;
						rolUl.css({left:moveCount});
					}else if(moveCount < warpWidth - gnbWidth){
						moveCount = warpWidth - gnbWidth;
						rolUl.css({left:moveCount});
					};
				};
			});
		};

		//펀드 상품이미지 전체 넓이 값 구하기
		function fundImgWidthCount(){
			var liLang = jQuery('.FundRoling_Bottom>ul.on>li').length;
			var gnbWidth =0;
			for(i=0;i<liLang;i++){
				gnbWidth += jQuery('.FundRoling_Bottom>ul.on>li').eq(i).outerWidth()+5;
				Math.ceil(gnbWidth);
			};
			jQuery('.FundRoling_Bottom>ul.on').css('width',gnbWidth+1);
		};
	};

	//안내메시지 팝업 코드보이기
	function infoCodeView(){
		jQuery('p.info_code').hide();
		jQuery('.infoCodeBtn').on('click',function(){
			jQuery('p.info_code').show();
		});
	};

	//[checkbox_button] 약관,설명 확인하기 버튼 (* guide완)
	function checkConfirm(){
		jQuery('.check_type03').on('click',function(){
			if($(this).hasClass('noSelect')){ /* 2017 고도화 : PDF view 팝업 관련 초기 체크박스 선택 안되게 */
				$(this).find('input[type=checkbox]').attr('checked', false); //초기 클릭시 체크드 안되게 
			}else{
				if(jQuery(this).find('input[type=checkbox]').is(":checked")){
					jQuery(this).find('label').text('확인완료');
					jQuery(this).find('input[type=checkbox]').attr('disabled',true);
				}else{
					//                jQuery(this).find('label').text('확인하기');
				};

			}
		});
	};

	//[Folding, checkbox_button] 불법,탈법 차명거래금지 버튼 - (2017 고도화 작업 - 접근성수정)
	/*
	function illegalConfirm(){
		jQuery('.illegalcheck .check_type03 label').on('click',function(){
			var viewBox = jQuery(this).parent().parent().next();
			if(viewBox.attr('class') =='off'){
				viewBox.removeClass('off');
			}else{
				//                viewBox.addClass('off');
			};
		});
	}
	*/
	function illegalConfirm(){
		var $target = $('.illegalcheck .check_type03 label');
		$target.each(function(){
			var $a = $(this);
			var $con = $(this).parent().parent().next();
			if($con.hasClass('off')) $a.prev('input').attr('title', '내용 펼치기');

			$(this).on('click',function(){
				var viewBox = jQuery(this).parent().parent().next();
				if(viewBox.attr('class') =='off'){
					viewBox.removeClass('off');
					$(this).prev('input').attr('title', '');
				}
			});
		})
	};

	//토글버튼 추가(2015-10-15)
	function btnToggle(){
		$('.btnToggle > input').bind('click',function(){
			var labelTxt = $('.btnToggle').find('label > .txt');
			if($(this).is(':checked')){
				labelTxt.text('On').css('left','-26px');
				labelTxt.parent().attr('title','설정켜기');
			}
			else{
				labelTxt.text('Off').css('left','0');
				labelTxt.parent().attr('title','설정끄기');
			}
		});
	};

	//[Folding] 영업점방문 예약내역 - (2017 고도화 작업 - 접근성수정)
	/*function visitTableShow(){
		$('.questBox.visit > a').bind('click',function(){
			var tableEvn = $(this).parent().next();
			if($(this).attr('class') =='on'){
				tableEvn.hide();
				$(this).removeClass('on');
			}else{
				tableEvn.show();
				$(this).addClass('on');
			}
		});
	};*/
	function visitTableShow(){
		var $target = $('.questBox.visit > a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().next();

				if($a.hasClass('on')) $a.attr('title', '접기');
				else $a.attr('title', '펼치기');

				$a.on('click',function(){
					var tableEvn = $(this).parent().next();
					if($(this).attr('class') =='on'){
						tableEvn.hide();
						$(this).removeClass('on');
						$(this).attr('title', '펼치기');
					}else{
						tableEvn.show();
						$(this).addClass('on');
						$(this).attr('title', '접기');
					}
				});
			});
		}
	};

	//[Folding] 맞춤형펀드 이벤트 (2017 고도화 작업 - 접근성수정)
	/*function customFundComs(){
		$('.contsInfoArea .fundListBtn > a').bind('click',function(){
			var tableEvn = $(this).next();
			if(tableEvn.css('display') =='none'){
				tableEvn.show();
			}else{
				tableEvn.hide();
			}
		});
	};*/
	function customFundComs(){
		var $target = $('.contsInfoArea .fundListBtn > a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).next();

				if($con.hasClass('on')) $a.attr('title', '접기');
				else $a.attr('title', '펼치기');

				$a.on('click',function(){
					var tableEvn = $(this).next();
					if(tableEvn.css('display') =='none'){
						tableEvn.show();
						$(this).attr('title', '접기');
					}else{
						tableEvn.hide();
						$(this).attr('title', '펼치기');
					}
				});
			});
		}
	};

	//MY금융센터 탭메뉴(은행,상호 공통)
	function myFincTabMenu(){
		var el = document.querySelector("ul.list");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		listWidthCount(); //MY금융센터 탭메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.wrap').width(); //전체 넓이
		var gnbWidth = jQuery('ul.list').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('ul.list').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				if(moveCount > 0){
					moveCount = 0;
					jQuery('ul.list').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('ul.list').css({left:moveCount});
				};
			};
		});

		//gnb 클릭
		jQuery('ul.list>li>a').on('click',function(){
			var listLi = jQuery('ul.list>li');
			listLi.removeClass('on');
			jQuery(this).parent().addClass('on');

		});
	};

	//MY금융센터 탭메뉴 전체 넓이 값 구하기
	function listWidthCount(){
		var liLang = jQuery('ul.list>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('ul.list>li').eq(i).outerWidth();
			Math.ceil(gnbWidth);
		};
		jQuery('ul.list').css('width',gnbWidth+1);
	};

	// my금융센터 만기도래상품 상담버튼
	function myFincCounBtn(){
		jQuery('.stateInfoBox .btn_area01 li>a').bind('click',function(){
			//            alert();
			var test = jQuery(this).parent();
			var appHtml = "<div class='butPopBackArea'></div>"
			if(test.attr('class').match('on')){
				btnCounselEnd(test);
			}else{
				test.addClass('on');
				test.before(appHtml);
				jQuery('div.openBtn').show();
				jQuery('.stateInfoBox a.btn_com').css('z-index','98');
				//                jQuery('.stateInfoBox a.btn_sky,.stateInfoBox a.btn_act').css('position','absolute');
				jQuery('.stateInfoBox a.btn_act').css('right','0');
				jQuery('.stateInfoBox a.showBtn').css('z-index','99');
			};
		});

		//my금융센터 만기도래상품 상담버튼 종료처리
		jQuery('.btn_area01 li .openBtn a').bind('click',function(){
			jQuery('div.openBtn').hide();
			jQuery('.stateInfoBox .btn_area01 li').removeClass('on');
			jQuery('.butPopBackArea').remove();
			jQuery('.stateInfoBox a.showBtn').css('z-index','').css('position','').css('right','');
		});
	};

	//통합검색 예금검색결과 롤링이벤트
	function SerchListRoling(){
		var el = document.querySelector("div.SerchList>ul");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		SerchListWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.SerchList').width(); //전체 넓이
		var gnbWidth = jQuery('.SerchList>ul').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('.SerchList>ul').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				jQuery('.SerchList .SideBt').show();
				if(moveCount > 0){
					moveCount = 0;
					jQuery('.SerchList>ul').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('.SerchList>ul').css({left:moveCount});
					jQuery('.SerchList .SideBt').hide();
				};
			};
		});
	};

	//통합검색 롤링 전체 넓이 값 구하기
	function SerchListWidthCount(){
		var liLang = jQuery('.SerchList>ul>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('.SerchList>ul>li').eq(i).outerWidth()+10;
			Math.ceil(gnbWidth);
		};
		jQuery('.SerchList>ul').css('width',gnbWidth+1);
	};

	//통합검색 이벤트검색 롤링이벤트
	function EventListRoling(){
		var el = document.querySelector("div.EventList>ul");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		EventListWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.EventList').width(); //전체 넓이
		var gnbWidth = jQuery('.EventList>ul').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('.EventList>ul').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				jQuery('.EventList .SideBt').show();
				if(moveCount > 0){
					moveCount = 0;
					jQuery('.EventList>ul').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('.EventList>ul').css({left:moveCount});
					jQuery('.EventList .SideBt').hide();
				};
			};
		});
	};

	//통합검색 롤링 전체 넓이 값 구하기
	function EventListWidthCount(){
		var liLang = jQuery('.EventList>ul>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('.EventList>ul>li').eq(i).outerWidth()+10;
			Math.ceil(gnbWidth);
		};
		jQuery('.EventList>ul').css('width',gnbWidth+1);
	};

	//마이페이지 나만의 추천상품 롤링(은행/상호 공통)
	function myPageProd(){
		var el = document.querySelector(".Roling_Top.myPage>ul");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		prodImgWidthCount(); //메뉴전체 넓이 값 구하기

		var warpWidth = jQuery('.Roling_Top.myPage').width(); //전체 넓이
		var gnbWidth = jQuery('.Roling_Top.myPage>ul').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리
		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				//                    alert(ev.deltaX);
				if(ev.deltaX<-1){
					//gnb왼쪽
					//                   alert('leftMove');
					if(warpWidth < gnbWidth && (gnbWidth - warpWidth) > moveCount){
						//                        pointMove = jQuery('.gnb>li').eq(movePoint).outerWidth();
						if(gnbWidth - warpWidth > warpWidth && warpWidth  < (gnbWidth - moveCount)-warpWidth){
							pointMove = warpWidth;
							//                            alert(pointMove+" 1");
						}else{
							pointMove = (gnbWidth - moveCount)-warpWidth;
							//                            alert(pointMove+" 2");
						};
						moveCount = moveCount + pointMove;
						jQuery('.Roling_Top.myPage>ul').animate({left:-moveCount},500);
						movePoint += 1;
						if(movePoint == jQuery('.Roling_Top.myPage>ul>li').length-1){
							jQuery('.Roling_Area .right_BennerBt').hide();
						};
					};
				}else if(ev.deltaX>1){
					//gnb오른쪽
					if(warpWidth < gnbWidth && 0 < moveCount){
						//                        pointMove = jQuery('.gnb>li').eq(movePoint-1).outerWidth();
						//                            alert(pointMove+" 0");
						if(moveCount  > warpWidth - moveCount){
							pointMove = warpWidth;
							//                            alert(pointMove+" 1");
						}else{
							pointMove = moveCount;
							//                            alert(pointMove+" 2");
						};
						moveCount = moveCount - pointMove;
						jQuery('.Roling_Top.myPage>ul').animate({left:-moveCount},500);
						movePoint -= 1;
						if(movePoint != jQuery('.Roling_Top.myPage>ul>li').length-1){
							jQuery('.Roling_Area .right_BennerBt').show();
						};
					};
				};
			};
		});

		//서브메인 상품이미지 전체 넓이 값 구하기
		function prodImgWidthCount(){
			var liLang = jQuery('.Roling_Top.myPage>ul>li').length;
			var gnbWidth =0;
			for(i=0;i<liLang;i++){
				gnbWidth += jQuery('.Roling_Top.myPage>ul>li').eq(i).outerWidth();
				jQuery('.Roling_Top.myPage>ul>li').eq(i).css('width',jQuery('.Roling_Top.myPage>ul>li').eq(i).width());
			};
			jQuery('.Roling_Top.myPage>ul').css('width',gnbWidth+1);

		};
	};


	//펀드상품목록 상품검색 롤링(은행전용)
	function fundProdSch(){
		var el = document.querySelector(".fundRoling>ul");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		fundProdSchWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('.fundRoling').width(); //전체 넓이
		var gnbWidth = jQuery('.fundRoling>ul').width(); //메뉴전체 넓이
		$('.conditionView').hide(); //넓이 값을 계산 후 검색박스를 숨겨준다.
		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				//                    alert(ev.deltaX);
				if(ev.deltaX<-1 && ev.deltaX>-200 ){
					//gnb왼쪽
					//                   alert('leftMove');
					if(warpWidth < gnbWidth && (gnbWidth - warpWidth) > moveCount){
						//                        pointMove = jQuery('.gnb>li').eq(movePoint).outerWidth();
						if(gnbWidth - warpWidth > warpWidth && warpWidth  < (gnbWidth - moveCount)-warpWidth){
							pointMove = warpWidth;
							//                            alert(pointMove+" 1");
						}else{
							pointMove = (gnbWidth - moveCount)-warpWidth;
							//                            alert(pointMove+" 2");
						};
						moveCount = moveCount + pointMove;
						jQuery('.fundRoling>ul').animate({left:-moveCount},500);
						movePoint += 1;
						jQuery('.rolingPoint span').removeClass('on');
						jQuery('.rolingPoint span').eq(movePoint).addClass('on');
					};
				}else if(ev.deltaX>1 && ev.deltaX<200){
					//gnb오른쪽
					if(warpWidth < gnbWidth && 0 < moveCount){
						//                        pointMove = jQuery('.gnb>li').eq(movePoint-1).outerWidth();
						//                            alert(pointMove+" 0");
						if(moveCount  > warpWidth - moveCount){
							pointMove = warpWidth;
							//                            alert(pointMove+" 1");
						}else{
							pointMove = moveCount;
							//                            alert(pointMove+" 2");
						};
						moveCount = moveCount - pointMove;
						jQuery('.fundRoling>ul').animate({left:-moveCount},500);
						movePoint -= 1;
						jQuery('.rolingPoint span').removeClass('on');
						jQuery('.rolingPoint span').eq(movePoint).addClass('on');
					};
				};
			};
		});

		//펀드상품목록 전체 넓이 값 구하기
		function fundProdSchWidthCount(){
			var liLang = jQuery('.fundRoling>ul>li').length;
			var gnbWidth = 0;
			for(i=0;i<liLang;i++){
				gnbWidth += jQuery('.fundRoling>ul>li').eq(i).outerWidth();
				//                alert(gnbWidth);
				jQuery('.fundRoling>ul>li').eq(i).css('width',jQuery('.fundRoling>ul>li').eq(i).outerWidth());
			};
			jQuery('.fundRoling>ul').css('width',gnbWidth+1);
		};
	};

	function conditionViewHide(){
		if($('#cond3').length == 0) { //펀드에서 사용. 검색조건 운용사 스와이프때문에 예외처리함
			$('.conditionView').hide(); //검색박스를 숨겨준다.
		}
	};


	//My금융센터 상담하기 버튼(은행/상호 공통)
	function myCounsBtn(){
		jQuery('.myCouns>ul>li.counBtn').on('click',function(){
			//            alert();
			var test = jQuery(this).parent();
			var appHtml = "<div class='butPopBackArea counsel'></div>"
			if(jQuery(this).attr('class').match('on')){
				btnCounselEnd(test);
			}else{
				jQuery(this).addClass('on');
				test.before(appHtml);
				jQuery('div.openBtn').show();
				jQuery('.myCouns a.btn_com').css('z-index','98');
				//                jQuery('.myCouns a.btn_sky,.myCouns a.btn_act').css('position','absolute');
				jQuery('.myCouns a.btn_act').css('right','0');
				jQuery('.myCouns a.showBtn,.myCouns a.closeBtn').css('z-index','99');
			};
		});

		//상담하기 종료처리
		jQuery('.btn_advice05.closeBtn').on('click',function(){
			btnCounselEnd(test);
		});

		function btnCounselEnd(test) {
			jQuery('div.openBtn').hide();
			jQuery('.myCouns ul li.on').removeClass('on');
			jQuery('.butPopBackArea').remove();
			jQuery('.myCouns a.btn_com').css('z-index','').css('position','').css('right','');
		};
	};

	// 고객지원 박스형 탑메뉴
	function custMenuNew(){
		var el = document.querySelector("div.iconMenuArea,div.iconMenuArea2");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		custMainGnbWidthCount(); //메뉴전체 넓이 값 구하기
		var warpWidth = jQuery('div.iconMenuArea,div.iconMenuArea2').width(); //전체 넓이
		var gnbWidth = jQuery('div.iconMenuArea ul,div.iconMenuArea2 ul').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + moveCount;
				jQuery('div.iconMenuArea ul,div.iconMenuArea2 ul').css({left:ev.deltaX});
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;
				jQuery('.EventList .SideBt').show();
				if(moveCount > 0){
					moveCount = 0;
					jQuery('div.iconMenuArea ul,div.iconMenuArea2 ul').css({left:moveCount});
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;
					jQuery('div.iconMenuArea ul,div.iconMenuArea2 ul').css({left:moveCount});
					jQuery('.EventList .SideBt').hide();
				};
			};
		});

		//gnb 클릭
		jQuery('div.iconMenuArea ul>li>a,div.iconMenuArea2 ul>li>a').on('click',function(){
			var gnbLi = jQuery('div.iconMenuArea ul>li,div.iconMenuArea2 ul>li');
			gnbLi.removeClass('on');
			jQuery(this).parent().addClass('on');

		});
	};

	//고객지원 박스형 메뉴 전체 넓이 값 구하기
	function custMainGnbWidthCount(){
		var liLang = jQuery('div.iconMenuArea ul>li,div.iconMenuArea2 ul>li').length;
		var gnbWidth =0;
		for(i=0;i<liLang;i++){
			gnbWidth += jQuery('div.iconMenuArea ul>li,div.iconMenuArea2 ul>li').eq(i).outerWidth();
			Math.ceil(gnbWidth);
		};
		jQuery('div.iconMenuArea ul,div.iconMenuArea2 ul').css('width',gnbWidth+1);
	};


	//게이트페이지 이벤트 롤링
	function gatePageRoling(){
		var PlanningLang = jQuery('.Gate_Rolling_inBox>ul>li').length; //전체 이미지 갯수
		gatePageWidthCount(); //서브메인 상품이미지 전체 넓이 값 구하기

		var rolingWidth = jQuery('.Gate_Rolling_inBox').width(); //전체 넓이
		var prodImgWidth = jQuery('.Gate_Rolling_inBox>ul').width(); //메뉴전체 넓이
		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리
		var swipePoint = jQuery('.Gate_Rolling_inBox>ul>li>a');
		//왼쪽클릭
		jQuery('.Rolling_LeftBtn').on('click',function(){
			eventRightMove();
		});
		//오른쪽클릭
		jQuery('.Rolling_RightBtn').on('click',function(){
			eventLeftMove();
		});
		//왼쪽으로 이동
		function eventLeftMove(){
			if(rolingWidth < prodImgWidth && PlanningLang-1 > movePoint){
				pointMove = jQuery('.Gate_Rolling_inBox>ul>li').eq(movePoint).width();
				moveCount = moveCount + pointMove;
				jQuery('.Gate_Rolling_inBox>ul').animate({left:-moveCount},500);
				movePoint += 1;
			};
		};
		//오른쪽으로 이동
		function eventRightMove(){
			if(rolingWidth < prodImgWidth && 0 < movePoint){
				pointMove = jQuery('.Gate_Rolling_inBox>ul>li').eq(movePoint-1).width();
				moveCount = moveCount - pointMove;
				jQuery('.Gate_Rolling_inBox>ul').animate({left:-moveCount},500);
				movePoint -= 1;
			};
		};
		// 전체 넓이 값 구하기
		function gatePageWidthCount(){
			var prodImgWidth =0;
			//                alert(PlanningLang);
			for(i=0;i<PlanningLang;i++){
				prodImgWidth += jQuery('.Gate_Rolling_inBox>ul>li').eq(i).width();
				jQuery('.Gate_Rolling_inBox>ul>li').eq(i).css('width',jQuery('.Gate_Rolling_inBox>ul>li').eq(i).width());
			};
			jQuery('.Gate_Rolling_inBox>ul').css('width',prodImgWidth);
		};
	};

	//수정GNB이벤트
	function allNewGnbEvent(){
		//1depth클릭
		jQuery('ul.depth01>li>a').on('click',function(){
			var onCa = jQuery(this).parent();
			if(onCa.attr('class').match('on')){
				onCa.removeClass('on');
				jQuery('.icon_gbArrow',this).text('닫기');
			}else{
				onCa.parent().find('li .icon_gbArrow').text('닫기');
				onCa.parent().find('li.on').removeClass('on');
				onCa.addClass('on');
				jQuery('.icon_gbArrow',this).text('펼치기');
			};
		});

		//탭메뉴클릭
		jQuery('ul.smart_depth01>li>a').on('click',function(){
			var owl_li = $(this).parent();

			if ( owl_li.hasClass('on')){  //2016-07-21 수정
				owl_li.removeClass('on');
			}else{
				jQuery(this).parent().parent().find('li.on').removeClass('on');
				jQuery(this).parent().addClass('on');
			}
		});

		//탭메뉴클릭
		jQuery('ul.gnb_menu_view>li>a').on('click',function(){
			var pat = jQuery(this).parent().parent();
			if(jQuery(this).parent().attr('class') != 'on'){
				pat.find('li.on').removeClass('on');
				jQuery(this).parent().addClass('on');
				var cnt = pat.find('li.on').index();
				pat.parent().find('.gnbMenuViewArea').hide();
				pat.parent().find('.gnbMenuViewArea').eq(cnt).show();
				//pat.parent().find('.depth01').hide();
			};
			// else{
			//     pat.find('li.on').removeClass('on');
			//     pat.parent().find('.gnbMenuViewArea').hide();
			//     //pat.parent().find('.depth01').show();
			// };
		});
	};


	// 글자크기 수정
	function fontSizeChange(){
		jQuery('.quick_font_size label').on('click',function(){
			var fontId = jQuery(this).attr("id");

			if(fontId == "small"){
				jQuery("#fontSize01").attr("checked","checked");
				jQuery("#fontSize02").removeAttr("checked");

				localStorage.zoom = "1";
				localStorage.wrapOver = "hidden";
				localStorage.bodyOver = "auto";

				jQuery("body").css("zoom",localStorage.getItem("zoom"));
				jQuery("#wrap").css("overflow-x",localStorage.getItem("wrapOver"));
				jQuery("body").css("overflow",localStorage.getItem("bodyOver"));

			}else if(fontId == "large"){

				jQuery("#fontSize01").removeAttr("checked");
				jQuery("#fontSize02").attr("checked","checked");

				localStorage.zoom = "1.2";
				localStorage.wrapOver = "auto";
				localStorage.bodyOver = "scroll";

				jQuery("body").css("zoom",localStorage.getItem("zoom"));
				jQuery("#wrap").css("overflow-x",localStorage.getItem("wrapOver"));
				jQuery("body").css("overflow",localStorage.getItem("bodyOver"));
			}
		});
	};

	//주소검색이벤트
	//셀렉트 선택에 따른 하위 폼 요소 변경 : ex. mfcn0104p.html
	function zipSchEvent(){
		jQuery('p.inp_search > select').on('change',function(){
			var cnt = jQuery('p.inp_search > select').val();
			var prt = jQuery('p.inp_search > select').parent().parent().parent();
			prt.find('div.hiddenBox').hide();
			switch(cnt){
				case '1':
					prt.find('.hiddenBox.case1').show();
				break;

				case '2':
					prt.find('.hiddenBox.case2').show();
				break;

				case '3':
					prt.find('.hiddenBox.case3').show();
				break;
			};
		});
	};

	//[Folding] 상세화면 Q&A 열기/닫기 - (2017 고도화 작업 - 접근성수정)
	/*function prodQnaOpenClose(){
		jQuery('.Product_Qna dl dt a').bind('click',function(){
			//        alert();
			var prod_areaDD = jQuery(this).parent().parent();
			if(prod_areaDD.attr('class') == 'on'){
				prod_areaDD.removeClass('on');
				jQuery(this).find('span.Ic').text('펼치기');
			}else{
				prod_areaDD.addClass('on');
				jQuery(this).find('span.Ic').text('닫기');
			};
		});
	};*/
	function prodQnaOpenClose(){
		var $target = $('.Product_Qna dl dt a');
		if($target.length){
			$target.each(function(){
				var $a = $(this);
				var $con = $(this).parent().parent();

				if($con.hasClass('on')) {
					$a.find('span.Ic').text('접기');
				} else {
					$a.find('span.Ic').text('펼치기');
				}

				$a.on('click',function(){
					var prod_areaDD = $(this).parent().parent();
					if(prod_areaDD.attr('class') == 'on'){
						prod_areaDD.removeClass('on');
						$(this).find('span.Ic').text('펼치기');
					}else{
						prod_areaDD.addClass('on');
						$(this).find('span.Ic').text('접기');
					};
				});
			});
		}
	};



	// 코칭페이지
	function coachPageEvent(){
		var el = document.querySelector("div.coach_area");
		var mc = new Hammer(el,{touchAction: 'auto'});
		mc.get('pinch').set({ enable: true });
		//        alert('mainMenu');
		coachPageWidthCount(); //코칭페이지 전체 넓이 값 구하기
		var warpWidth = jQuery('div.coach_area').width(); //전체 넓이
		var gnbWidth = jQuery('div.coach_area ul').width(); //메뉴전체 넓이

		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				//                    alert(ev.deltaX);
				if(ev.deltaX<-1){
					//gnb왼쪽
					//                   alert('leftMove');
					if(warpWidth < gnbWidth && (gnbWidth - warpWidth) > moveCount){
						if(gnbWidth - warpWidth > warpWidth && warpWidth  < (gnbWidth - moveCount)-warpWidth){
							pointMove = warpWidth;
						}else{
							pointMove = (gnbWidth - moveCount)-warpWidth;
						};
						moveCount = moveCount + pointMove;
						jQuery('div.coach_area ul').animate({left:-moveCount},500);
						movePoint += 1;
						jQuery('div.coach_area .coach_pg a').removeClass('on');
						jQuery('div.coach_area .coach_pg a').eq(movePoint).addClass('on');
						jQuery('div.coach_area .coach_pg a').attr('title','')
						jQuery('div.coach_area .coach_pg a').eq(movePoint).attr('title','현재 보이는 단계입니다.')
					};
				}else if(ev.deltaX>1){
					//gnb오른쪽
					if(warpWidth < gnbWidth && 0 < moveCount){
						if(moveCount  > warpWidth - moveCount){
							pointMove = warpWidth;
						}else{
							pointMove = moveCount;
						};
						moveCount = moveCount - pointMove;
						jQuery('div.coach_area ul').animate({left:-moveCount},500);
						movePoint -= 1;
						jQuery('div.coach_area .coach_pg a').removeClass('on');
						jQuery('div.coach_area .coach_pg a').eq(movePoint).addClass('on');
						jQuery('div.coach_area .coach_pg a').attr('title','')
						jQuery('div.coach_area .coach_pg a').eq(movePoint).attr('title','현재 보이는 단계입니다.')
					};
				};
			};
		});

		//코칭페이지 전체 넓이 값 구하기
		function coachPageWidthCount(){
			var liLang = jQuery('div.coach_area ul>li').length;
			var gnbWidth =0;
			for(i=0;i<liLang;i++){
				gnbWidth += jQuery('div.coach_area ul>li').eq(i).outerWidth();
				jQuery('div.coach_area ul>li').eq(i).css('width',jQuery('div.coach_area ul>li').eq(i).width());
			};
			jQuery('div.coach_area ul').css('width',gnbWidth+1);

		};
	};

	// MY 금융센터 스왑롤링 페이지 2016-05-26
	function topMenu2(){
		var el = document.querySelector("#myroll");
		var elm = jQuery("#myroll");
		var topWrap  = elm.parent().parent();
		var liLang = jQuery('#myroll>li').length;
		var liWidth = elm.parent().width();
		liWidth = liWidth*0.333;
		var mc = new Hammer(el,{touchAction: 'auto'});
		// mc.get('pinch').set({ enable: true });
		//          alert('mainMenu');
		elm.children('li').css('width',liWidth);
		elm.css('width',liWidth * liLang);
		var warpWidth = elm.parent().width(); //전체 넓이
		var gnbWidth = elm.width(); //메뉴전체 넓이
		var gnbLeft = elm.css('left');
		var movePoint = 0; //현재위치
		var moveCount = 0; //전체움직인거리
		var pointMove = 0; //현재움직일거리
		var pageLeng = Math.ceil(liLang / 3); // 한화면에 보이는 li 갯수 : 3
		var page = topWrap.children('.pager').children('a');

		// console.log(gnbLeft);
		for (i=0; i< pageLeng;i++){
			if (i == 0){topWrap.children('.pager').append('<a href="#none" class="activated">'+(i+1)+'</a>')}
			else {topWrap.children('.pager').append('<a href="#none">'+(i+1)+'</a>')}
		}

		mc.on("hammer.input", function(ev) {
			if(ev.srcEvent.type == 'touchmove' || ev.srcEvent.type == 'mousemove'){
				ev.deltaX = ev.deltaX + gnbLeft + moveCount;
				// console.log(gnbLeft+' : '+moveCount)
			}else if(ev.srcEvent.type == 'touchend' || ev.srcEvent.type == 'mouseup'){
				moveCount = moveCount + ev.deltaX;

				if(moveCount > 0){
					moveCount = 0;
					elm.animate({left:moveCount});
					topWrap.children('.pager').children('a').removeClass('activated');
					topWrap.children('.pager').children('a').eq(0).addClass('activated');
				}else if(moveCount < warpWidth - gnbWidth){
					moveCount = warpWidth - gnbWidth;

					topWrap.children('.pager').children('a').removeClass('activated');
					topWrap.children('.pager').children('a').eq(-1).addClass('activated');

				}else{
					var p;
					p = Math.ceil(moveCount / (-1*pageLeng*liWidth));
					elm.animate({left:p*(-1*pageLeng*liWidth)},300);

					topWrap.children('.pager').children('a').removeClass('activated');
					topWrap.children('.pager').children('a').eq(p).addClass('activated');
				};
			};
		});

		topWrap.children('.pager').children('a').click(function(e){
			var owl = jQuery(this);
			var num = parseInt(owl.text());
			num = num - 1;

			if (owl.hasClass('activated')){return;}

			owl.siblings('a').removeClass('activated');
			owl.addClass('activated');

			elm.animate({left:num*(-1*pageLeng*liWidth)},300);
		});
	};

	// 레이어 뒷 배경 스크롤 막기/풀기 2016-07-06 최원혁 추가
	function sortingCtrl(){
		$('a.etcMymenu').click(function(){
			$('html,body').css('overflow','hidden');
		});
		$('a.productPopClose').click(function(){
			$('html,body').removeAttr('style');
		});
		$('.sorting_btn').click(function(){
			$('.submenu_sorting_box ').css('display','block');
		});
		$('.sorting_layer .sorting_close , .sorting_layer li a').click(function(){
			$('.submenu_sorting_box ').removeAttr('style');
			$(window).scrollTop(0);
		});
	}

	// 맞춤검색 팝업 닫기 2016-07-21 최원혁 추가
	function searchLyClose(){
		$('.item_search_warp').find($('.btn_close')).click(function(){
			$('.item_search_warp').hide();
		})
	}





/* =================================================================================
* 2017 고도화 작업 (선오픈)
* ==================================================================================
*/

/**
* 요건번호 : SM041 , SM042
* 연금펀드비교공시 Tab 오류 (alopex-scroll - 선택된 탭 화면에 보이기)
* -----------------------------------------
* [Local PC 모바일 확인시]
* - alopex-ui-2.1.js
* 	Line:2134  주석처리 //throw new Error('[makeScrollable] ' + e); or
* 	Line:2082  변경 후 테스트//if (window.browser == '')
*-------------------------------------------
* [MarkUp 수정]
* - data-type="panel" data-scroll="true  삭제
* - position: relative; overflow-x: scroll; overflow-y: auto;  style 추가 or tabRollingBox() 호출
*-------------------------------------------
* [참고 pub ID] 
* - mfpd0741.html,mfpd0620.html, mfpd0600.html ...
*/
//개발단 전달 테스트 소스 (주의 : 일괄적용됨)
/*
$(document).ready( function() {
	var tabRollingBox_test= (function(){
		var $box = $('.tab_RolingBox');
		if($box.length){
			var $btnWrap = $box.find('.tab_RolingBtn');
			var setW = $btnWrap.find('a').size() * 150 + 24;
			var goLeft = $box.find('a.on').offset().left -12;
			$box.removeAttr('style');
			$box.attr('style', 'position: relative; overflow-x: scroll; overflow-y: auto;');
			$btnWrap.css('width', setW);
			$box.scrollLeft(goLeft);
		}
	})();
});
*/
//Pub단 호출 소스(페이지 적용)
function tabRollingBox(){
	var $box = $('.tab_RolingBox');
	var $btnWrap = $box.find('.tab_RolingBtn');
	var setW = $btnWrap.find('a').size() * 150 + 24;
	var goLeft = $box.find('a.on').offset().left -12;
	$box.removeAttr('style');
	$box.attr('style', 'position: relative; overflow-x: scroll; overflow-y: auto;');
	$btnWrap.css('width', setW);
	$box.scrollLeft(goLeft);
}



//선택된 수정불가상태의 체크박스 스타일 모바일웹대응 (7월14일 선오픈)
function chk_disabled(){
	$('input[type="checkbox"]').each(function(){
		var $chk = $(this);
		if($chk.attr('checked') == "checked" && $chk.attr('disabled') == "disabled" ){
			$chk.addClass('chk_disabled');
		}
	});
}





