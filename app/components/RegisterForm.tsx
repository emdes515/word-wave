import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/app/config/firebase.config';
import { serverTimestamp } from 'firebase/firestore';

interface RegisterFormProps {
	onSwitchToLogin: (email?: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [showExistingUserModal, setShowExistingUserModal] = useState(false);
	const [isCheckingEmail, setIsCheckingEmail] = useState(false);
	const [passwordError, setPasswordError] = useState('');

	const validatePassword = (password: string) => {
		if (password.length < 6) {
			return 'Hasło musi mieć co najmniej 6 znaków';
		}
		if (!/[A-Z]/.test(password)) {
			return 'Hasło musi zawierać przynajmniej jedną dużą literę';
		}
		return '';
	};

	useEffect(() => {
		setPasswordError(validatePassword(password));
	}, [password]);

	const checkExistingUser = async (email: string) => {
		const usersRef = collection(db, 'users');
		const q = query(usersRef, where("email", "==", email));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	};

	const handleEmailBlur = useCallback(async () => {
		if (email) {
			setIsCheckingEmail(true);
			const exists = await checkExistingUser(email);
			setIsCheckingEmail(false);
			if (exists) {
				setShowExistingUserModal(true);
			}
		}
	}, [email]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		if (passwordError) {
			setError(passwordError);
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError('Hasła nie są identyczne');
			setIsLoading(false);
			return;
		}

		try {
			const userExists = await checkExistingUser(email);
			if (userExists) {
				setShowExistingUserModal(true);
				setIsLoading(false);
				return;
			}

			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				email: user.email,
				createdAt: serverTimestamp(),
			});

			// Rejestracja udana, AuthWrapper zaktualizuje stan aplikacji
		} catch (err) {
			if (err instanceof Error) {
				setError(`Błąd rejestracji: ${err.message}`);
			} else {
				setError('Wystąpił nieznany błąd podczas rejestracji');
			}
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const ExistingUserModal = () => (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-lg shadow-xl">
				<h3 className="text-lg font-bold mb-4">Użytkownik już istnieje</h3>
				<p className="mb-4">
					Użytkownik o podanym adresie email już istnieje. Czy chcesz się zalogować?
				</p>
				<div className="flex justify-end space-x-2">
					<button
						className="btn btn-outline"
						onClick={() => setShowExistingUserModal(false)}>
						Anuluj
					</button>
					<button
						className="btn btn-primary"
						onClick={() => onSwitchToLogin(email)}>
						Przejdź do logowania
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center min-h-screen bg-base-200">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-center mb-4">Rejestracja</h2>
					<form
						onSubmit={handleSubmit}
						className="space-y-4">
						<div className="form-control">
						<label
							className="label"
							htmlFor="email">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							onBlur={handleEmailBlur}
							required
							className={`input input-bordered w-full ${isCheckingEmail ? 'input-disabled' : ''}`}
						/>
						{isCheckingEmail && <span className="loading loading-spinner loading-xs mt-2"></span>}
					</div>
					<div className="form-control">
						<label
							className="label"
							htmlFor="password">
							<span className="label-text">Hasło</span>
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="input input-bordered w-full"
						/>
						{passwordError && <p className="text-error text-sm mt-1">{passwordError}</p>}
					</div>
					<div className="form-control">
						<label
							className="label"
							htmlFor="confirmPassword">
							<span className="label-text">Potwierdź hasło</span>
						</label>
						<input
							type="password"
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="input input-bordered w-full"
						/>
					</div>
					{error && <p className="text-error text-sm">{error}</p>}
					<div className="form-control mt-6">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={isLoading || isCheckingEmail || !!passwordError}>
							{isLoading ? (
								<>
									<span className="loading loading-spinner"></span>
									Rejestracja...
								</>
							) : (
								'Zarejestruj się'
							)}
						</button>
					</div>
					</form>
					<div className="text-center mt-4">
						<p>Masz już konto?</p>
						<button
							onClick={() => onSwitchToLogin()}
							className="btn btn-link">
							Zaloguj się
						</button>
					</div>
				</div>
			</div>
			{showExistingUserModal && <ExistingUserModal />}
		</motion.div>
	);
};

export default RegisterForm;