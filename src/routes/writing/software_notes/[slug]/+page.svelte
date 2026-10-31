<script>
  import '../../../../app.css';
  import 'highlight.js/styles/github.css';
  export let data;
</script>

<svelte:head>
  <title>ali mir / writing / {data.post.slug}</title>
</svelte:head>

<div class="blogpost-prose">
  {@html data.post.content}
</div>
