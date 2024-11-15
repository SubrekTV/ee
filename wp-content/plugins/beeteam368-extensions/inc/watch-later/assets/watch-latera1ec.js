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
	
	$.isNumber = function(n){
		var _ = this;
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	$d.on('click', '.add-to-watch-later-control', function (e) {
		
		var $t = $(this);
		
		if($t.hasClass('add-watch-later-loading')){
			return false;
		}
		
		$b.trigger('beeteam368BeforeClickWatchLaterAction', [$t]);
		
		var post_id = $t.attr('data-id');
		
		if(typeof(post_id)!=='undefined' && $.isNumber(post_id)){
			
			var $all_same_id = $('.add-to-watch-later-control[data-id="'+(post_id)+'"]');
			
			$all_same_id.addClass('add-watch-later-loading').blur().find('.tooltip-text').remove();
			$all_same_id.append('<span class="tooltip-text"><i class="fas fa-upload"></i></span>');
			
			var query = {
                'action': 'watch_later_action_request',
                'post_id': post_id,
                'security': vidmov_jav_js_object.security,
            }
			
			$.ajax({
                type: 'POST',
                url: vidmov_jav_js_object.admin_ajax,
                cache: true,
                data: query,
                dataType: 'json',
                success: function(data, textStatus, jqXHR){
				
					if(typeof(data) === 'object' && typeof(data.check_watch_later)!=='undefined'){
						if(data.check_watch_later === 'added'){
							$all_same_id.addClass('primary-color-focus');
						}else{
							$all_same_id.removeClass('primary-color-focus');
							
							var $parents = $t.parents('.is-tab-content-watch_later');
							if($parents.length > 0 && typeof($parents.attr('data-id')) !== 'undefined' && typeof(vidmov_jav_js_object.current_channel_logged) !== 'undefined' && $parents.attr('data-id') == vidmov_jav_js_object.current_channel_logged){
								setTimeout(function(){
									$parents.find('#post-'+(post_id)).fadeOut(666, function(){ 
										$(this).remove();
										if($parents.find('.blog-wrapper-control .post-item').length === 0){
											_w.location.reload();
										}
									});
								}, 368);
							}
						}
					}        

                    $all_same_id.removeClass('add-watch-later-loading').blur().find('.tooltip-text').remove();
					$all_same_id.append(data.check_watch_later_html);
                },
                error: function( jqXHR, textStatus, errorThrown ){
                }
            });
		}
		
		$b.trigger('beeteam368AfterClickWatchLaterAction', [$t]);
		
		e.stopPropagation();
		return false;
	});
}));	