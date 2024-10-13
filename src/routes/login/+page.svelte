<script>
	import Login from '../../components/login.svelte';
	import Register from '../../components/register.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let isLogin = true;


</script>

<div class="flex h-screen w-screen items-center justify-center">
	{#if isLogin}
		<Login bind:isLogin />
	{:else}
		<Register bind:isLogin />
	{/if}
</div>
