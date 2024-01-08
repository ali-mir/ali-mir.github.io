<script>
  import '../../../app.css';
  export let data;
</script>

<svelte:head>
  <title>ali mir / writing / {data.post.slug}</title>
</svelte:head>

<div class="blogpost">
  {@html data.post.content}
</div>
