<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/userStore.js';
	import Loader from '../components/loader/loader.svelte';

	const handleLogout = async () => {
		await user.logout();
		goto('/login');
	};
</script>

<h1>Dashboard</h1>

<button class="btn" on:click={handleLogout}>Wyloguj się</button>
