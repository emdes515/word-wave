import { checkUserExistenceByEmail, checkUserExistenceByName } from '$lib/server/utils';
import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE, createAdminClient } from '$lib/server/appwrite';
import { ID } from 'node-appwrite';

export const registerAction = async ({ request, cookies }) => {
	const { account, users } = createAdminClient();

	const form = await request.formData();
	const email = form.get('email');
	const password = form.get('password');
	const username = form.get('username');

	if (!password || !email || !username) {
		return {
			status: 400,
			body: {
				error: 'All fields are required'
			}
		};
	}

	const passwordLength = password.length;

	const usersList = await users.list();

	const userWithThisEmailExistsYet = checkUserExistenceByEmail(usersList, email);
	const userWithThisUsernameExistsYet = checkUserExistenceByName(usersList, username);

	let session;

	if (userWithThisEmailExistsYet || userWithThisUsernameExistsYet) {
		return {
			status: 409,
			body: {
				error: `${userWithThisEmailExistsYet ? 'Email' : 'Username'} already in use`
			}
		};
	}

	if (passwordLength < 8) {
		return {
			status: 400,
			body: {
				error: 'Password must be at least 8 characters long'
			}
		};
	}

	try {
		await account.create(ID.unique(), email, password, username);
		session = await account.createEmailPasswordSession(email, password);
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: {
				error: 'Somthing went wrong during registration'
			}
		};
	}

	cookies.set(SESSION_COOKIE, session.secret, {
		sameSite: 'strict',
		expires: new Date(session.expire),
		secure: true,
		path: '/'
	});

	redirect(302, '/');
};
