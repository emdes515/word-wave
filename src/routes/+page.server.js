import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, createSessionClient } from '$lib/server/appwrite.js';

export async function load({ locals }) {
	// Logged out users can't access this page.
	if (!locals.user) redirect(302, '/login');

	// Pass the stored user local to the page.
	return {
		user: locals.user
	};
}

// Define our log out endpoint/server action.
export const actions = {
	logout: async (event) => {
		// Create the Appwrite client.
		const { account } = createSessionClient(event);

		// Delete the session on Appwrite, and delete the session cookie.
		await account.deleteSession('current');
		event.cookies.delete(SESSION_COOKIE, { path: '/' });

		// Redirect to the sign up page.
		redirect(302, '/login');
	}
};
