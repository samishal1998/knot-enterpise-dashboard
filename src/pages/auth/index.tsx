import { Reset } from '@components/auth/Reset';
import SignIn from '@components/auth/SignIn';
import SignUp, { SignUpProps } from '@components/auth/SignUp';
import { useCallback, useRef, useState } from 'react';
// import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login';
// import LinkedinLogin from "react-linkedin-login-oauth2";
import {
	ConfirmationResult,
	User as FireUser,
	RecaptchaVerifier,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPhoneNumber,
} from 'firebase/auth';

import { LoadingPaper } from '@components/LoadingContent';
import UserDataForm, { UserDataFormProps } from '@components/auth/UserDataForm';
import { AuthType } from '@components/auth/auth-type';
import { BasePageType } from '@components/base-page.type';

import { GuardType, useGuard } from '@hooks/useUser';
import { LoadingButton } from '@mui/lab';
import { Button, Link, TextField } from '@mui/material';
import { resolve } from '@utils/helpers';
import clsx from 'clsx';
import * as queryString from 'querystring';
import { useTranslation } from 'react-i18next';
import { fireAuth } from '@utils/firebase';
import { generatePath } from '@components/base-page.type';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '@components/auth/loginStyles.css';
import {useSnackbar} from "react-mui-snackbar-helper";
import {User} from "../../api/models";
import {EmployeesPage} from "@pages/employees";
import {usersFindOne, usersFindOneByFirebaseUid} from "../../api/users/users";
import '@components/auth/loginStyles.css'

import  Logo from '@assets/logo.png'
export enum AuthPageOptions {
	SIGN_UP = 'sign-up',
	SIGN_IN = 'sign-in',
	RESET = 'reset',
	COMPLETE_SIGN_UP = 'complete-sign-up',
}

export type AuthPageRouteParams = {
	page: AuthPageOptions;
};
const AuthPage: BasePageType<AuthPageRouteParams> = () => {
	const { shouldRender, fireUser, authCompleted } = useGuard({
		guardType: GuardType.GUEST_ONLY,
	});
	let confirmationResult = useRef<ConfirmationResult>();
	const navigate = useNavigate();
	let { page } = useParams() as AuthPageRouteParams;

	const [social, setSocial] = useState(false);
	const [loading, setLoading] = useState(false);
	const [confirmation, setConfirmation] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState('');
	let { showErrorMessage, showSuccessMessage, showInfoMessage, showWarningMessage } = useSnackbar();
	const { t, i18n } = useTranslation(['main']);
	const isRtl = i18n.language === 'ar';
	let right = isRtl ? 'l' : 'r';
	let left = isRtl ? 'r' : 'l';
	// if (reset) router.push('/login')
	//
	//
	// if (user) {
	//   let query = new URLSearchParams(window.location.search);
	//   let redirect = query.get('redirect')
	//   if (redirect) {
	//     console.log('redirect', {type: user, redirect})
	//     router.push(decodeURIComponent(redirect))
	//   }
	//
	// }

	const signInCallback = async ({ email, password, phoneNumber, type }) => {
		// console.log({email, password, phoneNumber, type})
		if (type === AuthType.EMAIL) {
			setLoading(true);
			signInWithEmailAndPassword(fireAuth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					signInSuccessful(user);
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
					showErrorMessage(errorCode);
					// console.log({error})
				})
				.finally(() => setLoading(false));
		} else if (type === AuthType.PHONE) {
			try {
				setLoading(true);
				const appVerifier = window.recaptchaVerifier;
				setPhoneNumber(phoneNumber);
				confirmationResult.current = await signInWithPhoneNumber(fireAuth, phoneNumber, appVerifier);
				setConfirmation(true);
				setLoading(false);
				window.recaptchaVerifier = new RecaptchaVerifier(
					'resend',
					{
						size: 'invisible',
					},
					fireAuth,
				);
			} catch (error) {
				// console.log({error})
			} finally {
				setLoading(false);
			}
		}
	};
	const userCreateCallback: UserDataFormProps['userCreateCallback'] = async (
		{ email, firstName, lastName },
		{ setSubmitting },
	) => {
		if (!fireUser) return;
		// let [user, error] = await resolve(createUser); //TODO
		const user = null;
		if (user) {
			showSuccessMessage(t('signedUp.success'));
			done(user);
		}
	};

	const signUpCallback: SignUpProps['signUpCallback'] = async (
		{ email, password, phoneNumber, authType },
		{ setSubmitting },
	) => {
		// console.log({firstName, lastName, email, password})
		setLoading(true);
		try {
			if (authType === AuthType.EMAIL) {
				if (!email || !email.length) throw new Error('Missing Email');
				if (!password || !password.length) throw new Error('Missing Password');
				let userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
				console.log({ userCredential });
				signUpSuccessful(userCredential.user);
			} else if (authType === AuthType.PHONE) {
				if (!phoneNumber || !phoneNumber.length) throw new Error('Missing Phone Number');

				const appVerifier = window.recaptchaVerifier;
				setPhoneNumber(phoneNumber);
				confirmationResult.current = await signInWithPhoneNumber(fireAuth, phoneNumber, appVerifier);
				setConfirmation(true);
				setLoading(false);
				window.recaptchaVerifier = new RecaptchaVerifier(
					'resend',
					{
						size: 'invisible',
					},
					fireAuth,
				);
			}
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			showErrorMessage(t(errorCode));
			console.log({ error });
		} finally {
			setLoading(false);
			setSubmitting(false);
		}
	};

	const resetCallback = () => {};
	const responseGoogle = () => {};

	const resend = async () => {
		const appVerifier = window.recaptchaVerifier;
		confirmationResult.current = await signInWithPhoneNumber(fireAuth, phoneNumber, appVerifier);
	};
	const confirm = async (e) => {
		e.preventDefault();
		let data = new FormData(e.target);
		let code = data.get('confirmation');
		// console.log({code})
		setLoading(true);

		if (code && typeof code === 'string' && confirmationResult.current) {
			try {
				let userCredential = await confirmationResult.current.confirm(code);
				if (page === AuthPageOptions.SIGN_IN) signInSuccessful(userCredential.user);
				else if (page === AuthPageOptions.SIGN_UP) signUpSuccessful(userCredential.user);
				console.log({ userCredential });
			} catch (e: any) {
				showErrorMessage(t(e.errorCode));
				setLoading(false);
			}
		} else {
			setLoading(false);
		}
	};

	const signInSuccessful = async (user: FireUser) => {
		let [_user, error] = await resolve(usersFindOneByFirebaseUid(user.uid));

		console.log({_user,error})
		if (_user) showSuccessMessage(t('signedIn.success'));
		else {
			showInfoMessage(t('if-you-are-not-signed-up-please-do-so-first'));
			signUpSuccessful(user);
			setLoading(false);
			return;
		}
		setLoading(false);
		done(_user as any);
	};
	const signUpSuccessful = async (user: FireUser) => {
		navigate(AuthPage.generatePath({ page: AuthPageOptions.COMPLETE_SIGN_UP }), { replace: true });
	};

	const done = useCallback(async (user: User) => {
		await navigate( '/dashboard');
	}, []);

	const getForm = (): any => {
		if (confirmation) {
			return (
				<form onSubmit={confirm} className={'flex flex-row flex-wrap justify-start items-stertch '}>
					<TextField
						className={'w-full sm:w-8/12 '}
						id={'confirmation'}
						name={'confirmation'}
						label={t('confirmationCode')}
					/>
					<div className={'pt-3 sm:pt-0 w-6/12 sm:w-4/12 px-2 flex items-stretch'}>
						<LoadingButton loading={loading} type={'submit'} variant={'outlined'}>
							{t('confirm')}
						</LoadingButton>
					</div>
					<div className={'w-6/12 pt-3 sm:pt-0 '}>
						<Button id={'resend'} onClickCapture={resend}>
							{t('resend')}
						</Button>
					</div>
				</form>
			);
		}

		switch (page) {
			case AuthPageOptions.SIGN_UP:
				return <SignUp signUpCallback={signUpCallback} />;
			case AuthPageOptions.COMPLETE_SIGN_UP:
				return <UserDataForm userCreateCallback={userCreateCallback} email={fireUser?.email ?? ''} />;

			case AuthPageOptions.RESET:
				return <Reset resetCallback={resetCallback} />;
			case AuthPageOptions.SIGN_IN:
				return <SignIn signInCallback={signInCallback} loading={loading} />;
		}
	};
	const getTitle = (): any => {
		if (confirmation) {
			return (
				<>
					<h1 className="h1 mt-4 mb-3 font-weight-semi-bold">{t('confirmYourPhoneNumber')}</h1>
				</>
			);
		}

		switch (page) {
			case AuthPageOptions.SIGN_UP:
				return (
					<div
						className={clsx({
							'flex flex-col align-center justify-center': !social,
						})}>
						<h1 className="h1 mt-4 mb-3 font-weight-semi-bold">{t('createAccount')}</h1>
						<h1 className=" fl_subtitle h5 mb-3 font-weight-normal">{t('setUpYourNewAccount')}</h1>
					</div>
				);
			case AuthPageOptions.COMPLETE_SIGN_UP:
				return (
					<>
						<h1 className="h1 mt-4 mb-3 font-weight-semi-bold">{t('completeSignUp.title')}</h1>
					</>
				);

			case AuthPageOptions.RESET:
				return (
					<>
						<h1 className="h1 mt-4 mb-3 font-weight-semi-bold">{t('resetPassword')}</h1>
						{queryString.parse(location.search).token ? (
							<h1 className=" fl_subtitle h5 mb-3 font-weight-normal">{t('createNewPassword')}</h1>
						) : (
							<h1 className=" fl_subtitle h5 mb-3 font-weight-normal">
								{t('resetLinkWillBeSentToYourMail')}
							</h1>
						)}
					</>
				);
			case AuthPageOptions.SIGN_IN:
				return (
					<>
						<h1 className="h1 mt-4 mb-3 font-weight-semi-bold">{t('welcomeBack')}</h1>
						<h1 className=" fl_subtitle h5 mb-3 font-weight-normal">{t('logInToYourAccount')}</h1>
					</>
				);
		}
	};
	return (
		<>
			<div id={'recaptcha-container'} className="login-container justify-center">
				<div className="container display-inherit">
					<div className="form-signin">
						<div className="logo-cont mx-auto cursor-pointer md:w-4/12  w-6/12">
							<Link href={'/'}>
								<img className="mx-auto" src={Logo} alt="logo" />
							</Link>
						</div>

						{getTitle()}

						<div
							className={clsx('form-cont mt-5 flex flex-wrap flex-row', {
								'justify-center': !social,
							})}>
							<div
								className={
									'md:w-6/12 w-full ' +
									(social ? `md:border-${right}-2 md:p${right}-10` : 'md:w-6/12 w-full')
								}>
								<LoadingPaper isLoading={!authCompleted}>{getForm()}</LoadingPaper>
							</div>

							{social ? (
								<div className={`form-t md:p${left}-10 md:w-6/12 w-full`}>
									<div className="firebaseui-card-content">
										<ul className="firebaseui-idp-list mt-0">
											{/*          <FacebookLogin*/}
											{/*              appId="1885691228370129"*/}
											{/*              autoLoad={false}*/}
											{/*              disableMobileRedirect={true}*/}
											{/*              buttonText="Login with Facebook"*/}
											{/*              fields="first_name,last_name,name,email,picture"*/}
											{/*              scope="public_profile,email"*/}
											{/*              callback={responseFacebook}*/}
											{/*              render={renderProps => (*/}
											{/*            <li className="firebaseui-list-item" onClick={renderProps.onClick}>*/}
											{/*              <div id="fbBtn" className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button">*/}
											{/*<span className="firebaseui-idp-icon-wrapper">*/}
											{/*  <img className="firebaseui-idp-icon fb-icon" alt="" src={facebook} />*/}
											{/*</span>*/}
											{/*                <span className="firebaseui-idp-text firebaseui-idp-text-long">Log in with Facebook</span>*/}
											{/*              </div>*/}
											{/*            </li>*/}
											{/*          )}*/}
											{/*        />*/}

											<GoogleLogin
												clientId="997352301010-5ofgt72i6fl96k1rdc652lubk2vi3vha.apps.googleusercontent.com"
												autoLoad={false}
												isSignedIn={false}
												buttonText="Login with Google"
												scope="profile email"
												onSuccess={responseGoogle}
												onFailure={responseGoogle}
												cookiePolicy={'single_host_origin'}
												render={(renderProps) => (
													<li className="firebaseui-list-item" onClick={renderProps.onClick}>
														<div
															id="googleBtn"
															className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button">
															<span className="firebaseui-idp-icon-wrapper">
																<img
																	className="firebaseui-idp-icon"
																	alt=""
																	src={'/assets/google.svg'}
																/>
															</span>
															<span className="firebaseui-idp-text firebaseui-idp-text-long">
																{t('logInWithGoogle')}
															</span>
														</div>
													</li>
												)}
											/>

											{/*    <LinkedinLogin*/}
											{/*      clientId="81d2ju1vhzhcen"*/}
											{/*      buttonText="Log in with Linked In"*/}
											{/*      scope="r_emailaddress,r_liteprofile"*/}
											{/*      onFailure={responseLinkedIn}*/}
											{/*      onSuccess={responseLinkedIn}*/}
											{/*      redirectUri="https://www.fluidmeet.com/linkedin"*/}
											{/*      renderElement={renderProps => (*/}
											{/*        <li className="firebaseui-list-item" onClick={renderProps.onClick}>*/}
											{/*          <div id="googleBtn" className="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-linkedin firebaseui-id-idp-button">*/}
											{/*<span className="firebaseui-idp-icon-wrapper">*/}
											{/*  <img className="firebaseui-idp-icon" alt="" src={linkedin}/>*/}
											{/*</span>*/}
											{/*            <span*/}
											{/*                className="firebaseui-idp-text firebaseui-idp-text-long">Log in with LinkedIn</span>*/}
											{/*          </div>*/}
											{/*        </li>*/}
											{/*      )}*/}
											{/*    />*/}
										</ul>
									</div>
								</div>
							) : (
								<></>
							)}
						</div>

						<p className="text-foot mt-5 mb-2" dir={'ltr'}>
							{' '}
							&copy; 2021 MoQawlaty, Inc. All rights reserved.
						</p>
						<p className="text-foot" dir={'ltr'}>
							By continuing, you are indicating that you accept our{' '}
							<a href={'/terms'} className="firebaseui-link firebaseui-tos-link">
								Terms of Use
							</a>{' '}
							,{' '}
							<a href={'/privacy-policy'} className="firebaseui-link firebaseui-pp-link">
								Privacy Policy
							</a>{' '}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
AuthPage.route = '/auth/:page';
AuthPage.subRoute = '/:page';
AuthPage.generatePath = generatePath(AuthPage.route);

export default AuthPage;
