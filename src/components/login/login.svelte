<script>
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import { slide } from 'svelte/transition';
	export let isLogin;

	let email = '';
	let password = '';

	let isLoading = false;

	const checkEmailValidity = () => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		isEmailValid = emailRegex.test(email);

		return emailRegex.test(email);
	};

	const checkPasswordValidity = () => {
		const isPasswordLongerThen8 = password.length >= 8;
		isPasswordValid = isPasswordLongerThen8;

		return isPasswordLongerThen8;
	};

	let isEmailValid = true;
	let isPasswordValid = true;

	const inputInvalidClass = 'ring-2 ring-red-500';

	const handleLogin = async (event) => {
		checkEmailValidity();
		checkPasswordValidity();

		if (!isEmailValid) {
			event.preventDefault();
			toast.error('Niepoprawny email');
		}

		if (!isPasswordValid) {
			event.preventDefault();
			toast.error('Hasło nie może być puste');
		}

		if (isEmailValid || isPasswordValid) {
			isLoading = true;
		}
	};
</script>

<div
	class={`animate-in fade-in max-h-auto card m-5 w-full bg-base-200 p-5 shadow-2xl duration-500 sm:w-96`}
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
				<p in:slide out:slide out class="mb-2 self-start text-xs font-bold text-red-500">
					Niepoprawny email
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isEmailValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-email" class="text-2xl" />
				<input
					bind:value={email}
					on:input={checkEmailValidity}
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
				<p in:slide out:slide class=" mb-2 self-start text-xs font-bold text-red-500">
					Hasło musi zawierać co najmniej 8 znaków
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isPasswordValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-lock" class="text-2xl" />
				<input
					bind:value={password}
					on:input={checkPasswordValidity}
					id="password"
					name="password"
					type="password"
					class="grow"
					placeholder="Hasło"
				/>
			</div>
		</div>

		<div class="btn btn-primary w-full">
			{#if isLoading}
				<span class="loading loading-spinner loading-sm"></span>
			{:else}
				<input type="submit" class="w-full" value="Zaloguj się" />
			{/if}
		</div>

		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Nie masz jeszcze konta? Zerejestruj się!
		</button>
	</form>
</div>
