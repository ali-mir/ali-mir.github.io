<script>
	import "../../../app.css";
	export let data;
</script>

<style>
	h1 {
		@apply font-bold text-[#C44B4F];
	}
	h2 {
		@apply font-bold;
	}
</style>

<div>{@html data.post.content}</div>