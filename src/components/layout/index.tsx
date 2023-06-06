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
import { useEffect, useState } from 'react';
import { useStateLogger } from '@hooks/useStateLogger';
import { LayoutConsumer, LayoutProvider, useLayout } from '@components/layout/context';
import { DrawerPage } from '@components/base-page.type';
import { EmployeesPage } from '@pages/employees';
import { ProductsPage } from '@pages/products';
import AppIcon from '@assets/app_icon.png';
import { grey } from '@mui/material/colors';
import { useCurrentUser } from '@hooks/useUser';
import UserDropdown from '@components/layout/app-bar/user-dropdown';
import { LanguageDropDown } from '@components/layout/app-bar/lang-dropdown';
import { useTranslation } from 'react-i18next';
import { getEnterpriseLogoUrl } from '../../helpers/enterprise/get-enterprise-logo';
import clsx from 'clsx';

const DrawerPages: DrawerPage[] = [EmployeesPage, ProductsPage];
export default function Layout({ children }) {
	const theme = useTheme();
	const { user, fireUser, fetchCompleted, authCompleted, query } = useCurrentUser();
	useStateLogger({ user, query });
	const { t } = useTranslation(['main']);
	// console.log({user,query})
	const [imageSrc, setImageSrc] = useState<string>();

	useEffect(() => {
		if (user) {
			setImageSrc(getEnterpriseLogoUrl(user?.enterpriseAccess?.enterpriseId));
		}
	}, [user]);
	return (
		<LayoutProvider key={'layout'}>
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
										{user?.enterpriseAccess?.enterprise?.name}
									</Typography>
								)}
							</Box>
							<Divider />
							<List>
								{DrawerPages.map(({ icon, labelKey, fallbackLabel, route, generatePath }) => (
									<ListItem key={route} disablePadding sx={{ display: 'block' }}>
										<ListItemButton
											href={generatePath()}
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
								))}
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
