/*
Live Search
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

    $d.on('click', '.post-lt-reaction-control', function (e) {
        var $t = $(this);
        var key_active = $t.attr('data-active');
		
		$b.trigger('beeteam368BeforeClickOpenReactions', [$t]);

        if($t.find('.button-listing-reactions-control').length === 0){

            var $reaction_items = '';

            if(typeof(vidmov_jav_js_object)!=='undefined' && typeof(vidmov_jav_js_object.reactions_listing)!=='undefined'){
				
				var reaction_score_count = $t.attr('data-count');
				if(typeof(reaction_score_count) !== 'undefined'){
					reaction_score_count = JSON.parse(reaction_score_count);
				}
				
                for (const [key, value] of Object.entries(vidmov_jav_js_object.reactions_listing)) {

                    var class_active = '';

                    if(key_active === key){
                        class_active = 'already-voted';
                    }
					
					var text_count = '';
					if(typeof(reaction_score_count[key]) !== 'undefined'){
						text_count = ': '+(reaction_score_count[key]);
					}
                    $reaction_items+='<span class="reaction-item tooltip-style beeteam368-reaction-vt '+(key)+'-reaction beeteam368-reaction-vt-control '+(class_active)+'" data-action="'+(key)+'">'+(value.icon)+'<span class="tooltip-text reaction-count-control">'+(value.text)+(text_count)+'</span></span>';
                }
            }

            $t.append('<div class="button-listing-reactions button-listing-reactions-control">'+($reaction_items)+'</div>');
        }

        $t.toggleClass('active-panel');
		
		$b.trigger('beeteam368AfterClickOpenReactions', [$t]);

        e.stopPropagation();

        return false;
    });

    $d.on('click', '.beeteam368-reaction-vt-control', function (e) {

        var $t = $(this);
        var $parent = $t.parents('.post-lt-reaction-control');
        var id = $parent.attr('data-id');
            id = parseFloat(id);

        if(id > 0){

            var $text_reaction = $parent.find('.item-text-control');
            var old_text = $text_reaction.text();
            var vote = $t.attr('data-action');

            $parent.addClass('loading-voting');
            $text_reaction.text(vidmov_jav_js_object.reactions_text_processing);

            var query = {
                'action': 'vote_reaction_request',
                'vote': vote,
                'post_id': id,
                'security': vidmov_jav_js_object.security,
            }

            $.ajax({
                type: 'POST',
                url: vidmov_jav_js_object.admin_ajax,
                cache: true,
                data: query,
                dataType: 'json',
                success: function(data, textStatus, jqXHR){

                    if(typeof(data) === 'object' && typeof(data.totalVotes)!=='undefined'){

                        $parent.find('.item-number-control').text(data.totalVotes);
                        $parent.find('.beeteam368-reaction-vt-control').removeClass('already-voted');

                        if(typeof(data.key_active) !== 'undefined' && data.key_active!=''){
                            $t.addClass('already-voted');
                        }

                        if(typeof(data.text) !== 'undefined' && data.text!=''){
                            old_text = data.text;
                        }
						
						if(typeof(vidmov_jav_js_object)!=='undefined' && typeof(vidmov_jav_js_object.reactions_listing)!=='undefined'){
							for (const [key, value] of Object.entries(vidmov_jav_js_object.reactions_listing)){
								
								if(typeof(data[key]) !== 'undefined'){
									$parent.find('.beeteam368-reaction-vt-control[data-action="'+(key)+'"] .reaction-count-control').text((value.text)+': '+(data[key]));
								}
								
							}
						}
                    }

                    $parent.removeClass('loading-voting');
                    $text_reaction.text(old_text);
                },
                error: function( jqXHR, textStatus, errorThrown ){
                }
            });
        }

        e.stopPropagation();

        return false;
    });

    $d.on('click', function(){
        $('.post-lt-reaction-control').removeClass('active-panel');
    });

}));