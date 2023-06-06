import { useDebugValue, useEffect, useState } from 'react';
import { User } from '@firebase/auth';
import { fireAuth } from '@utils/firebase';
import { useFireToken } from '../stores/token';
import Axios from 'axios';

export const useFirebaseUser = () => {
	const [user, setUser] = useState<User | null>();
	const [authCompleted, setAuthCompleted] = useState<boolean>();
	const fireTokenState = useFireToken();
	useDebugValue({ fireUser: user, authCompleted });
	useEffect(() => {
		fireAuth.onAuthStateChanged(async (user) => {
			let token = await fireTokenState.update();
			// Axios.defaults.headers.Authorization = `Bearer ${token}`;
			setUser(user);
			setAuthCompleted(true);
		});
	}, []);
	return { fireUser: user, authCompleted, fireTokenState };
};
