<script>
  import '../app.css';
</script>

<body class="bg-[#e9e9e9]">
  <div class="p-5 mx-auto w-96">
    <nav
      class="flex row items-center space-x-4 text-[#4C5355] justify-center font-bold"
    >
      <h1 class="text-5xl">ali mir 🚀</h1>
      <a href="/" class="mt-2 text-lg">home</a>
      <a href="/writing" class="mt-2 text-lg">writing</a>
    </nav>
  </div>

  <slot />

  <nav class="flex justify-center space-x-4 text-[#4C5355] text-lg mt-48">
    <a href="mailto:ali.ahmed.mir@gmail.com">email</a>
    <a href="https://github.com/ali-mir">github</a>
    <a href="https://twitter.com/ali_ahmed_mir">twitter</a>
    <a href="https://www.goodreads.com/user/show/108118046-ali-mir">goodreads</a
    >
  </nav>
</body>
