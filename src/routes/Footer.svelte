<script lang="ts">
  import { resolve } from '$app/paths';
  import site from '$data/site.json';
  import ContactLinks from '$routes/contact/ContactLinks.svelte';
</script>

<footer class="site-footer">
  <ContactLinks isCompact />
  <p>
    <small>
      &copy; 2013-{new Date().getFullYear()} Caleb Evans |
      <a href={resolve('/privacy-policy/')}>Privacy Policy</a>
    </small>
  </p>
  <p>
    Like what I've made? Please
    <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
    <a href={site.paypalDonateUrl}>donate</a>!
  </p>
</footer>
