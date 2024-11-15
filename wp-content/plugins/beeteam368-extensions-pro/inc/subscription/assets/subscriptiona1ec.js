/*
Subscriptions Feature
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

    $d.on('click', '.subscribe-control', function (e) {
        var $t = $(this);
		var author_id = $t.attr('data-author-id');
			author_id = parseFloat(author_id);
		var post_id = $t.attr('data-post-id');
			post_id = parseFloat(post_id);	
			
		if(author_id > 0){
			$t.addClass('subscribe-loading').blur();
			
			var query = {
                'action': 'subscribe_request',
                'author_id': author_id,
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

                    if(typeof(data) === 'object' && typeof(data.text_r)!=='undefined' && typeof(data.text_c)!=='undefined' && typeof(data.class_c)!=='undefined'){
						
						$t.html(data.text_r).removeClass('is-subscribed').addClass(data.class_c);
						$('.subscribers-count-control[data-author-id="'+(author_id)+'"]').text(data.text_c);
						
						if(data.class_c != 'is-subscribed'){
							var $parents = $t.parents('.is-tab-content-subscriptions');
							if($parents.length > 0 && typeof($parents.attr('data-id')) !== 'undefined' && typeof(vidmov_jav_js_object.current_channel_logged) !== 'undefined' && $parents.attr('data-id') == vidmov_jav_js_object.current_channel_logged){
								setTimeout(function(){
									$parents.find('#author-'+(author_id)).fadeOut(666, function(){ 
										$(this).remove();
										if($parents.find('.blog-wrapper-control .post-item').length === 0){
											_w.location.reload();
										}
									});
								}, 368);
							}
						}
						
                    }

                    $t.removeClass('subscribe-loading');
                },
                error: function( jqXHR, textStatus, errorThrown ){
                }
            });
		}

		e.stopPropagation();
        return false;
    });
}));