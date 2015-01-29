var t2 = jQuery.noConflict();
  var mySwiper = new Swiper('.swiper-container',{
	pagination: '.box-pagination',
 keyboardControl: true,
    paginationClickable: true,
    slidesPerView: 'auto',
	autoResize:true,
	resizeReInit:true,
  })
 
  	 t2('.prevControl').on('click', function(e){
    e.preventDefault()
    mySwiper.swipePrev()
  })
  t2('.nextControl').on('click', function(e){
    e.preventDefault()
    mySwiper.swipeNext()
  })