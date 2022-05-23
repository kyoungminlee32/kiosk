/**************************************************
		금상몰 JS
**************************************************/
$(document).ready(function(){
	/* 금상몰 슬라이더 */
	setTimeout(function(){
		if($('.swiper-pagination-bullet-active').length > 0){
		$('.swiper-pagination-bullet-active').attr('title','선택됨');
		}
		$('.swiper-pagination .swiper-pagination-bullet').off('click').on('click',function(){
			$(this).addClass('swiper-pagination-bullet-active').attr('title','선택됨');
			$(this).addClass('swiper-pagination-bullet-active').siblings().attr('title','');
		});
	},2000);
	
	
	/* 조회기간 설정 */
	$('[data-role="samWrap"]').find('.areaBtnPrice').find('li').on('click',function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');

		if($(this).hasClass('active'))
		{
			var selTermTxt = $(this).find('a').text() + '선택됨';
			$(this).find('a').attr('title', selTermTxt);
			$(this).siblings().find('a').removeAttr('title');
		}
	});

// ISA 탭

		var $tabWrap = $(".isaTabtWrap");
		var $list = $tabWrap.find(".isaTabList");
		var $btn = $list.find("a");
		var $layout =  $tabWrap.find(".isaTabCont .cont");
			
			
		$btn.on('click', function (e){
			e.preventDefault();
			//var current = $(e.currentTarget);
			var target = $(e.currentTarget.hash);
			$layout.hide();

			
			// current.addClass("active");
			target.show();
			
		});
	
	//팝업 탭으로 컨텐츠 활성
	$(".pop_tab_type2 li a").click(function(e){
		e.preventDefault();
		var curIdx = $(this).parent().index();
		$(".pop_tab_type2 li a").removeClass("active");
		$(this).addClass("active");
		$(".pop_tab_con").hide().eq(curIdx).show();
	});

	/* ALL100 플랜 */
	//상단 progress bar 고정
	if($('.stepArea.all100').length >= 1){
		$(".stepArea.all100").css({
			"position":"fixed",
			"top": "50px",
			"left":0,
			"right": 0,
			"background-color":"#fff",
			"margin": 0,
			"z-index": 10
		});
		$(".container.all100").css('padding-top','118px');
	}
	

	var iScr = 0;
	$(window).scroll(function(){
		
		var curScr = $(this).scrollTop();
		if(curScr >= 20)
		{
			$(".container.all100").css('padding-top','91px');
			$('.bigType').css('display','none');
			$('.bigType').siblings('.stepArea').css('display','flex');
		}
		/*
		else if ($('.inp_txt').is(':focus'))
		{$('.foot_btn .button_default').css('bottom',0)}
		*/
		else if(curScr == 0)
		{
			$(".container.all100").css('padding-top','118px');
			$('.bigType').css('display','block');
			$('.bigType').siblings('.stepArea').css('display','none');
		}
		iScr = curScr;

	});

	//올100 토글
	$(".toggleBtn").click(function(){
		$(this).toggleClass("on").next(".helper_con").slideToggle("fast");
	});

	/* pdf layer(툴팁용 포함) */
	pdfLayerPop = function(toolTip) {
		scrollLock();
		$(".pdfLayerPop").show();
		$(".toolTip").hide();
		fullLayerHeight();
	};


	//탭 플리킹 스와이프
	common_ui_swipe2();

	
	//계좌 직접입력
	$(".accSel").change(function(){
		var cur_val = $(this).val();
		if (cur_val == "직접선택")
		{
			$(this).parent().hide().next().show();
		}
	});

	//고객정보 변경 활성
	$(".mod_info").click(function(){
		$(".el_info_wrap").hide();
		$(".el_info_mod").show();
	});
	$(".cancel_mod").click(function(){
		$(".el_info_wrap").show();
		$(".el_info_mod").hide();
	});

	// 튤팁 스타일 2 //
	$('.etcTt').off('click').on('click',function(){
		$(this).siblings('.popWrap.toolTipBase').show();
		var curIdx = $(window).scrollTop();
		var innerH = $(this).next('.popWrap.toolTipBase').find('.popInner').height() / 2;
		$(this).siblings('.popWrap.toolTipBase').css('position','fixed');
		$(this).siblings('.popWrap.toolTipBase').find('.popInner').css('left', 15);
		$(this).siblings('.popWrap.toolTipBase').find('.popInner').css('margin-top', 50+'vh').css('margin-top','-=' + innerH);
		
		return true;
	});

	/* 연령 선택 */
	
	$('.rdType1').find('.radioList').find('input').off('click').on('click',function(){
		if($(this).is(':checked'))
		{$(this).parent().addClass('active');
		$(this).parent().siblings().removeClass('active');}
	});

	$('.termsToggle').find('input[type="checkbox"]','label').off('click').on('click',function(){
		$(this).parent('.checkList').siblings('.termsCont').slideToggle('fast');
	});

	/* 내부 팝업 호출 */
	$('[data-click-role]').click(function(){
		var tClk = $(this).attr('data-click-role');
		$('.popWrap').hide();
		$('[data-pop-role='+ tClk +']').show();
		
		var tHeight = $('[data-pop-role='+ tClk +']').find('.popCont').height();
		$('[data-pop-role='+ tClk +']').find('.popInner').css('max-height',tHeight + 89);
	});

	/* 약관 check 하단 영역 toggle */
	$('.termsList').find('.checkList').off('click').on('click',function(){
		if($(this).find('input[type="checkbox"]').is(':checked')){
			$(this).siblings('.termsCont').slideDown();
		}
		else{
			$(this).siblings('.termsCont').slideUp();
		}
	});

	/* toggleTable toggle */
	$(".toggleTableBtn").click(function(){
		$(this).toggleClass("active").parent().prev(".toggleTableCont").slideToggle("fast");
	});


	/* combo-box */
	$('.btnBadgeToggle').on('click',function(){
		if($(this).hasClass('color12')){
			$(this).removeClass('color12').addClass('color13');
			$(this).text('전부환매');
		}
		else{
			$(this).removeClass('color13').addClass('color12');
			$(this).text('일부환매');
		}
	});
	
});
	



// 상품상세 Swiper //
function prodDetailSwiper(){
	var swiper = new Swiper('.swiper-container.prodSwiper' , {
		slidesPerView:'auto',
		
		spaceBetween:10,
		loop:false,
	});
	/* 슬라이드 최대높이에 맞춰 정렬 */
	var pHeight = $('.swiper-wrapper').css('height');
	$('.swiper-wrapper').find('.prod').css('height',pHeight);
	/* 슬라이드 최대높이에 맞춰 정렬 */
}
// 상품상세 Swiper //


	/* pdf layer close */
	function pdfPopClose(){
		$(".pdfWrap").hide();
		$("html,body").css({
			"height": "auto",
			"overflow": "initial"
		});
	}

/**************************************************
		//금상몰 JS
**************************************************/
	//슬라이드 팝업
	/* confirm 형 팝업 */
	slidePopConfirm2 = function() {
		var layerPopSet = PopSet();
		scrollLock();
		$(".slidePopConfirm").show();
		var confirmH = $(".slidePopConfirm .popCont").outerHeight();
		//var confirmH2 = $(".slidePopConfirm .confirmMsg").outerHeight();
		//alert(confirmH);
		$(".slidePopConfirm .popInner").animate({height:confirmH + layerPopSet.btnArea}, 150);
	}
	/* confirm 형 팝업 여러개 있을때 */
	slidePopConfirm3 = function(idx) {
		var layerPopSet = PopSet();
		scrollLock();
		$(".slidePopConfirm").eq(idx).show();
		var confirmH = $(".slidePopConfirm").eq(idx).find(" .popCont").outerHeight();
		//var confirmH2 = $(".slidePopConfirm .confirmMsg").outerHeight();
		//alert(confirmH);
		$(".slidePopConfirm").eq(idx).find(".popInner").animate({height:confirmH + layerPopSet.btnArea}, 150);
	}

/* select 형 팝업 */
slidePopOption2 = function() {
	var layerPopSet = PopSet();
	scrollLock();
	$(".slidePopOption").show();
	$(".popWrap.slidePopOption .popInner").attr('tabindex', 0).focus();

	var $slideInner = $(".slidePopOption .popInner"),
		$slideCont = $(".slidePopOption .popCont");
	// 버튼 있는 경우
	var slideInnerH_btn = layerPopSet.slidePopBtn,
		slideContH_btn = layerPopSet.slidePopBtn - layerPopSet.btnArea - layerPopSet.popTitH;  
	// 버튼 없는 경우
	var slideInnerH_btnNo = layerPopSet.slidePop;
		//slideContH_btnNo = layerPopSet.slidePop - layerPopSet.popTitH;
	var	slideContH_btnNo = $(".selectList").height();

	if ($(".slidePopOption .popBtn").length > 0) {
		$slideInner.animate({height:slideInnerH_btn}, 200);
		$slideCont.height(slideContH_btn);
	} else {
		//$slideInner.animate({height:slideInnerH_btnNo}, 200);
		$slideInner.animate({height:slideContH_btnNo + 45}, 200);
		$slideCont.height(slideContH_btnNo);
	}
}


//탭 스와이프
function common_ui_swipe2(){
	var $flick = $(".mkflick"),
        tabLength = [];
    for(var j = 0; j < $flick.length; j++){
        tabLength[j] = $flick.eq(j).find("ul li").length;

        if(tabLength[j] < 4){
            $flick.eq(j).find('.mkarrRgt').hide();
            $flick.eq(j).find('.mkarrLft').hide();
        }
        if(tabLength[j] == 1) {
            $flick.eq(j).find("ul li").css({'width':'100%'});
        } else if(tabLength[j] == 2){
            $flick.eq(j).find("ul li").css({'width':'50%'});
        } else if(tabLength[j] == 3){
            $flick.eq(j).find("ul li").css({'width':'33.33333333%'});
        }

        else if(tabLength[j] > 3){
            $flick.eq(j).addClass("swiper-container");
			var fullWidth = $(window).width();
            $(".swiper-container").css({'width':fullWidth});
            $(".swiper-container").find("ul li").css({'width':'33.33333333%'});
			var curIdx = $(".swiper-wrapper .active").parent().index();
            var sliders = [];
            $('.swiper-container').each(function(index, element){
                $(this).addClass('s'+index);
                $(this).find('.mkarrRgt').addClass('r'+index);
                $(this).find('.mkarrLft').addClass('l'+index);
                var slider = new Swiper('.s'+index, {
					initialSlide: curIdx,
                    slidesPerView: 3,
                    navigation: {nextEl: '.r'+index,prevEl: '.l'+index}
                });
                sliders.push(slider);
            });
        }
    }
}

fullLayerPop2 = function(toolTip) {
	scrollLock();
	$(".fullLayerPop").show();
	//var flpH = $(".fullLayerPop .popCont").height() - 404;
	$(".fullLayerPop .popCont").css({
		"height":"calc(100% - 84px)",
	});
	$(".toolTip").hide();
};



	// select list 다중선택

	$(document).off("click",".popCont .multiSel li input[type='checkbox']").on("click",".popCont .multiSel li input[type='checkbox']",function(){
		target = $(this).parent().parent();
		if (target.hasClass("active")) {
			target.removeClass("active");
		} else {
			target.addClass("active");
		}
	});


/* 20180921 나만의 맞춤상품 팝업 추가 */
/* confirm 형 팝업 */
slidePopConfirm_new = function() {
	var layerPopSet = PopSet();
	scrollLock();
	$(".slidePopConfirm_new").show();
	var confirmH = $(".slidePopConfirm_new .popCont").outerHeight();
	//var confirmH2 = $(".slidePopConfirm_new .confirmMsg").outerHeight();
	//alert(confirmH);
	$(".slidePopConfirm_new .popInner").animate({height:confirmH}, 150);
}





/* close */
popClose = function(e) {
	scrollPosY = ($("body").css("top"));

	var test = $(e).closest(".popWrap");
	var $slidePopInner = $(".slidePopOption .popInner, .slidePopConfirm_new .popInner, .bankSetWrap .popInner");
	var $slidePop = $(".slidePopOption, .slidePopConfirm_new, .bankSetWrap");
	$(".dim").fadeOut(100);

	if (test.hasClass("slidePopOption") || test.hasClass("slidePopConfirm_new") || test.hasClass("bankSetWrap")) {
		$slidePopInner.animate({height:0}, 150, function(){
			$slidePop.hide();
		});
	} else {
		$(e).closest(".popWrap").hide();
	}
	
	scrollUnlock(scrollPosY);

};

/* 상품상세 swiper */
$(document).ready(function(){
	if($('.productList').find('.accListBtn').length == 0){
		$(this).find('.prodTit').css('padding-right',0)
	}
	   
});
//상품상세 swiper

$(document).ready(function(){
	
	setTimeout(function(){
		$('.starScoreArea').attr('role','img');
		var scoreTxt = $('.starScoreArea').find('em').text();
		$('.starScoreArea').attr('aria-label', scoreTxt)
	}, 300);
	
	$('.termsList').find('.checkList').find('a').on('click',function(){
		if($(this).find('input').is(':checked')){
			$(this).attr('title','약관보기 및 동의하기')
		}
		else {
			$(this).attr('title','')
		}
		
	});
	$('.termsList').find('a').attr('role','button');
	$('.termsList').find('.checkList > a').attr('title','약관보기 및 동의하기');
	$('.termsList').find('.checkList input[type="checkbox"]').attr('aria-hidden',true);
	setTimeout(function(){
		$('.topmainSwiper').find('.swiper-slide a').attr('role','button');
		$('.realWordArea').find('.ticker li').attr('role','button');
		$('.realWordArea').find('.ticker .tit').attr('aria-hidden',true);
		$('.realTop').attr('aria-hidden',true);
		/*
		$('.realWordArea').find('.ticker li').attr('title','판매베스트');
		*/
	},500);
	
	/*
	var tabSel2 = $('.tabLv2 li').find('.active');
	tabSel2.attr('title','선택됨');
	tabSel2.parents().find('a').attr('title','선택안됨')
	*/
	$('.prodDetailWrap .boardWrap li a').removeAttr('title');
	
	$('.btn_helper').attr('aria-expanded',false);
	$('.btn_helper').removeClass('toggleBtn');
	$('.btn_helper').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeAttr('aria-expanded');
			$(this).attr('aria-expanded',true);
		}
		else {
			$(this).removeAttr('aria-expanded');
			$(this).attr('aria-expanded',false);
		}
	});
	
	if($('.container').find('.areaBtnDefault').length == 0){
		$('.container').css('padding-bottom',90 + 'px');
	}
	
	$('.prodDetailWrap').find('.toggleBtn').removeAttr('aria-expanded');
	
	setTimeout(function(){
		$('.prodDetailWrap').find('.toggleCont').hide();
		$('#li_first_child').find('.toggleCont').show();
		$('.prodDetailWrap').find('.toggleBtn').attr('role','button');
		$('.prodDetailWrap').find('.toggleBtn').removeAttr('aria-expanded');
		
	}, 100);
	
	$('.prodDetailWrap .toggleWrap').find('.toggleBtn').on('click',function(){
		
		$(this).attr('aria-expanded','');
		$('.prodDetailWrap').find('.toggleBtn').attr('aria-expanded','');
		
		$(this).removeAttr('aria-expanded');
		$('.prodDetailWrap').find('.toggleBtn').removeAttr('aria-expanded');
		setTimeout(function(){
			$(this).removeAttr('aria-expanded');
			$('.prodDetailWrap').find('.toggleBtn').removeAttr('aria-expanded');
			
		}, 10)
		
	});
	
	/* 상품상세 아코디언 접근성 */
	
	$('.btnFuncTip').attr('role','button');
	$('.btn_helper').attr('role','button');

	$('.keywordMore').on('click',function(){
		if($(this).hasClass('active')){
			$('.openPanel').find('ol').focus().blur();
		}
		else{
			
			$('.openPanel').find('ol').attr('tabindex',0)
		}
	});
	
});