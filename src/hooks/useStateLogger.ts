import { useEffect } from 'react';

export function useStateLogger(state: any, tag: string = '') {
	useEffect(() => {
		// console.log(tag, state)
	}, [state, tag]);
}
