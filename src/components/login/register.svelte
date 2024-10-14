<script>
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';

	export let isLogin;

	let email, password, username, confirmPassword;

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

	const checkUsernameValidity = () => {
		const isUsernameNotEmpty = username.length !== 0;

		isUsernameValid = isUsernameNotEmpty;

		return isUsernameNotEmpty;
	};

	const checkConfirmPasswordValidity = () => {
		const isPasswordMatch = password === confirmPassword;
		isConfirmPasswordMatch = isPasswordMatch;

		return isPasswordMatch;
	};

	let isEmailValid = true;
	let isPasswordValid = true;
	let isUsernameValid = true;
	let isConfirmPasswordMatch = true;

	const handleRegister = (event) => {
		isLoading = true;
		if (!checkEmailValidity() || !checkPasswordValidity() || !checkUsernameValidity()) {
			event.preventDefault();
		}
	};

	const inputInvalidClass = 'ring-2 ring-red-500';
</script>

<div class="animate-in fade-in card m-5 my-5 w-full bg-base-200 shadow-2xl duration-500 sm:w-96">
	<form
		action="?/register"
		method="POST"
		on:submit={handleRegister}
		class="flex h-full flex-col items-center justify-center gap-4 p-4"
	>
		<div class="flex w-full flex-col items-center">
			{#if !isUsernameValid}
				<p in:slide out:slide class="mb-2 self-start text-xs font-bold text-red-500">
					Nazwa użytkownika nie może być pusta
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isUsernameValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-account-circle" class="text-2xl" />
				<input
					bind:value={username}
					on:input={checkUsernameValidity}
					type="text"
					class="grow"
					placeholder="Nazwa użytkownika"
					id="username"
					name="username"
				/>
			</div>
		</div>
		<div class="flex w-full flex-col items-center">
			{#if !isEmailValid}
				<p in:slide out:slide class="mb-2 self-start text-xs font-bold text-red-500">
					Niepoprawny email
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isEmailValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-email" class="text-2xl" />
				<input
					type="text"
					class="grow"
					placeholder="Email"
					id="email"
					name="email"
					bind:value={email}
					on:input={checkEmailValidity}
				/>
			</div>
		</div>

		<div class="flex w-full flex-col items-center">
			{#if !isPasswordValid}
				<p in:slide out:slide class="mb-2 self-start text-xs font-bold text-red-500">
					Hasło musi zawierać conajmiej 8 znaków
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isPasswordValid ? '' : inputInvalidClass}`}
			>
				<Icon icon="ic:baseline-lock" class="text-2xl" />
				<input
					type="password"
					class="grow"
					placeholder="Hasło"
					id="password"
					name="password"
					bind:value={password}
					on:input={() => {
						checkPasswordValidity();
						checkConfirmPasswordValidity();
					}}
				/>
			</div>
		</div>

		<div class="flex w-full flex-col items-center">
			{#if isPasswordValid === true && !isConfirmPasswordMatch}
				<p in:slide out:slide class="mb-2 self-start self-start text-xs font-bold text-red-500">
					Hasła nie są takie same
				</p>
			{/if}
			<div
				class={`input input-bordered relative flex w-full items-center gap-2 ${isPasswordValid === true && !isConfirmPasswordMatch ? inputInvalidClass : ''}`}
			>
				<Icon icon="ic:baseline-check" class="text-2xl" />
				<input
					type="password"
					class="grow"
					placeholder="Powtórz hasło"
					id="confirm-password"
					name="confirm-password"
					bind:value={confirmPassword}
					on:input={checkConfirmPasswordValidity}
				/>
			</div>
		</div>

		<div class="btn btn-primary w-full">
			{#if isLoading}
				<span class="loading loading-spinner loading-sm"></span>
			{:else}
				<input type="submit" class="w-full" value="Stwórz konto" />
			{/if}
		</div>

		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Masz już konto? Zaloguj się!
		</button>
	</form>
</div>
