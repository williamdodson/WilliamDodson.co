// responsive nav
var nav = responsiveNav(".nav-collapse", {
  label: 'Menu'
});

// jquery ready
jQuery(function(){
  var url = window.location
    , path = url.pathname
    , animspeed = 777;
    
  // only run this if this is the project details page
  if (path.indexOf('projects') >= 0) {
    jQuery('.thumbs li a').each(function() {
      jQuery(this).on('click', function(e) {
        e.preventDefault();
        var href = jQuery(this).attr('href'),
            shot = '#shot';
        jQuery(shot).animate({
          opacity: 0
        }, animspeed, function() {
          jQuery(this).attr('src', href);
          jQuery(this).animate({
            opacity: 1
          }, animspeed);
          jQuery('html, body').animate({
            scrollTop: (jQuery('.main').offset().top - 24)// offset top plus 24px
          }, animspeed);
        });
      });
    });
  }
});
