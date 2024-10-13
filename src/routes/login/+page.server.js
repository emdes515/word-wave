// src/routes/signup/+page.server.js

import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { ID, OAuthProvider } from 'node-appwrite';

export const actions = {
	login: async ({ request, cookies }) => {
		// Extract the form data.
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		// Create the Appwrite client.
		const { account } = createAdminClient();

		const session = await account.createEmailPasswordSession(email, password);

		// Set the session cookie with the secret
		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		// Redirect to the account page.
		redirect(302, '/');
	}
};

export async function load({ locals }) {
	if (locals.user) {
		redirect(301, '/');
	}
}
