import { DrawerPage, generatePath } from '@components/base-page.type';
import { QrCodeRounded } from '@mui/icons-material';
import clsx from 'clsx';
import { CircularProgress, Dialog, FormControl, FormHelperText, InputLabel, Select, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { GuardType, useGuard } from '@hooks/useUser';
import { LoadingButton } from '@mui/lab';
import {
	distributorsGenerateQrForExistingProduct,
	distributorsGenerateQrForExternalProduct,
	useDistributorsFindOne,
	useDistributorsGetMe,
} from '../../../../api/distributors/distributors';
import React, { useMemo, useState } from 'react';
import { Title } from '@components/title';
import Box from '@mui/material/Box';
import { Qr } from '@components/Qr';
import { act } from 'react-dom/test-utils';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { AxiosError } from 'axios';

import moment from 'moment';
import { SubscriptionActivationAlert } from '@components/subscription/subscription-card';
import MenuItem from '@mui/material/MenuItem';
import { UserType } from '../../../../api/models';

import * as yup from 'yup';
import { PAYMENT_DEFAULT_IFRAME, PaymentIframes } from '@utils/payment';
import QrListPage from '@pages/distributor/qr/qr-list.page';
import { useNavigate } from 'react-router-dom';
type FormData = Partial<{
	label: string;
	serial: string;
	type: 'existing' | 'new';
}>;
const QR_PRICE = '00.00';
const GenerateQrPage: DrawerPage = () => {
	const { user } = useGuard({
		guardType: GuardType.DISTRIBUTOR_ONLY,
	});
	const distributorQuery = useDistributorsGetMe({
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorQuery?.data?.data, [distributorQuery.data?.data]);
	const subscriptions = useMemo(() => distributor?.subscriptions, [distributor?.subscriptions]);
	const activeSubscription = useMemo(() => subscriptions?.[0], [subscriptions]);

	const { t, i18n } = useTranslation(['qr', 'subscription', 'currency']);

	const [loading, setLoading] = useState(false);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();

	const validationSchema = useMemo(
		() =>
			yup.object({
				serial: yup
					.string()
					.when('type', (values, schema, options) => {
						console.log({ values, schema });
						return values[0] === 'existing' ? schema.required().length(15) : schema;
					})
					.label(t('qr:forms.generate-qr-external.fields.id.label')),
				type: yup.string().oneOf(['existing', 'new']),
			}),
		[t],
	);
	const navigate = useNavigate();
	const { values, errors, handleSubmit, handleBlur, handleChange, isSubmitting } = useFormik<FormData>({
		initialValues: {
			type: 'existing',
			serial: undefined,
		},
		validationSchema,
		async onSubmit(values) {
			if (!distributor?.id) return;
			if (
				activeSubscription &&
				moment(activeSubscription.endDate).toDate().getTime() - new Date().getTime() > 0
			) {
				const serial = values.type === 'new' ? undefined : values.serial;
				try {
					const res: any = serial
						? await distributorsGenerateQrForExistingProduct(distributor.id, serial, {
								label: values.label,
						  })
						: await distributorsGenerateQrForExternalProduct(distributor.id, {
								label: values.label,
						  });
					if (res.data.paymentFinalized) {
						showSuccessMessage('Success');
						navigate(QrListPage.generatePath());
					} else {
						setPaymentKey(res.data.paymentKey);
					}
				} catch (e) {
					if ((e as AxiosError).status === 402) {
						showErrorMessage(t('subscription:alerts.expired.message'));
					}
				}
			} else {
				showErrorMessage(t('subscription:alerts.expired.message'));
			}
		},
	});
	const [paymentKey, setPaymentKey] = useState<string>();
	return (
		<div className={clsx('max-w-screen-lg mx-auto flex flex-col items-start justify-center pt-5 pb-20')}>
			<Title labelKey={GenerateQrPage.labelKey ?? GenerateQrPage.fallbackLabel ?? ''} />
			<h1 className={'text-gray-700 text-3xl font-semibold py-10'}>
				{t(GenerateQrPage.labelKey ?? GenerateQrPage.fallbackLabel ?? '')}
			</h1>

			{activeSubscription && user && (
				<div className={'w-full py-5 '}>
					<SubscriptionActivationAlert
						subscription={activeSubscription}
						user={{ ...user, distributor }}
						showOnlyIfExpired
					/>
				</div>
			)}

			<FormControl fullWidth>
				<InputLabel>{t(`qr:forms.generate-qr-external.fields.type.label`)}</InputLabel>
				<Select
					key={'type'}
					name={'type'}
					id={'type'}
					variant={'outlined'}
					value={values['type']}
					label={t(`qr:forms.generate-qr-external.fields.type.label`)}
					onChange={handleChange('type') as any}
					onBlur={handleBlur('type')}
					required={true}>
					<MenuItem value={'new'}>
						{t(`qr:forms.generate-qr-external.fields.type.options.new.label`)}
					</MenuItem>
					<MenuItem value={'existing'}>
						{t(`qr:forms.generate-qr-external.fields.type.options.existing.label`)}
					</MenuItem>
				</Select>
				<FormHelperText> </FormHelperText>
			</FormControl>

			{values['type'] === 'existing' && (
				<TextField
					label={t('qr:forms.generate-qr-external.fields.id.label')}
					value={values['serial']}
					onChange={handleChange('serial')}
					onBlur={handleBlur('serial')}
					error={!!errors['serial']}
					helperText={errors['serial'] ? errors['serial'] : ' '}
					fullWidth
				/>
			)}
			<TextField
				label={t('qr:forms.generate-qr-external.fields.label.label')}
				value={values['label']}
				onChange={handleChange('label')}
				onBlur={handleBlur('label')}
				error={!!errors['label']}
				helperText={errors['label'] ? errors['label'] : ' '}
				fullWidth
			/>
			<div className={'text-lg font-medium text-gray-900 py-2 underline underline-offset-4'}>
				{t(`qr:forms.generate-qr-external.summary.total-price-message`, {
					price: t('currency:free'), // QR_PRICE,
					currency: '', //t('currency:egp'),
				})}
			</div>
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
						src={PaymentIframes[PAYMENT_DEFAULT_IFRAME].generateUrl({ paymentKey })}
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
			<PrintingInstructionsSection />
		</div>
	);
};

GenerateQrPage.route = '/distributor/qr/generate';
GenerateQrPage.icon = <QrCodeRounded />;
GenerateQrPage.labelKey = 'main:pages.generate-qr.title';
GenerateQrPage.fallbackLabel = 'Generate QR';
GenerateQrPage.generatePath = generatePath(GenerateQrPage.route);
export default GenerateQrPage;

export const PrintingInstructionsSection = ({ showHeader = true }: { showHeader?: boolean }) => {
	const { t, i18n } = useTranslation(['qr']);

	return (
		<section>
			{showHeader && (
				<h2 className={'text-gray-500 text-2xl font-semibold py-10'}>
					{t('qr:sections.printing-instructions.header')}
				</h2>
			)}
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
	);
};
