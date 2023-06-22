import { useTranslation } from 'react-i18next';
import { AccountTabs } from '@components/account/account-tabs';
import React from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { fireAuth } from '@utils/firebase';
import { LoadingContent, LoadingPaper } from '@components/LoadingContent';
import { GuardType, useGuard } from '@hooks/useUser';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { BasePageType, DrawerPage, generatePath } from '@components/base-page.type';
import { KeyRounded, SupervisedUserCircleRounded } from '@mui/icons-material';
import ManageSubscriptionPage from '@pages/dashboard/account/manage-subscription.page';

const validationSchema = (t) => {
	return yup.object().shape({
		currentPassword: yup.string().required().label(t('currentPassword')),
		newPassword: yup
			.string()
			.min(8)
			.notOneOf([yup.ref('currentPassword')], t('passwordChangeMessages.sameAsOriginal'))
			.required()
			.label(t('newPassword')),
		repeatNewPassword: yup
			.string()
			.min(8)
			.oneOf([yup.ref('newPassword')], t('passwordChangeMessages.passwordDontMatch'))
			.required()
			.label(t('repeatNewPassword')),
	});
};

export const ManageAuthenticationPage: DrawerPage = () => {
	const { shouldRender } = useGuard({ guardType: GuardType.USER_ONLY }, true);
	const { t, i18n } = useTranslation(['main']);
	const navigate = useNavigate();
	const location = useLocation();
	let { showErrorMessage, showSuccessMessage } = useSnackbar();

	const onSubmit = async (values, helpers: FormikHelpers<any>) => {
		// console.log({values})
		try {
			let user = fireAuth.currentUser;
			if (user && user.email) {
				let credential = EmailAuthProvider.credential(user.email, values.currentPassword);
				await reauthenticateWithCredential(user, credential);
				await updatePassword(user, values.newPassword);
				showSuccessMessage(t('submittedRequestSuccessfully'));
			} else throw 'Error';
		} catch (error: any) {
			// console.log({error})
			let message = error?.message || error;
			if (error?.code === 'auth/wrong-password') message = t(error.code);
			showErrorMessage(message, t('failedToSubmitRequest'));
		} finally {
			helpers.setSubmitting(false);
			helpers.resetForm({
				values: {
					currentPassword: '',
					newPassword: '',
					repeatNewPassword: '',
				},
			});
		}
	};

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		submitCount,
		setSubmitting,
		isSubmitting,
		handleSubmit,
		isValid,
	} = useFormik<any>({
		initialValues: {},
		onSubmit,
		validationSchema: validationSchema(t),
	});

	let submitted = submitCount >= 1;

	return (
		<>
			<Helmet>
				<title>
					{t('manageAuthentication')} | {t('Knot')}
				</title>
			</Helmet>
			<LoadingPaper isLoading={!shouldRender} color={'primary'} subtle>
				<div
					className={
						'grid  gap-y-4 grid-cols-1 py-5 mb-auto md:mt-5 h-full auto-rows-min max-w-screen-md mx-auto'
					}>
					{['currentPassword', 'newPassword', 'repeatNewPassword'].map((key) => (
						<TextField
							key={key}
							name={key}
							variant={'outlined'}
							label={t(key)}
							onChange={handleChange(key)}
							onBlur={handleBlur(key)}
							required={true}
							error={Boolean((touched[key] || submitted) && errors[key])}
							helperText={(((touched[key] || submitted) && errors[key]) as string) || ' '}
							fullWidth
							className={'col-span-1'}
							value={values[key]}
							type={'password'}
						/>
					))}

					<div className={'col-span-full flex flex-row justify-end pt-5 md:mt-28'}>
						<Button
							className={'w-full md:w-4/12'}
							type={'submit'}
							disabled={isSubmitting || !isValid}
							onClick={() => handleSubmit()}
							variant={'contained'}>
							<LoadingContent isLoading={isSubmitting}>{t('submit')}</LoadingContent>
						</Button>
					</div>
				</div>
			</LoadingPaper>
		</>
	);
};

ManageAuthenticationPage.route = '/dashboard/account/manage-authentication';
ManageAuthenticationPage.generatePath = generatePath(ManageAuthenticationPage.route);
ManageAuthenticationPage.icon = <KeyRounded />;
ManageAuthenticationPage.labelKey = 'main:authentication';
ManageAuthenticationPage.fallbackLabel = 'Authentication';
export default ManageAuthenticationPage;
