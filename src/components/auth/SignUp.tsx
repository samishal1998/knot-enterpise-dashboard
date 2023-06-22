import React, { useEffect, useMemo, useState } from 'react';
import { FormikConfig, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import AuthPage, { AuthPageOptions } from '@pages/auth/auth.page';
import { FormControl, FormHelperText, InputLabel, Link, Select, Tab, Tabs, TextField } from '@mui/material';
import { PasswordInput } from '@components/forms/password-input';
import { LoadingButton } from '@mui/lab';
import { AuthType } from './auth-type';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { RecaptchaVerifier } from 'firebase/auth';
import { TabPanel } from '@components/tabs/tab-panel';
import { fireAuth } from '@utils/firebase';
import MenuItem from '@mui/material/MenuItem';
import { UserType } from '../../api/models';
import { distributorsCreate } from '../../api/distributors/distributors';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useNavigate } from 'react-router-dom';

const recaptchaVerifierContainerID = 'signup';
export type SignUpForm = {
	fullName?: string;
	distributorName?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
	phoneNumber?: string;
	authType: AuthType;
	userType: UserType;
};

export type SignUpProps = { signUpCallback: FormikConfig<SignUpForm>['onSubmit'] };
export const SignUp = ({ signUpCallback }: SignUpProps) => {
	const [authType, setAuthType] = useState<AuthType>(AuthType.EMAIL);
	const { t, i18n } = useTranslation(['main', 'auth']);
	const isRtl = i18n.language === 'ar';
	const { showSuccessMessage, showErrorMessage } = useSnackbar();
	useEffect(() => {
		try {
			window.recaptchaVerifier = new RecaptchaVerifier(
				recaptchaVerifierContainerID,
				{
					size: 'invisible',
				},
				fireAuth,
			);
		} catch (e) {
			// console.log({e})
		}
	}, []);

	const validationSchema = useMemo(
		() =>
			yup.object(
				authType === AuthType.EMAIL
					? {
							email: yup.string().email().required(),
							password: yup.string().min(8, t('main:passwordIsTooShort')).required(),
							repeatPassword: yup
								.string()
								.equals([yup.ref('password')], t('main:passwordsDontMatch'))
								.required(),
					  }
					: {
							// phoneNumber: yup.string().phone().required(),
					  },
			),
		[t, authType],
	);
	const navigate = useNavigate();
	const {
		touched,
		values,
		errors,
		submitCount,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
		setFieldValue,
	} = useFormik<SignUpForm>({
		onSubmit: async (values) => {
			try {
				const { distributorName, fullName, email, password } = values;
				await distributorsCreate({
					email,
					password,
					distributorName,
					createUser: {
						email,
						fullName,
						userType: UserType.DISTRIBUTOR,
					},
				});
				showSuccessMessage(t('auth:sign-up.forms.main.actions.submit.request.success.message'));
				setTimeout(() => navigate(AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN })), 1500);
			} catch (e: any) {
				showErrorMessage(e?.response?.data?.message || e?.message);
			}
		},
		initialValues: {
			authType,
			userType: UserType.DISTRIBUTOR,
			// email: 'samishal.1998@gmail.com',
			// fullName: 'Sami Mishal',
			// distributorName: 'Knot',
			// password: '123456789',
			// repeatPassword: '123456789',
		},
		validationSchema,
	});

	useEffect(() => {
		setFieldValue('authType', authType);
	}, [authType]);

	return (
		<>
			<form autoComplete="on" className={'flex flex-col gap-2'}>
				<Tabs
					value={authType}
					onChange={(_, v) => setAuthType(v)}
					aria-label="Authentication Type"
					centered
					variant={'fullWidth'}>
					<Tab icon={<MailOutlineIcon />} value={AuthType.EMAIL} />
				</Tabs>
				<TabPanel value={authType} index={AuthType.EMAIL}>
					<FormControl fullWidth error={Boolean(submitCount && errors['userType'])}>
						<InputLabel id="demo-simple-select-label">
							{t(`auth:sign-up.forms.main.fields.user-type.label`)}
						</InputLabel>
						<Select
							key={'userType'}
							name={'userType'}
							id={'userType'}
							variant={'outlined'}
							value={values['userType']}
							label={t(`auth:sign-up.forms.main.fields.user-type.label`)}
							onChange={handleChange('userType') as any}
							onBlur={handleBlur('userType')}
							required={true}>
							<MenuItem value={UserType.DISTRIBUTOR}>
								{t(`auth:sign-up.forms.main.fields.user-type.options.distributor.label`)}
							</MenuItem>
						</Select>
						<FormHelperText>{submitCount && errors['userType'] ? errors['userType'] : ' '}</FormHelperText>
					</FormControl>

					{(
						[
							{ name: 'fullName', labelKey: 'full-name', required: true },
							{ name: 'distributorName', labelKey: 'distributor-name', required: true },
							{ name: 'email', required: true },
							{ name: 'password', Component: PasswordInput, required: true },
							{
								name: 'repeatPassword',
								labelKey: 'repeat-password',
								Component: PasswordInput,
								required: true,
							},
						] as any[]
					).map(
						({
							name,
							label,
							labelKey,
							Component = TextField,
							required,
						}: {
							name;
							label?;
							labelKey?;
							Component;
							required: boolean;
						}) => (
							<Component
								key={name}
								name={name}
								id={name}
								variant={'outlined'}
								value={values[name]}
								label={label || t(`auth:sign-up.forms.main.fields.${labelKey || name}.label`)}
								error={Boolean(submitCount && errors[name])}
								helperText={submitCount && errors[name] ? errors[name] : ' '}
								onChange={handleChange(name) as any}
								onBlur={handleBlur(name)}
								required={required}></Component>
						),
					)}
				</TabPanel>

				<LoadingButton
					id={recaptchaVerifierContainerID}
					variant={'contained'}
					loading={isSubmitting}
					disabled={isSubmitting}
					onClick={() => handleSubmit()}>
					{t('auth:sign-up.forms.main.actions.submit.label')}
				</LoadingButton>

				<h2 className="fl_a mb-3 font-weight-normal text-black">
					{t('auth:sign-up.footer.message')}{' '}
					<Link href={AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN })} className="">
						{t('auth:sign-up.footer.cta')}{' '}
					</Link>
				</h2>
			</form>
		</>
	);
};

export default SignUp;
