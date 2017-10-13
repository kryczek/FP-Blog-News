jQuery( function( $ ) {

  // start fetchpage at 1
  var fetchpage = "1";

  $('a.load-more-button' ).on( 'click', function ( e ) {

      // prevent default click event
      e.preventDefault();
      // update the link text
      $(this).removeClass('load-more-button');
      $(this).addClass('button-clicked');
      $(this).html('<span class="loader"><span class="loader-inner"></span></span>');

      // ajax call
			$.ajax( {
			  url: 'https://www.future-processing.pl/blog/wp-json/wp/v2/posts?per_page=10&page=' + fetchpage,
			  success: function ( data, textStatus, request ) {
  
          // log all the things 
          // console.log ( data );
          // console.log ( textStatus );
          // console.log ( request );
          
          // get total number of pages
				  totalpages = request.getResponseHeader('X-WP-TotalPages');

         // if current page is less than total pages
				  if(fetchpage <= totalpages) {

            // for each item
            $.each( data, function( count, item ) {
              var title = item.title.rendered;
              var link = item.link;
              var excerpt = item.excerpt.rendered;
              var date = item.date;
              var year = date.slice(0,4);
              var day = parseInt(date.substr(8,9));
              var month = parseInt(date.substr(5,2));
              var monthName = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              var customDate =  monthName[month] + ' ' +  day + ', ' + year;

               setTimeout(function () {
                $(".posts").append('<li class="post"><h3><a href="' + link + '" target="_blank">' + title + '</a></h3>'+ ' ' + '<span class="post-date">Posted ' + customDate + '</span>' + excerpt + '<a class="read-more" href="' + link + '" target="_blank">Read more</a>' + '</li>');
              }, 2500);
					});

          // increment fetchpage
					fetchpage++;

					// as long as we still have pages to load
					if(fetchpage <= totalpages) {
						setTimeout(function () {
            $('.load-more a').removeClass('button-clicked');
            $('.load-more a').addClass('load-more-button');
            $('.load-more a').text('Load More');}, 2500);
					} else {
						$('.load-more-button').hide();
						$('.js-load-more').text('Nothing more to load :(');
					}
				}

		  },

       error: function ( data, textStatus, request ) {
            console.log(data.responseText);
        },

		  cache: false
		} );
    
  } );
  
} );