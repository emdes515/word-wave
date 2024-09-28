import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/app/components/Spinner';

const inter = Inter({ subsets: ['latin'] });

const DynamicAuthWrapper = dynamic<{ children: React.ReactNode }>(
	() => import('@/app/components/AuthWrapper'),
	{
		ssr: false,
		loading: () => <Spinner />,
	}
);

export const metadata: Metadata = {
	title: 'Word Wave',
	description: 'Aplikacja do nauki słówek',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="pl">
			<body className={inter.className}>
				<Suspense fallback={<Spinner />}>
					<DynamicAuthWrapper>{children}</DynamicAuthWrapper>
				</Suspense>
			</body>
		</html>
	);
};

export default RootLayout;
