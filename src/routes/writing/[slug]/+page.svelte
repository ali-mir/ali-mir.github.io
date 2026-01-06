<script>
  import '../../../app.css';
  export let data;

  $: isLinksPost = data.post.slug.startsWith('links');
</script>

<svelte:head>
  <title>ali mir / writing / {data.post.slug}</title>
</svelte:head>

<div class={isLinksPost ? 'blogpost-links' : 'blogpost-prose'}>
  {@html data.post.content}
</div>
