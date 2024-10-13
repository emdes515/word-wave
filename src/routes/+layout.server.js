import { redirect } from '@sveltejs/kit';
import { user } from '$lib/stores/userStore';

export async function load({ url }) {
	let userData;

	user.subscribe((value) => {
		userData = value;
	});

	let currentURL = url.pathname;

	if (user) {
		if (currentURL === '/login') {
			redirect(302, '/');
		}
	} else {
		if (currentURL !== '/login') {
			redirect(302, '/login');
		}
	}
}
