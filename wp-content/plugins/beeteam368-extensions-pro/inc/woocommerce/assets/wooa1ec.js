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
		if(action === 'open_download_files_popup_woo'){
			var rnd_id = 'submit-post-add-'+(Math.floor(Math.random() * 99999));
			
			popup_content.find('.beeteam368-download-files-wrapper-control').attr('id', rnd_id);
			
			var instance = OverlayScrollbars(document.getElementById(rnd_id), {
				scrollbars: {
					autoHide: 'leave',
				},
				overflowBehavior: {
					x: 'hidden',
					y: 'scroll',
				}
			});
		}
	});
}));	