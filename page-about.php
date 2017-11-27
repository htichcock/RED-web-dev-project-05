<?php
/**
 * The template for displaying the About page.
 *
 * @package QOD_Theme
 */

get_header(); ?>

<div id="primary" class="content-area">
   <main id="main" class="site-main" role="main">

    <section class="about">
      <header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
      </header><!-- .entry-header -->

      <?php if ( have_posts() ) : the_post(); the_content(); endif;?>
  	</section>

  </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>