jQuery( function( $ ) {

  // start fetchpage at 1
  var fetchpage = "1";

  $('a.load-more__button' ).on( 'click', function ( e ) {

      // prevent default click event
      e.preventDefault();

      // update the link text
      $(this).text('Loading posts...');

      // ajax call
			$.ajax( {
			  url: 'https://www.future-processing.pl/blog/wp-json/wp/v2/posts?per_page=5&page=' + fetchpage,
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

              $(".posts").append('<li class="post"><a href="' + link + '" target="_blank">' + title + '</a>'+ excerpt +'</li>');
					});

          // increment fetchpage
					fetchpage++;

					// as long as we still have pages to load
					if(fetchpage <= totalpages) {
						$('.load-more a').text('Load More News');
					} else {
						$('.load-more__button').hide();
						$('.js-load-more').text('No more news to load.');
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