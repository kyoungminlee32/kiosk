/* 2018-11-20 [오나경] 상담톡 android 에서 이벤트이슈가 있어 분기처리 함 */
$(document).on("ready", function(){
	if(common_getDevDevice() != "PC"){
		if(OF.exeStatus == 3 && nfilterScroll.device_os_version < 19){ //ANDROID
			$(document).off("click",".btnChatM").on("click",".btnChatM",function(){
				console.log('안드로이드');
				$(".chatMenu").slideToggle('fast',function(){
					if($(this).css('display') == 'block'){
						$(".chatCont").css("padding-bottom", "60px");
						HashSwipeController();
					} else {
						$(".chatCont").css("padding-bottom", "20px");
					}
				});
			});
		} else {
			$(document).off("tap",".btnChatM").on("tap",".btnChatM",function(){
				console.log('ios');
				$(".chatMenu").slideToggle('fast',function(){
					if($(this).css('display') == 'block'){
						$(".chatCont").css("padding-bottom", "60px");
						HashSwipeController();
					} else {
						$(".chatCont").css("padding-bottom", "20px");
					}
				});
			});
		}
	}
});
/* 2018-11-20 [오나경] end */

$(function(){
	txtChatBtnController(); // 상담톡 함수 호출
	common_ui_swipe(); // 스와이프 함수 호출

	$(document).ready(function(){
		// 2018-11-22 [오병직] 공통 : input 의 reset 버튼 관련하여 input type 세분화
		//인풋에 벨류값이 있을때 리셋 버튼 block 처리
		$("input").each(function(i){
			if($(this).val().length > 0){
				var inputAttr = $("input").attr('type');
				if(inputAttr != "hidden"){
					$("input").eq(i).nextAll(".btnReset").css("display","block");
				}
			}
		});
		// 2018-11-22 [오병직] end
		$('.useCer').find('a.link').attr({'role':'button','title':'자세히 보기'});
		$(".mainAllMenu .more").attr({"role": "button","aria-expanded":"false"});
		$(".mainAllMenu .dep1 > li > a").attr({"role":"button","aria-expanded":"false"});/*2018-11-06 [양미선] 전체메뉴 > 메뉴모두보기 > title 두번 읽힘 삭제*/
		$('.myBtnOpen').attr({"role": "button","aria-expanded":"true"})/*2018-11-09 [양미선] 마이페이지 최근 본 상품 열고 닫기 접근성 추가*/
		/*2018-11-12 [양미선] 마이페이지 최근 본 상품 열고 닫기 접근성 추가*/
		if($('.myBtnOpen').hasClass('active')){
			$('.myBtnOpen').attr({"aria-expanded":"false"});
		}
		/*2018-11-12 [양미선] end*/
		
		/*접근성*/
		$('.areaBtnPrice .inner , .areaBtnDefault , .areaBtnType02 , .areaBtnType01 , .bankListWrap , .popBtnWrap , .areaBodyBtnFull , .btnMoreWrap , .loginNoticeBtn').find('a').attr('role','button');/*2018-11-14 [양미선] 접근성 불필요 클래스 삭제*/
		$('.productList').attr('role','list').find('>li').attr('role','listitem');
		$('.automaticList').find('a').attr('role','button');/* 2018-11-20 [양미선] 접근성 고객센터>새소식 paging관련 button 추가 - 개발에서 처리 */
		$('.toggleBtn , .btnReset , .roungeCmsWrap .conTypeWrap .box').attr('role','button');/* 2018-11-09 [양미선] NH라운지 : 접근성 role button 추가*/
		$('.accountList .accCont , .userInfo , .loginBot').find('a').attr('role','button');/* 2018-11-12 [양미선] 로그인 : 이전 다음 버튼 role button 추가*/
		$('.selectArea').find('a').first().attr({'aria-haspopup':'true'});/*2018-11-19 [양미선] 접근성 불필요한 태그 삭제*/
		$('.tabLv0, .tabLv1, .tabLv2 , .menuWrap').find('ul').attr({'role':'tablist'}).find('li').attr('role','presentaion').find('a').attr('role','tab');/*2018-11-09 [양미선] Nh라운지:탭메뉴 접근성 다르게 읽혀지는거 방지하기 위해 role presentaion 추가 */
		$('.stList').find('a').attr({'aria-haspopup':'true'});/*2018-11-19 [양미선] 불필요한  접근성 태그 삭제*/
		$('.loginCer ,.btnReset ,.btnCalendar').attr('role','button');
		/*$('.toggleBox1 .accListBtn a').attr('aria-expanded','false');2018-11-27[양미선] 이체>이체결과조회>즉시이체 아코디언 버튼 열림 닫힘 초기값 추가 삭제 */

		$('.header').find('h1').find('a').attr('role','text');/*2018-11-15 [양미선] 접근성 공통 수정*/
		
		$('.bigaccountList').find('.bigdealDate').find('.btnwithdInfo').attr('aria-expanded','true');

		$('.menuDepth02 .depth > a').attr('aria-expanded','false');/*2018-11-28 [양미선] 접근성 전체 메뉴 열림 닫침 초기값 추가*/

		/*전체 메뉴 아코디언 관련 접근성  2018-11-27 [접근성] 수정 삭제
		$('.menuDepth02 .depth > a:not(.menuBigfont)').attr('aria-expanded','false');
		$('.menuDepth02 .depth > a:not(.menuBigfont)').on('click',function(){
			var selected = $(this).attr('aria-expanded');
			if(selected === 'true'){
				$(this).attr('aria-expanded','false');
			}else{
				$(this).attr('aria-expanded','true');
			}
		});

		$('.menuDepth01 .menu1-04 > a').on('click',function(){
			if($('.menuDepth02').find('.menu1-04').parent().is(':visible')){
				$('.menuBigfont').addClass('active').attr('aria-expanded','true');
			}
		});
		/*전체 메뉴 아코디언 관련 접근성  2018-11-27 [접근성] 수정 삭제 end*/

		$('.toggleWrap').find('a.toggleBtn').attr({'aria-expanded':'false'});
		$('.toggleWrap').find('.toggleBtn').on('click',function(){
			var selected = $(this).attr('aria-expanded');
			if((selected === 'true') || ($(this).hasClass('active'))){
				$(this).attr({'aria-expanded':'false'});/*2018-11-12 [양미선] 접근성 불필요한 태그 삭제*/
			}else{
				$(this).attr({'aria-expanded':'true'});/*2018-11-12 [양미선] 접근성 불필요한 태그 삭제*/
			}	
		});
		/* 영업점 지도 불러들일경우 html 높이값 100% */
		if($('.branchOfficeWrap, .bgView').hasClass('h100p')){
			$('html').addClass('w100p');
		}

		// 2018-11-06 [양미선] 통합메인:주거래 설정 타이틀 추가 , 스와이프 인디게이트 타이틀 선택됨 추가
		if ($(".majorBtn").length > 0) {
			$('.majorBtn').attr('title','주거래 설정하기');
		}
		if($('.swiper-pagination-bullet-active').length > 0){
			$('.swiper-pagination-bullet-active').attr('title','선택됨');
		}
		$('.swiper-pagination .swiper-pagination-bullet').on('click',function(){
			$(this).addClass('.swiper-pagination-bullet-active').attr('title','선택됨');
			$(this).addClass('.swiper-pagination-bullet-active').siblings().attr('title','');
		});


		

		// 2018-11-06 [양미선]  end
	});

	/*  2018-11-20 [오나경] 이벤트 분기태워서 처리하기 위해 해당 소스는 주석처리함.
	$(document).off("tap",".btnChatM").on("tap",".btnChatM",function(){

		$(".chatMenu").slideToggle('fast',function(){
			if($(this).css('display') == 'block'){
				$(".chatCont").css("padding-bottom", "60px");
				HashSwipeController();
			} else {
				$(".chatCont").css("padding-bottom", "20px");
			}
		});
	});
*/

	// 상담톡/운세 높이 측정 스크립트
	if ($(".chatCont").length > 0) {
		if ($(".chatCont").closest(".container").hasClass("lucky")) {
			$(".chatCont").height("auto");
		} else {
			//$(".chatCont").height($(window).height() - 128);
		}
	}

	// input reset btn Event
	 var $ipt = $('.inputList input'),
        $clearIpt = $('.btnReset'),
		$unit = $('.unit'),
		$btnSearch = $('.btnSearch');

	//팝업 input reset 버튼 show hide
	$(document).off('keyup','.inputList > input').on('keyup','.inputList > input',function(e){
		$(this).nextAll(".btnReset").toggle(Boolean($(this).val()));
	})

	//리셋버튼 클릭이벤트 (리셋버튼 클릭시 벨류값 초기화 및 해당 인풋 포커스 이동)
	$(document).off("click",".btnReset").on("click",".btnReset",function(){
		$(this).prevAll('input').val('').focus();
		$(this).prevAll('input').trigger('change');
        $(this).hide();
	});

    $(window).scroll(function(event) {
        didScroll = true;
		if ($("html").hasClass("w100p")) {
			didScroll = false;
		}
    });

	// 컨텐츠에 탭이 있는 경우 탭 제목 <strong>탭 제목</strong>으로 생성
	if($(".container").find(".tabLv0").length >= 1){
		var TabTxt= $(".tabLv0").find("a.active > span").html();
		var $Strong = $("<strong class='tabStrong'>"+TabTxt+" 탭 화면"+"</strong>");
		$(".tabLv0").after($Strong);
	}
	
	// 2018-11-26 [오병직] 메인 상단 탑 버튼 추가로 인한 js수정
    var $scrollTop = $('.btnTop, .mainBtnTop');
    if($scrollTop.scrollTop() < 50){
        $scrollTop.hide();
        $scrollTop.stop().animate({opacity:0},300);
    }
	// 2018-11-26 [오병직] end

	// 2018-10-18 [오병직] 공통적용 TOP버튼 위치값 고정으로 변경
   $(window).scroll( function() {
        if ( $(this).scrollTop() > 50 ) {
            $scrollTop.css("display","inline-block");
            $scrollTop.stop().animate({opacity:1});
        } else {
            $scrollTop.stop().animate({opacity:0},{
                duration: 300,
                specialEasing: {
                    height: "linear",
                    width: "easeOutBounce"
                },
                complete: function() {
                    $scrollTop.hide();
                }
            },300);
        }
		
		// 2018-11-26 [오병직] 메인 상단 탑 버튼 추가로 인한 js수정
		// 2018-10-22 [오병직] 탑 스크롤 버튼위치변경 (하단버튼 유무 판단으로 스크롤 버튼의 위치값 변경)
		var $areaBtmQuick = $(".areaBtmQuick");
		var $areaBtnDefault = $(".areaBtnDefault,.mainAreaBtnDefault");
		var $mainAreaBtnDefault = $(".mainAreaBtnDefault");
		var $mainAreaBtmQuick = $(".mainAreaBtmQuick");
		var $bottomBtnArea = $("#bottomBtnArea");
		if($areaBtnDefault.css("display") == "table"){
			if($bottomBtnArea.css("display") == "none"){
				$areaBtmQuick.css("bottom","58px"); 
				$mainAreaBtmQuick.css("bottom","118px");
			}else{
				$areaBtmQuick.css("bottom","98px");}
				$mainAreaBtmQuick.css("bottom","168px");
		}else{
			$areaBtmQuick.css("bottom","58px");
			$mainAreaBtmQuick.css("bottom","118px");
		}
		// 2018-10-22 [오병직] end
		// 2018-11-26 [오병직] end
    });

	// 2018-11-26 [오병직] 메인 상단 탑 버튼 추가로 인한 js수정
	//탑 버튼 클릭시 화면 상단으로 이동
	$(document).off("click",".btnTop, .mainBtnTop").on("click",".btnTop, .mainBtnTop",function(){
	   $( 'html, body' ).animate( { scrollTop : 0 }, 200 );
        return false;
	});
	// 2018-11-26 [오병직] end

	// 토글버튼 안에 버튼이 있을경우 토글버튼 막기
	$(document).off("click",".toggleBtn button").on("click",".toggleBtn button",function(e){
        e.stopPropagation();
	});

	// 출금 계좌관리 취소버튼 클릭시 해당영역 슬라이드 업 효과
	$(document).off("click",".toggleBtnUp").on("click",".toggleBtnUp",function(){
		$(this).parents().closest(".toggleWrap").find(".toggleCont").slideUp('fast');
	});

	// 2018-10-15 [오병직] 계좌관리(별칭) 관리 스크립트 기능 추가 
	$('.nickBtn').attr({'role':'button','title':'상세열림'});/*2018-10-30 [양미선] 접근성: voiceover로 접근시 토글 버튼으로 변경해야지 열림 닫힘으로 됨(ios 에러) */
	$(document).off("click",".nickBtn").on("click",".nickBtn",function(e){
		if($(this).parent().next(".detailList").find(".nickCont").css("display") == "list-item"){
			$(this).parent().next(".detailList").find(".nickCont").hide();
			$(this).removeClass("active").attr('title','상세열림');
		}else{
			$(this).parent().next(".detailList").find(".nickCont").show();
			$(this).addClass("active").attr('title','상세닫힘');
		}
	});

	// 토글버튼 slideToggle 처리
	$(document).off("click",".toggleBtn").on("click",".toggleBtn",function(){
	/* Toggle Button*/
	var $toggleBtn = $(".toggleBtn"),
         $toggleWrap = $(".toggleWrap"),
         $toggleCont = $(".toggleCont"),
         $toggleTxt = $(".toggleTxt");
		 $(this).attr('aria-expanded','true');/*2018-11-05 [양미선] 자주질문하는 FAQ : 토글 버튼 펼침 접힘 접근성 추가*/
		// 아코디언 기능 (선택한 페이지를 열었을때 나머지 열려있는 페이지를 닫음)
		if($(this).parents().closest(".listToggle").length == 1){
			$toggleCont.slideUp("fast");
			$toggleBtn.removeClass("less active");
			//$toggleBtn.attr("title","상세 닫힘");/* 2018-10-31 [양미선] 맞춤계좌 관리 개발에서 타이틀 넣어줘서 접근성 삭제*/
			if ($(this).next(".toggleCont").css("display") == "block"){
				$(this).parents().closest($toggleWrap).find($toggleBtn).removeClass("active");
				$(this).parents().closest($toggleWrap).find($toggleBtn).removeClass("less");
				$(this).parents().closest($toggleWrap).find($toggleTxt).text("보기");
			}else{
				if($(this).parents().next(".toggleCont").css('display') == "block"){
					$(this).parents().closest($toggleWrap).find($toggleCont).slideUp('fast');
					$(this).parents().closest($toggleWrap).find($toggleBtn).removeClass("active");
					$(this).parents().closest($toggleWrap).find($toggleBtn).removeClass("less");
					$(this).parents().closest($toggleWrap).find($toggleTxt).text("열기");
					//$(this).parents().closest($toggleWrap).find($toggleBtn).attr("title","상세 닫힘");/* 2018-10-31 [양미선] 맞춤계좌 관리 개발에서 타이틀 넣어줘서 접근성 삭제*/
				}else{
					$(this).parents().closest($toggleWrap).find($toggleCont).slideDown('fast');
					$(this).parents().closest($toggleWrap).find($toggleBtn).addClass("active");
					$(this).parents().closest($toggleWrap).find($toggleBtn).addClass("less");
					$(this).parents().closest($toggleWrap).find($toggleTxt).text("닫기");
					//$(this).parents().closest($toggleWrap).find($toggleBtn).attr("title","상세 열림");/* 2018-10-31 [양미선] 맞춤계좌 관리 개발에서 타이틀 넣어줘서 접근성 삭제*/
				}
			}
		}else{
			// 아코디언 기능 (선택한 페이지 열고 닫음)
			if ($(this).closest(".toggleWrap").find(".toggleCont").css("display") == "block"){
				$(this).parents().closest($toggleWrap).find($toggleCont).slideUp('fast');
				$(this).parents().closest(".toggleWrap").find(".toggleBtn").removeClass("active");
				$(this).parents().closest(".toggleWrap").find(".toggleBtn").removeClass("less");
				$(this).parents().closest(".toggleWrap").find(".toggleTxt").text("보기");
				$(this).attr('aria-expanded','false');/*2018-11-05 [양미선] 자주질문하는 FAQ : 토글 버튼 펼침 접힘 접근성 추가*/
			}else{
				$(this).parents().closest($toggleWrap).find($toggleCont).slideDown('fast', function() {
					// 마케팅수신동의 팝업 토글버튼 scroll 처리 (개발요청으로 인해 공통 스크립트에 작업)
					if ($(this).parents().is("#NSCN0009P")) {
						console.log(1);
						$(".popCont").scrollTop(300);
					}
				});
				$(this).parents().closest(".toggleWrap").find(".toggleBtn").addClass("active");
				$(this).parents().closest(".toggleWrap").find(".toggleBtn").addClass("less");
				$(this).parents().closest(".toggleWrap").find(".toggleTxt").text("닫기");
				//$(this).parents().closest(".toggleWrap").find(".toggleBtn").attr('title','닫힘');/*2018-10-22 [양미선] 아코디언접근성 수정*/
				$(this).attr('aria-expanded','true');/*2018-11-05 [양미선] 자주질문하는 FAQ : 토글 버튼 펼침 접힘 접근성 추가*/
			};
		}
	});

	// 2018-10-23 [오병직] 큰글뱅킹 조회설정 버튼 스크롤탑 기능 추가
	$(document).off("click",".quickTop").on("click",".quickTop",function(){
		scrollTopFunc();
	});

    /* productList select */
    var $prodListBtnObj = $(".selectType div.link > a , .selectType a.link");
	$(document).off("click",".selectType div.link > a , .selectType a.link").on("click",".selectType div.link > a , .selectType a.link",function(){
		$('.productList li').removeClass('active');
		$(this).closest('li').addClass("active");
	});

	//accodian 메뉴
	$('.accordionMenu > ul > li > a').attr({'role':'button','aria-expanded':'false'});/* 2018-11-27 [양미선] 접근성: 아코디언 메뉴 첫번째에만 주기 */
	$(document).off("click",".accordionMenu ul li a").on("click",".accordionMenu ul li a",function(){
		//전체메뉴 클릭 이벤트
		if($(this).closest(".mainAllMenu").length == 1){
			//접근성 관련 메뉴 열기 닫기 title 속성 변경
			if($(this).next("ul").css("display") == "block"){
				$(this).attr({"aria-expanded":"false"});/*2018-10-26 [양미선] 접근성 이중으로 읽어줘서 타이틀 제거*/
			} else {
				$(this).attr({"aria-expanded":"true"});/*2018-10-26 [양미선] 접근성 이중으로 읽어줘서 타이틀 제거*/
			}
			if ($(this).parent().parent().hasClass("dep1")){
				if ($(this).next("ul").css('display') === 'block') {
					$(this).next("ul").slideUp("fast");
					$(this).removeClass("active");
				} else {
					$(".accordionMenu .dep2").slideUp("fast");
					$(".accordionMenu .dep1 > li > a").removeClass("active").attr('aria-expanded','false');/*2018-11-28 [양미선] 아코디언 메뉴 접힘 펼침 추가*/
					$(this).next("ul").slideDown("fast");
					$(this).addClass("active").attr('aria-expanded','true');/*2018-11-28 [양미선] 아코디언 메뉴 접힘 펼침 추가*/
				}
			} else {
				if($(this).attr("class") == "more" || $(this).attr("class") == "more active"){
					var $thisClass = $(this).next("ul").attr("class");
					$("."+$thisClass).slideUp("fast");
					$("."+$thisClass).prev("a").removeClass("active");
					if($(this).next("ul").css("display")	== "block" ){
						$(this).next("ul").slideUp("fast"); 
						$(this).removeClass("active");
					} else {
						$(this).next("ul").slideDown("fast"); 
						$(this).addClass("active");
					}
				} 
				var msgToggle = $(this).closest(".messageToggle");
				if (msgToggle.hasClass("messageToggle")) {
					$(".accordionMenu .dep2 a").removeClass('active');
					$(this).addClass('active');
				} 
			}

		// 아코디언 메뉴 클릭 이벤트
		} else {
			if ($(this).parent().closest(".dep1"))
			{
				if ($(this).next("ul.dep2").css('display') === 'block') {
					$(this).next("ul.dep2").hide();
					$(this).attr({'aria-expanded':'false','role':'button'}).removeClass("active"); // 2018-10-19 [오병직] 접근성 축소 알림 기능 추가 롤버튼 추가
				} else {
					$(".accordionMenu .dep2").hide();
					$(this).next("ul.dep2").show();
					$(".accordionMenu .dep1 > li > a").removeClass("active");
					$(this).attr('aria-expanded','true').addClass("active"); // 2018-10-19 [오병직] 접근성 확장 알림 기능 추가
				}
			} else {
				$(this).next("ul").slideToggle(); 
				$(this).toggleClass("active");
				var msgToggle = $(this).closest(".messageToggle");
				if (msgToggle.hasClass("messageToggle")) {
					$(".accordionMenu .dep2 a").removeClass('active');
					$(this).addClass('active');
				} 
			}
		}
	});

	// 전체메뉴 이벤트
	$('.mainMenuTop > ul > li:first-child > a').attr('title','선택됨');

	// androidOnlyMenu 클래스 있을 경우 추가
	if ($(".mainMenuCont").length > 0) {
		$(".mainMenuCont .menuDepth01 > ul > li").each(function() {
			var obj = $(this);
			if (!androidMenu(obj)) {
				return false;
			}
		});
	}

	// 상단메뉴 클릭 시
	$(document).off("click",".mainMenuTop > ul > li > a").on("click",".mainMenuTop > ul > li > a",function(){
		var clickedIdx = $(".mainMenuTop > ul > li > a").index(this);
		var $mainMenuCont = $(".mainMenuCont ");
		$mainMenuCont.hide();
		$(".mainMenuTop > ul > li > a").removeClass("active");
		$(this).addClass("active");
		$mainMenuCont.eq(clickedIdx).show();
		$mainMenuCont.eq(clickedIdx).find(".menuDepth01 > ul > li > a").removeClass("active");
		$mainMenuCont.eq(clickedIdx).find(".menuDepth02 > div").hide();
		// androidOnlyMenu 클래스 있을 경우 추가
		$mainMenuCont.eq(clickedIdx).find(".menuDepth01 > ul > li").each(function() {
			var obj = $(this);
			if (!androidMenu(obj)) {
				return false;
			}
		});

		/*yms 추가 - 접근성*/
		if($(this).hasClass('active')){
			$(this).attr('title','선택됨');
		}
		/* 뱅킹 메뉴 예외처리 - 무조건 조회 메뉴로 보여지도록 */
		if ($(this).parent().hasClass("menuTop01")) {
			$(".menu1-02 > a").trigger("click");
		}
		// 무조건 인증센터부터 보여지도록 처리
		if ($(this).parent().hasClass("menuTop05")) {
			$(".menuDepthTab02 li:first-child a").trigger("click");
		}
	});

	/*2018-11-27 [접근성] NH이야기 좋아요 버튼*/	
	$(document).off('click','.cardItem .pressHeart').on('click','.cardItem .pressHeart' ,function(){
		if($(this).find('.cardHeart').hasClass('active')){
			$(this).attr('title','선택안됨');
		}else{
			$(this).attr('title','선택됨');
		}		
	});
	/*2018-11-27 [접근성] NH이야기 좋아요 버튼 end*/	

	// 좌측 메뉴 클릭 시 
	$(document).off("click",".menuDepth01 li a").on("click",".menuDepth01 li a",function(){
		$(".menuDepth01 li a").removeClass("active").attr('title','');/* 2018-11-07 [양미선] 전체메뉴 좌측 클릭시 선택됨 추가*/
		$(this).addClass("active").attr('title','선택됨');/* 2018-11-07 [양미선] 전체메뉴 좌측 클릭시 선택됨 추가*/
		menu = $(this).parent().attr("class");
		$(".menuDepth02 > div").hide();
		$("." + menu).show();
		// 큰글뱅킹 예외처리
		if ($(this).parent().hasClass("menu1-04")) {
			$(".menuDepth02 .menu1-04 > ul > li:nth-child(2) > a").removeClass("active");
			$(".menuDepth02 .menu1-04 > ul > li:nth-child(2) > a").addClass("active").attr('aria-expanded','true');
			$(".menuDepth02 .menu1-04 li:nth-child(2) a").next("ul").hide();
			$(".menuDepth02 .menu1-04 li:nth-child(2) a").next("ul").show();/*2018-10-22 [양미선] 접근성 삭제*/
		}
	});

	/* 전체메뉴 접근성 */
	if ($(".menuDepth02").length > 0) {
		$(".menuDepth02 .depth > a").attr("role", "button");
	}

	// 우측 메뉴 아코디언 처리
	$(document).off("click",".menuDepth02 .depth > a").on("click",".menuDepth02 .depth > a",function(){
		if ($(this).hasClass("active")) {
			$(this).next("ul").slideUp('fast');
			$(this).removeClass("active").attr('aria-expanded','false');/* 2018-11-28 [양미선] 전체메뉴 우측 메뉴 접음 펼침 추가*/
			// 2018-11-27 [오나경] 전체메뉴 > 큰글뱅킹 접근성 관련 수정
			if ($(this).next("ul").hasClass("bigfontPanel")) {
				$(this).attr('aria-expanded','false');
			}
			// 2018-11-27 [오나경] end
		} else {
			$(".menuDepth02 .depth > a").removeClass("active").next("ul").slideUp('fast');
			$(this).next("ul").slideDown('fast');
			$(this).addClass("active").attr('aria-expanded','true');/* 2018-11-28 [양미선] 전체메뉴 우측 메뉴 접음 펼침 추가*/
			// 2018-11-27 [오나경] 전체메뉴 > 큰글뱅킹 접근성 관련 수정
			if ($(this).next("ul").hasClass("bigfontPanel")) {
				$(this).attr('aria-expanded','true');
			}
			// 2018-11-27 [오나경] end
		}
	});
	
	//전체메뉴 탭 메뉴 이벤트
	$(document).off("click",".mallTab li a").on("click",".mallTab li a",function(){
		var target = $(this).closest(".mallTab"), 
		targetIndex = $(this).parent().index() + 1,
		$depth1 = $(".menuTab .menuDepth01 ul li a"),
		$depth1_firstLink = $(".menuTab .menuDepth01 ul li:first-child a"),
		$depth2 = $(".menuTab .menuDepth02 > div"),
		$depth2_first = $(".menuTab .menuDepth02 > div:first-child");
		$(".mallTab li a").removeClass("active");
		$(this).addClass("active");
		$depth1.removeClass("active");
		$depth1_firstLink.addClass("active");
		$depth2.hide();
		$depth2_first.show();
		// 상품몰 tab일 경우
		if (target.hasClass("menuDepthTab01")) {
			$(".menuTab01-1, .menuTab01-2").hide();
			$(".menuTab01-" + targetIndex).show();

			$(".menuTab01-" + targetIndex).find(".menuDepth01 > ul > li").each(function() {
				var obj = $(this);
				if (!androidMenu(obj)) {
					return false;
				}
			});
		}
		// 인증/보안 tab일 경우
		else if (target.hasClass("menuDepthTab02")) {
			$(".menuTab02-1, .menuTab02-2").hide();
			$(".menuTab02-" + targetIndex).show();
			/* 보안센터 메뉴 예외처리 - 무조건 보안센터의 전자금융사기예방서비스 메뉴로 보여지도록 */
			if ($(this).parent().index() == 1) {
				$(".menuTab02-2 .menu5-03 > a").trigger("click");
			} else if ($(this).parent().index() == 0) {
				$(".menuTab02-1 .menu5-02 > a").trigger("click");
			};

			$(".menuTab02-" + targetIndex).find(".menuDepth02 > ul > li").each(function() {
				var obj = $(this);
				if (!androidMenu(obj)) {
					return false;
				}
			});
		}
	});

	// 한 페이지 내 tabCont switch
	//$('.tabSwitchCont > div').first().show();
    $(document).off('click','.tabSwitch a').on('click','.tabSwitch a', function(){
        var objIdx = $(this).index();
		var objCont = $('.tabSwitchCont > div');
        $('.tabSwitch a').removeClass('active');
        $('.tabSwitchCont > div').hide();
         objCont.each(function () {
             objCont.eq(objIdx).show();
             return false;
            });
        $(this).addClass('active');
    });
	$('.tabContent .formWrap').first().show();

	// 큰글이체 탭 영역 클릭이벤트
    $(document).off('click','.areaBodyBtnSelect.bigFontWrap a').on('click','.areaBodyBtnSelect.bigFontWrap a', function(){
        var bidx = $(this).index();
        var tPanel = $(this).parent().next().find('.bigFontWrap');
        $('.areaBodyBtnSelect.bigFontWrap a').removeClass('active');
        $('.tabContent .formWrap').hide();
         tPanel.each(function () {
             tPanel.eq(bidx).show();
             return false;
            });
        $(this).addClass('active');
    });
    
	// 윈도우 스크롤시 큰글 이체 상단메뉴 슬라이드 업 다운 
    $(window).on('scroll', function () {
		var obj = $(".formWrap");
		if(obj.hasClass("bigFontWrap")){
			topViewFixed();
		}
    });

	// 고객상담전화 안내 리스트 클릭시 active 클래스 추가
    $(document).off('click','.flexContainer li').on('click','.flexContainer li', function () {
        $('.flexContainer li').removeClass('active');
        $(this).addClass('active');
    });

	/* 포커스 이동 */ 
	$(document).off('click','.toggleBox .accListBtn a').on('click','.toggleBox .accListBtn a', function(){
		$(this).attr('aria-expanded','true');/*2018-11-13 [양미선] 이체>이체결과조회>즉시이체 아코디언 버튼 열림 닫힘 추가*/
		var $togglePanel = $(this).parent().siblings(),
			$togglePanelV = $togglePanel.find('.wrapTblDefault');
		if ($togglePanel.css('display') ==='none') {
			$togglePanel.slideDown();
			$togglePanel.find('li').eq(0).find('a').focus();
			$(this).attr({'tabindex':'-1'}).addClass('active');
			if($togglePanelV.length > 0){
				$togglePanel.find('li').eq(0).find('a').blur();
				$togglePanel.find('.wrapTblDefault').prepend('<a href="#" class="addTag blind">조회상세보기</a>').find('a').focus();
			} else if($togglePanel.hasClass('pt0')){
				$togglePanel.children().eq(0).prepend('<a href="#" class="addTag blind">조회상세보기</a>').find('a').focus();
			}
		} else {
			$(this).parent().siblings().slideUp();
			$(this).removeClass('active');
			$('.addTag').remove();
			$(this).attr('aria-expanded','false');/*2018-11-13 [양미선] 이체>이체결과조회>즉시이체 아코디언 버튼 열림 닫힘 추가*/
		}
	});
	$(document).off('click','.toggleBtnetc').on('click','.toggleBtnetc', function(){
		$(this).attr('aria-expanded','true');/*2018-11-13 [양미선] 이체>이체결과조회>즉시이체 아코디언 버튼 열림 닫힘 추가*/
		var $togglelistPanel = $(this).parent().parent().prev();
		if ($togglelistPanel.css('display') ==='none') {
			$togglelistPanel.slideDown();
			$(this).attr('tabindex','-1').addClass('active');
			$togglelistPanel.find('.detailList').prepend('<a href="#" class="addTag blind">리스트 상세 보기</a>').find('a').focus();
		}else{
			$(this).parent().parent().prev().slideUp();
			$('.toggleBtnetc').removeClass('active');
			$('.addTag').remove();
			$(this).attr('aria-expanded','false');/*2018-11-13 [양미선] 이체>이체결과조회>즉시이체 아코디언 버튼 열림 닫힘 추가*/
		}
	});

	// 이체처리결과상태 리스트 첫번째 클래스 추가
	$('.btnwithdInfo').addClass('active');

	//아코디언 메뉴 클릭 이벤트 
	$(document).off('click','.addAccordMenu a').on('click','.addAccordMenu a', function () {
		$(".addServiceinner").slideUp("fast");
		$('.serviceaddList li').removeClass('active');
		if($(this).nextAll(".addServiceinner").css("display") == "block"){
			$(".addServiceinner").slideUp("fast");
			$(this).attr('title','상세열림');
		}else{
			$(this).nextAll(".addServiceinner").slideDown("fast");
			$(this).parent().addClass('active');
			$(this).attr('title','상세닫힘');
		}
	});

	// 달력 날짜 선택 
	if ($(".dateItem a").length > 0) {
		$(".dateItem a").each(function(i) {
			var targetTxt = $(".dateItem a").eq(i).text();
			$(".dateItem a").eq(i).attr('title', targetTxt + '일을 선택하고 해당 창을 닫습니다.');
		});
	}

	// select list 단일선택 -> 접근성관련 타이틀 추가
	if ($(".popCont .selectList li").length > 0) {
		$(".popCont .selectList li ,.popCont .accList li").each(function(i) {
			var targetTxt = $(this).eq(i).find('a').text();
			if($(this).hasClass('active')){
				$(this).eq(i).find('a').attr('title', targetTxt + '선택됨');
			}
		});
	}

	// 부가메뉴 열기
	$(document).off("click",".btnMore").on("click",".btnMore",function(){
		appendMenu($(this));
		return false;
	});

	// 부가메뉴 닫기
	$(document).off("click",".appendClose").on("click",".appendClose",function(){
		$(".appendMenu").hide();
		return false;
	});

	// 부가메뉴 리스트 클릭
	$(document).off("click",".appendMenu li a").on("click",".appendMenu li a",function(){
		$(".appendMenu").hide();
	});

	//출금계좌 전체 보기 버튼 실행 막기
	$(document).off("click",".accToggle a").on("click",".accToggle a",function(){
		return false;
	});

	// 계좌 전체보기 버튼 toogle;
	$(document).off("click",".accToggle2 a").on("click",".accToggle2 a",function(){
		var txt1 = "계좌 전체 보기";
		var txt2 = "상위 계좌만 보기";
		$(this).parent().addClass("active");
		if ($(this).hasClass("active")) {
			$(this).removeClass("active").text(txt1).attr('title', txt1);
		} else {
			$(this).addClass("active").text(txt2).attr('title', txt2);
		}
		return false;
	});

	//탭 메뉴 클릭 이벤트 
	$(document).off("click",".tabWrap ul li a").on("click",".tabWrap ul li a",function(){
		var $li = $(this).parent();
		var $li_index = $li.index();
		$(".tabWrap ul li a").removeClass("active");
		$(this).addClass("active");
		$(".tabContWrap .tabCont").hide();
		$(".tabContWrap .tabCont").eq($li_index).show();
	});
		
	//마이페이지 - 나만의스마트뱅킹 체크
	$(document).off("click",".picMyImg ul li a").on("click",".picMyImg ul li a",function(){
		target = $(this);
		if (!target.hasClass("active")) {
			$(".picMyImg ul li a").removeClass("active");
			target.addClass("active");
		}
	});

	$(document).off("click",".picMyBorder ul li a").on("click",".picMyBorder ul li a",function(){
		target = $(this);
		if (!target.hasClass("active")) {
			$(".picMyBorder ul li a").removeClass("active");
			target.addClass("active");
		}
	});

	//꿈 종류 선택 리스트 아코디언
	$(document).off("click",".dreamBtn").on("click",".dreamBtn",function(){
		$(".dreamBtn").attr("title","상세 메뉴 열림");
		var ClickedIdx = $(".dreamBtn").index(this);
		$(".dreamCont").slideUp("fast");
		$(".dreamBtn").removeClass("active");
		if($(this).closest(".dreaWrap").find(".dreamCont").css("display") == "block"){
			$(this).closest(".dreaWrap").find(".dreamCont").slideUp("fast");
			$(this).removeClass("active");
		}else{
			$(this).closest(".dreaWrap").find(".dreamCont").slideDown("fast");
			$(this).addClass("active");
			$(this).attr("title","상세 메뉴 닫힘");
			DreamMenuSwipeController(ClickedIdx);
		}
	});

	// 운세 아코디언 메뉴 스크립트 적용
	$(document).off("click",".luckyPopList li a").on("click",".luckyPopList li a",function(){
		if ($(this).next(".luckyPopCont").css("display") == "block") {
			$(".luckyPopCont").slideUp('fast');
			$(this).removeClass("active");
			$(this).attr("title", "상세내용 보기 열림");
		} else {
			$(".luckyPopCont").slideUp('fast');
			$(".luckyPopList li a").attr("title", "상세내용 보기 열림").removeClass("active");
			$(this).addClass("active").attr("title", "상세내용 보기 닫힘").next(".luckyPopCont").slideDown('fast');
		}
	});

	// 2018-10-29 [오병직]  계좌관리 > 자주 사용하는 계좌관리 클릭된 리스트가 상단으로 스크롤 이동 처리
	// 2018-11-02 [오병직]  계좌관리 > 자주 사용하는 계좌관리 클릭된 리스트가 상단으로 스크롤 이동 처리
	$(document).off("click",".accountSlideList > .toggleWrap a.toggleBtn").on("click",".accountSlideList > .toggleWrap a.toggleBtn",function(){
		var $toggleCont = $(".toggleCont");
		var _thisHeight = $(".productHeader").outerHeight();
		var HeaderHeight = $(".formWrap").outerHeight() + $(".areaBodyBtnFull").outerHeight();
		var clickedIdx = $(this).closest(".toggleWrap").index();
		$("body").animate({scrollTop:clickedIdx*_thisHeight+(HeaderHeight+61)},300);
	})
	// 2018-11-02 [오병직]  end
	// 2018-10-29 [오병직]  end

	$(document).off("click", ".btnFuncTip").on("click", ".btnFuncTip", function() {
		toolTip($(this));
		return false;
	});
});

//  푸터영역 show hide 
$(window).scroll(function(event) {
	didScroll = true;
});

// popup 기본 setting
function PopSet() {
	var mobileH =$(window).height();
	var slidePop = mobileH / 2;
	//var bankSet = mobileH * 0.65;
	var bankSet = mobileH * 0.22;
	//var bankSet = mobileH / 2;
	var btnArea = 44;
	var popTitH = 45;
	var slidePopBtn = slidePop + btnArea;
	var bankSetBtn = bankSet + btnArea;
	return {
		mobileH: mobileH, 
		slidePop: slidePop,
		btnArea: btnArea,
		popTitH: popTitH,
		slidePopBtn: slidePopBtn,
		bankSet: bankSet, 
		bankSetBtn: bankSetBtn
	};
}

/***********************************************************************************************************/
/* ### 슬라이드 형 
/* 1) select 형 = slidePopOption()
/* 2) confirm 형 = slidePopConfirm()
/* 3) 조회/이체 형 = bankSet()
/* 4) center 형 = popCenter()
/***********************************************************************************************************/
/* select 형 팝업 */
slidePopOption = function() {
	var layerPopSet = PopSet();
	var thisScrollY = $(window).scrollTop();
	scrollLock(thisScrollY);
	$(".slidePopOption").show();

	var $slideInner = $(".slidePopOption .popInner"),
		$slideCont = $(".slidePopOption .popCont");
	// 버튼 있는 경우
	var slideInnerH_btn = layerPopSet.slidePopBtn,
		slideContH_btn = layerPopSet.slidePopBtn - layerPopSet.btnArea - layerPopSet.popTitH;  
	// 버튼 없는 경우
	var slideInnerH_btnNo = layerPopSet.slidePop,
		slideContH_btnNo = layerPopSet.slidePop - layerPopSet.popTitH;

	if ($(".slidePopOption .popBtn").length > 0) {
		$slideInner.animate({height:slideInnerH_btn}, 200);
		$slideCont.height(slideContH_btn);
	} else {
		$slideInner.animate({height:slideInnerH_btnNo}, 200);
		$slideCont.height(slideContH_btnNo);
	}
}

/* confirm 형 팝업 */
slidePopConfirm = function() {
	var layerPopSet = PopSet();
	scrollLock();
	$(".slidePopConfirm").show();
	var confirmH = $(".slidePopConfirm .popCont").outerHeight();
	$(".slidePopConfirm .popInner").animate({height:confirmH + layerPopSet.btnArea + layerPopSet.popTitH}, 150);
}

/* 조회 및 이체용 팝업 */
bankSet = function(obj) {
	var layerPopSet = PopSet();
	//$(".bankSetWrap").show();
	var $this = $('#'+ obj);
	$this.show();
	scrollLock();
	var $bankSetBtn = $(".bankSetWrap .popBtn"), 
		$bankSetInner = $(".bankSetWrap .popInner"),
		$bankSetCont = $(".bankSetWrap .popCont"),
		$bankSetTit = $(".bankSetWrap .bankPopTit").height() + 21;
	// 팝업 높이가 mobile 높이 * 0.5 인 경우
	if ($(".bankSetWrap").hasClass("popH01")) {
		// 버튼 유무에 따른 높이 계산
		//if ($bankSetBtn.length > 0) {
		if ($bankSetBtn.is(':visible')) {
			$bankSetInner.animate({height:layerPopSet.slidePopBtn}, 200);
			$bankSetCont.height(layerPopSet.slidePopBtn - layerPopSet.btnArea - $bankSetTit);
		} else {
			$bankSetInner.animate({height:layerPopSet.slidePop}, 200);
			$bankSetCont.height(layerPopSet.slidePop - $bankSetTit);
		}
	}

	// 팝업 높이가 mobile 높이 * 0.65 인 경우
	if ($(".bankSetWrap").hasClass("popH02")) {
		// 버튼 유무에 따른 높이 계산
		//if ($bankSetBtn.length > 0 && $bankSetInner.("popCont02").display == "block") {
		if ($bankSetBtn.is(':visible')) {
			$bankSetInner.animate({height:layerPopSet.bankSetBtn}, 200);
			$bankSetCont.height(layerPopSet.bankSetBtn - layerPopSet.btnArea - $bankSetTit);
		} else {
			$bankSetInner.animate({height:layerPopSet.bankSet}, 200);
			$bankSetCont.height(layerPopSet.bankSet - $bankSetTit);
		}
	}
}

/* center 팝업 */
popCenter = function(){
	var layerPopSet = PopSet();
	var maxH = (layerPopSet.mobileH * 0.7);
	var maxTotalH = maxH - 94;
	scrollLock();
	// 최대 높이 지정
	var cTarget = $(".centerLayer .popInner");
	
	//cTarget.css("max-height", maxH);
	//cTarget.find(".popCont").css("max-height", maxTotalH);
	
	// center 팝업 열기
	$(".centerLayer").show();
	/*
	cTarget.css("bottom", Math.max(0, (($(window).height() - cTarget.outerHeight()) / 2)) + "px");
	cTarget.css("left", Math.max(0, (($(window).width() - cTarget.outerWidth()) / 2)) + "px");
	*/


	// 2018-10-31 [윤지현] 통합메인 정기공지팝업 높이관련 추가
	var cTargetNoti = $(".popInner.popInnerNotice");
	cTargetNoti.css("max-height",''); // 기존센터팝업 max-height 삭제
	cTargetNoti.find(".popCont").css("max-height",''); // 기존센터팝업 popCont max-height 삭제
	if (cTargetNoti.height() > $(window).height()*0.8){
		cTargetNoti.find('.oneImg > a> img').css({'height':$(window).height()*0.75, 'width':''}) //통이미지 사이즈에 따른 팝업높이 조절
	}
	cTargetNoti.css("bottom", Math.max(0, (($(window).height() - cTargetNoti.outerHeight()) / 2)) + "px");
	cTargetNoti.css("left", Math.max(0, (($(window).width() - cTargetNoti.outerWidth()) / 2)) + "px");
	// 2018-10-31 [윤지현] end
};

/* Full layer(툴팁용 포함) */
fullLayerPop = function(toolTip) {
	//scrollLock();
	$(".fullLayerPop").show();
	$(".toolTip").hide();
	//fullLayerHeight();
};

/* 작은 툴팁(기본) */
toolTip = function(toolTip) {
	var thisScrollY = $(window).scrollTop();
	if ($(toolTip).parent().parent().prop("tagName").toLowerCase()  == "li") {
		var toolTipPop = $(toolTip).closest("li").find(".popWrap");
		var toolTipCont = toolTipPop.find(".popInner");
		
		if ($(toolTip).parent().parent().parent().find("accTit")) {
			$(toolTip).parent(".accTit").css("position", "static");
		} else {
			$(this).css("position", "relative");
		}
	} else {
		var toolTipPop = $(toolTip).closest("th").find(".popWrap");
		var toolTipCont = toolTipPop.find(".popInner");
	}

	toolTipPop.show();
	$(".dim").show();
	toolTipCont.css("top", Math.max(0, (($(window).height() - toolTipCont.outerHeight()) / 2) + $(window).scrollTop()) + "px");
	toolTipCont.css("left", Math.max(0, (($(window).width() - toolTipCont.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	toolTipCont.attr("tabindex", 0).focus();
	scrollLockToolTip(thisScrollY);
};

/* 부가메뉴 */
appendMenu = function(moreBtn) {
	var appendM = $(moreBtn).parent().find(".appendMenu");
	var appendMCont = appendM.find(".popInner");
	var appendM_li = appendM.find("ul > li:first-child a");
	$(".appendMenu").hide();
	appendM.show();
	appendM_li.attr("tabindex", 0).focus();
	fullLayerHeight();
};

/* Full Layer(툴팁용 포함) 높이 지정 */
fullLayerHeight = function() {
	var layerPopSet = PopSet();
	var fullTit = $(".fullLayerPop .popInner h1").height() + 21;  // full layer 팝업의 타이틀 높이
	var fullContPd = 17 ;  // full layer 팝업의 컨텐츠 padding
	 var fullTotal = layerPopSet.mobileH - fullTit - fullContPd - layerPopSet.btnArea;  // full layer 팝업 컨텐츠 높이 (하단 버튼 있는 경우)
	var fullTotal_noBtn = layerPopSet.mobileH - fullTit - fullContPd;  // full layer 팝업 컨텐츠 높이 (하단 버튼 없는 경우)
	if ($(".fullLayerPop .popBtn").length > 0) {
		$(".fullLayerPop > .popInner > .popCont").height(fullTotal);
	} else {
		$(".fullLayerPop > .popInner > .popCont").height(fullTotal_noBtn);
	}
};

/* close */
popClose = function(e) {
	scrollPosY = ($("body").css("top"));
	var $popWrap = $(e).closest(".popWrap");
	var $slidePopInner = $(".slidePopOption .popInner, .slidePopConfirm .popInner, .bankSetWrap .popInner");
	var $slidePop = $(".slidePopOption, .slidePopConfirm, .bankSetWrap");
	$(".dim").fadeOut(100);
	if ($popWrap.hasClass("slidePopOption") || $popWrap.hasClass("slidePopConfirm") || $popWrap.hasClass("bankSetWrap")) {
		$slidePopInner.animate({height:0}, 150, function(){
			$slidePop.hide();
		});
	} else {
		$(e).closest(".popWrap").hide();
	}
	scrollUnlock(scrollPosY);
};

/* 화면 back scroll 고정/해제 */
scrollLock = function(thisScrollY) {
	var layerPopSet = PopSet();
	$(".dim").fadeIn(100);
	$("body").css({'overflow':'hidden', 'position':'fixed', 'width':'100%'});
	$("body").css("top", -thisScrollY);
};

// 툴팁용 scroll 고정 (화면이 최상단으로 스크롤됨을 방지하기 위함)
scrollUnlock = function(scrollPosY) {
	var layerPopSet = PopSet();
	$("body").css({'overflow':'', 'position':'', 'width':''});
	scrollPosY = scrollPosY.replace('/[^0-9]/g',"");
	$(window).scrollTop(scrollPosY);
};

// 큰글 거래내역조회 조회설정 상단 고정
function topViewFixed() {
    var wTop = $(window).scrollTop();
    var vfbox = $('.bginnerColor').height();
    var vfHeight = 300;
    var moveCheckbox = $('.checkViewDate');
    if (vfbox <= wTop && wTop >= 300) {
        moveCheckbox.addClass('active');
    } else {
        $('.checkViewDate').removeClass('active');
    }
}

//2018-10-18 [양미선] 수정 큰글이체 열림 ,닫힘 접근성 추가
$(document).off("click",".bigFontWrap .bigdealDate .btnwithdInfo").on("click",".bigFontWrap .bigdealDate .btnwithdInfo",function(){
	var inputPanel = $(this).parent().next();
    if (inputPanel.css('display') == 'none') {
        $(this).attr('aria-expanded','true').addClass('active');
        inputPanel.slideDown('fast');
    } else {
        inputPanel.slideUp('fast');
        $(this).attr('aria-expanded','false').removeClass('active');
    }
});

/*큰글이체 reset*/
function inputFocus(t){
	var btnInput = $(t).parent().find('a');
	$(t).keyup(function(){
		var thisV = $(t).val().length;
		if(thisV >= 1){
			btnInput.addClass('active');
		}else if(thisV == 0)
			{
			btnInput.removeClass('active');
		}
	});
	$('.btnReset').on('click',function(){
		$(this).prev('input').val('').focus();
		$(this).prev('input').trigger('change');
		$(this).siblings().next().removeClass('active');
	});
}
// ============================================================== //
// ========================== 상담톡 스크립트 ========================= //
// ============================================================= //
function HashSwipeController(){
	var swiper = new Swiper('.chatMenu',{
		slidesPerView : 'auto',
		freeMode : true
	});
}

function ChatSwiperController(){
	var mySwiper = new Swiper('.chatSwipe' , {
		slidesPerView: 'auto',
		spaceBetween : 10, 
		mode:'horizontal',
		/* 2018-11-22 [오나경] 상담톡 접근성 관련 - 스와이프 focus 이슈가 발생하여 수정 */
		navigation : {
			nextEl : '.btn-transparent.swiper-button-next',
			prevEl : '.btn-transparent.swiper-button-prev'
		},
		/*2018-11-20 [양미선] 상담톡 스와이프 접근성 추가*/
		on : {
			init : function(){
				$(".chatSwipeWrap > .swiper-slide").attr('aria-hidden',true).attr('tabindex', 0);
				$(".chatSwipeWrap > .swiper-slide.swiper-slide-active").attr('aria-hidden', false);
			}, slideChangeTransitionEnd:function(){
				$(".chatSwipeWrap > li").attr('aria-hidden', true);
				$(".chatSwipeWrap > li.swiper-slide-active").attr('aria-hidden', false);
			}
		}
		/*2018-11-20 [양미선] 상담톡 스와이프 접근성 추가 end*/
		/* 2018-11-22 [오나경] end */
	});

}


// 인풋 텍스트 입력시 버튼 변경
function txtChatBtnController(){ 
	var $txtChat = $(".txtChat"),
		$btnVoice = $(".btnVoice"),
		$btnSend = $(".btnSend");
	$btnSend.hide();
	$txtChat.find("input").focus(function(){
		$btnVoice.hide();
		$btnSend.show();
	});
	$txtChat.find("input").blur(function(){
		if($txtChat.find("input").val().length <= 0){
			$btnVoice.show();
			$btnSend.hide();
		}else{
			$btnVoice.hide();
			$btnSend.show();
		}
	});
};

function btnChatVoice(chatContClass){
	$(".voiceChat").show();
	$(".voiceChat .voice01").slideDown(200);
};

function chatVoiceClose(){
	$(".voiceChat .voice01").slideUp(200, function() {
		$(".voiceChat").hide();
	});
}

function chatHelp(target) {
	var $chatList = $(".chatHelpList li a");
	$chatList.removeClass("active");
	$(target).addClass("active").attr('aria-expanded','false');/*2018-11-13 [양미선] 상담톡 아코디언 열기 닫기 접근성 추가 */
	if ($(target).next(".chatAnswer").css("display") == "block") {
		$(target).next(".chatAnswer").slideUp('fast');
		$chatList.removeClass("active");
	} else {
		$(".chatHelpList .chatAnswer").slideUp('fast');
		$(target).next(".chatAnswer").slideDown('fast');
		$(target).attr('aria-expanded','true');/*2018-11-13 [양미선] 상담톡 아코디언 열기 닫기 접근성 추가 */
	}
}

function scrollTopFunc(){
	$( 'html, body' ).animate( { scrollTop : 0 }, 500 );
}

// 상단 탭 스와이프 함수
function common_ui_swipe(){
	var $tabLv0 = $(".tabLv0"),
        tabLength = [];
    for(var j = 0; j < $tabLv0.length; j++){
        tabLength[j] = $tabLv0.eq(j).find("ul li").length;
        if(tabLength[j] < 5){
            $tabLv0.eq(j).find('.arrRgt').hide();
            $tabLv0.eq(j).find('.arrLft').hide();
        }
        if(tabLength[j] == 1) {
            $tabLv0.eq(j).find("ul li").css({'width':'100%'});
        } else if(tabLength[j] == 2){
            $tabLv0.eq(j).find("ul li").css({'width':'50%'});
        } else if(tabLength[j] == 3){
            $tabLv0.eq(j).find("ul li").css({'width':'33.33333333%'});
        } else if(tabLength[j] == 4){
            $tabLv0.eq(j).find("ul li").css({'width':'25%'});
        } else if(tabLength[j] == 5){
            $tabLv0.eq(j).find("ul li").css({'width':'20%'});
        }
        else if(tabLength[j] > 4){
            $tabLv0.eq(j).addClass("swiper-container");
            $tabLv0.eq(j).find("ul li").css({'width':'33.33333333%'});
            var sliders = [];
            $('.swiper-container').each(function(index, element){
                $(this).addClass('s'+index);
                $(this).find('.arrRgt').addClass('r'+index);
                $(this).find('.arrLft').addClass('l'+index);
                var slider = new Swiper('.s'+index, {
                    slidesPerView: 3,
                    navigation: {nextEl: '.r'+index,prevEl: '.l'+index}
                });
                sliders.push(slider);
            });
        }
    }
}

//토글(Show Hide) 클릭 이벤트
// 2018-10-19 [오병직] 계좌 직접입력(공통) 버튼(a 태그) 클래스 add,remove 기능
function ShowHideClick(name){
    if($("."+name).css("display") == "none"){
        $("."+name).slideDown('fast');/*2018-11-08 [양미선] 공통: 계좌 직접입력 열림 닫힘 title 삭제*/
		$("."+name).prevAll(".selectArea").find("a:first-child + a").addClass("active").attr('aria-expanded','true');/*2018-11-09 [양미선] 공통: 계좌 직접입력 입력 열림 닫힘 title 재수정*/
    }else{
        $("."+name).slideUp('fast');/*2018-11-08 [양미선] 공통: 계좌 직접입력 열림 닫힘 title 삭제*/
		$("."+name).prevAll(".selectArea").find("a:first-child + a").removeClass("active").attr('aria-expanded','false');/*2018-11-09 [양미선] 공통: 계좌 직접입력 입력 열림 닫힘 title 재수정*/
    }
}
// 2018-10-19 [오병직] end

// 두개 클래스 교차 Show Hide 클릭 이벤트
function CrossShowHideClick(name1,name2){
    $("."+name1).hide();
    $("."+name2).show();
}

function PopCloseController(e){
	$("."+e).hide();
}

function MyPopShowController(e){
	$("."+e).show();
	scrollLock();
}

function MyPopCloseController(e){
	$("."+e).hide();
	MyPopUnLock();
}

function MyPopUnLock(){
	var layerPopSet = PopSet();
	$("html, body").height("").css({"overflow":"", "position":""}); //2018-09-17[윤지현] 스크롤 position 추가
}

// 운세 결과 팝업
function PopShowController(e){
	$("."+e).show();
	var luckyPop = $(".luckyPop "),
		luckyPopWrap01 = $(".luckyPop01 .luckyPopWrap"),
		luckyPopWrap02 = $(".luckyPop02 .luckyPopWrap"),
		PopHeight01 = (luckyPopWrap01.find("ul").innerHeight()),
		PopHeight02 = (luckyPopWrap02.find("ul").innerHeight()),
		titleHeight = $(".luckyTitle").innerHeight(),
		luckyHeight;
	if(luckyPop.height()*0.7 > luckyPopWrap01.height()+titleHeight){
		luckyHeight = luckyPopWrap01.height()+titleHeight;
	}else{
		luckyHeight = luckyPop.height()*0.7;
	}
	luckyPopWrap01.css({
		"max-height":luckyHeight,
		"margin-top":-luckyHeight/2,
		"margin-left":-(luckyPop.find("ul").width())/2
	});
	luckyPopWrap02.css({
		"max-height":luckyPop.height()*0.7,
		"margin-top":-(luckyPop.height()*0.7)/2,
		"margin-left":-(luckyPop.find("ul").width())/2
	})
	luckyPopWrap01.find("ul").height(luckyPopWrap01.height());
}

// ============================================================== //
// ========================== 운세 스크립트 ========================= //
// ============================================================= //
// 운세 스와이프 스크립트
function LuckyMenuSwipeController(){
	var swiper = new Swiper('.luckyMenu',{
		slidesPerView : 'auto',
			freeMode : true
	})
}

// 운세 꿈종류 선택 스와이프 
function DreamMenuSwipeController(idx){
	var dreamMenu = $(".dreamMenu").eq(idx);
	var swiper = new Swiper(dreamMenu,{
		slidesPerView : 'auto',
			freeMode : true
	})
}

// 운세 전체메뉴
luckyAllMenu = function() {
	var menuH = $(window).height() * 0.6;
	var chatWrapH = $(".chatWrapInner").height();
	var menuAllH = menuH - chatWrapH;
	scrollLock();
	$(".luckyMenuSel").hide();
	$(".luckyMenuAll").toggle();
	if ($(".luckyMenuAll").css("display") == "block") {
		$(".chatWrap").height(menuH);
		$(".luckyMenuAll").height(menuAllH);
	} else {
		$(".chatWrap").height("");
		$(".luckyMenuAll").height("");
	}
}

// 처음으로/그만하기
baseMenu = function(target) {
	$(".baseMenu ul li a").removeClass("active");
	target.addClass("active");
	if (target.hasClass("start") || target.hasClass("end")) {
		$(".luckyStartEnd").show();
		if (target.hasClass("start")) {
			$(".luckyStartEnd > div, .infoChangeWrap").hide();
			$(".conText01").show();
		} else {
			$(".luckyStartEnd > div, .infoChangeWrap").hide();
			$(".conText02").show();
		}
	} else {
		$(".luckyStartEnd").hide();
		$(".infoChangeWrap").show();
	}
}

function nhKeyboardClick(){
	$(".nhKeyboardLinkTitle ").focus();
	$(".nhKeyboardLinkTitle").next(".toggleCont").slideDown(function(){
		$(this).parents().closest(".toggleWrap").find(".toggleBtn").addClass("active");
		$(this).parents().closest(".toggleWrap").find(".toggleBtn").addClass("less");
		$(this).parents().closest(".toggleWrap").find(".toggleTxt").text("닫기");
		$(this).parents().closest(".toggleWrap").find(".toggleBtn").attr('title','닫힘');
	});
}

// 팝업 탭 Strong 태그 추가 함수
function TabTitleAdd(index){
	$(".tabStrong").remove();
	var TabTxt= $(".tabLv0").find("a > span").eq(index+1).html();
	var $Strong = $("<strong class='tabStrong'>"+TabTxt+" 탭 화면"+"</strong>");
	$(".tabLv0").after($Strong);
}

// 전체메뉴 안드로이드 전용 예외처리
var androidMenu = function(obj) {
	if (obj.hasClass("androidOnlyMenu") || obj.hasClass("")) {
		obj.find("a").removeClass("active");
		return true;
	}
	else {
		obj.find("a").addClass("active");
		var menu = obj.attr("class");
		$(".menuDepth02 > div").hide();
		$("." + menu).show();
		return false;
	}
};

//계좌개설 팝업
function openAccPop() {
	var scrollPosY = ($("body").css("top"));
	var thisPosY = $(window).scrollTop();
	if($(".noLogin").hasClass("open")){
		$(".footer .accDim").hide();
		$(".openAcc").hide();
		scrollUnlock(scrollPosY);
		$(".noLogin").removeClass("open");
	}else{
		scrollPosY = thisPosY;
		$(".footer .accDim").show();
		$(".openAcc").show();
		scrollLock(thisPosY);
		$(".noLogin").addClass("open");
	}

	$(document).off("click", ".footer .accDim").on("click", ".footer .accDim", function(){
		openAccPop();
	});

	$(document).off("click", ".openAccClose").on("click", ".openAccClose", function(){
		openAccPop();
	});

	$(document).on("click", ".footMenu li a", function(){
		if($(this).closest(".footer").find(".noLogin.open") && !$(this).closest(".noLogin").length){
			openAccPop();
			$(document).off("click", ".footMenu li a");
		};
	});
}

// 이체정보 확인 시, 스크롤 가이드 아이콘 생성
var iconScroll = function() {
	height01 = $(".popCont").height();
	height02 = $(".transfer").height();
	$(".iconScroll").hide();
	if (height01 < height02) {
			$(".iconScroll").show();
	}
}