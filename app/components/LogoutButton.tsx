import { signOut } from 'firebase/auth';
import { auth } from '@/app/config/firebase.config';
import { useState } from 'react';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      // Wylogowanie udane, stan aplikacji zostanie zaktualizowany przez AuthWrapper
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="btn btn-secondary"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Wylogowywanie...
        </>
      ) : (
        'Wyloguj się'
      )}
    </button>
  );
};

export default LogoutButton;