import React, {useCallback, useEffect, useState} from 'react';
import { getFireStorageDownloadURL } from '@utils/firebase/storage-helpers';

export type FileImageProps = {
	file?: File;
	source: File | string | Blob;
	firebase?: boolean;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export function FileImage(props: FileImageProps) {
	// const [imgProps, setImgProps, updateImgProps] = useUpdateReducer<React.ImgHTMLAttributes<HTMLImageElement>>(props);
	const [imgProps, setImgProps, ] = useState<any>({ ...props });
const updateImgProps = useCallback((props)=>{
	setImgProps((prev)=>({...prev, ...props }));
},[])
	useEffect(() => {
		let { source, firebase } = props;
		if (source) {
			if (source instanceof File) {
				var reader = new FileReader();

				reader.readAsDataURL(source);
				reader.onload = (e) => {
					updateImgProps({ src: e.target?.result });
				};
			} else if (typeof source === 'string') {
				if (firebase) {
					getFireStorageDownloadURL(source).then((src) => {
						updateImgProps({ src });
					});
				} else {
					updateImgProps({ src: source });
				}
			} else if (source instanceof Blob) {
				updateImgProps({ src: URL.createObjectURL(source) });
			}
		}
	}, [props]);
	return <img alt={'image'} onError={() => updateImgProps({ src: '/assets/logo-unavailable.svg' })} {...imgProps} />;
}
export const fileImageKey = (source) => {
	// console.log({source})
	if (source) {
		if (source instanceof File) {
			// console.log(source.name)
			return source.name;
		} else if (typeof source === 'string') {
			return source;
		} else return 'unknown';
	} else return 'undefined';
};
