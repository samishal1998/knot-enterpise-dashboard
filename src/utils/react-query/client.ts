import Axios from 'axios';
import { QueryClient } from '@tanstack/react-query';

Axios.defaults.baseURL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://knot-et3wnn6iuq-ue.a.run.app';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 2,
		},
	},
});
