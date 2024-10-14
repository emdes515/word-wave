<script>
	import Icon from '@iconify/svelte';

	export let isLogin;
</script>

<div class="animate-in fade-in card m-5 my-5 w-full bg-base-200 shadow-2xl duration-500 sm:w-96">
	<form
		action="?/register"
		method="POST"
		class="flex h-full flex-col items-center justify-center gap-4 p-4"
	>
		<div class="flex w-full flex-col items-center">
			<div class="input input-bordered flex w-full items-center gap-2">
				<Icon icon="ic:baseline-account-circle" class="text-2xl" />
				<input
					type="text"
					class="grow"
					placeholder="Nazwa użytkownika"
					id="username"
					name="username"
				/>
			</div>
		</div>
		<div class="flex w-full flex-col items-center">
			<div class="input input-bordered flex w-full items-center gap-2">
				<Icon icon="ic:baseline-email" class="text-2xl" />
				<input type="text" class="grow" placeholder="Email" id="email" name="email" />
			</div>
		</div>

		<div class="flex w-full flex-col items-center">
			<div class="input input-bordered flex w-full items-center gap-2">
				<Icon icon="ic:baseline-lock" class="text-2xl" />
				<input type="text" class="grow" placeholder="Hasło" id="password" name="password" />
			</div>
		</div>
	
		<div class="flex w-full flex-col items-center">
			<div class="input input-bordered flex w-full items-center gap-2">
				<Icon icon="ic:baseline-check" class="text-2xl" />
				<input
					type="text"
					class="grow"
					placeholder="Powtórz hasło"
					id="confirm-password"
					name="confirm-password"
				/>
			</div>
		</div>

		<button class="btn btn-primary w-full">Stwórz konto</button>
		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Masz już konto? Zaloguj się!
		</button>
	</form>
</div>
