<?php

get_header(); ?>


<div class="content-area" id="primary">
  <main class="site-main" id="main">
    <section>

      <header>
        <?php the_title('<h1 class="entry-title">', '</h1>'); ?>
      </header>

      <?php if( is_user_logged_in() && current_user_can( 'edit_posts' ) ):?>

      <div class="quote-submission-wrapper">
        <form name="quoteform" id="quote-submission-form">
          <div>
            <label for="quote-author">Author of Quote</label>
            <input type="text" name="quote-author" id="quote-author">
          </div>

          <div>
            <label for="quote-content">Quote</label>
            <textarea rows="3" cols="20" name="quote-content" id="quote-content"></textarea>
          </div>

          <div>
            <label for="quote-source">Quote Source</label>
            <input type="text" name="quote-source" id="quote-source">
          </div>

          <div>
            <label for="quote-source-url">Quote Source URL</label>
            <input type="url" name="quote-source-url" id="quote-source-url">
          </div>

          <div>
            <input type="submit" value="Submit Quote" id="quote-submit">
          </div>

          <p class="submit-success-message"></p>
        </form>
      </div>

      <?php else: ?>
        <p><?php echo sprintf('<a href="%1s">%2s</a>', esc_url( wp_login_url() ), 'Click here to log in'); ?></p>

      <?php endif; ?>

    </section>
  
  </main>


</div>









<?php get_footer() ?>