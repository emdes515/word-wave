import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, createSessionClient } from '$lib/server/appwrite.js';

export async function load({ locals }) {
	if (!locals.user) redirect(302, '/login');

	return {
		user: locals.user
	};
}

// Define our log out endpoint/server action.
export const actions = {
	logout: async (event) => {
		const { account } = createSessionClient(event);

		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE, { path: '/' });

		redirect(302, '/login');
	}
};
