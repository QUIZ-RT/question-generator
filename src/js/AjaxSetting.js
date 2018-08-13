const jQuery = require('jquery');

jQuery(document).on('ajaxSend', () => {
  if(!jQuery('#ajaxSpinner').length){
    jQuery('#ajaxSpinner').remove();
    jQuery('body').append("<div class='qloading' id='ajaxSpinner'></div>");
  }
}) .on('ajaxStop',function() {
    jQuery('#ajaxSpinner').remove();
  });
