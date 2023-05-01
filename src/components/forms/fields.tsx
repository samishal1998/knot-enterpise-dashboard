import React, {
	useRef,
	useState,
} from 'react';
export const useFileInput = ({ single, mimeType }) => {
	const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
	const fileInput = useRef<HTMLInputElement>(null);
	const openInput = () => {
		fileInput.current?.click();
	};
	const clear = () => {
		setSelectedFiles([]);
		if (fileInput.current) fileInput.current.value = '';
	};
	const onFileChange = (e) => {
		if (single) {
			setSelectedFiles([...e.target.files]);
		} else {
			setSelectedFiles([...selectedFiles, ...e.target.files]);
		}
		if (fileInput.current) fileInput.current.value = '';
	};

	return {
		onFileChange,
		multiple: !Boolean(single),
		mimeType,
		fileInput,
		openInput,
		clear,
		selectedFiles,
		setSelectedFiles,
	};
};
export const bindFileInputElement = (fileInputData) => {
	return {
		ref: fileInputData.fileInput,
		type: 'file',
		style: { display: 'none' },
		onChangeCapture: fileInputData.onFileChange,
		multiple: fileInputData.multiple,
		accept: fileInputData.mimeType,
	};
};

