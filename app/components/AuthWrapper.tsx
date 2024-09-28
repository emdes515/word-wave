'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/config/firebase.config';
import LoginForm from '@/app/components/LoginForm';
import RegisterForm from '@/app/components/RegisterForm';
import Spinner from '@/app/components/Spinner';
import LogoutButton from '@/app/components/LogoutButton';

interface AuthWrapperProps {
	children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isRegistering, setIsRegistering] = useState(false);
	const [prefilledEmail, setPrefilledEmail] = useState('');

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (!user) {
		return isRegistering ? (
			<RegisterForm onSwitchToLogin={(email) => {
				setIsRegistering(false);
				if (email) setPrefilledEmail(email);
			}} />
		) : (
			<LoginForm 
				onSwitchToRegister={() => setIsRegistering(true)} 
				prefilledEmail={prefilledEmail}
			/>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="navbar bg-base-100">
				<div className="flex-1">
					<a className="btn btn-ghost normal-case text-xl">Word Wave</a>
				</div>
				<div className="flex-none">
					<LogoutButton />
				</div>
			</div>
			<div className="container mx-auto p-4">{children}</div>
		</div>
	);
};

export default AuthWrapper;
