$(function(){
  var url = window.location,
  		path = url.pathname,
  		animspeed = 777;
    
  // only run this if this is the project details page
  if (path.indexOf('projects') >= 0) {
    $('.thumbs li a').each(function() {
    	$(this).on('click', function(e) {
    		e.preventDefault();
    		var href = $(this).attr('href'),
    				shot = '#shot';
    		$(shot).animate({
    			opacity: 0
    		}, animspeed, function() {
    			$(this).attr('src', href);
    			$(this).animate({
    				opacity: 1
    			}, animspeed);
    			$('html, body').animate({
			    	scrollTop: ($('.main').offset().top - 24)// offset top plus 24px
			    }, animspeed);
    		});
    		//$(shot).attr('src', href);
    	});
    });
  }
});