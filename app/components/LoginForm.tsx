import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/config/firebase.config';
import { motion } from 'framer-motion';

interface LoginFormProps {
	onSwitchToRegister: () => void;
	prefilledEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, prefilledEmail = '' }) => {
	const [email, setEmail] = useState(prefilledEmail);
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err) {
			setError('Błąd logowania. Sprawdź email i hasło.');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex justify-center items-center min-h-screen bg-base-200">
			<div className="card w-96 bg-base-100 shadow-xl">
				<div className="card-body">
					<h2 className="card-title text-center mb-4">Logowanie</h2>
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
								required
								className="input input-bordered w-full"
							/>
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
						</div>
						{error && <p className="text-error text-sm">{error}</p>}
						<div className="form-control mt-6">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isLoading}>
								{isLoading ? (
									<>
										<span className="loading loading-spinner"></span>
										Logowanie...
									</>
								) : (
									'Zaloguj się'
								)}
							</button>
						</div>
					</form>
					<div className="text-center mt-4">
						<p>Nie masz jeszcze konta?</p>
						<button
							onClick={onSwitchToRegister}
							className="btn btn-link">
							Zarejestruj się
						</button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default LoginForm;
