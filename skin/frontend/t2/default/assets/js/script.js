/*	Table OF Contents
	==========================
	Carousel
	Customs Script [List View  Grid View + Add to Wishlist Click Event + Others ]
	Custom Parallax 
	Custom Scrollbar
	Custom animated.css effect
	Equal height ( subcategory thumb)
	responsive fix
	*/
jQuery(document).ready(function($) {

    /* Auto Add class for table style */
	$('#product-attribute-specs-table').addClass('table table-striped');
	$('#my-orders-table').addClass('table table-striped');
	$('.data-table').not('.table').addClass('table table-striped');
	/* Auto Add Button Class Under Tab Content on Product Details page */
	$('.tab-content').find('button').addClass('btn btn-primary');
	$('.show_review_tab').click(function(){
		$('html, body').animate({
			scrollTop: $('#product_tabs_review').offset().top
		}, 500);
		$('#product_tabs_review a[href="#tabs_review"]').tab('show') // Select tab by name
	});
	$('.button').addClass('btn');
	$('.button2').addClass('btn btn-primary');
	$('.out-of-stock').addClass('btn btn-default');
	$('.buttons-set .button, .add-to-cart-alt .button').addClass('btn-primary');
	$('.page-title > h1').not('.section-title-inner').addClass('section-title-inner');
	/*============================CHECKOUT========================= */
	$('#checkoutSteps .section .step:not(#checkout-step-login) .form-group label').addClass('col-md-5 control-label');
	$('#checkoutSteps .section .step:not(#checkout-step-login) .form-group .input-box').addClass(' col-md-7 ');
	$('#checkoutSteps .section .step:not(#checkout-step-login) .form-group .input-box input').addClass(' form-control input-md ');
	$('#checkoutSteps .section .step:not(#checkout-step-login) .form-group .input-box select').addClass(' form-control input-md ');
	$('.form-list').on(function(){
		$(this).find('li').addClass('form-group');
		$(this).find('li label').addClass('col-md-5 control-label');
		$(this).find('li .input-box').addClass('col-md-7');
		$(this).find('li .input-box input').addClass(' form-control input-md ');
		$(this).find('li .input-box select').addClass(' form-control input-md');
	});
	/* Add icons for Checkout steps (6 steps) */
	$('#opc-login .checkout_step').html('<i class="fa fa-user"></i>');//Step 1
	$('#opc-billing .checkout_step').html('<i class="fa fa fa-envelope"></i>');//Step 2
	$('#opc-shipping .checkout_step').html('<i class="fa fa-map-marker"></i>');//Step 3
	$('#opc-shipping_method .checkout_step').html('<i class="fa fa-truck "></i>');//Step 4
	$('#opc-payment .checkout_step').html('<i class="fa fa-money  "></i>');//Step 5
	$('#opc-review .checkout_step').html('<i class="fa fa-check-square "></i>');//Step 6
	$('#checkout-shipping-method-load .sp-methods dl').each(function(){
		$(this).html('<h2 class="block-title-2">'+$(this).text()+'</h2>');
	});
	 
	/* =========================/END Checkout============================== */
	/* ===CUstomer WIshlist=== */
	$('.btn-remove').html('<i class="fa fa-remove"></i>');
	
	/*==================================
	Carousel
	====================================*/
	

    // NEW ARRIVALS Carousel
    $("#productslider").owlCarousel({
        navigation: true,
        items: 4,
        itemsTablet: [768, 2]
    });
	/* Select box Style by Chosen v1.2 */
	$('select').not('.super-attribute-select,.validate-select,#region_id,#billing\\:region_id,#shipping\\:region_id')
	.chosen({disable_search:true});
	$('select.super-attribute-select,select.validate-select').addClass('form-control');
    // BRAND  carousel
    var owl = $(".brand-carousel");

    owl.owlCarousel({
        //navigation : true, // Show next and prev buttons
        navigation: false,
        pagination: false,
        items: 8,
        itemsTablet: [768, 4],
        itemsMobile: [400, 2]


    });

    // Custom Navigation Events
    $("#nextBrand").click(function() {
        owl.trigger('owl.next');
    })
    $("#prevBrand").click(function() {
        owl.trigger('owl.prev');
    })


    // YOU MAY ALSO LIKE  carousel

    $("#SimilarProductSlider").owlCarousel({
        navigation: true

    });
	/* Crossell products slider */
	 $("#crosssellProductSlider").owlCarousel({
        navigation: true,
		singleItem: true,
    });
	 


    // Home Look 2 || Single product showcase 

    // productShowCase  carousel
    var pshowcase = $("#productShowCase");

    pshowcase.owlCarousel({
        autoPlay : 4000,
        stopOnHover: true,
        navigation: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true
    });

    // Custom Navigation Events
    $("#ps-next").click(function() {
        pshowcase.trigger('owl.next');
    })
    $("#ps-prev").click(function() {
        pshowcase.trigger('owl.prev');
    })
	
	
	
	// Home Look 3 || image Slider 

    // imageShowCase  carousel
    var imageShowCase = $("#imageShowCase");

    imageShowCase.owlCarousel({
        autoPlay: 4000,
        stopOnHover: true,
        navigation: false,
        pagination: false,
        paginationSpeed: 1000,
        goToFirstSpeed: 2000,
        singleItem: true,
        autoHeight: true


    });

    // Custom Navigation Events
    $("#ps-next").click(function() {
        imageShowCase.trigger('owl.next');
    })
    $("#ps-prev").click(function() {
        imageShowCase.trigger('owl.prev');
    })


    /*==================================
	Customs Script
	====================================*/
    // collapse according add  active class
    $('.collapseWill').on('click', function(e) {
        $(this).toggleClass("pressed"); //you can list several class names 
        e.preventDefault();
    });

    $('.search-box .getFullSearch').on('click', function(e) {
        $('.search-full').addClass("active"); //you can list several class names 
        e.preventDefault();
    });

    $('.search-close').on('click', function(e) {
        $('.search-full').removeClass("active"); //you can list several class names 
        e.preventDefault();
    });



    // Customs tree menu script	
    $(".dropdown-tree-a").click(function() { //use a class, since your ID gets mangled
        $(this).parent('.dropdown-tree').toggleClass("open-tree active"); //add the class to the clicked element
    });
	

    // Add to Wishlist Click Event	 // Only For Demo Purpose	
	
	/* $('.add-fav').click(function(e) { 
        e.preventDefault();
        $(this).addClass("active"); // ADD TO WISH LIST BUTTON 
		$(this).attr('data-original-title', 'Added to Wishlist');// Change Tooltip text 
    }); */

    // List view and Grid view 

    $('.list-view').click(function(e) { //use a class, since your ID gets mangled
        e.preventDefault();
        $('.item').addClass("list-view"); //add the class to the clicked element
		 /* $('.add-fav').attr("data-placement",$(this).attr("left")); */
		$(function() {
			$('.thumbnail.equalheight').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImgLook2 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImageLook3 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.EqualHeight div.item').responsiveEqualHeightGrid(); // add class with selector class equalheight
		});
		
    });

    $('.grid-view').click(function(e) { //use a class, since your ID gets mangled
        e.preventDefault();
        $('.item').removeClass("list-view"); //add the class to the clicked element
		$(function() {
			$('.thumbnail.equalheight').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImgLook2 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImageLook3 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.EqualHeight div.item').responsiveEqualHeightGrid(); // add class with selector class equalheight
		});
    });


    // product details color switch 
    $(".swatches li").click(function() {
        $(".swatches li.selected").removeClass("selected");
        $(this).addClass('selected');

    });


    if (/IEMobile/i.test(navigator.userAgent)) {
        // Detect windows phone//..
        $('.navbar-brand').addClass('windowsphone');
    }



    // top navbar IE & Mobile Device fix
    var isMobile = function() {
        //console.log("Navigator: " + navigator.userAgent);
        return /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    };


    if (isMobile()) {
        // For  mobile , ipad, tab

    } else {
		
			
		 $(function() {

            //Keep track of last scroll
            var tshopScroll = 0;
            $(window).scroll(function(event) {
                //Sets the current scroll position
                var ts = $(this).scrollTop();
                //Determines up-or-down scrolling
                if (ts > tshopScroll) {
                    // downward-scrolling
                    $('.navbar').addClass('stuck');
             
                } else {
                    // upward-scrolling
                    $('.navbar').removeClass('stuck');
                }
				
				if (ts < 600) {
                    // downward-scrolling
                    $('.navbar').removeClass('stuck');
					//alert()
                } 
				
				
				tshopScroll = ts;
				
                //Updates scroll position
              
            });
        });
		
        

    } // end Desktop else




    /*==================================
	Parallax  
	====================================*/
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Detect ios User // 
        $('.parallax-section').addClass('isios');
        $('.navbar-header').addClass('isios');
    }

    if (/Android|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Detect Android User // 
        $('.parallax-section').addClass('isandroid');
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Detect Mobile User // No parallax
        $('.parallax-section').addClass('ismobile');
        $('.parallaximg').addClass('ismobile');

    } else {
        // All Desktop 
        $(window).bind('scroll', function(e) {
            parallaxScroll();
        });

        function parallaxScroll() {
            var scrolledY = $(window).scrollTop();
            $('.parallaximg').css('marginTop', '' + ((scrolledY * 0.3)) + 'px');
        }


        if ($(window).width() < 600) {} else {
            $('.parallax-image-aboutus').parallax("50%", 0, 0.2, true);
        }
    }



    /*==================================
	 Custom Scrollbar for Dropdown Cart 
	====================================*/
    $(".scroll-pane").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true

        },

        scrollButtons: {
            enable: false
        },

        mouseWheelPixels: "200",
        theme: "dark-2"

    });


    $(".smoothscroll").mCustomScrollbar({
        advanced: {
            updateOnContentResize: true

        },

        scrollButtons: {
            enable: false
        },

        mouseWheelPixels: "100",
        theme: "dark-2"

    });


    /*==================================
	Custom  animated.css effect
	====================================*/

    window.onload = (function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 86) {
                // Display something
                $('.parallax-image-aboutus .animated').removeClass('fadeInDown');
                $('.parallax-image-aboutus .animated').addClass('fadeOutUp');
            } else {
                // Display something
                $('.parallax-image-aboutus .animated').addClass('fadeInDown');
                $('.parallax-image-aboutus .animated').removeClass('fadeOutUp');


            }

            if ($(window).scrollTop() > 250) {
                // Display something
            } else {
                // Display something

            }

        })
    })


    
	
    /*=======================================================================================
	 Code for tablet device || responsive check
	========================================================================================*/


    if ($(window).width() < 989) {

		/* REmove FIxed Class and heading space when load on table/smartphone */
		$('[data-block="header"]').removeClass('navbar-fixed-top');
		$('.t2-page').find('.headerOffset').addClass('head-mobile');
		$('.t2-page').find('.parallaxOffset').addClass('mobile');
		$('.t2-page').find('.banner').addClass('banner-mobile');
        $('.collapseWill').trigger('click');

    } else {
        // ('More than 960');
		
		$('[data-block="header"]').not('.navbar-fixed-top').addClass('navbar-fixed-top');
		$('.t2-page').find('.head-mobile').removeClass('head-mobile');
		$('.t2-page').find('.mobile').removeClass('mobile');
		$('.t2-page').find('.banner-mobile').removeClass('banner-mobile');
		
		/*=======================================================================================
		Code for equal height - // your div will never broken if text get overflow  
		========================================================================================*/

		$(function() {
			$('.thumbnail.equalheight').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImgLook2 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImageLook3 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.EqualHeight div.item').responsiveEqualHeightGrid(); // add class with selector class equalheight
		});

    }
	$( window ).resize(function() {
		$(function() {
			$('.thumbnail.equalheight').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImgLook2 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.featuredImageLook3 .inner').responsiveEqualHeightGrid(); // add class with selector class equalheight
			$('.EqualHeight div.item').responsiveEqualHeightGrid(); // add class with selector class equalheight
		});
		if ($(window).width() < 989) {

		/* REmove FIxed Class and heading space when load on table/smartphone */
		$('[data-block="header"]').removeClass('navbar-fixed-top');
		$('.t2-page').find('.headerOffset').addClass('head-mobile');
		$('.t2-page').find('.parallaxOffset').addClass('mobile');
		$('.t2-page').find('.banner').addClass('banner-mobile');
        $('.collapseWill').trigger('click');

		} else {
			// ('More than 960');
			$('[data-block="header"]').not('.navbar-fixed-top').addClass('navbar-fixed-top');
			$('.t2-page').find('.mobile').removeClass('mobile');
			$('.t2-page').find('.head-mobile').removeClass('head-mobile');
			$('.t2-page').find('.banner-mobile').removeClass('banner-mobile');
		}
	});

    $(".tbtn").click(function() {
        $(".themeControll").toggleClass("active");
    });
	

	
	 
    /*==================================
	Global Plugin
	====================================*/

    // For stylish input check box 

    $(function() {
        $("input[type='radio'], input[type='checkbox']").not('#change_password').ionCheckRadio();

    });

 
    // cart quantity changer sniper
    $("input[name='quanitySniper']").TouchSpin({
        buttondown_class: "btn btn-link",
        buttonup_class: "btn btn-link"
    });



    // bootstrap tooltip 
    $('.tooltipHere').hover(function(){
			$(this).tooltip('show');
	},function(){
		$(this).tooltip('hide');
	}
	);
	  

	$('.tooltipHere').tooltip()
    /*=======================================================================================
		end  
	========================================================================================*/
	/* Increase Qty on product details page */
	jQuery(".quantity").append('<span class="glyphicon glyphicon-plus plus"></span>').prepend('<span class="glyphicon glyphicon-minus minus" />');
        jQuery(".plus").click(function()
        {
            var currentVal = parseInt(jQuery(this).prev(".qty").val());
            
            if (!currentVal || currentVal=="" || currentVal == "NaN") currentVal = 0;
             
            jQuery(this).prev(".qty").val(currentVal + 1); 
        });
     
        jQuery(".minus").click(function()
        {
            var currentVal = parseInt(jQuery(this).next(".qty").val());
            if (currentVal == "NaN") currentVal = 0;
            if (currentVal > 0)
            {
                jQuery(this).next(".qty").val(currentVal - 1);
            }
        });

}); // end Ready
