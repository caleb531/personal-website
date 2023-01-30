<script lang="ts">
  import site from '../data/site.json';
  import ContactLinks from './contact/ContactLinks.svelte';
  const donateBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations';
</script>

<footer class="site-footer">
  <ContactLinks isCompact />
  <p>
    &copy; 2013-{new Date().getFullYear()} Caleb Evans |
    <a href="/privacy-policy/">Privacy Policy</a>
  </p>
  <p>
    Like what I've made? Please
    <a href="{donateBaseUrl}&business={site.email}">donate</a>!
  </p>
</footer>
