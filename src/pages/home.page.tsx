import { Button, Link, Menu, MenuItem, Paper } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import Color from 'color';
import { Helmet } from 'react-helmet';
import { useEffect, useMemo, useState } from 'react';

import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { useCurrentUser } from '@hooks/useUser';
// import { FacebookIcon, LanguageIcon, LinkedInIcon } from '@icons';
import {
	ArrowRightAltRounded,
	FacebookRounded,
	Instagram,
	InstallDesktopRounded,
	LanguageRounded,
} from '@mui/icons-material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'react-i18next';
import AuthPage, { AuthPageOptions } from './auth/index';
import '@styles/landing.scss';
import '@styles/Home.module.css';
import { BasePageType, generatePath } from '@components/base-page.type';
import { UserType } from '../api/models';
import { useLocation, useNavigate } from 'react-router-dom';
import QrListPage from '@pages/distributor/qr/qr-list.page';
import { EmployeesPage } from './employees';
import clsx from 'clsx';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const toTopColor = '#555';
const Home: BasePageType = () => {
	const langPopupState = usePopupState({ variant: 'popper', popupId: 'language' });
	// let router = useRouter();
	const { fireUser, user, fetchCompleted } = useCurrentUser();
	const { t, i18n } = useTranslation(['landing']);

	const [scrollY, setScrollY] = useState(0);

	const signInPageRoute = useMemo(() => AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }), []);
	const signUpPageRoute = useMemo(() => AuthPage.generatePath({ page: AuthPageOptions.SIGN_UP }), []);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			document.querySelector('header')?.classList.toggle('sticky-header', window.scrollY > 0);
			setScrollY(window.scrollY);
		});
	}, []);
	let toTop = scrollY === 0;

	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div className={'landing-page mx-auto'}>
			<Helmet>
				<title>{t('knot')}</title>
			</Helmet>
			<header className={clsx(!toTop && 'shadow-xl ')}>
				<img className="logo" src={'/assets/logo.png'} alt={'logo'} />

				{fetchCompleted && (
					<div className={'flex flex-row align-center justify-between'}>
						{Boolean(fireUser) || (
							<Link
								// href={BecomePartner.route}
								className={'flex items-center'}>
								<a className={'flex'}>
									<Button
										sx={{
											background: Color(green[400]).alpha(0.3).hsl().toString(),
											color: toTop ? toTopColor : grey[600],
											'&:hover': {
												background: Color(green[400]).alpha(0.6).hsl().toString(),
												color: grey[700],
											},
											borderRadius: '100rem',
											padding: '.75rem',
											paddingX: '1.5rem',
											marginY: 'auto',
											display: {
												xs: 'none',
												md: 'flex',
											},
										}}
										onClick={() => navigate(signUpPageRoute)}>
										{t('landing:cta.join-us')}
									</Button>
								</a>
							</Link>
						)}

						<div className={' hidden sm:inline'}>
							<IconButton
								size="large"
								aria-label="language"
								aria-controls="menu-appbar"
								color="inherit"
								{...bindTrigger(langPopupState)}>
								<Box
									sx={{
										background: Color(green[400]).alpha(0.3).hsl().toString(),
										height: '3.0rem',
										width: '3.0rem',
										borderRadius: '100%',
										display: 'flex',
										'&:hover': {
											background: Color(green[400]).alpha(0.6).hsl().toString(),
											color: grey[200],
										},
									}}>
									<LanguageRounded
										className={'m-auto'}
										sx={{
											height: '1.75rem',
											width: '1.75rem',
											color: toTop ? toTopColor : grey[600],
											'&:hover': {
												color: grey[700],
											},
										}}
									/>
								</Box>
							</IconButton>
							<Menu {...bindMenu(langPopupState)}>
								<MenuItem selected={i18n.language == 'en'} onClick={langPopupState.close}>
									<Link
										href={location.pathname}
										onClick={(event) => {
											event.preventDefault();
											i18n.changeLanguage('en');
										}}>
										<a>{t('landing:languages.english')}</a>
									</Link>
								</MenuItem>
								<MenuItem selected={i18n.language == 'ar'} onClick={langPopupState.close}>
									<Link
										href={location.pathname}
										onClick={(event) => {
											event.preventDefault();
											i18n.changeLanguage('ar');
										}}>
										<a>{t('landing:languages.arabic')}</a>
									</Link>
								</MenuItem>
							</Menu>
						</div>
						{user ? (
							<>
								<Link className={'flex items-center'}>
									<Button
										sx={{
											background: Color(green[400]).alpha(0.3).hsl().toString(),
											color: toTop ? toTopColor : grey[600],
											'&:hover': {
												background: Color(green[400]).alpha(0.6).hsl().toString(),
												color: grey[700],
											},
											borderRadius: '100rem',
											padding: '.75rem',
											paddingX: '1.5rem',
											marginY: 'auto',
											display: {
												xs: 'none',
												md: 'flex',
											},
										}}
										href={
											user.distributorId
												? QrListPage.generatePath()
												: EmployeesPage.generatePath()
										}
										component={'a'}>
										{t('landing:actions.dashboard')}
									</Button>
								</Link>

								{/*<UserDropdown page={'main'} ns={'landing'} toTop={toTop} user={user} />*/}
							</>
						) : (
							<>
								<Link href={signInPageRoute} className={'flex items-center'}>
									<a className={'flex'}>
										<Button
											sx={{
												background: Color(green[400]).alpha(0.3).hsl().toString(),
												color: toTop ? toTopColor : grey[600],
												'&:hover': {
													background: Color(green[400]).alpha(0.6).hsl().toString(),
													color: grey[900],
												},
												borderRadius: '100rem',
												paddingY: '.75rem',
												paddingX: {
													xs: '0.1rem',
													sm: '1.5rem',
												},
												marginY: 'auto',
											}}>
											{t('landing:actions.login')}
										</Button>
									</a>
								</Link>
								<Link href={signUpPageRoute} className={'flex items-center'}>
									<a className={'flex'}>
										<Button
											sx={{
												background: Color(green[400]).alpha(0.3).hsl().toString(),
												color: toTop ? toTopColor : grey[600],
												'&:hover': {
													background: Color(green[400]).alpha(0.6).hsl().toString(),
													color: grey[900],
												},
												borderRadius: '100rem',
												padding: '.75rem',
												paddingX: {
													xs: '0.1rem',
													sm: '1.5rem',
												},
												marginY: 'auto',
											}}>
											{t('landing:actions.signup')}
										</Button>
									</a>
								</Link>
							</>
						)}
					</div>
				)}
			</header>

			<div id="banner" className="banner" style={{ background: '#f0fcf0' }}>
				<div className="flex flex-row-reverse items-center max-w-screen-2xl h-screen justify-between  mx-auto pt-40">
					<div className="bg-green-100 rounded-2xl z-[6] max-w-screen-md h-4/5  max-h-fit overflow-hidden">
						<img src={'/assets/landing/banner.jpg'} className={'w-full h-full object-cover'} />
					</div>
					<Paper className="description bg-white p-10 text-center items-center justify-center flex flex-col">
						<img src={'/assets/logo.png'} className={' object-cover mx-auto py-10'} />

						<div className="title">{t('landing:banners.main.title')}</div>
						<div className="subtitle text-gray-600 py-5 text-xl">{t('landing:banners.main.subtitle')}</div>

						<Button
							className={'w-fit text-xl'}
							sx={{
								borderRadius: '10rem',
								width: 'fit-content',
								boxShadow: 3,
								my: 1,
								fontSize: '1.25rem',
								p: 2,
								bgcolor: green[50],
								color: green[900],
								display: { xs: 'none', md: 'inherit' },
							}}
							href={signUpPageRoute}
							component={'a'}>
							<>
								{t('landing:banners.main.cta')}{' '}
								<ArrowRightAltRounded
									sx={{ transform: i18n.dir() === 'rtl' ? 'scale(-1)' : 'scale(1)' }}
								/>
							</>
						</Button>
					</Paper>
				</div>
			</div>
			<main>
				<section>
					<Box className="description">
						<Box className="subtitle flex justify-center">
							<Button
								className={'w-fit'}
								sx={{
									borderRadius: '10rem',
									width: 'fit-content',
									boxShadow: 3,
									my: 1,
									p: 2,
									bgcolor: 'white',
									color: green[900],
									display: { xs: 'inherit', md: 'none' },
								}}
								href={signUpPageRoute}
								component={'a'}>
								{t('landing:banners.main.cta')}{' '}
								<ArrowRightAltRounded
									sx={{ transform: i18n.dir() === 'rtl' ? 'scale(-1)' : 'scale(1)' }}
								/>
							</Button>
						</Box>
					</Box>
				</section>
				{/*<SlidesSection />*/}

				<VideosSection />
				<FeaturesSection />
				<section
					id={'become-a-knot-partner'}
					className="partner"
					style={{ '--background-image': 'url(/assets/landing/section-2.jpg)' } as any}
					about="Become A Partner">
					<div id="partner" className=" flex flex-col py-20 max-w-screen-xl mx-auto  ">
						<div id="" className="px-sm-4 px-2">
							<div id="partner" className="image-wide rounded-lg flex flex-col justify-end p-5">
								<div className="title"> {t('landing:sections.2.title')}</div>

								<div className="flex flex-row description flex-wrap">
									<span className="col-12 col-md-6 mb-5 lg:mb-0">
										{' '}
										{t('landing:sections.2.subtitle')}
									</span>
									<Link href={signUpPageRoute}>
										<Button className={'button'}>{t('landing:sections.2.cta')}</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer about="Footer">
				<div id="footer" className="footer section flex flex-col py-5 mx-auto">
					<div id="" className="px-sm-4">
						<div className={' sm:hidden inline'}>
							<IconButton
								size="large"
								aria-label="language"
								aria-controls="menu-appbar"
								color="inherit"
								{...bindTrigger(langPopupState)}>
								<Box
									sx={{
										background: Color(green[400]).alpha(0.3).hsl().toString(),
										height: '3.0rem',
										width: '3.0rem',
										borderRadius: '100%',
										display: 'flex',
										'&:hover': {
											background: Color(green[400]).alpha(0.6).hsl().toString(),
											color: grey[200],
										},
									}}>
									<LanguageRounded
										className={'m-auto'}
										sx={{
											height: '1.75rem',
											width: '1.75rem',
											color: toTop ? 'white' : grey[600],
											'&:hover': {
												color: grey[700],
											},
										}}
									/>
								</Box>
							</IconButton>
							<Menu {...bindMenu(langPopupState)}>
								<MenuItem selected={i18n.language == 'en'} onClick={langPopupState.close}>
									<Link
										href={location.pathname}
										onClick={(event) => {
											event.preventDefault();
											i18n.changeLanguage('en');
										}}>
										<a>{t('landing:languages.english')}</a>
									</Link>
								</MenuItem>
								<MenuItem selected={i18n.language == 'ar'} onClick={langPopupState.close}>
									<Link
										href={location.pathname}
										onClick={(event) => {
											event.preventDefault();
											i18n.changeLanguage('ar');
										}}>
										<a>{t('landing:languages.arabic')}</a>
									</Link>
								</MenuItem>
							</Menu>
						</div>
						<ul>
							<li>
								<a href="mailto:support@myknot.co">{t('landing:footer.actions.contact-us')}</a>
							</li>
							<li>
								<a href="https://www.facebook.com/myknot.co">
									<FacebookRounded sx={{ width: '2.5rem', height: '2.5rem' }} />
								</a>
								<a href="https://www.instagram.com/myknot.co">
									<Instagram sx={{ width: '2.5rem', height: '2.5rem' }} />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</div>
	);
};

Home.route = '/';
Home.generatePath = generatePath(Home.route);
export default Home;

const VideosSection = () => {
	const { t } = useTranslation(['landing']);

	return (
		<>
			<div
				className={
					'flex flex-row justify-evenly items- py-10 text-3xl font-semibold text-gray-700 text-center max-w-screen-2xl mx-auto '
				}>
				<div className={'flex flex-col justify-start items-center'}>
					<h3 className={'py-2'}>{t('landing:sections.videos.2.title')}</h3>
					<iframe src="https://www.youtube.com/embed/YfR-foMvV2o" className="landing-video" />
				</div>

				<div className={'flex flex-col justify-start items-center'}>
					<h3 className={'py-2'}>{t('landing:sections.videos.1.title')}</h3>
					<iframe src="https://www.youtube.com/embed/EWxwjEAdYbY" className="landing-video" />
				</div>

				<div className={'flex flex-col justify-start items-center'}>
					<h3 className={'py-2'}>{t('landing:sections.videos.0.title')}</h3>
					<iframe className="landing-video" src="https://youtube.com/embed/8yAz_9bGVNg" />
				</div>
			</div>
		</>
	);
};

const SlidesSection = () => {
	const { t } = useTranslation(['landing', 'main']);
	return (
		<>
			<section
				id={'section-1'}
				className="section-1 rounded-2xl overflow-hidden max-w-screen-2xl mx-auto mt-10 py-20"
				about="section-1">
				{/*<Box className="description">*/}
				{/*	<Box className="subtitle flex justify-center">*/}
				{/*		<Button*/}
				{/*			className={'w-fit'}*/}
				{/*			sx={{*/}
				{/*				borderRadius: '10rem',*/}
				{/*				width: 'fit-content',*/}
				{/*				boxShadow: 3,*/}
				{/*				my: 1,*/}
				{/*				p: 2,*/}
				{/*				bgcolor: 'white',*/}
				{/*				color: green[900],*/}
				{/*				display: { xs: 'inherit', md: 'none' },*/}
				{/*			}}*/}
				{/*			onClick={signUpPageRoute}*/}
				{/*			component={'a'}>*/}
				{/*			{t('landing:banners.main.cta')}{' '}*/}
				{/*			<ArrowRightAltRounded sx={{ transform: i18n.dir() === 'rtl' ? 'scale(-1)' : 'scale(1)' }} />*/}
				{/*		</Button>*/}
				{/*	</Box>*/}
				{/*</Box>*/}

				<div id="section-1-slides" className="flex flex-col py-5 max-w-screen-xl mx-auto">
					<h2 className="py-3 text-3xl text-black">
						<b>{t('landing:sections.1.title')}</b>
					</h2>

					<div
						className="5flex flex-row justify-evenly flex-wrap grid gap-3 px-2 px-sm-4 md:grid-cols-3 md:gap-x-10 grid-cols-1"
						style={{ zIndex: 1 }}>
						<div className="flex flex-col col-span-1">
							<div
								id="slide-1"
								about="plan"
								className="image rounded-lg"
								style={{ '--background-image': 'url(/assets/landing/section-1-slide-1.jpg)' } as any}>
								<div className="description">{t('landing:sections.1.slides.1.title')}</div>
							</div>
						</div>
						<div className="flex flex-col col-span-1">
							<div
								id="slide-2"
								about="plan"
								className="image rounded-lg"
								style={{ '--background-image': 'url(/assets/landing/section-1-slide-2.jpg)' } as any}>
								<div className="description">{t('landing:sections.1.slides.2.title')}</div>
							</div>
						</div>
						<div className="flex flex-col  col-span-1">
							<div
								id="slide-3"
								about="plan"
								className="image rounded-lg"
								style={{ '--background-image': 'url(/assets/landing/section-1-slide-3.jpg)' } as any}>
								<div className="description">{t('landing:sections.1.slides.3.title')}</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

const images = [
	'https://cdn.shopify.com/s/files/1/0756/9165/5444/t/3/assets/step04_share_everytying_cropped-1683124554306.png',
	'https://cdn.shopify.com/s/files/1/0756/9165/5444/t/3/assets/custom_links--edited-1684234107944.jpg',
	'https://cdn.shopify.com/s/files/1/0756/9165/5444/t/3/assets/iphone12promockup--edited-1684236497722.jpg',
];
const icons = [<i className="fa fa-link" />, <i className="fa fa-gears" />, <i className="fa fa-bolt-lightning" />];
const FeaturesSection = () => {
	const { t } = useTranslation(['landing']);

	return (
		<div className={'flex flex-col gap-10  max-w-screen-2xl mx-auto'}>
			{[0, 1, 2].map((key) => {
				return (
					<div key={key} className={'grid grid-cols-2 justify-evenly items-center gap-5'}>
						<div className={'flex flex-col text-black text-center text-2xl'}>
							<h1 className={'text-4xl font-semibold'}>
								{icons[key]}
								<br />

								{t(`landing:sections.features.${key}.title`)}
							</h1>
							<p>{t(`landing:sections.features.${key}.subtitle`)}</p>
						</div>

						<div
							className={' bg-green-100 rounded-2xl max-h-[600px] p-10 h-full'}
							style={{ order: -1 * (key % 2) }}>
							<img src={images[key]} loading="lazy" className={'object-contain mx-auto h-full'} />
						</div>
					</div>
				);
			})}
		</div>
	);
};
