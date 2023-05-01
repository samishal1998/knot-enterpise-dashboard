import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import { Box, Button, Link, Tab, Tabs, TextField } from '@mui/material';
// import ReactPhoneInput from 'react-phone-input-mui';
import { RecaptchaVerifier } from 'firebase/auth';
import { fireAuth as firebaseAuth } from '../../utils/firebase';
import { useTranslation } from 'react-i18next';
import AuthPage, { AuthPageOptions } from '../../pages/auth';
import { AuthType } from '@components/auth/auth-type';
import { TabPanel } from '@components/tabs/tab-panel';

declare global {
	interface Window {
		recaptchaVerifier: any;
	}
}

function SignIn({ signInCallback, loading }) {
	const [authType, setAuthType] = useState<AuthType>(AuthType.EMAIL);
	const { t, i18n } = useTranslation(['main']);
	const isRtl = i18n.language === 'ar';
	useEffect(() => {
		try {
			window.recaptchaVerifier = new RecaptchaVerifier(
				'signIn',
				{
					size: 'invisible',
				},
				firebaseAuth,
			);
		} catch (e) {
			// console.log({e})
		}
	}, []);

	const [errors, setErrors] = useState<any>({});

	const handleChangeTab = (event, newValue) => {
		setAuthType(newValue);
	};

	const handleChange = (e, type) => {
		e.preventDefault();
	};

	const handleSignIn = (e) => {
		e.preventDefault();
		let data = new FormData(e.target);
		signInCallback({
			type: authType,
			email: data.get('email'),
			password: data.get('password'),
			phoneNumber: data.get('phoneNumber'),
		});
	};

	return (
		<>
			<form autoComplete="on" onSubmit={handleSignIn} className={'flex flex-col'}>
				<Tabs
					value={authType}
					onChange={handleChangeTab}
					aria-label="basic tabs example"
					centered
					variant={'fullWidth'}>
					<Tab icon={<MailOutlineIcon />} value={AuthType.EMAIL} />
					<Tab icon={<PhoneOutlinedIcon />} value={AuthType.PHONE} />
				</Tabs>
				<TabPanel value={authType} index={AuthType.EMAIL}>
					<TextField
						name="email"
						variant={'outlined'}
						label={t('emailAddress')}
						error={errors['email']}
						helperText={errors['email'] ?? ' '}
						onChange={(e) => handleChange(e, 'email')}
						required={true}
					/>
					<TextField
						name="password"
						variant={'outlined'}
						label={t('password')}
						error={errors['password']}
						helperText={errors['password'] ?? ' '}
						onChange={(e) => handleChange(e, 'password')}
						required={true}
						type={'password'}
					/>
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
						{/*		helperText: ' ',*/}
						{/*	}}*/}
						{/*	disableSearchIcon*/}
						{/*	autoFormat={true}*/}
						{/*	enableSearchField={true}*/}
						{/*/>*/}
					</div>
				</TabPanel>

				<Button variant={'contained'} disabled={loading} type="submit" id={'signIn'}>
					{loading ? (
						<>

							{/*// @ts-ignore*/}
							<FontAwesomeIcon icon={faCircleNotch} spin={true} /> loading
						</>
					) : (
						t('login')
					)}
				</Button>

				{/*<h2 className="fl_a font-weight-normal">*/}
				{/*	<Link href={"/reset"}>{t('forgotYourPassword')}</Link>*/}
				{/*</h2>*/}
				{/*<h2 className="fl_a mt-3 mb-0 font-weight-normal">*/}
				{/*	{t('dontHaveAccount')}{" "}*/}
				{/*	<Link href={"/signup"}>{t('signup')}</Link>*/}
				{/*</h2>*/}
				<h2 className="fl_a mt-3 mb-0 font-weight-normal">
					<p>
						{/*{t('supplierSignUp')} <Link href={BecomePartner.route}>{t('clickHere')}</Link>*/}
					</p>
					<p>
						{t('userSignUp')}{' '}
						<Link href={AuthPage.generatePath({ page: AuthPageOptions.SIGN_UP })}>{t('clickHere')}</Link>
					</p>
				</h2>
			</form>
		</>
	);
}

export default SignIn;
