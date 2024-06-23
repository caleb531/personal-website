<script lang="ts">
  import { page } from '$app/stores';
  import site from '$data/site.json';
  // To ensure that the page transition from this error page works properly, the
  // status code can only be computed once when the page loads
  const status = $page.status;
  const errorMessage = $page.error?.message;
</script>

<svelte:head>
  {#if status === 404}
    <title>Page Not Found | {site.title}</title>
  {:else}
    <title>{status} Error | {site.title}</title>
  {/if}
</svelte:head>

{#if status === 404}
  <h2>Page Not Found</h2>
  <p>
    Sorry, I couldn't find the page you were looking for. Please
    <a href="mailto:{site.email}">send me an email</a> explaining how you got here and I'll look into
    it. :)
  </p>
  <p>
    In the meantime, watch some
    <a href="https://www.youtube.com/watch?v=y6GaPkkGZGw">adorable red pandas playing in the snow</a
    >!
  </p>
{:else}
  {#if errorMessage}
    <h2>{status}: {errorMessage}</h2>
  {:else}
    <h2>{status} Error</h2>
  {/if}
  <p>Not sure what happened here... sorry about that!</p>
{/if}
