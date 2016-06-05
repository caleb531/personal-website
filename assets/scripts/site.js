(function ( window, $, FastClick ) {
$(document).ready(function () {

  // Cache elements
  var $$ = {};
  $$.menuToggle = $( '#site-header-nav-toggle' );
  $$.siteHeaderNav = $( '#site-header-nav' );
  $$.siteHeaderNavList = $( '#site-header-nav-list' );

  // Toggle nav menu when nav control is clicked
  $$.menuToggle.on( 'click', function () {
    $$.siteHeaderNav.toggleClass('site-header-nav-open');
  });

  // Do not visit on first click nav items which have submenus
  $$.siteHeaderNavList.on( 'click', 'a', function () {
    var $link = $(this),
      $subMenu = $link.next( '.sub-menu' );
    // If nav menu is open and sub menu exists and sub menu is not open
    if ( $$.siteHeaderNav.hasClass( 'site-header-nav-open' ) && 1 === $subMenu.length && false === $subMenu.hasClass( 'sub-menu-open' ) ) {
      // Close any open submenus
      $( '.sub-menu-open' ).removeClass( 'sub-menu-open' );
      // Open submenu for clicked link
      $subMenu.addClass( 'sub-menu-open' );
      return false;
    }
  });

  // Enable FastClick“
  FastClick.attach( $('body')[0] );

});
}( window, window.Zepto, window.FastClick ));
