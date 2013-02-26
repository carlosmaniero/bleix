(function($){
	'use strict';
	// Status atual do documento
	var status = [];

	$.Bleix = {};
	
	// Adciona um status no Bleix
	var add_status = function(name){
		status.push(name);
	};

	// Remove um statusn no Bleix
	var remove_status = function(name){
		status = $.grep(status, function(value) {
			return value !== name;
		});
	};

	// Verifica se status está ativo
	$.Bleix.is = function(name){
		for (var i = 0; i < status.length; i++) {
			if(status[i] === name){
				return true;
			}
		}
		return false;
	};



	// ====================================================
	// Layout responsivo
	// ====================================================
	$.Bleix.ResponsiveLayout = function(min, max, status, onEnter, onLeave){
		function check_layout(){
			if($('body').width() < max && $('body').width() > min){
				$('body').addClass('bx-' + status);
				add_status(status);
				if(onEnter !== undefined){
					onEnter($('body').width());
				}
			}else{
				$('body').removeClass('bx-' + status);
				remove_status(status);
				if(onLeave !== undefined){
					onLeave($('body').width());
				}
			}
		}
		check_layout();
		$(window).resize(check_layout);
	};




	// ====================================================
	// Bleix Colunas
	// ====================================================
	var column_elem = 0; // Inteiro com o número de elementos
	var column_elem_options = {}; // Objeto com as opções dos elementos

	// Configura as colunas
	// elem : Elemento que deve ser configurado
	// options : Objeto de configurações do plugin
	var config_column = function(elem, options){
		elem.children('.bx-column').removeClass('bx-column-wrapped');

		var columns = elem.children('.bx-column').not('.bx-keep-size, .bx-keep-horizontal-size');
		var width = elem.width();


		// Define a largura útil das colunas
		elem.children('.bx-keep-size, .bx-keep-horizontal-size').each(function(){
			width -= $(this).width();
		});

		width = Math.floor(width);
		width /= columns.length;
		width = Math.floor(width);

		columns.width(width);

		if(width < options.min_size){
			// Caso não haja espaço suficiente para as colunas, atribui a 
			// classe bx-column-wrapped
			elem.children('.bx-column').width('').addClass('bx-column-wrapped');
		}

		$(window).scroll();
	};

	// Plugin de configuração das colunas
	$.fn.BleixColumn = function(settings){

		var options = {
			min_size : 250,
			duration : 500
		};

		$.extend(options,settings);

		$(this).each(function(){
			var elem = $(this);

			// Caso plugin já tenha sido invodaco, só reconfigura as colunas
			var elem_index = elem.attr('bx-column');
			if(elem_index){
				options = column_elem_options[elem_index];
			}else{
				elem.attr('bx-column',column_elem).append('<div class="bx-clear"></div>');

				// Define a altura da coluna fixa
				$(window).scroll(function(){
					var top = $(window).scrollTop() - elem.offset().top;

					if(top > 0){

						elem.children('.bx-column-fixed').not('.bx-column-wrapped').each(function(){
							$(this).stop();
							$(this).css('position','relative');
							if($(this).height() + top < elem.height()){
								$(this).css({'top' : top});
							}else{
								$(this).css({'top' : elem.height() - $(this).height()});
							}
						});
						elem.children('.bx-column-wrapped').css('top','');
					}else{
						elem.children('.bx-column-fixed').not('.bx-column-wrapped').css({'top' : 0});
					}
				});

				column_elem_options[column_elem] = options;
				column_elem++;
			}
			
			config_column(elem,options);
		});

	};

	// ====================================================
	// Ajusta os elementos para oculpar 100% da tela n
	// ====================================================
	$.fn.BleixHorizontalAjust = function(){
		$(this).each(function(){
			var parent_width = $(this).parent().width();
			var width = $(this).width();

			$(this).outerWidth(parent_width);

			var corect_width = $(this).width();
			var resize = $(this).children().not('.bx-keep-size').not('.bx-keep-horizontal-size');

			if(resize.length){

				var keep_size = 0;
				$(this).children('.bx-keep-size,.bx-keep-horizontal-size').each(function(){
					keep_size += $(this).outerWidth();
				});

				var ajust_to = (corect_width - keep_size) / resize.length;

				resize.each(function(){
					$(this).outerWidth(ajust_to);
				});
			}
		});
	};

	$.fn.BleixVerticalAjust = function(){
		$(this).each(function(){
			var parent_height = $(this).parent().height();
			
			var height = $(this).height();
			$(this).outerHeight(parent_height);
			var corect_height = $(this).height();

			var resize = $(this).children().not('.bx-keep-size').not('.bx-keep-vertical-size');

			if(resize.length){
				var ajust_to = (height - corect_height) / resize.length;

				console.log(ajust_to);

				resize.each(function(){
					$(this).outerHeight($(this).outerHeight() - ajust_to);
				});
			}
		});
	};

	$(window).resize(function(){
		// Configura as colunas pelo resize
		for (var i = 0; i < column_elem; i++) {
			var options = column_elem_options[i];
			var elem = $('[bx-column=' + i + ']');
			config_column(elem,options);
		}
		// Ajusta colunas
		$('.bx-horizontal-ajust').BleixHorizontalAjust();
		$('.bx-vertical-ajust').BleixVerticalAjust();
	});

	// Configura menus mobile
	$(document).ready(function(){
		// Configura navegação mobile
		$('.bx-mobile-menu-icon').click(function(){
			$(this).parents('.bx-mobile-nav').children('.bx-mobile-nav-list').toggle(500);
		});
	});


	// Classes padrão
	$('.bx-column-parent').BleixColumn();
	$('.bx-horizontal-ajust').BleixHorizontalAjust();
	$('.bx-vertical-ajust').BleixVerticalAjust();


})(jQuery);
