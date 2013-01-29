(function($){
	$.ResponsiveLayout = function(min, max, lclass, onEnter, onLeave){
		function check_layout(){
			if($('body').width() < max && $('body').width() > min){
				$('body').addClass(lclass);
				if(onEnter != undefined)
					onEnter($('body').width());
			}else{
				$('body').removeClass(lclass);
				if(onLeave != undefined)
					onLeave($('body').width());
			}
		}
		check_layout();
		$(window).resize(check_layout);
	}
})(jQuery);