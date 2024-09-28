import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const initializeFirebase = () => {
	if (!getApps().length) {
		const app = initializeApp(firebaseConfig);
		const db = getFirestore(app);
		const auth = getAuth(app);
		const analystic = getAnalytics(app);
		return { app, db, auth, analystic };
	}
	return {
		app: getApps()[0],
		db: getFirestore(),
		auth: getAuth(),
	};
};

export const { app, db, auth } = initializeFirebase();
