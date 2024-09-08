'use client';
import UserAlreadyAuthorized from './UserAlreadyAuthorized';
import { store } from '../store/store';

export default function Layout({ children }: { children: React.ReactNode }) {
	if (store.getState().user?.sessionId) return <UserAlreadyAuthorized />;

	return children;
}
