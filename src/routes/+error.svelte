<script lang="ts">
  import { page } from '$app/stores';
</script>

{#if $page.status === 404}
  <h2>Page Not Found</h2>
  <p>
    Sorry, I couldn't find the page you were looking for. Please
    <a href={`mailto:${$page.data.site.email}`}>send me an email</a> explaining how you got here and
    I'll look into it. :)
  </p>
  <p>
    In the meantime, watch some
    <a href="https://www.youtube.com/watch?v=y6GaPkkGZGw">
      adorable red pandas playing in the snow
    </a>!
  </p>
{:else if $page.status === 500}
  <h2>Internal Server Error</h2>
  <p>
    Sorry, my server errored out. Please
    <a href="mailto:caleb@calebevans.me">email me</a> with the URL page you were trying to access, and
    I'll check it out.
  </p>
{:else}
  <h2>{$page.status}: {$page.error?.message}</h2>
  <p>Not sure what happened here...</p>
{/if}
