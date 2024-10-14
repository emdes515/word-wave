<script>
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	export let isLogin;

	let email = '';
	let password = '';

	const checkEmailValidity = () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		isEmailValid = emailRegex.test(email);

		return emailRegex.test(email);
	};

	const checkPasswordValidity = () => {
		isPasswordValid = password.length !== 0;
	};

	let isEmailValid = true;
	let isPasswordValid = true;

	const inputInvalidClass = 'ring-2 ring-red-500';

	const animationClass =
		'tailwindcss-animate animate-in slide-in-from-left animate-out animate-out-to-right';

	const handleLogin = async (event) => {};
</script>

<div
	class={`animate-in fade-in card m-5 max-h-auto w-full bg-base-200 shadow-2xl duration-500 sm:w-96 p-5`}
>
	<form
		action="?/login"
		method="post"
		class="flex h-full flex-col items-center justify-center gap-4 p-2"
		id="loginForm"
		on:submit={handleLogin}
	>
		<div class="flex w-full flex-col items-center">
			{#if !isEmailValid}
				<p in:slide out:slide out class=" my-2 font-bold text-red-500">Niepoprawny email</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2${isEmailValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-email" class="text-2xl" />
				<input
					bind:value={email}
					on:change={checkEmailValidity}
					id="email"
					s
					name="email"
					type="text"
					class="grow"
					placeholder="Email"
				/>
			</div>
		</div>

		<div class="flex w-full flex-col items-center">
			{#if !isPasswordValid}
				<p in:slide out:slide class=" my-2 font-bold text-red-500">Hasło nie może być puste</p>
			{/if}
			<div class="input input-bordered flex w-full items-center gap-2">
				<Icon icon="ic:baseline-lock" class="text-2xl" />
				<input
					bind:value={password}
					on:change={checkPasswordValidity}
					id="password"
					name="password"
					type="password"
					class="grow"
					placeholder="Hasło"
				/>
			</div>
		</div>
		<input type="submit" class="btn btn-primary w-full" value="Zaloguj się" />
		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Nie masz jeszcze konta? Zerejestruj się!
		</button>
	</form>
</div>
