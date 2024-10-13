<script>
	import Icon from '@iconify/svelte';

	export let isLogin;
</script>

<div class="card m-5 my-5 w-full bg-base-200 shadow-2xl sm:w-96">
	<form action="" class="flex h-full flex-col items-center justify-center gap-4 p-4">
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-account-circle" class="text-2xl" />
			<input type="text" class="grow" placeholder="Nazwa użytkownika" />
		</label>
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-email" class="text-2xl" />
			<input type="text" class="grow" placeholder="Email" />
		</label>
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-lock" class="text-2xl" />
			<input type="text" class="grow" placeholder="Hasło" />
		</label>
		<label class="input input-bordered flex w-full items-center gap-2 sm:w-2/3">
			<Icon icon="ic:baseline-check" class="text-2xl" />
			<input type="text" class="grow" placeholder="Powtórz hasło" />
		</label>
		<button class="btn btn-primary w-full sm:w-2/3">Stwórz konto</button>
		<button
			on:click={() => (isLogin = !isLogin)}
			class="text-1xl text-center font-bold text-primary underline underline-offset-1"
		>
			Masz już konto? Zaloguj się!
		</button>
	</form>
</div>
