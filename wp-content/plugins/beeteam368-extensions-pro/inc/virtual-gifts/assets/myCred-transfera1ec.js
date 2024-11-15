/*
Virtual Gift[myCred Transfer] Feature
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
	
	$.isNumber = function(n){
		var _ = this;
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

    $b.on('beeteam368BeforeClickOpenPopupAction', function(e, t, popup_spe, popup, popup_content, action){
		var $t = t;
		var popup_spe = popup_spe;
		var $popup = popup;
		var $popup_content = popup_content;
		var action = action;
		
		var $form = $popup_content.find('#mycred-transfer-form-donation');
		var author_id = $t.attr('data-author-id');
		var post_id = $t.attr('data-post-id');
		var giver = $t.attr('data-giver');
		
		if($form.length > 0 && typeof(author_id)!=='undefined' && typeof(post_id)!=='undefined' && $form.find('input.beeteam368_added_field').length === 0){
			$form.prepend('<input class="beeteam368_added_field" type="hidden" name="mycred_new_transfer[in_single_author_id]" value="'+(author_id)+'"><input class="beeteam368_added_field" type="hidden" name="mycred_new_transfer[in_single_post_id]" value="'+(post_id)+'">');
		}
		
		if($form.length > 0 && typeof(vidmov_jav_js_object.mycred_purchases_page)!=='undefined' && $form.find('.buy-points-control').length === 0){
			$form.find('.mycred-submit-transfer').after('<a class="buy-points buy-points-control btnn-default btnn-primary reverse" href="'+(vidmov_jav_js_object.mycred_purchases_page)+'">'+(vidmov_jav_js_object.mycred_purchases_page_text)+'</a>');
		}
		
		if(typeof(vidmov_jav_js_object)!=='undefined' && typeof(vidmov_jav_js_object.virtual_gifts_default_bonus_points)!=='undefined' && vidmov_jav_js_object.virtual_gifts_default_bonus_points!='' && $form.find('.default-bonus-wrapper-control').length === 0){
			var text_input = vidmov_jav_js_object.virtual_gifts_default_bonus_text;
			text_input = text_input.replace('%giver%', giver);
			
			var html_default_bonus = '';
			const myArr = (vidmov_jav_js_object.virtual_gifts_default_bonus_points).split(',');
			if(Array.isArray(myArr)){
				myArr.forEach((entry) => {
					if($.isNumber(entry)){
						html_default_bonus+='<span class="default-bonus default-bonus-control" data-bonus="'+(entry)+'"><i class="fas fa-hand-holding-usd"></i> '+(entry)+'</span>';
					}
				});
			}
			
			if(html_default_bonus!=''){
				$form.find('.select-amount-wrapper').append('<div class="default-bonus-wrapper default-bonus-wrapper-control">'+(html_default_bonus)+'</div>');
				$form.find('.default-bonus-control').on('click', function(){
					var $tb = $(this);
					var amount = $tb.attr('data-bonus');					
					$form.find('.default-bonus-control').removeClass('active-item');
					
					$tb.addClass('active-item');
					$form.find('input[name="mycred_new_transfer[amount]"]').val(amount);

					var enter_text_input = text_input.replace('%points%', amount);
								
					$form.find('input[name="message"]').val(enter_text_input);
				});	
				
				$form.find('input[name="mycred_new_transfer[amount]"]').off('.beeteam368_myCred_amount').on('keypress.beeteam368_myCred_amount keyup.beeteam368_myCred_amount keydown.beeteam368_myCred_amount', function (e) {
					
					$form.find('.default-bonus-control').removeClass('active-item');
					var enter_text_input = text_input.replace('%points%', $(this).val());
					$form.find('input[name="message"]').val(enter_text_input);
					
				});			
			}
		}
	});
}));