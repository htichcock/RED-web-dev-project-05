(function($) {
$(function() {
  //this is for going back to home page and single post pages
  if ($('.entry-content').length) {
    history.replaceState({
      id: post_vars.id,
      slug: post_vars.slug, 
      source: post_vars.source, 
      source_url: post_vars.source_url,
      content: '<p>'+post_vars.content+'</p>', 
      author: post_vars.title
    }, null, document.location.href);
  }
  $('#new-quote-button').on('click', function(e){
    var url = api_vars.root_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1'; //TODO: get rid of chance for repeating post
    e.preventDefault();
    $.ajax({
      method: 'get',
      url: url,
      dataType: 'json'
    }).done( function(data) {
      $('.entry-title').text(data[0].title.rendered);
      $('.entry-content').html(data[0].content.rendered);
      if (data[0]._qod_quote_source && data[0]._qod_quote_source_url) {
        $('.source').html('<a>'+ data[0]._qod_quote_source +'</a>');
        $('.source a').attr('href' , data[0]._qod_quote_source_url); 
      } else if ( data[0]._qod_quote_source ) {
        $('.source').html(data[0]._qod_quote_source);
      } else {
        $('.source').html('');
      }
      history.pushState({ id: data[0].id,
                          slug: data[0].slug, 
                          source: data[0]._qod_quote_source, 
                          source_url: data[0]._qod_quote_source_url,
                          content: data[0].content.rendered, 
                          author: data[0].title.rendered
                        }, null, api_vars.home_url + '/' + data[0].slug);
    }).fail( function() {
      $('.entry-title').text('QuotesOnDev');
      $('.entry-content').html('<p>Oops! Something went wrong. Please try again!</p>\n');
      $('.source').html('<a>Take me home!</a>');
      $('.source a').attr('href' , api_vars.home_url);   
    }).always( function() {


    });
    

  });
  window.addEventListener( 'popstate' , function(e) {
  /* Used histroy state to store post info. found this to be pretty performant! */
    if(  e.state !== null && e.state.content ) {
      $('.entry-title').text(e.state.author);
      $('.entry-content').html(e.state.content);
      if (e.state.source && e.state.source_url) {
        $('.source').html('<a>'+ e.state.source +'</a>');
        $('.source a').attr('href' , e.state.source_url); 
      } else if ( e.state.source ) {
        $('.source').html(e.state.source);
      } else {
        $('.source').html('');
      }
    }
  });

  $('#quote-submit').on('click', function(e) {
    e.preventDefault();
    if ( $('#quote-author').val() && $('#quote-content').val() ) {
      $.ajax({
        method: 'post',
        url: api_vars.root_url + 'wp/v2/posts/',
        data: { 
            title: $('#quote-author').val(),
            content: $('#quote-content').val(),
            _qod_quote_source: $('#quote-source').val(),
            _qod_quote_source_url: $('#quote-source-url').val(),
            status: 'publish'
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader( 'X-WP-Nonce', api_vars.nonce );
        }
      }).done( function() {

        $('.submit-success-message').text(api_vars.success);
        $('.submit-success-message').removeClass('fail');

      }).fail( function() {

        $('.submit-success-message').text(api_vars.failure);
        $('.submit-success-message').addClass('fail');

      });
    } else {

      $('.submit-success-message').text('Author of Quote and Quote are required fields.');
      $('.submit-success-message').addClass('fail');

    }
 });


});
})(jQuery);