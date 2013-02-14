// Scripts of home
$(function(){
	$.Bleix.ResponsiveLayout(0,980,'mobile');
	$.Bleix.ResponsiveLayout(0,420,'cellphone');
	$('#about').BleixColumn();
	$('#resources-columns').BleixColumn({ min_size : 400 });
});