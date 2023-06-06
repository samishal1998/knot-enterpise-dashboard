import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireStorage } from './index';

const bucket = 'knot-k6789.appspot.com';
const token = 'E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z';
export const getPublicImageUrlFromPath = (path: string) => {
	let url = new URL(
		`/v0/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(path)}`,
		'https://firebasestorage.googleapis.com',
	);
	url.searchParams.append('alt', 'media');
	url.searchParams.append('token', token);
	return url.toString();
};

export const getFireStorageDownloadURL = async (path: string) => {
	return await getDownloadURL(ref(fireStorage, path));
};

export const putFileInFireStorage = async (file: File | Blob, path: string) => {
	const storageRef = ref(fireStorage, path);
	try {
		await uploadBytes(storageRef, file);
	} catch (e) {
		throw 'Failed to Upload';
	}
};
export const putFilesInFireStorage = async (files: Array<File | Blob>, paths: string[]) => {
	await Promise.all(files.map((file, index) => putFileInFireStorage(file, paths[index])));
};

export const downloadFirebaseImage = async (path: string) => {
	return downloadImage(await getFireStorageDownloadURL(path));
};

export const downloadImage = async (url: string) => {
	// url = "https://firebasestorage.googleapis.com/v0/b/contractors-f1d51.appspot.com/o/639ffd5ad6378118d8d38c714153049e.jpg?alt=media&token=7df24106-83d5-4fef-a158-3eb2ec80f55d"
	let response = await fetch(url, {});
	let blob = await response.blob();
	// console.log({url,blob,response})
	return blob;
};
