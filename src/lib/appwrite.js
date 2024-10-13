import { Client, Account } from 'appwrite';

export const client = new Client()
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
