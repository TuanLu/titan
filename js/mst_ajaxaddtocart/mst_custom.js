jQuery(document).ready(function($) {
	MST={
		hideCls: 'ajaxaddtocart-box-hide',
		showCls: 'ajaxaddtocart-box-show',
		oldurl	:'',	
		fireCustom:function(url,parameters){
			var parameters = parameters || {};
			MST.fire(url, parameters, this);
		},
		fireOriginal:function(url, parameters){
			document.location.href = url;
			return;		
		},
		_collectPos: function(el, horPos, verPos) {
			var x, y;
			var elWidth = el.width();
			var docWidth = $(window).width();

			switch(horPos) {
				case 'center':
					x = docWidth/2 - elWidth/2;
					break;
				case 'left':
					x = 50;
					break;
				case 'right':
					x = docWidth - elWidth;
					break;
				default:
					//error
			}

			var elHeight = el.height();
			var docHeight = $(window).height();

			switch(verPos) {
				case 'top':
					y = 50;
					break;
				case 'center':
					y = docHeight/2 - elHeight/2;
					break;
				case 'bottom':
					y = docHeight - elHeight;
					break;
				default:
					//error
			}
			return [x, y];
		},	
		_resizeBlock: function(el) {
			el.css({
				height: 'auto', width: 'auto'
			});
			var xy = this._collectPos(el, 'center', 'center');
			if (xy[0] < 50) {
				xy[0] = 50;
				el.css({
					width: ($(window).width() - 100) + 'px'
				});
			}
			if (xy[1] < 50) {
				xy[1] = 50;
				el.css({
					height: ($(window).height() - 100) + 'px'
				});
			}
			el.css({ 'left': xy[0] + 'px', 'top': xy[1] + 'px'});
		},
		showBlock: function(el) {
			el = this._initEl(el);
			if (!el) {
				return false;
			}
			this._resizeBlock(el);
			this._show(el);				
			return true;
		},
		_show: function(el) {
			el.removeClass(this.hideCls);
			el.addClass(this.showCls);
		},	
		_hide: function(el) {
			el.removeClass(this.showCls);
			el.addClass(this.hideCls);
		},		
		_initEl: function(el) {
			el	=$(el);
			return el;
		},		
		callUpdaters:function(blocks){
			var blocks = blocks || {};
			$('#bac-configurable-block').html(blocks);
		},
		hideBlock: function(el) {
			el = this._initEl(el);
			if (!el) {
				return false;
			}

			el.css({
				height: 'auto', width: 'auto'
			});

			var me = this;		

			this._hide(el);

			return true;
		},
		hideall:function(status){
			$('#bac-overlay').removeClass('ajaxaddtocart-box-show');
			$('#bac-product-options').removeClass('ajaxaddtocart-box-show');			
			$('#ajaxaddtocart-progress').removeClass('ajaxaddtocart-box-show');
			$('#ajaxaddtocart-add-confirm').removeClass('ajaxaddtocart-box-show');			
			$('#bac-overlay').addClass('ajaxaddtocart-box-hide');			
			$('#bac-product-options').addClass('ajaxaddtocart-box-hide');			
			$('#ajaxaddtocart-progress').addClass('ajaxaddtocart-box-hide');
			$('#ajaxaddtocart-add-confirm').addClass('ajaxaddtocart-box-hide');		
			if(($('img.flyImagetobasket').length)&& status){
				$('img.loadingimage').hide();
				$('img.flyImagetobasket').animate({
					'top':configValue.imgtofly.offset().top+20,
					'left':configValue.imgtofly.offset().left+40,
					'width':75,
					'height':75
				}, 1000, 'easeOutQuad');
			$('img.flyImagetobasket').animate({'width':0, 'height':0}, function(){ 
				$(this).detach();			
			});
			}
		},
		beforesendajax:function(status){
			if((configValue.progressanimation == 1) || (!status)){
				MST._show($('#bac-overlay'));
				MST.showBlock('#ajaxaddtocart-progress');
			}else{
				MST.hideall(0);
				return true;
			}			
		},
		fire:function(_url,parameters, observer){		
			//var parameters = parameters || {};	
			var addProduct=false;
			if (
				(_url.indexOf('.html') !== -1 && _url.indexOf('.html?') === -1 ) ||
				(_url.indexOf('.html') !== -1 && _url.indexOf('.html?') === -1 ) ||
				(_url.indexOf('options=cart') !== -1) ||
				(_url.indexOf('cart/add') !== -1) ||
				(_url.indexOf('wishlist/index/cart') !== -1)
			){
				addProduct=true;
			}			
			var	orgin_url=_url;
			if(_url.indexOf('options=cart') !== -1 ){
				_url=_url+'&ajax=true';
				
			}else{
				if(_url.indexOf('?') !== -1 ){
					_url=_url+'&ajax=true';
				}else{
					_url=_url+'?ajax=true';
				}
			}
			if(parameters){
				if(_url.indexOf('?') !== -1 ){
					_url=_url+'&'+parameters;
				}else{
					_url=_url+'?'+parameters;
				}
				
			}
			
			$.ajax({				
				url:_url,
				dataType: 'text',
				beforeSend : function (){
					MST.beforesendajax(addProduct);
				},					
				success: function (data) {					
					var _json=$.parseJSON(data);

					MST.hideBlock('#ajaxaddtocart-progress');
					if(_json.configurable_options_block){
						if(!_json.r){
							MST.fireOriginal(MST.oldurl);
							return true;
						}
						if(!($('#bac-overlay').hasClass('ajaxaddtocart-box-show'))){
							MST._show($('#bac-overlay'));
						}						
						$('#bac-configurable-block #bac-product-options').html(_json.configurable_options_block);
						MST.showBlock('#bac-product-options');
						MST1.buttonclickproductpage();
						$('#bac-overlay').click(function(){									
							MST.hideall(1);							
							$('#bac-configurable-block #bac-product-options').empty();
						});	
						return true;
					}	
					if(_json.redirect_to){
						if(_json.success){
							MST.fire(_json.redirect_to+'?ajax=true&', parameters, this);
							return true;
						}
					}
					if(!_json.block.success){
						MST.fireOriginal(MST.oldurl);
						return true;
					}
					if(_json.block.cartpage){
						MST.hideall(0);
						MST1.updatecartpage(_json.block.cartpage);
						MST1.updateToplink(_json.block);
						MST1.updatesidebar(_json.block.sidebar);
						MST1.updatedropdowncart(_json.block.dropdowncart);
						MST1.scrollToTop();						
						MST2.deletecartpage(0);	
						MST2.clickbuttoncartpage(0);						
						return true;
					}					

					MST1.updatepopupcart(_json.block.cart);
					MST1.updateToplink(_json.block);
					MST1.updatesidebar(_json.block.sidebar);
					MST1.updatedropdowncart(_json.block.dropdowncart);
					MST1.scrollToTop();
					MST1.flyimagetobasket();
					MST2.deletecartpage(1);
					MST2.clickbuttoncartpage(1);
					$('#bac-overlay').click(function(){	
						$('#ajaxaddtocart-add-confirm').removeClass('mst_show');	
						$('#ajaxaddtocart-progress').removeClass('mst_showload');					
						MST.hideall(1);
					});						
				}
			});
		}		
	};
	MST1={
		cssSelector: '#bac-product-options',
		rootCssSelector: '#bac-configurable-block',
		updateToplink:function(block){
			if(block){
				if($('.header .quick-access > ul.links').length){
					//$('.header .quick-access > ul.links').before(block.topLinks);
					//$('.header .quick-access > ul.links').eq(1).remove();	
					$('.header .quick-access > ul.links').replaceWith(block.topLinks);		
					$('.header .quick-access > ul.links > li').each(function(){
						if($(this).children('a.top-link-cart').length){
							$(this).append(block.dropdowncart1);
							return true;
						}
					});
				}				
			}
		},
		showdropdowncart:function(){
			if($('.block-dropdowncartlink').length){
				$('.header .quick-access > ul.links > li').each(function(){
					if($(this).children('a.top-link-cart').length){
						$(this).append('<div class="block-dropdowncartlink" style="margin:0;">'+$('.block-dropdowncartlink').html()+'</div>');
					}
				});
			}
		},
		updatesidebar: function(block){
			if(block){
				if($('.sidebar > .block-cart').length){
					//$('.sidebar > .block-cart').before(block);
					//$('.sidebar > .block-cart').eq(1).remove();					
					$('.sidebar > .block-cart').replaceWith(block);					
				}				
			}			
		},
		scrollToTop:function(){
			$("html, body").animate({scrollTop: 0}, 600, "easeOutCubic");	
		},
		flyimagetobasket: function(){
			$('img.flyImagetobasket').animate({'width':0, 'height':0}, function(){ 
				$(this).detach();
				$('img.loadingimage').remove();
				
			});
		},
		updatepopupcart:function(block){
			if(block && configValue.confirmblock){
				if(!($('#bac-overlay').hasClass('ajaxaddtocart-box-show'))){
					MST._show($('#bac-overlay'));
				}
				$('#ajaxaddtocart-add-confirm .added-content').html(block);
				MST.showBlock('#ajaxaddtocart-add-confirm');
				$('#ajaxaddtocart-progress').addClass('mst_showload');							
				$('#ajaxaddtocart-add-confirm').addClass('mst_show');						
			}else{
				MST.hideall(0);
			}				
		},
		updatedropdowncart: function(block){
			if(!configValue.dropdowncart){
				return true;
			}
			if(block){
				if($('.block-dropdowncart').length){
					//$('.block-dropdowncart').before(block);
					//$('.block-dropdowncart').eq(1).remove();					
					$('.block-dropdowncart').replaceWith(block);
				}				
			}		
		},
		updatecartpage: function(block){
			//$('.col-main > .cart').before(block);
			if($('.col-main > .cart').length ){
				//$('.col-main > .cart').before(block);
				//$('.col-main > .cart').eq(1).remove();
				$('.col-main > .cart').replaceWith(block);
			}		
		},
		buttonclickproductpage: function(){
			if(typeof(productAddToCartForm) != 'undefined'){
				window.productAddToCartForm.submit= function(url){	
					if(productAddToCartForm.validator && productAddToCartForm.validator.validate()){
						var frm=$('#product_addtocart_form');
						var _url=$('#product_addtocart_form').attr('action');
						MST.oldurl=_url;
						_url=_url.replace('checkout/cart', 'ajaxaddtocart/ajax/cart/cart');
						var params=$('#product_addtocart_form').serialize();
						$.ajax({
							type: frm.attr('method'),
							url: _url,
							beforeSend : function (){
								$('#bac-configurable-block #bac-product-options').empty();
								MST.hideBlock('#bac-configurable-block #bac-product-options');
								MST.beforesendajax(true);				
							},
							dataType: 'text',
							data: frm.serialize(),
							success: function (data) {
								var _json=$.parseJSON(data);
								if(!_json.block.success){
									MST.fireOriginal(MST.oldurl);
									return true;
								}								
								MST.hideBlock('#ajaxaddtocart-progress');
								MST1.updatepopupcart(_json.block.cart);						
								MST1.updateToplink(_json.block);
								MST1.updatesidebar(_json.block.sidebar);
								MST1.updatedropdowncart(_json.block.dropdowncart);
								MST1.scrollToTop();
								MST1.flyimagetobasket();
								MST2.deletecartpage(1);
								MST2.clickbuttoncartpage(1);
								$('#bac-overlay').click(function(){	
									$('#ajaxaddtocart-add-confirm').removeClass('mst_show');	
									$('#ajaxaddtocart-progress').removeClass('mst_showload');					
									MST.hideall(1);
								});								
							}
						});					
					}
				}	 
			}	 
		}		
	};
	MST2={
		clickbuttoncartpage: function(status){
			var me = this;
			$('.cart > form').find('button[type=submit]').each(function(btn){
				var update_cart_action
				if($(this).hasClass('btn-update')){
					update_cart_action='update_cart_action=update_qty';
				}
				if($(this).hasClass('btn-empty')){
					update_cart_action='update_cart_action=empty_cart';
				}				
				update_cart_action='update_cart_action='+$(this).attr('value');
				$(this).on('click',function(ev){ 
					var frm = $('.cart > form');	
					if(status){
						var _url=frm.attr('action').replace('checkout/cart', 'ajaxaddtocart/ajax')+'?'+frm.serialize()+'&'+update_cart_action;						
						MST.fireCustom(_url);	
					}else{
						var _url=frm.attr('action').replace('checkout/cart', 'ajaxaddtocart/coupon')+'?'+frm.serialize()+'&'+update_cart_action;
						MST.fireCustom(_url);	
					}
					ev.preventDefault();						
				});
			});				
		},	
		deletecartpage: function(status){
			$('a.btn-remove').each(function(){
				if ($(this).attr('href').indexOf('checkout/cart/delete') !== -1) {					
					$(this).removeAttr('onclick');
					$(this).on('click',function(ev){
						if(status){
							var _url=$(this).attr('href').replace('checkout/cart', 'ajaxaddtocart/ajax/cart/cart');	
						}else{
							var _url=$(this).attr('href').replace('checkout/cart', 'ajaxaddtocart/coupon/cart/cart');	
						}
						$.ajax({				
							url:_url,
							dataType: 'text',
							beforeSend : function (){								
								MST.beforesendajax(false);
							},					
							success: function (data) {
								var _json=$.parseJSON(data);
								if(!_json.block.success){
									return true;
								}
								MST.hideBlock('#ajaxaddtocart-progress');
								MST1.updatepopupcart(_json.block.cart);
								if(_json.block.cartpage){
									MST.hideall(0);
									MST1.updatecartpage(_json.block.cartpage);
								}
								MST1.updateToplink(_json.block);
								MST1.updatesidebar(_json.block.sidebar);
								MST1.updatedropdowncart(_json.block.dropdowncart);
								MST1.scrollToTop();
								MST2.deletecartpage(status);
								MST2.clickbuttoncartpage(status);
								$('#bac-overlay').click(function(){	
									$('#ajaxaddtocart-add-confirm').removeClass('mst_show');	
									$('#ajaxaddtocart-progress').removeClass('mst_showload');					
									MST.hideall(1);
								});						
							}
						});
						ev.preventDefault();
					});
				}
			});				
		}
	};	
	MST1.buttonclickproductpage();	
	MST1.showdropdowncart();	
	MST2.clickbuttoncartpage(0)	
	if(window.location.pathname.indexOf('checkout/cart') !== -1){
		MST2.deletecartpage(0);
	}else{
		MST2.deletecartpage(1);
	}
	if(typeof(setLocation) != 'undefined'){
		window.setLocation = function(url){
			MST.oldurl=url;
			if (
				(url.indexOf('.html') !== -1 && url.indexOf('.html?') === -1 ) ||
				(url.indexOf('.html') !== -1 && url.indexOf('.html?') === -1 ) ||
				(url.indexOf('options=cart') !== -1) ||
				(url.indexOf('checkout/cart/add') !== -1) ||
				((url.indexOf('wishlist/index/cart') !== -1))
			) {	
				if(url.search('checkout/cart/add') != -1){
					
					url=url.replace('checkout/cart', 'ajaxaddtocart/ajax/cart/cart');					
				}
				if(url.indexOf('wishlist/index/cart') !== -1){
					if(url.indexOf('?')!==-1){
						url=url+'&mstwishlist=1';
					}else{
						url=url+'?mstwishlist=1';
					}
					params=$('#wishlist-view-form').serialize();
					//MST.fireCustom(url,params);
					MST.fireOriginal(url);
					return true;					
				}
				MST.fireCustom(url);
				
			} else {
				MST.fireOriginal(url);
			}
		}		
	}
	var configValue={
		flyefect:$('input[type=hidden][name=flyimageto]').val().toString(),
		ajaxloader:$('input[type=hidden][name=ajaxloader]').val().toString(),
		progressanimation:parseInt($('input[type=hidden][name=progressanimation]').val()),
		confirmblock:parseInt($('input[type=hidden][name=confirmblock]').val()),
		dropdowncart:parseInt($('input[type=hidden][name=dropdowncart]').val()),
		imgtofly:''
	};
	if($(configValue.flyefect).length){
	}else{
		configValue.flyefect='.top-link-cart';
	}		
	if(configValue.progressanimation == 2){
		$('.category-products button.btn-cart').click(function() {			
			var cart = $(configValue.flyefect);			
		   var imgtofly = $(this).parent().parent().find('a.product-image img').eq(0);
			if (imgtofly) {
				//$(configValue.flyefect).css({'position':'relative'});
				//$(configValue.flyefect).append('<img class="loadingimage" style="display:none;z-index:99999;position:absolute;top:10px;left:30px;" src="'+configValue.ajaxloader+'" />');
				$('body').append('<img class="loadingimage" style="display:none;z-index:99999;position:absolute;top:'+(cart.offset().top + 10)+'px;left:'+(cart.offset().left + 30)+'px;" src="'+configValue.ajaxloader+'" />');			
				var imgclone = imgtofly.clone()
					.addClass('flyImagetobasket')
					.offset({ top:imgtofly.offset().top, left:imgtofly.offset().left })
					.css({'opacity':'0.9', 'position':'absolute', 'height':'150px', 'width':'150px', 'z-index':'1000'})
					.appendTo($('body'))
					.animate({
						'top':cart.offset().top + 10,
						'left':cart.offset().left + 30,
						'width':75,
						'height':75
					}, 1000, 
						function(){
							$('img.loadingimage').show();
						}
					);
					configValue.imgtofly=imgtofly;
				//imgclone.animate({'width':0, 'height':0}, function(){ $(this).detach() });				
			}
			return false;
		});	
				
		$('.add-to-cart button.btn-cart, .btn-cart').click(function() {
			var cart = $(configValue.flyefect);
		   var imgtofly = $(this).parents('#product_addtocart_form').find('img').eq(0);
			if (imgtofly) {
				//$(configValue.flyefect).css({'position':'relative'});
				//$(configValue.flyefect).append('<img class="loadingimage" style="display:none;z-index:99999;position:absolute;top:10px;left:30px;" src="'+configValue.ajaxloader+'" />');			
				$('body').append('<img class="loadingimage" style="display:none;z-index:99999;position:absolute;top:'+(cart.offset().top + 10)+'px;left:'+(cart.offset().left + 30)+'px;" src="'+configValue.ajaxloader+'" />');			
				var imgclone = imgtofly.clone()
					.addClass('flyImagetobasket')
					.offset({ top:imgtofly.offset().top, left:imgtofly.offset().left })
					.css({'opacity':'0.9', 'position':'absolute', 'height':'150px', 'width':'150px', 'z-index':'1000'})
					.appendTo($('body'))
					.animate({
						'top':cart.offset().top + 10,
						'left':cart.offset().left + 30,
						'width':75,
						'height':75
					}, 1000, function(){
						$('img.loadingimage').show();
					});	
					configValue.imgtofly=imgtofly;
				//imgclone.animate({'width':0, 'height':0}, function(){ $(this).detach() });
			}
			return false;
		});			
	}

});