import { create } from 'zustand';
import { fireAuth } from '@utils/firebase';
import Axios from 'axios';

export type FireTokenState = {
	token: string | undefined;
	isLoading: boolean;
	update: () => Promise<string | undefined>;
};
export const useFireToken = create<FireTokenState>((set) => ({
	token: undefined,
	isLoading: false,
	update: async () => {
		try {
			set({ isLoading: true });

			let token = await fireAuth.currentUser?.getIdToken(true);
			if (token) {
				set({ token });
				Axios.defaults.headers.Authorization = `Bearer ${token}`;
			}
			return token;
		} catch (e) {
			set({ token: undefined });
		} finally {
			set({ isLoading: false });
		}
	},
}));
