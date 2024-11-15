;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    var $d = $(document);
    var $w = $(window);
    var _d = document;
    var _w = window;
    var $h = $('html');
    var $b = $('body');
	
	$d.on('click', '.report-submit-control', function (e) {
		if ( typeof window.FormData !== 'function' ) {
			return;
		}
		
		var $t = $(this);		
		var $form = $t.parents('.form-report-control');
		var $alerts= $('.report-alerts-control');
		$alerts.html('');
		
		var formData = new FormData( $form.get(0) );		
		formData.append('action', 'beeteam368_add_new_report');
		formData.append('security', vidmov_jav_js_object.security);
		
		var report_value = $.trim(formData.get('report_value'));
		var report_content = $.trim(formData.get('report_content'));
		if(report_value=='' && report_content==''){
			$alerts.html('<span>'+(vidmov_jav_js_object.report_error_choose_one_field)+'</span>');
			return false; 
		}
		
		$t.addClass('active-loading').blur();
		
		$.ajax({
			type: 		'POST',
			url: 		vidmov_jav_js_object.admin_ajax,
			cache: 		false,
			data: 		formData,
			dataType: 	'json',
			processData: false,
			contentType: false,
			success: 	function(data, textStatus, jqXHR){
				if(typeof(data.messages) !== 'undefined' && $.trim(data.messages)!=''){
					$alerts.html(data.messages);
					$t.removeClass('active-loading').blur();
					$form.trigger('reset');
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$t.removeClass('active-loading').blur();
			}
		});
	});
}));