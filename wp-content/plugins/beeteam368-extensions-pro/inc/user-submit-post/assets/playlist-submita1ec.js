/*
Playlist Submit Feature
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
	
	$b.on('beeteam368BeforeClickOpenPopupAction', function(e, t, popup_spe, popup, popup_content, action){
		if(action === 'open_popup_add_playlist'){
			
			var rnd_id = 'playlist-add-'+(Math.floor(Math.random() * 99999));
			popup_content.find('.beeteam368-playlist-add-wrapper-control').attr('id', rnd_id);
			var instance = OverlayScrollbars(document.getElementById(rnd_id), {
				scrollbars: {
					autoHide: 'leave',
				},
				overflowBehavior: {
					x: 'hidden',
					y: 'scroll',
				}				
			});
			
			var $btnAddPlaylistOpen = popup_content.find('.open-add-playlist-control');
			var $btnAddWrapperControl = popup_content.find('.playlist-add-wrapper-control');
			
			$btnAddPlaylistOpen.off('.openAddPlaylistPopup').on('click.openAddPlaylistPopup', function(){
				$btnAddWrapperControl.toggleClass('active-item');
				if($btnAddWrapperControl.hasClass('active-item')){
					instance.scroll({ el : $btnAddWrapperControl, block : {y: 'begin', x : 'nearest' } }, 368);
				}
			});
		}
	});
	
	$d.on('click', '.playlist-add-control', function (e) {
		if ( typeof window.FormData !== 'function' ) {
			return;
		}
		
		var $t = $(this);		
		var $form = $t.parents('.form-playlis-control');
		var $alerts= $('.playlist-alerts-control');
		$alerts.html('');
		
		var formData = new FormData( $form.get(0) );		
		formData.append('action', 'beeteam368_add_new_playlist');
		formData.append('security', vidmov_jav_js_object.security);
		
		var playlist_title = $.trim(formData.get('playlist_title'));
		
		if(playlist_title == ''){
			$alerts.html('<span>'+(vidmov_jav_js_object.playlist_error_enter_title)+'</span>');
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
					setTimeout(function(){
						$alerts.html('');
					},3688);
					
					if(typeof(data.playlist_html) !== 'undefined' && $.trim(data.playlist_html)!=''){
						var $playlist_listing = $t.parents('.beeteam368-playlist-add-wrapper-control').find('.playlist-listing-control');						
						$playlist_listing.prepend(data.playlist_html).find('.no-playlist-yet-control').remove();
						$form.trigger('reset');
					}
					
					$t.removeClass('active-loading').blur();					
				}
			},
			error: function( jqXHR, textStatus, errorThrown ){
				$t.removeClass('active-loading').blur();
			}
		});
	});
	
	$d.on('click', '.playlist-item-control', function(e) {
		var $t = $(this);
		
		var playlist_id = $t.attr('data-playlist-id');
		var post_id = $t.attr('data-post-id');
		
		if(typeof(playlist_id)!=='undefined' && typeof(post_id)!=='undefined'){		
			
			$t.addClass('active-loading').blur();
			
			var query = {
                'action': 'beeteam368_add_post_to_playlist_fe',
                'playlist_id': playlist_id,
				'post_id': post_id,
                'security': vidmov_jav_js_object.security,
            }
			
			$.ajax({
				type: 		'POST',
				url: 		vidmov_jav_js_object.admin_ajax,
				cache: 		false,
				data: 		query,
				dataType: 	'json',				
				success: 	function(data, textStatus, jqXHR){
					if(typeof(data.success) !== 'undefined'){
						if(data.success === 'added'){
							$t.find('.playlist-added-control').addClass('primary-color-focus').html('<i class="fas fa-list-ul"></i>');	
						}else{
							$t.find('.playlist-added-control').removeClass('primary-color-focus').html('<i class="fas fa-plus"></i>');
						}
					}
					
					$t.removeClass('active-loading').blur();
				},
				error: function( jqXHR, textStatus, errorThrown ){
					$t.removeClass('active-loading').blur();
				}
			});
		}
	});
}));