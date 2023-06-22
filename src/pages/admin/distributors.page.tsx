import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useMemo, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { amber, green, red } from '@mui/material/colors';
import { DrawerPage, generatePath } from '@components/base-page.type';
import BadgeIcon from '@mui/icons-material/Badge';
import { GuardType, useGuard } from '@hooks/useUser';
import AuthPage, { AuthPageOptions } from '@pages/auth/auth.page';
import { EditProfilePage } from '@pages/enterprise/employees/edit-profile.page';
import { useTranslation } from 'react-i18next';
import { Title } from '@components/title';
import { Avatar, Button, CircularProgress, Dialog, Link, ListItemAvatar } from '@mui/material';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useQueryClient } from '@tanstack/react-query';
import ListItem from '@mui/material/ListItem';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import ListItemText from '@mui/material/ListItemText';
import { LoadingPaper } from '@components/LoadingContent';
import {
	CancelOutlined,
	CancelRounded,
	CheckCircleOutlineRounded,
	CheckCircleRounded,
	PersonAddAlt1Rounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDistributorsFindAll } from '../../api/distributors/distributors';
import { Distributor } from '../../api/models';
import { getDistributorLogoUrl } from '../../helpers/distributor/get-distributor-logo';

const StyledBooleanIcon = ({ value }) =>
	value ? <CheckCircleRounded sx={{ color: green[300] }} /> : <CancelRounded sx={{ color: red[300] }} />;
const StyledBooleanGridCell = (params) => (
	<>
		<StyledBooleanIcon value={params.value} />
	</>
);
export const DistributorsManagementPage: DrawerPage = () => {
	const { user } = useGuard({
		guardType: GuardType.ADMIN_ONLY,
		defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }),
	});

	const { t, i18n } = useTranslation(['main', 'admin']);

	const query = useDistributorsFindAll();

	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const columns: GridColDef<Distributor>[] = useMemo(() => {
		return [
			{
				field: 'id',
				headerName: t('admin:distributors.tables.main.columns.id.title'),
				minWidth: 100,
				flex: 1,
				editable: true,
			},
			{
				field: 'fullName',
				headerName: t('admin:distributors.tables.main.columns.fullName.title'),
				type: 'string',
				renderCell: (params) => {
					if (params.row) {
						const { name, id } = params.row;
						return (
							<ListItem component={'a'} href={EditProfilePage.generatePath({ id })}>
								<ListItemAvatar sx={{ p: 2 }}>
									<Avatar src={getDistributorLogoUrl(id)} sx={{ width: 80, height: 80 }}>
										{name
											?.trim()
											.split(/\s+/)
											.map((s) => s.charAt(0))
											.join('') || ''}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={name} />
							</ListItem>
						);
					} else {
						return <></>;
					}
				},
				minWidth: 200,
				flex: 2,
			},
			{
				field: 'primaryEmail',
				headerName: t('admin:distributors.tables.main.columns.email.title'),
				type: 'string',
				// editable: true,
				valueGetter: (params) => params.row.users?.[0]?.primaryEmail,
				minWidth: 200,
				flex: 1,
			},
			{
				field: 'primaryPhone',
				headerName: t('admin:distributors.tables.main.columns.phone.title'),
				type: 'string',
				editable: true,
				valueGetter: (params) => params.row.users?.[0]?.primaryPhone,
				minWidth: 200,
				flex: 1,
			},
			// {
			// 	field: 'approved',
			// 	headerName: t('admin:distributors.tables.main.columns.approved.title'),
			// 	type: 'boolean',
			// 	renderCell: StyledBooleanGridCell,
			// 	minWidth: 50,
			// 	flex: 1,
			// },
			{
				field: 'subscriptions',
				headerName: t('admin:distributors.tables.main.columns.active-subscription.title'),
				type: 'boolean',
				editable: true,
				valueGetter: (params) => {
					const subscription = params.row.subscriptions?.[0];
					const endDate = subscription?.endDate ? new Date(subscription?.endDate) : undefined;
					return subscription?.id && endDate && endDate.getTime() > new Date().getTime();
				},
				renderCell: StyledBooleanGridCell,
				minWidth: 50,
				flex: 1,
			},
			{
				field: 'products',
				headerName: t('admin:distributors.tables.main.columns.products.title'),
				type: 'string',
				editable: true,
				valueGetter: (params) => params.row.products?.length,
				minWidth: 200,
				flex: 1,
			},

			// {
			// 	field: 'actions',
			// 	headerName: t('admin:distributors.tables.main.columns.actions.title'),
			// 	type: 'actions',
			// 	minWidth: 100,
			// 	getActions(params) {
			// 		const actions: any[] = [];
			// 		if (params.row.approved === false || true) {
			// 			actions.push(
			// 				<GridActionsCellItem
			// 					label={'Approve'}
			// 					icon={<CheckCircleOutlineRounded sx={{ color: green[500] }} />}
			// 					onClick={(e) => {}}
			// 				/>,
			// 			);
			// 		}
			// 		return actions;
			// 	},
			// 	flex: 1,
			// },
		];
	}, [i18n?.language, user]);

	return (
		<>
			<Dialog open={loading}>
				<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
					<CircularProgress />
				</Box>
			</Dialog>
			<Title labelKey={DistributorsManagementPage.labelKey ?? DistributorsManagementPage.fallbackLabel ?? ''} />

			<LoadingPaper isLoading={query.isLoading}>
				<div className={'pt-10 h-full gap-2 flex flex-col items-stretch justify-start'}>
					{Array.isArray(query.data?.data as any) && (
						<>
							<Box sx={{ minHeight: 400, height: '80%', width: '100%' }}>
								<DataGrid
									rowHeight={96}
									rows={query?.data?.data as any}
									columns={columns}
									classes={{ row: 'font-semibold', columnHeader: 'font-bold text-lg' }}
									initialState={{
										pagination: {
											paginationModel: {
												pageSize: 25,
											},
										},
									}}
									pageSizeOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
									disableRowSelectionOnClick
								/>
							</Box>
						</>
					)}
				</div>
			</LoadingPaper>
		</>
	);
};

DistributorsManagementPage.icon = <BadgeIcon />;
DistributorsManagementPage.labelKey = 'distributors';
DistributorsManagementPage.fallbackLabel = 'Distributors';

DistributorsManagementPage.route = '/admin/distributors';
DistributorsManagementPage.generatePath = generatePath(DistributorsManagementPage.route);
