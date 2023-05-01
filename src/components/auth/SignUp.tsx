import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikConfig, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import AuthPage, { AuthPageOptions } from '../../pages/auth';
import { Link, Tab, Tabs, TextField } from '@mui/material';
import { PasswordInput,  } from '@components/forms/password-input';
import { LoadingButton } from '@mui/lab';
import { AuthType } from './auth-type';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { RecaptchaVerifier } from 'firebase/auth';
import { TabPanel } from '@components/tabs/tab-panel';
import { fireAuth } from '@utils/firebase';

const recaptchaVerifierContainerID = 'signup';
export type SignUpForm = {
	email?: string;
	password?: string;
	repeatPassword?: string;
	phoneNumber?: string;
	authType: AuthType;
};

export type SignUpProps = { signUpCallback: FormikConfig<SignUpForm>['onSubmit'] };
export const SignUp = ({ signUpCallback }: SignUpProps) => {
	const [authType, setAuthType] = useState<AuthType>(AuthType.EMAIL);
	const { t, i18n } = useTranslation(['main']);
	const isRtl = i18n.language === 'ar';
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
							password: yup.string().min(8, t('passwordIsTooShort')).required(),
							repeatPassword: yup
								.string()
								.equals([yup.ref('password')], t('passwordsDontMatch'))
								.required(),
					  }
					: {
							// phoneNumber: yup.string().phone().required(),
					  },
			),
		[t, authType],
	);
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
		onSubmit: signUpCallback,
		initialValues: {
			authType,
			email: '',
			password: '',
			repeatPassword: '',
			phoneNumber: '',
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
					<Tab icon={<PhoneOutlinedIcon />} value={AuthType.PHONE} />
				</Tabs>
				<TabPanel value={authType} index={AuthType.EMAIL}>
					{([
						{ name: 'email' },
						{ name: 'password', Component: PasswordInput },
						{ name: 'repeatPassword', Component: PasswordInput },
					] as any[]).map(
						({ name, label, labelKey, Component = TextField }: { name, label?, labelKey?, Component }) => (
							<Component
								key={name}
								name={name}
								id={name}
								variant={'outlined'}
								value={values[name]}
								label={label || t(labelKey || name)}
								error={Boolean(submitCount && errors[name])}
								helperText={submitCount && errors[name] ? errors[name] : ' '}
								onChange={handleChange(name)}
								onBlur={handleBlur(name)}
								required={true}
							/>
						),
					)}
				</TabPanel>
				<TabPanel value={authType} index={AuthType.PHONE}>
					<div dir={'ltr'}>
						{/*<ReactPhoneInput*/}
						{/*	dir={'ltr'}*/}
						{/*	component={TextField}*/}
						{/*	enableAreaCodes={true}*/}
						{/*	preferredCountries={['eg']}*/}
						{/*	defaultCountry={'eg'}*/}
						{/*	dropdownStyle={{*/}
						{/*		borderRadius: '16px',*/}
						{/*		zIndex: 10,*/}
						{/*		border: '1px solid #cfd8e7',*/}
						{/*	}}*/}
						{/*	searchClass={'form-control-parent'}*/}
						{/*	inputClass={'shift-input-input-ltr ' + (isRtl ? '' : 'shift-input-all')}*/}
						{/*	inputExtraProps={{*/}
						{/*		id: 'phoneNumber',*/}
						{/*		name: 'phoneNumber',*/}
						{/*		required: true,*/}
						{/*		label: t('phoneNumber'),*/}
						{/*		dir: 'ltr',*/}
						{/*		error: (touched['phoneNumber'] || submitCount) && errors['phoneNumber'],*/}
						{/*		helperText: ((touched['phoneNumber'] || submitCount) && errors['phoneNumber']) || ' ',*/}
						{/*	}}*/}
						{/*	disableSearchIcon*/}
						{/*	autoFormat={true}*/}
						{/*	enableSearchField={true}*/}
						{/*	onBlur={handleBlur('phoneNumber')}*/}
						{/*	onChange={handleChange('phoneNumber')}*/}
						{/*	value={values['phoneNumber']}*/}
						{/*/>*/}
					</div>
				</TabPanel>

				<LoadingButton
					id={recaptchaVerifierContainerID}
					variant={'contained'}
					loading={isSubmitting}
					disabled={isSubmitting}
					onClick={() => handleSubmit()}>
					{t('signUp')}
				</LoadingButton>

				<h2 className="fl_a mb-3 font-weight-normal">
					{t('alreadyHaveAnAccount')}{' '}
					<Link href={AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN })} className="a2">
						{t('logIn')}{' '}
					</Link>
				</h2>
			</form>
		</>
	);
};

export default SignUp;
