<script>
	export let isLoading;
</script>

{#if isLoading}
	<div class="absolute z-50 flex h-screen bg-slate-100 w-screen items-center justify-center">
		<div>
			<span class="loading loading-ring w-24"></span>
		</div>
	</div>
{/if}
