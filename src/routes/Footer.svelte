<script lang="ts">
  import site from '$data/site.json';
  import ContactLinks from '$routes/contact/ContactLinks.svelte';
  const donateBaseUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations';
</script>

<footer class="site-footer">
  <ContactLinks isCompact />
  <p>
    <small>
      &copy; 2013-{new Date().getFullYear()} Caleb Evans |
      <a href="/privacy-policy/">Privacy Policy</a>
    </small>
  </p>
  <p>
    Like what I've made? Please
    <a href="{donateBaseUrl}&business={site.email}">donate</a>!
  </p>
</footer>
