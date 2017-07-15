/* jshint ignore:start */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga( 'create', 'UA-32415253-1', 'auto' );

// The turbolinks:load event fires on the initial page load in addition to
// successive page loads
document.addEventListener('turbolinks:load', function (event) {
  ga('set', 'location', event.data.url);
  ga('send', 'pageview');
});
