(function($){
	// Status atual do documento
	var status = new Array();
	$.Bleix = {};
	
	// Adciona um status no Bleix
	var add_status = function(name){
		status.push(name);
	}

	// Remove um statusn no Bleix
	var remove_status = function(name){
		status = $.grep(status, function(value) {
		  return value != name;
		});
	}

	// Verifica se status está ativo
	$.Bleix.is = function(name){
		for (var i = 0; i < status.length; i++) {
			if(status[i] == name)
				return true;
		};
		return false;
	}

	// Layout responsivo
	$.Bleix.ResponsiveLayout = function(min, max, status, onEnter, onLeave){
		function check_layout(){
			if($('body').width() < max && $('body').width() > min){
				$('body').addClass('bx-' + status);
				add_status(status);
				if(onEnter != undefined)
					onEnter($('body').width());
			}else{
				$('body').removeClass('bx-' + status);
				remove_status(status);
				if(onLeave != undefined)
					onLeave($('body').width());
			}
		}
		check_layout();
		$(window).resize(check_layout);
	}

	// Bleix Plugins
	$.fn.BleixColumn = function(settings){

		var options = {
			min_size : 250
		}

		$.extend(options,settings);

		$(this).each(function(){
			var elem = $(this);
			
			
			function set_column(){
				elem.find('.bx-column').removeClass('bx-column-wrapped');

				var columns = elem.find('.bx-column').not('.bx-column-fixed');
				var width = elem.width();

				elem.find('.bx-column-fixed').each(function(){
					width -= $(this).width();
				});

				width = parseInt(width);
				width /= columns.length;
				width = parseInt(width);

				columns.width( width );

				if(columns.width() < options.min_size){
					elem.find('.bx-column').width('').addClass('bx-column-wrapped');
				}
			}
			set_column();
			$(window).resize(set_column);
		});

	}

	$(document).ready(function(){
		// Navegação
		$('.bx-mobile-menu-icon').click(function(){
			$(this).parents('.bx-mobile-nav').find('.bx-mobile-nav-list').toggle(500);
		});
	});


})(jQuery);