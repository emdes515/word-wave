import { checkUserExistenceByEmail } from '$lib/server/utils';
import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite';

export const loginAction = async ({ request, cookies }) => {
	const { account, users } = createAdminClient();

	const form = await request.formData();
	const email = form.get('email');
	const password = form.get('password');

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
};
