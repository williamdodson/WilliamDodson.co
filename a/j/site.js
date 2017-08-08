jQuery(function () {
  'use strict';
  /**
   * @function blankWindow
   *
   * @description opens links in a new window
   *
   * @param {string} url - URL for the link
   * @return {boolean} - return false to prevent default link behavior
   */
  function blankWindow(url) {
    var newwindow = window.open(url);

    if (window.focus) {
      newwindow.focus();
    }
    return false;
  }

  /**
   * open any links with the 'js-blank-window' class
   * in a new window (because <code>target="_blank"</code> is so 1999)
   */
  var newWindowLinks = '.js-blank-window'
    , linkTitle = 'Opens in a new window'
    , href;
  
  jQuery(newWindowLinks).each(function() {
    jQuery(this).attr('title', linkTitle);
  });
  
  jQuery('body').delegate(newWindowLinks, 'click keypress', function(e) {
    e.stopPropagation();
    e.preventDefault();

    if(jQuery(e.target).is(newWindowLinks)) {
      href = jQuery(e.target).attr('href');
      blankWindow(href);
    }
  });
});

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
