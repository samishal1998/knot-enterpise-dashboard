import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { AppBar } from './toolbar';
import { Drawer, DrawerHeader } from './drawer';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useStateLogger } from '@hooks/useStateLogger';
import { LayoutConsumer, LayoutProvider, useLayout } from '@components/layout/context';
import { DrawerListItem, DrawerPage } from '@components/base-page.type';
import { EmployeesPage } from '@pages/enterprise/employees/employees.page';
import { ProductsPage } from '@pages/enterprise/products/prodcuts.page';
import AppIcon from '@assets/app_icon.png';
import { grey } from '@mui/material/colors';
import { useCurrentUser } from '@hooks/useUser';
import UserDropdown from '@components/layout/app-bar/user-dropdown';
import { LanguageDropDown } from '@components/layout/app-bar/lang-dropdown';
import { useTranslation } from 'react-i18next';
import { getEnterpriseLogoUrl } from '../../helpers/enterprise/get-enterprise-logo';
import clsx from 'clsx';
import QrListPage from '@pages/distributor/qr/qr-list.page';
import GenerateQrPage from '@pages/distributor/qr/generate/generate-qr.page';
import { User } from '../../api/models';
import ManageSubscriptionPage from '@pages/dashboard/account/manage-subscription.page';
import ManageAuthenticationPage from '@pages/dashboard/account/manage-authentication';
import HomePage from '@pages/home.page';
import { HomeRounded, LogoutRounded, SettingsRounded, ShoppingCart } from '@mui/icons-material';
import { signOut } from '@firebase/auth';
import { fireAuth } from '@utils/firebase';
import AuthPage, { AuthPageOptions } from '@pages/auth/auth.page';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useNavigate } from 'react-router-dom';
import ManageDistributorProfilePage from '@pages/distributor/manage-distributor-profile';
import { useDistributorsConfirmPayment, useDistributorsGetMe } from '../../api/distributors/distributors';
import { getDistributorLogoUrl } from '../../helpers/distributor/get-distributor-logo';
import { DistributorsManagementPage } from '@pages/admin/distributors.page';
import { DistributorsProductsManagementPage } from '@pages/admin/distributors-products.page';

type DrawerSection = {
	condition: (args: any) => boolean;
	title: string;
	pages: DrawerListItem[];
};
const drawerSections: DrawerSection[] = [
	{
		condition: ({ user }) => {
			return user?.userType === 'ADMIN';
		},
		title: 'main:admin',
		pages: [DistributorsManagementPage, DistributorsProductsManagementPage],
	},
	{
		condition: ({ user, query }: { user: User | null | undefined; query }) => {
			return !!user?.enterpriseAccess?.id;
		},
		title: 'main:enterprise',
		pages: [EmployeesPage, ProductsPage],
	},

	{
		condition: ({ user }) => {
			return !!user?.distributorId;
		},
		title: 'main:distributor',
		pages: [
			QrListPage,
			GenerateQrPage,
			{
				type: 'href',
				icon: <SettingsRounded />,
				labelKey: 'main:howItWorks',
				fallbackLabel: 'How it works',
				href: HomePage.generatePath() + '#videos',
			},
			{
				type: 'href',
				icon: <ShoppingCart />,
				labelKey: 'qr:actions.request-products.label',
				fallbackLabel: 'Request Products',
				href: 'https://myknot.co/products/plain-plastic-card',
			},
		],
	},
	{
		condition: ({ user, query }) => {
			return !!user?.distributorId;
		},
		title: 'main:settings',
		pages: [ManageSubscriptionPage, ManageAuthenticationPage, ManageDistributorProfilePage],
	},
];
export default function Layout({ children }) {
	const theme = useTheme();
	const { user, fireUser, fetchCompleted, authCompleted, query } = useCurrentUser();
	// useStateLogger({ user, query });
	const { t } = useTranslation(['main', 'qr']);
	// console.log({user,query})
	const [imageSrc, setImageSrc] = useState<string>();

	const { showErrorMessage, showSuccessMessage } = useSnackbar();

	const distributorQuery = useDistributorsGetMe({
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorQuery?.data?.data, [distributorQuery.data?.data]);

	const navigate = useNavigate();
	useEffect(() => {
		if (user) {
			if (user.distributorId && distributor) {
				setImageSrc(getDistributorLogoUrl(distributor.id));
			} else if (user?.enterpriseAccess?.enterpriseId) {
				setImageSrc(getEnterpriseLogoUrl(user?.enterpriseAccess?.enterpriseId));
			}
		}
	}, [user, distributor]);

	const name = useMemo(() => {
		if (user?.distributorId && distributor) {
			return distributor.name;
		} else if (user?.enterpriseAccess?.enterpriseId) {
			return user?.enterpriseAccess?.enterprise?.name;
		}
		return '';
	}, [user, distributor]);

	const handleSignOut = useCallback(() => {
		signOut(fireAuth)
			.then(() => {
				showSuccessMessage(t('main:signedOut.successMessage'));
				navigate(AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }));
			})
			.catch(() => showErrorMessage(t('main:signedOut.failureMessage')));
	}, []);

	return (
		<LayoutProvider key={'layout'} defaultOpen={true}>
			<LayoutConsumer>
				{({ open, openDrawer, closeDrawer, title, setTitle }) => (
					<Box sx={{ display: 'flex', height: '100%' }}>
						<CssBaseline />
						<AppBar position="fixed" open={open} elevation={0}>
							<Toolbar>
								<IconButton
									color="inherit"
									aria-label="open drawer"
									onClick={openDrawer}
									edge="start"
									sx={{
										marginRight: 5,
										...(open && { display: 'none' }),
									}}>
									<MenuIcon />
								</IconButton>
								<Typography variant="h6" sx={{ fontWeight: '700' }} noWrap>
									{title ?? ''}
								</Typography>
								<Box flex={1} flexGrow={1} />
								<LanguageDropDown />
								<UserDropdown />
							</Toolbar>
						</AppBar>
						<Drawer variant="permanent" open={open}>
							<DrawerHeader>
								<IconButton onClick={closeDrawer}>
									{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
								</IconButton>
							</DrawerHeader>

							<Box
								className={'show-open-hide-closed'}
								sx={{
									alignItems: 'center',
									justifyContent: 'center',
									display: 'flex',
									flexDirection: 'column',
									p: 1,
									mb: 5,
								}}>
								<img
									src={imageSrc || AppIcon}
									onError={(e) => {
										setImageSrc(AppIcon);
									}}
									className={clsx(
										'rounded-full',
										'object-cover',
										'border-green-600 hover:border-green-700',
										{
											['border-4 hover:border-8']: open,
											['border-2 hover:border-4']: !open,
										},
									)}
									style={{
										aspectRatio: 1,
										width: '100%',
										marginRight: 5,
										marginLeft: 5,
									}}
								/>
								{open && (
									<Typography
										flex="1"
										textOverflow="ellipsis"
										whiteSpace="nowrap"
										overflow="hidden"
										variant="h6"
										color="inherit"
										id="react-admin-title"
										sx={{ fontSize: '1.5rem', fontWeight: '400', color: grey[700], my: 2 }}>
										{name}
									</Typography>
								)}
							</Box>
							<Divider />
							<List>
								<ListItem key={'homepage'} disablePadding sx={{ display: 'block' }}>
									<ListItemButton
										href={HomePage.generatePath()}
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}>
											<HomeRounded />
										</ListItemIcon>
										<ListItemText primary={t('main:homepage')} sx={{ opacity: open ? 1 : 0 }} />
									</ListItemButton>
								</ListItem>
								<Divider />
								{drawerSections
									.filter(({ condition }) => condition?.({ query, user }))
									.map(({ title, pages }) => {
										return (
											<>
												{open && (
													<ListItem>
														<ListItemText>{t(title)}</ListItemText>
													</ListItem>
												)}
												{pages.map(({ icon, labelKey, fallbackLabel, ...args }, index) => {
													const props = {};
													if (args.type === 'href') {
														props['href'] = args.href;
													} else if (args.type === 'action') {
														props['onClick'] = args.action;
													} else if (args.type === 'page' || args.generatePath) {
														props['href'] = args.generatePath();
													}
													return (
														<ListItem key={index} disablePadding sx={{ display: 'block' }}>
															<ListItemButton
																{...props}
																sx={{
																	minHeight: 48,
																	justifyContent: open ? 'initial' : 'center',
																	px: 2.5,
																}}>
																<ListItemIcon
																	sx={{
																		minWidth: 0,
																		mr: open ? 3 : 'auto',
																		justifyContent: 'center',
																	}}>
																	{icon}
																</ListItemIcon>
																<ListItemText
																	primary={labelKey ? t(labelKey) : fallbackLabel}
																	sx={{ opacity: open ? 1 : 0 }}
																/>
															</ListItemButton>
														</ListItem>
													);
												})}
												<Divider />
											</>
										);
									})}

								<ListItem key={'sign-out'} disablePadding sx={{ display: 'block' }}>
									<ListItemButton
										onClick={handleSignOut}
										sx={{
											minHeight: 48,
											justifyContent: open ? 'initial' : 'center',
											px: 2.5,
										}}>
										<ListItemIcon
											sx={{
												minWidth: 0,
												mr: open ? 3 : 'auto',
												justifyContent: 'center',
											}}>
											<LogoutRounded />
										</ListItemIcon>
										<ListItemText primary={t('main:signOut')} sx={{ opacity: open ? 1 : 0 }} />
									</ListItemButton>
								</ListItem>
							</List>
						</Drawer>
						<Box component="main" sx={{ flexGrow: 1, p: 5, height: '100%' }}>
							<DrawerHeader />
							{children}
						</Box>
					</Box>
				)}
			</LayoutConsumer>
		</LayoutProvider>
	);
}
