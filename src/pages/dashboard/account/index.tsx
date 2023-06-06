import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { amber, green, red } from '@mui/material/colors';
import { Title } from 'react-admin';
import { DrawerPage, generatePath } from '@components/base-page.type';
import BadgeIcon from '@mui/icons-material/Badge';
import { useGuard } from '@hooks/useUser';
import AuthPage, { AuthPageOptions } from '@pages/auth';
import { useLayout, useLayoutTitleEffect } from '@components/layout/context';
import { useStateLogger } from '@hooks/useStateLogger';
import { EditProfilePage } from '@pages/employees/edit-profile.page';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEnterprisesFindOne } from '../../../api/enterprises/enterprises';
import { LoadingPaper } from '@components/LoadingContent';
import { AccountTabs } from '@components/account/account-tabs';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import ManageProfilePage from '@pages/dashboard/account/manage-profile';

export const AccountSettingsPage: DrawerPage = () => {
	const { user } = useGuard({ defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }) });
	const query = useEnterprisesFindOne(
		user?.enterpriseAccess?.enterpriseId ?? '',
		{ include: '{"all":true}' },
		{ query: { enabled: !!user?.enterpriseAccess?.enterpriseId } },
	);
	const navigate = useNavigate();
	const location = useLocation();

	useStateLogger(location);

	return (
		<>
			<div className={'pb-10'}>
				<div className={'py-5 px-1 mx-auto max-w-screen-xl '}>
					<AccountTabs page={location.pathname} className={'pb-5 mx-auto '} navigate={navigate} />
					<Outlet />
				</div>
			</div>
		</>
	);
};

AccountSettingsPage.icon = <SettingsIcon />;
AccountSettingsPage.labelKey = '';
AccountSettingsPage.fallbackLabel = 'Settings';

AccountSettingsPage.route = '/dashboard/account';
AccountSettingsPage.generatePath = generatePath(AccountSettingsPage.route);
