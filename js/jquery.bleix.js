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

		var columns = elem.children('.bx-column').not('.bx-column-fixed-size');
		var width = elem.width();


		// Define a largura útil das colunas
		elem.children('.bx-column-fixed-size').each(function(){
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
				// Para a animação quando o scroll é ativo
				//$(window).bind('scrollstart',function(){
				//	elem.children('.bx-column-fixed').stop();
				//});

				column_elem_options[column_elem] = options;
				column_elem++;
			}
			
			config_column(elem,options);
		});

	};

	// Classe padrão das colunas
	$('.bx-column-parent').BleixColumn();

	// Configura as colunas pelo resize
	$(window).resize(function(){
		for (var i = 0; i < column_elem; i++) {
			var options = column_elem_options[i];
			var elem = $('[bx-column=' + i + ']');
			config_column(elem,options);
		}
	});

	// Configura menus mobile
	$(document).ready(function(){
		// Configura navegação mobile
		$('.bx-mobile-menu-icon').click(function(){
			$(this).parents('.bx-mobile-nav').children('.bx-mobile-nav-list').toggle(500);
		});
	});


})(jQuery);
