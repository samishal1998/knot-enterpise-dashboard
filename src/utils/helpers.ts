import axios from 'axios';

export const SafeJsonParse = (data, errorValue: any = undefined) => {
	try {
		return JSON.parse(data);
	} catch (error) {
		return errorValue;
	}
};

export const resolve = async <T>(promise: PromiseLike<T>): Promise<[T | null, any]> => {
	try {
		let response = await promise;
		return [response, null];
	} catch (error) {
		return [null, error];
	}
};


export const fileToBlob = async (file) => {
	if (file instanceof Blob) {
		return file;
	} else if (file instanceof File) {
		return new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
	} else {
		return new Blob();
	}
};
export const getFromLocal = <T extends any>(key, options?: { parser?: (string) => T }): T => {
	let output = localStorage.getItem(key);
	if (options?.parser) return options?.parser(output);
	else return output as T;
};
export const setToLocal = (key, value, options?: { parser?: Function }) => {
	let input = value;
	if (options?.parser) input = options?.parser(input);
	localStorage.setItem(key, input.toString());
};

export const SafeIntParser = (defaultValue: number) => (value) => {
	let parsed = parseInt(value);
	if (parsed || parsed === 0) return parsed;
	else return defaultValue;
};

const addHours = (date?: Date | null, hours?: number) => {
	if(date){
		hours = hours ?? 1;
		date.setHours(date.getHours()+hours)
	}
	return date;

}

export function getApiBaseUrl(){
	return 'https://mq-api-flwmrtuyba-uc.a.run.app'
	// return 'http://localhost:3000'
	// return 'https://moqawlaty.org/api'
}
export function getBaseUrl(){
	return 'https://moqawlaty.org/api'
}