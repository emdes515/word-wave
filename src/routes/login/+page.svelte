<script>
	import Login from '../../components/login/login.svelte';
	import Register from '../../components/login/register.svelte';

	let isLogin = true;
</script>

<div class="flex h-screen w-screen items-center justify-center">
	{#if isLogin}
		<Login bind:isLogin />
	{:else}
		<Register bind:isLogin />
	{/if}
</div>
