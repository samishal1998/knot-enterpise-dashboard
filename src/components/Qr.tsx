import { useEffect, useId, useRef, useState } from 'react';
import QRCodeStyling, { FileExtension } from 'qr-code-styling';
import { LoadingButton } from '@mui/lab';
import { Download } from '@mui/icons-material';

export const Qr = ({ content, name }) => {
	const id = useId();

	const qrCode = new QRCodeStyling({
		width: 512,
		height: 512,
		type: 'svg',
		data: content,
		dotsOptions: {
			color: '#000',
			type: 'rounded',
		},
		backgroundOptions: {
			color: '#fff0',
		},
		imageOptions: {
			crossOrigin: 'anonymous',
			margin: 20,
		},
		qrOptions: {
			errorCorrectionLevel: 'H',
		},
	});

	const [downloading, setDownloading] = useState<FileExtension>();
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) qrCode.append(ref.current);
	}, []);

	useEffect(() => {
		qrCode.update({
			data: content,
		});
	}, [content]);

	const onDownload = async (extension: FileExtension) => {
		setDownloading(extension);
		await qrCode.download({
			name,
			extension,
		});
		setDownloading(undefined);
	};

	return (
		<>
			<div ref={ref} />

			<div className={'flex flex-row'}>
				{['png', 'svg', 'webp'].map((ext: FileExtension) => {
					return (
						<LoadingButton
							title={ext}
							onClick={() => onDownload(ext)}
							loading={downloading === ext}
							startIcon={<Download />}
							size={'large'}
							disabled={!!downloading}>
							{ext}
						</LoadingButton>
					);
				})}
			</div>
		</>
	);
};
