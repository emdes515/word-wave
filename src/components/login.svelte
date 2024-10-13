<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/userStore.js';

	export let isLogin;

	let email = '';
	let password = '';

	const handleLogin = async (event) => {
		event.preventDefault();

		console.log(email, password);

		user.login(email, password);
	};
</script>

<div class="card m-5 h-72 w-full bg-base-200 shadow-2xl sm:w-96">
	<form on:submit={handleLogin} class="flex h-full flex-col items-center justify-center gap-4 p-4">
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-email" class="text-2xl" />
			<input bind:value={email} type="text" class="grow" placeholder="Email" />
		</label>
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-lock" class="text-2xl" />
			<input bind:value={password} type="password" class="grow" placeholder="Hasło" />
		</label>
		<input type="submit" class="btn btn-primary w-full sm:w-2/3" value="Zaloguj się" />
		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Nie masz jeszcze konta? Zerejestruj się
		</button>
	</form>
</div>
