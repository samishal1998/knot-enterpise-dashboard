import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {fireStorage} from "./index";
const bucket = ""
export const getPublicImageUrlFromPath = (path:string) => {
	return `https://firebasestorage.googleapis.com/v0/b/mq-images/o/${encodeURIComponent(
		path,
	)}?alt=media&token=E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z`;
};


export const getFireStorageDownloadURL = async (path:string) => {
	return await getDownloadURL(ref(fireStorage, path));
};

export const putFileInFireStorage = async (file: File | Blob, path:string) => {
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
export const putOfferImagesInFireStorage = async (files: Array<File | Blob>, uid: string) => {
	await putFilesInFireStorage(
		files,
		files.map((_, index) => `/images/offers/${uid}/${index}`),
	);
};

export const downloadFirebaseImage = async (path:string) => {
	return downloadImage(await getFireStorageDownloadURL(path));
};

export const downloadImage = async (url:string) => {
	// url = "https://firebasestorage.googleapis.com/v0/b/contractors-f1d51.appspot.com/o/639ffd5ad6378118d8d38c714153049e.jpg?alt=media&token=7df24106-83d5-4fef-a158-3eb2ec80f55d"
	let response = await fetch(url, {});
	let blob = await response.blob();
	// console.log({url,blob,response})
	return blob;
};
