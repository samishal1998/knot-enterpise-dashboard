import * as React from 'react';
import { useMemo } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { green, grey } from '@mui/material/colors';
import { Divider, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { fireAuth } from '@utils/firebase';
import { signOut } from '@firebase/auth';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import { AccountCircleOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Color from 'color';
import { User } from '../../../api/models';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useNavigate } from 'react-router-dom';
import { AccountSettingsPage } from '@pages/dashboard/account';
import AuthPage, { AuthPageOptions } from '@pages/auth/auth.page';
import ManageSubscriptionPage from '@pages/dashboard/account/manage-subscription.page';

// let sx = {
// 	background:Color(green[400]).alpha(0.3).hsl().toString(),
// 	height:'3.0rem',width:'3.0rem',
// 		borderRadius:'100%',
// 		display:'flex',
// 		"&:hover":{
// 		background:Color(green[400]).alpha(0.6).hsl().toString(),
// 			color:grey[700],
// 	}
// }
let color = Color(green[400]);
let mainPageSX = ({ toTop = false }) => ({
	height: '2.00rem',
	width: '2.00rem',
	color: toTop ? 'white' : grey[600],
	'&:hover': {
		color: grey[700],
	},
	margin: 'auto',
	borderRadius: '100%',
});
let defaultSX = { height: '2.00rem', width: '2.00rem', color: green[600], margin: 'auto' };

export default function UserDropdown({
	page = 'dashboard',
	ns,
	toTop,
	user,
}: {
	page?: string;
	ns?: string;
	toTop?: boolean;
	user?: User;
}) {
	// const { t, i18n } = useTranslation(ns);
	let { showErrorMessage, showSuccessMessage } = useSnackbar();
	const userPopupState = usePopupState({ variant: 'popper', popupId: 'user' });
	const navigate = useNavigate();
	const { t } = useTranslation(['main']);
	let iconProps = useMemo(() => {
		switch (page) {
			case 'dashboard':
				return { sx: defaultSX };
			case 'main':
				return { sx: mainPageSX({ toTop }) };
			default:
				return { sx: defaultSX };
		}
	}, [page, toTop]);
	const handleSignOut = () => {
		userPopupState.close();
		signOut(fireAuth)
			.then(() => {
				showSuccessMessage(t('main:signedOut.successMessage'));
				navigate(AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }));
			})
			.catch(() => showErrorMessage(t('main:signedOut.failureMessage')));
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				color="inherit"
				{...bindTrigger(userPopupState)}>
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
					<AccountCircleOutlined {...iconProps} />
				</Box>
			</IconButton>
			<Menu
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				{...bindMenu(userPopupState)}>
				<Link href={AccountSettingsPage.generatePath()}>
					<a>
						<MenuItem>{t('main:myAccount')}</MenuItem>
					</a>
				</Link>
				<Link href={ManageSubscriptionPage.generatePath()}>
					<a>
						<MenuItem>{t('main:subscriptions')}</MenuItem>
					</a>
				</Link>

				<Divider />
				<MenuItem onClick={handleSignOut}>{t('main:signOut')}</MenuItem>
			</Menu>
		</>
	);
}
