import { DrawerPage, generatePath } from '@components/base-page.type';
import { QrCodeRounded } from '@mui/icons-material';
import clsx from 'clsx';
import { CircularProgress, Dialog, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { GuardType, useGuard } from '@hooks/useUser';
import { LoadingButton } from '@mui/lab';
import {
	distributorsGenerateQrForExistingProduct,
	distributorsGenerateQrForExternalProduct,
	useDistributorsFindOne,
} from '../../../../api/default/default';
import React, { useMemo, useState } from 'react';
import { Title } from '@components/title';
import Box from '@mui/material/Box';
import { Qr } from '@components/Qr';

type FormData = Partial<{
	label: string;
	serial: string;
}>;
const GenerateQrPage: DrawerPage = () => {
	const { user } = useGuard({
		guardType: GuardType.DISTRIBUTOR_ONLY,
	});
	const distributorsFindOne = useDistributorsFindOne(user?.distributorId ?? '', {
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorsFindOne?.data?.data, [distributorsFindOne.data?.data]);
	const { t } = useTranslation(['qr']);

	const [loading, setLoading] = useState(false);

	const { values, errors, handleSubmit, handleBlur, handleChange, isSubmitting } = useFormik<FormData>({
		initialValues: {},
		async onSubmit(values) {
			if (!distributor?.id) return;
			const res: any = values.serial
				? await distributorsGenerateQrForExistingProduct(distributor.id, values.serial, { label: values.label })
				: await distributorsGenerateQrForExternalProduct(distributor.id, values);

			// console.log({ res: res.data });

			setPaymentKey(res.data.paymentKey);
		},
	});
	const [paymentKey, setPaymentKey] = useState<string>();
	return (
		<div className={clsx('max-w-screen-lg mx-auto flex flex-col items-start justify-center pt-5 pb-20')}>
			<Title labelKey={GenerateQrPage.labelKey ?? GenerateQrPage.fallbackLabel ?? ''} />
			<h1 className={'text-gray-700 text-3xl font-semibold py-10'}>
				{t(GenerateQrPage.labelKey ?? GenerateQrPage.fallbackLabel ?? '')}
			</h1>

			<TextField
				label={t('qr:forms.generate-qr-external.fields.id.label')}
				value={values['serial']}
				onChange={handleChange('serial')}
				onBlur={handleBlur('serial')}
				error={!!errors['serial']}
				helperText={errors['serial'] ? errors['serial'] : ' '}
				fullWidth
			/>
			<TextField
				label={t('qr:forms.generate-qr-external.fields.label.label')}
				value={values['label']}
				onChange={handleChange('label')}
				onBlur={handleBlur('label')}
				error={!!errors['label']}
				helperText={errors['label'] ? errors['label'] : ' '}
				fullWidth
			/>
			<LoadingButton
				onClick={handleSubmit as any}
				loading={isSubmitting}
				variant={'contained'}
				className={'text-white'}>
				{t('qr:forms.generate-qr-external.actions.submit.label')}
			</LoadingButton>

			<Dialog
				open={loading || !!paymentKey}
				onClose={undefined}
				fullWidth={!!paymentKey}
				classes={{ paper: clsx(!!paymentKey && '!max-w-screen-2xl !w-full') }}>
				{loading && (
					<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
						<CircularProgress />
					</Box>
				)}

				{paymentKey && (
					<iframe
						height={900}
						width={'100%'}
						src={`https://accept.paymob.com/api/acceptance/iframes/760829?payment_token=${paymentKey}`}
					/>
				)}
			</Dialog>

			<section>
				<h2 className={'text-gray-500 text-2xl font-semibold py-10'}>
					{t('qr:sections.generation-instructions.header')}
				</h2>
				<ol className={'list-decimal text-gray-700 text-2xl font-semibold px-10'}>
					{['0', '1'].map((a) => {
						return (
							<li className={'py-2'}>
								{t(`qr:sections.generation-instructions.list.${a}.title`)}
								<ul className={'indent-4 font-normal text-xl'}>
									<li>{t(`qr:sections.generation-instructions.list.${a}.subtitle`)}</li>
								</ul>
							</li>
						);
					})}
				</ol>
			</section>
			<section>
				<h2 className={'text-gray-500 text-2xl font-semibold py-10'}>
					{t('qr:sections.printing-instructions.header')}
				</h2>
				<div className={'mx-auto'}>
					<div
						className={
							'grid items-center justify-center rounded-xl shadow-xl bg-green-50 mt-3 mb-5 max-w-screen-sm mx-auto'
						}>
						<img src={'/assets/qr_dimensions.png'} />
					</div>
				</div>
				<ol className={'list-decimal text-gray-700 text-2xl font-semibold px-10'}>
					{['0', '1'].map((a) => {
						return (
							<li className={'py-2'}>
								{t(`qr:sections.printing-instructions.list.${a}.title`)}
								<ul className={'indent-4 font-normal text-xl'}>
									<li>{t(`qr:sections.printing-instructions.list.${a}.subtitle`)}</li>
								</ul>
							</li>
						);
					})}
				</ol>
			</section>
		</div>
	);
};

GenerateQrPage.route = '/distributor/qr/generate';
GenerateQrPage.icon = <QrCodeRounded />;
GenerateQrPage.labelKey = 'main:pages.generate-qr.title';
GenerateQrPage.fallbackLabel = 'Generate QR';
GenerateQrPage.generatePath = generatePath(GenerateQrPage.route);
export default GenerateQrPage;
