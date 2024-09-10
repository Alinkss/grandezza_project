'use client';
import UserAlreadyAuthorized from './UserAlreadyAuthorized';
import { store } from '../store/store';
import Footer from '@/components/Footer/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	if (store.getState().user?.sessionId) return <UserAlreadyAuthorized />;

	return (
		<>
			{children}
			<Footer />
		</>
	);
}
