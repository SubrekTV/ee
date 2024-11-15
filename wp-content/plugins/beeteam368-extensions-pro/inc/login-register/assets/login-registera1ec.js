/*
Login & Register Feature
Author: BeeTeam368
Author URI: http://themeforest.net/user/beeteam368
License: Themeforest Licence
License URI: http://themeforest.net/licenses
*/

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
	
	$d.on('click', '.beeteam368_login_popup-content-control', function (e) {
		e.stopPropagation();
	});
	
	$d.on('click', '.beeteam368_login_popup-control', function (e) {
		var $t = $(this);
		$t.removeClass('active-item');
	});
	
	$d.on('click', '.reg-log-popup-control', function (e) {
		
		var $t = $(this);
		var $popup = $('.beeteam368_login_popup-control');
		
		if($popup.length === 0){
			_w.location.href = $t.attr('href');
			return false;
		}
		
		$b.trigger('beeteam368BeforeClickRegLogAction', [$t]);
		
		if(typeof(vidmov_jav_js_object)!=='undefined' && typeof(vidmov_jav_js_object.login_popup_banner)!=='undefined' && vidmov_jav_js_object.login_popup_banner!='' && $popup.find('.popup-form-banner-control').length === 0){
			$popup.find('.beeteam368_login_popup-content-control').prepend('<div class="popup-form-banner popup-form-banner-control"><img src="'+(vidmov_jav_js_object.login_popup_banner)+'"></div>');
		}
		
		var $tml_arlerts = $popup.find('.tml-alerts');
		if($tml_arlerts.length > 0){
			$tml_arlerts.html('');
			var note = $t.attr('data-note');
			if(typeof(note)!=='undefined' && note!=''){	
				$tml_arlerts.html('<ul class="tml-messages"><li class="tml-message">'+(note)+'</li></ul>');
			}
		}
		
		var $redirect_to_input = $popup.find('input[name="redirect_to"]');
		if($redirect_to_input.length > 0){
			if(typeof(vidmov_jav_js_object)!=='undefined' && typeof(vidmov_jav_js_object.current_url)!=='undefined'){
				$redirect_to_input.val(vidmov_jav_js_object.current_url);
			}else{
				$redirect_to_input.val('');
			}
			var redirect = $t.attr('data-redirect');
			if(typeof(redirect)!=='undefined' && redirect!=''){
				$redirect_to_input.val(redirect);
			}
		}		
		
		if($popup.find('.popup-login-close-btn-control').length === 0){
			$popup.find('.tml-submit-wrap button[name="submit"]').prepend('<i class="fas fa-sign-in-alt"></i> &nbsp; ');
			$popup.find('.tml-submit-wrap').append('<button type="button" class="popup-login-close-btn popup-login-close-btn-control"><i class="far fa-times-circle"></i></button>');
			
			$('.popup-login-close-btn-control').on('click', function(e){
				$popup.removeClass('active-item');
			});
		}
		
		$popup.addClass('active-item');
		
		$b.trigger('beeteam368AfterClickRegLogAction', [$t]);
		
		e.stopPropagation();
		
		return false;	
	});
	
	$d.on('click', '.update-profile-control', function (e) {
		
		if ( typeof window.FormData !== 'function' ) {
			return;
		}
		
		var $t = $(this);
		var $form = $('.form-profile-control');
		var $alerts= $('.profile-section-alerts-control');
		
		$t.addClass('active-loading').blur();
		$alerts.html('');
		
		if(typeof(tinyMCE) !== 'undefined'){
			tinyMCE.triggerSave();
			$form.serialize(); 
		}
		
		var formData = new FormData( $form.get(0) );		
		formData.append('action', 'beeteam368_update_profile');
		formData.append('security', vidmov_jav_js_object.security);
		
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
					$t.removeClass('active-loading');
					
					if(typeof(data.reload) !== 'undefined'){
						setTimeout(function(){
							_w.location.reload(true);
						}, 5000);						
					}
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$t.removeClass('active-loading').blur();
			}
		});	
	});
	
	$d.on('click', '.update-password-control', function (e) {
		
		if ( typeof window.FormData !== 'function' ) {
			return;
		}
		
		var $t = $(this);
		var $form = $('.form-password-control');
		var $alerts= $('.password-section-alerts-control');
		
		$t.addClass('active-loading').blur();
		$alerts.html('');
		
		var formData = new FormData( $form.get(0) );		
		formData.append('action', 'beeteam368_update_password');
		formData.append('security', vidmov_jav_js_object.security);

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
					$t.removeClass('active-loading');
					
					if(typeof(data.reload) !== 'undefined'){
						setTimeout(function(){
							_w.location.reload(true);
						}, 5000);						
					}
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$t.removeClass('active-loading').blur();
			}
		});
	});
	
	$d.on('click', '.update-avatar-control', function (e) {
		
		if ( typeof window.FormData !== 'function' ) {
			return;
		}
		
		var $t = $(this);
		var $form = $('.form-avatar-control');
		var $alerts= $('.avatar-section-alerts-control');
		
		$t.addClass('active-loading').blur();
		$alerts.html('');
		
		var formData = new FormData( $form.get(0) );		
		formData.append('action', 'beeteam368_update_avatar');
		formData.append('security', vidmov_jav_js_object.security);
		
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
					$t.removeClass('active-loading');
					
					if(typeof(data.reload) !== 'undefined'){
						setTimeout(function(){
							_w.location.reload(true);
						}, 5000);						
					}
					
					if(typeof(data.avatar) !== 'undefined'){
						$('.tml-avatar-wrap-control .abs-img').html('<img src="'+(data.avatar)+'" width="61" height="61"><span class="remove-img-profile remove-img-profile-control" data-action="avatar"><i class="fas fa-times-circle"></i></span>');
					}
					
					if(typeof(data.channel_banner) !== 'undefined'){
						$('.tml-channel-banner-wrap-control .abs-img').html('<img src="'+(data.channel_banner)+'" width="61" height="61"><span class="remove-img-profile remove-img-profile-control" data-action="channel_banner"><i class="fas fa-times-circle"></i></span>');
					}
					
					$form[0].reset();
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$t.removeClass('active-loading').blur();
			}
		});	
	});

	$d.on('click', '.remove-img-profile-control', function (e) {
		var $t = $(this);
		var process = $t.attr('data-action');
		var $parents = $t.parents('.abs-img-control');
		
		$parents.addClass('loading-delete');
		
		var query = {
			'action': 'beeteam368_remove_pic_profile',
			'security': vidmov_jav_js_object.security,
			'process': process,
		}
		
		$.ajax({
			type: 		'POST',
			url: 		vidmov_jav_js_object.admin_ajax,
			cache: 		false,
			data: 		query,
			dataType: 	'json',			
			success: 	function(data, textStatus, jqXHR){
				if(typeof(data.success) !== 'undefined' && $.trim(data.success)!=''){
					$parents.html('');
				}
				
				$parents.removeClass('loading-delete');			
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$parents.removeClass('loading-delete');
			}
		});
	});
}));	