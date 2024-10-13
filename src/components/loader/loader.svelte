<script>
	export let isLoading;
</script>

{#if isLoading}
	<div class="absolute z-50 flex h-screen w-screen items-center justify-center bg-slate-100">
		<div>
			<span class="loading loading-ring loading-lg"></span>
		</div>
	</div>
{/if}
