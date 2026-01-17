<script>
  import '../app.css';
</script>

<svelte:head>
  <title>ali mir</title>
</svelte:head>

<div class="bg-[#f7f5f2] min-h-screen">
  <header class="p-5 mx-auto">
    <nav
      class="flex row items-center space-x-4 text-[#4C5355] justify-center font-bold"
    >
      <h1 class="text-5xl">ali mir 🚀</h1>
      <a href="/" class="mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">home</a>
      <a href="/writing" class="mt-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">writing</a>
    </nav>
  </header>

  <main>
    <slot />
  </main>

  <footer class="flex justify-center space-x-4 text-[#4C5355] text-lg mt-48 pb-8">
    <a href="mailto:ali.ahmed.mir@gmail.com" class="focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">email</a>
    <a href="https://github.com/ali-mir" class="focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">github</a>
    <a href="https://twitter.com/ali_ahmed_mir" class="focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">twitter</a>
    <a href="https://www.goodreads.com/user/show/108118046-ali-mir" class="focus:outline-none focus:ring-2 focus:ring-[#C44B4F] rounded px-1">goodreads</a>
  </footer>
</div>
