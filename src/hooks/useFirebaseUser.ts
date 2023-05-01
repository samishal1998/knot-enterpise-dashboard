import { useDebugValue, useEffect, useState } from 'react';
import { User } from '@firebase/auth';
import { fireAuth } from '@utils/firebase';

export const useFirebaseUser = () => {
	const [user, setUser] = useState<User|null>();
	const [authCompleted, setAuthCompleted] = useState<boolean>();
	useDebugValue({ fireUser: user, authCompleted });
	useEffect(() => {

		fireAuth.onAuthStateChanged((user) => {
			setUser(user);
			setAuthCompleted(true);
		});
	}, []);
	return { fireUser: user, authCompleted };
};