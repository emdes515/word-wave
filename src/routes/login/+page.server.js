import { redirect } from '@sveltejs/kit';
import { loginAction } from '$lib/actions/login.js';
import { registerAction } from '$lib/actions/register.js';

export const actions = {
	login: loginAction,
	register: registerAction
};

export async function load({ locals }) {
	if (locals.user) {
		redirect(301, '/');
	}
}
