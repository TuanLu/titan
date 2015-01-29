jQuery(".sp-wrap").append('<div class="sp-large"></div><div class="sp-thumbs sp-tb-active scroll-pane maxheight800"></div>');
jQuery(".sp-wrap a").appendTo(".sp-thumbs");
jQuery(".sp-thumbs a:first").addClass("sp-current").clone().removeClass("sp-current").appendTo(".sp-large");
jQuery(".sp-wrap").css("display", "inline-block");
var slideTiming = 300;
var maxWidth = jQuery(".sp-large img").width();
jQuery(".sp-thumbs").live("click", function(e) {
    e.preventDefault()
});
jQuery(".sp-tb-active a").live("click", function(e) {
    jQuery(".sp-current").removeClass();
    jQuery(".sp-thumbs").removeClass("sp-tb-active");
    jQuery(".sp-zoom").remove();
    var t = jQuery(".sp-large").height();
    jQuery(".sp-large").css({
        overflow: "hidden",
        height: t + "px"
    });
    jQuery(".sp-large a").remove();
    jQuery(this).addClass("sp-current").clone().hide().removeClass("sp-current").appendTo(".sp-large").fadeIn(slideTiming, function() {
        var e = jQuery(".sp-large img").height();
        jQuery(".sp-large").height(t).animate({
            height: e
        }, "fast", function() {
            jQuery(".sp-large").css("height", "auto")
        });
        jQuery(".sp-thumbs").addClass("sp-tb-active")
    });
    e.preventDefault()
});
jQuery(".sp-large a").live("click", function(e) {
    var t = jQuery(this).attr("href");
    jQuery(".sp-large").append('<div class="sp-zoom"><img src="' + t + '"/></div>');
    jQuery(".sp-zoom").fadeIn();
    jQuery(".sp-large").css({
        left: 0,
        top: 0
    });
    e.preventDefault()
});
jQuery(document).ready(function() {
    jQuery(".sp-large").mousemove(function(e) {
        var t = jQuery(".sp-large").width();
        var n = jQuery(".sp-large").height();
        var r = jQuery(".sp-zoom").width();
        var i = jQuery(".sp-zoom").height();
        var s = jQuery(this).parent().offset();
        var o = e.pageX - s.left;
        var u = e.pageY - s.top;
        var a = Math.floor(o * (t - r) / t);
        var f = Math.floor(u * (n - i) / n);
        jQuery(".sp-zoom").css({
            left: a,
            top: f
        })
    }).mouseout(function() {})
});
jQuery(".sp-zoom").live("click", function(e) {
    jQuery(this).fadeOut(function() {
        jQuery(this).remove()
    })
})