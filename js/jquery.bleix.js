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
			min_size : 200
		}

		$.extend(options,settings);

		$(this).each(function(){
			var columns = $(this).find('.bx-column');	
			var width = 100 / columns.length;
			
			function set_column(){
				columns.width( width + '%' );

				if(columns.width() < options.min_size)
					columns.width('');
			}
			set_column();
			$(window).resize(set_column);
		});
	}
})(jQuery);