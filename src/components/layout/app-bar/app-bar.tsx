export {};
// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import { green, grey } from '@mui/material/colors';
// import { useEffect, useState } from 'react';
// import {Button, Divider, Link} from '@mui/material';
//
// import Color from 'color';
// import SupplierOffersPage from '@pages/supplier/dashboard/offers';
// import { useTranslation } from 'react-i18next';
// import { firebaseAuth } from '@utils/firebase';
// import { signOut } from '@firebase/auth';
// import { useSnackbar } from '@components/snackbar';
// import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
// import { SearchIcon, TranslateIcon } from '@icons';
// import UserDropdown from '@components/app-bar/user-dropdown';
// import { Search, SearchIconWrapper, SearchInput } from './search';
// import { useCurrentUser } from '@hooks/useUser';
// import {useRouter} from "@hooks/useRouter";
// import {UserType} from "@prisma/client.ts";
//
// export default function MenuAppBar({ title = 'MoQawlaty', search }: { title?; search? }) {
// 	const [anchorEl, setAnchorEl] = React.useState(null);
// 	const [scrollY, setScrollY] = useState(0);
// 	const router = useRouter();
// 	const { t, i18n } = useTranslation(['main']);
// 	let { showErrorMessage, showSuccessMessage } = useSnackbar();
// 	const langPopupState = usePopupState({ variant: 'popper', popupId: 'language' });
// 	const { user } = useCurrentUser();
// 	useEffect(() => {
// 		window.addEventListener('scroll', () => {
// 			setScrollY(window?.scrollY);
// 		});
// 	}, []);
// 	const handleMenu = (event) => {
// 		setAnchorEl(event.currentTarget);
// 	};
//
// 	const handleClose = () => {
// 		setAnchorEl(null);
// 	};
// 	const handleSignOut = () => {
// 		setAnchorEl(null);
// 		signOut(firebaseAuth)
// 			.then(() => {
// 				showSuccessMessage(t('signedOut.successMessage'));
// 				router.push('/');
// 			})
// 			.catch(() => showErrorMessage(t('signedOut.failureMessage')));
// 	};
// 	// console.log({router})
// 	return (
// 		<AppBar
// 			position="sticky"
// 			variant={'outlined'}
// 			sx={{
// 				background: `linear-gradient(${green[50]},${scrollY > 0 ? 'white' : 'transparent'})`,
// 				// boxShadow:(scrollY>0)? `0px .1px 5px ${green[900]}`:"",
//
// 				padding: {
// 					xs: scrollY > 0 ? ' .5vw 1vw ' : '1.5vw 2vw',
// 					md: scrollY > 0 ? ' .5vw 1vw ' : '2vw 2vw',
// 				},
// 				transition: '600ms ease-in-out',
// 				boxShadow: scrollY > 0 ? `0px 1px 20px black` : '',
// 			}}>
// 			<Toolbar
// 				className={'max-w-screen-2xl mx-auto flex flex-col items-stretch'}
// 				sx={{
// 					width: '100%',
// 					padding: {
// 						lg: scrollY > 0 ? ' 0px 1vw ' : '0px 2vw',
// 					},
// 					transition: '600ms ease-in-out',
// 				}}
// 				variant={'regular'}>
// 				<div className={'flex flex-row items-center w-full'}>
// 					<Link href={'/'}>
// 						<a>
// 							<img className={'logo'} src={'/assets/logo-no-text.svg'} />
// 						</a>
// 					</Link>
//
// 					{Boolean(title) && (
// 						<Typography
// 							variant="h6"
// 							component="div"
// 							sx={{ flexGrow: { xs: 1, md: search ? 0 : 1 }, padding: '0 1rem' }}>
// 							{title}
// 						</Typography>
// 					)}
// 					{search && (
// 						<Box
// 							key={'search-container'}
// 							sx={{
// 								marginX: 3,
// 								flexGrow: 1,
// 								display: { xs: 'none', md: 'block' },
// 								transition: '800ms ease-in-out',
// 							}}>
// 							{search}
// 						</Box>
// 					)}
//
// 					<div className={'flex flex-row items-center'}>
// 						{user?.userType !== UserType.SUPPLIER || router?.asPath.startsWith('/supplier/dashboard') || (
// 							<Link href={SupplierOffersPage.route}>
// 								<a>
// 									<Button
// 										sx={{
// 											background: Color(green[100]).alpha(0.3).hsl().toString(),
// 											color: grey[600],
// 											'&:hover': {
// 												background: green[100],
// 												color: grey[900],
// 											},
// 											borderRadius: '100rem',
// 											padding: '.75rem',
// 											paddingX: '1.5rem',
// 											display: {
// 												xs: 'none',
// 												md: 'flex',
// 											},
// 										}}>
// 										{t('dashboard')}
// 									</Button>
// 								</a>
// 							</Link>
// 						)}
// 						{user && <UserDropdown user={user} ns={'main'} />}
//
// 						<div>
// 							<IconButton
// 								size="large"
// 								aria-label="language"
// 								aria-controls="menu-appbar"
// 								// aria-haspopup="true"
// 								color="inherit"
// 								{...bindTrigger(langPopupState)}>
// 								<Box
// 									sx={{
// 										background: Color(green[400]).alpha(0.3).hsl().toString(),
// 										height: '3.0rem',
// 										width: '3.0rem',
// 										borderRadius: '100%',
// 										display: 'flex',
// 										'&:hover': {
// 											background: Color(green[400]).alpha(0.6).hsl().toString(),
// 											color: grey[200],
// 										},
// 									}}>
// 									{/*<img className={'m-auto'} src="/assets/lang.svg" style={{height:'1.5rem',width:'1.5rem',color:'white',}}/>*/}
// 									<TranslateIcon
// 										className={'m-auto'}
// 										sx={{ color: green[600], height: '1.75rem', width: '1.75rem' }}
// 									/>
// 								</Box>
// 							</IconButton>
// 							<Menu {...bindMenu(langPopupState)}>
// 								<MenuItem selected={i18n.language == 'en'} onClick={langPopupState.close}>
// 									<Link href={router.asPath} onClick={()=>i18n.changeLanguage('en')}>
// 										<a>{t('english')}</a>
// 									</Link>
// 								</MenuItem>
// 								<MenuItem selected={i18n.language == 'ar'} onClick={langPopupState.close}>
// 									<Link href={router.asPath} onClick={()=>i18n.changeLanguage('ar')}>
// 										<a>{t('arabic')}</a>
// 									</Link>
// 								</MenuItem>
// 							</Menu>
// 						</div>
// 					</div>
// 				</div>
// 				{search && (
// 					<Box
// 						key={'search-container'}
// 						sx={{ display: { xs: 'block', md: 'none' }, marginY: 2, transition: '800ms ease-in-out' }}>
// 						{search}
// 					</Box>
// 				)}
// 			</Toolbar>
// 		</AppBar>
// 	);
// }
