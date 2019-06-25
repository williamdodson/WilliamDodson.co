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

'use strict';

/**
 * Define our custom form validation messages and display
 */
var fullName          = document.getElementById('full-name')
  , phone             = document.getElementById('phone')
  , email             = document.getElementById('email')
  , projectType       = document.getElementById('project-type')
  , budget            = document.getElementById('budget')
  , explanation       = document.getElementById('explanation')
  , webSections       = document.getElementById('web-sections')
  , content           = document.getElementById('content')
  , webSectionsField  = document.getElementById('web-sections-field')
  , contentField      = document.getElementById('content-field');

/**
 * Toggle the display of elements as needed
 * @param {array} itemsToToggle
 */
function toggleDisplayCSS(itemsToToggle) {
  // loop over the items we need to toggle the display of
  itemsToToggle.forEach(function (item) {
    var children = item.children
      , numChildren = children.length
      , i;

    // loop over this item's children
    for(i = 0; i < numChildren; i++) {
      // check to see if this child is a form field and set the required attribute
      switch(children[i].type) {
        case 'textarea': 
        case 'text':
        case 'checkbox':
        case 'radio':
          children[i].setAttribute('required', true);
          break;
        default:
          // fall through...
      }
    }

    // remove the hidden CSS class from this item
    item.classList.remove('hidden');
    // remove the hidden attribute from this item
    item.removeAttribute('hidden');
  });
}

/**
 * Add an event listener on the projectType select to listen for when
 * the user selects the 'Website Design' option. If chosen, we will
 * display the hidden form fields specifically for web design
 */
if(!!projectType) {
  projectType.addEventListener('change', function (e) {
    if(this.value === 'Website Design') {
      toggleDisplayCSS([webSectionsField, contentField]);
    }
  });
}

/**
 * fullName
 */
if(!!fullName) {
  fullName.addEventListener('input', function (e) {
    if(fullName.validity.typeMismatch) {
      fullName.setCustomValidity('Your full name is required');
    } else {
      fullName.setCustomValidity('');
    }
  });
}
/**
 * email
 */
if(!!email) {
  email.addEventListener('input', function (e) {
    if(email.validity.typeMismatch) {
      email.setCustomValidity('Please provide a valid email address');
    } else {
      email.setCustomValidity('');
    }
  });
}

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
