// src/routes/signup/+page.server.js

import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite.js';
import { redirect } from '@sveltejs/kit';
import { checkUserExistenceByEmail } from '$lib/server/utils';

export const actions = {
	login: async ({ request, cookies }) => {
		const { account, users } = createAdminClient();

		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		const username = form.get('username');

		const usersList = await users.list();

		const userExists = checkUserExistenceByEmail(usersList, email);

		console.log('userExists', userExists);

		if (!userExists) {
			return {
				status: 401,
				body: {
					error: 'Invalid email'
				}
			};
		}

		let session;

		try {
			session = await account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.error(error);
			return {
				status: 401,
				body: {
					error: 'Invalid password'
				}
			};
		}

		// Set the session cookie with the secret
		cookies.set(SESSION_COOKIE, session.secret, {
			sameSite: 'strict',
			expires: new Date(session.expire),
			secure: true,
			path: '/'
		});

		// Redirect to the account page.
		redirect(302, '/');
	},

	register: async ({ request, cookies }) => {
		const { account, users } = createAdminClient();

		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		const passwordLength = password.length;

		const usersList = await users.list();

		const userExistsYet = checkUserExistenceByEmail(usersList, email);

		let session;

		if (userExistsYet) {
			return {
				status: 401,
				body: {
					error: 'Email has already been taken'
				}
			};
		}

		if (passwordLength < 8) {
			return {
				status: 401,
				body: {
					error: 'Password must be at least 8 characters long'
				}
			};
		}

		try {
			session = await account.create(email, password);
		} catch (error) {
			console.error(error);
			return {
				status: 401,
				body: {
					error: 'Somthing went wrong during registration'
				}
			};
		}

		console.log('session', session);

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
