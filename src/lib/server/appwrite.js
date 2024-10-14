import { Client, Account, Users } from 'node-appwrite';

export const SESSION_COOKIE = 'my-custom-session';

export function createAdminClient() {
	const client = new Client()
		.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
		.setProject(import.meta.env.VITE_APPWRITE_PROJECT)
		.setKey(import.meta.env.VITE_APPWRITE_KEY); // Set the Appwrite API key!

	// Return the services we want to use.
	return {
		get account() {
			return new Account(client);
		},
		get users() {
			return new Users(client);
		}
	};
}

export function createSessionClient(event) {
	const client = new Client()
		.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
		.setProject(import.meta.env.VITE_APPWRITE_PROJECT);

	// Extract our custom domain's session cookie from the request
	const session = event.cookies.get(SESSION_COOKIE);
	if (!session) {
		throw new Error('No user session');
	}

	client.setSession(session);

	// Return the services we want to use.
	return {
		get account() {
			return new Account(client);
		}
	};
}
