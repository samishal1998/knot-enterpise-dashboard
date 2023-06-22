import { usersDelete, useUsersFindAll } from '../../../api/users/users';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { amber, green, red } from '@mui/material/colors';
import { DrawerPage, generatePath } from '@components/base-page.type';
import BadgeIcon from '@mui/icons-material/Badge';
import { useGuard } from '@hooks/useUser';
import AuthPage, { AuthPageOptions } from '@pages/auth/auth.page';
import { useLayout, useLayoutTitleEffect } from '@components/layout/context';
import {
	useEnterprisesFindOne,
	useEnterprisesUnlinkEmployee,
	useEnterprisesUpdate,
} from '../../../api/enterprises/enterprises';
import { useStateLogger } from '@hooks/useStateLogger';
import { EditProfilePage } from '@pages/enterprise/employees/edit-profile.page';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Title } from '@components/title';
import { Avatar, Button, CircularProgress, Dialog, Link, ListItemAvatar } from '@mui/material';
import { resolve } from '@utils/helpers';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useQueryClient } from '@tanstack/react-query';
import ListItem from '@mui/material/ListItem';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import ListItemText from '@mui/material/ListItemText';
import { LoadingPaper } from '@components/LoadingContent';
import { PersonAddAlt1Rounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { CreateProfilePage } from './create-profile.page';

export const EmployeesPage: DrawerPage = () => {
	const { user } = useGuard({ defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }) });

	const query = useEnterprisesFindOne(
		user?.enterpriseAccess?.enterpriseId ?? '',
		{ include: '{"all":true}' },
		{ query: { enabled: !!user?.enterpriseAccess?.enterpriseId } },
	);

	const enterprise = useMemo(() => query.data?.data, [query.data]);
	const { mutateAsync, isLoading } = useEnterprisesUnlinkEmployee();

	const { t, i18n } = useTranslation(['main', 'employees']);

	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const unlinkEmployee = useCallback(
		async (employee) => {
			setLoading(true);
			const [res, error] = await resolve(
				mutateAsync({ id: user!.enterpriseAccess!.enterpriseId, employeeId: employee.id }),
			);
			console.log({ res, error, query });
			if (error) {
				showErrorMessage(t('employees:actions.unlink.request.failure.message'));
			} else {
				await queryClient.invalidateQueries(query.queryKey);
				showSuccessMessage(t('employees:actions.unlink.request.success.message'));
			}
			setLoading(false);
		},
		[user, query, queryClient, t],
	);
	const deleteEmployee = useCallback(
		async (employee) => {
			setLoading(true);
			const [res, error] = await resolve(usersDelete(employee.id));
			console.log({ res, error, query });
			if (error) {
				showErrorMessage(t('employees:actions.unlink.request.failure.message'));
			} else {
				await queryClient.invalidateQueries(query.queryKey);
				showSuccessMessage(t('employees:actions.unlink.request.success.message'));
			}
			setLoading(false);
		},
		[user, query, queryClient, t],
	);

	const columns: GridColDef[] = useMemo(() => {
		return [
			{
				field: 'id',
				headerName: t('employees:tables.main.columns.id.title'),
				minWidth: 100,
				flex: 1,
			},
			{
				field: 'fullName',
				headerName: t('employees:tables.main.columns.fullName.title'),
				type: 'string',
				renderCell: (params) => {
					if (params.row) {
						const { fullName, id } = params.row;
						return (
							<ListItem component={'a'} href={EditProfilePage.generatePath({ id })}>
								<ListItemAvatar sx={{ p: 2 }}>
									<Avatar
										src={getPublicImageUrlFromPath(`users/${id}/profile`)}
										sx={{ width: 80, height: 80 }}>
										{fullName
											.trim()
											.split(/\s+/)
											.map((s) => s.charAt(0))
											.join('')}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={fullName} />
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
				headerName: t('employees:tables.main.columns.email.title'),
				type: 'string',
				// editable: true,
				valueGetter: (params: GridValueGetterParams) => params.value,
				minWidth: 200,
				flex: 1,
			},
			{
				field: 'primaryPhone',
				headerName: t('employees:tables.main.columns.phone.title'),
				type: 'string',
				editable: true,
				valueGetter: (params: GridValueGetterParams) => params.value,
				minWidth: 200,
				flex: 1,
			},
			{
				field: 'workInfo',
				headerName: t('employees:tables.main.columns.positionInCompany.title'),
				type: 'string',
				// editable: true,
				valueGetter: (params: GridValueGetterParams) => params.row.workInfo?.position,
				minWidth: 200,
				flex: 1,
			},
			{
				field: 'bio',
				headerName: t('employees:tables.main.columns.bio.title'),
				type: 'string',
				editable: true,
				valueGetter: (params: GridValueGetterParams) => params.value,
				minWidth: 400,
				flex: 1,
			},
			{
				field: 'actions',
				headerName: t('employees:tables.main.columns.actions.title'),
				type: 'actions',
				minWidth: 100,
				getActions(params) {
					const actions = [
						<GridActionsCellItem
							label={'Unlink'}
							icon={<LinkOffIcon sx={{ color: amber[300] }} />}
							onClick={(e) => {
								unlinkEmployee(params.row);
							}}
						/>,
						// @ts-ignore
						<Link href={EditProfilePage.generatePath({ id: params.id.toString() })}>
							<GridActionsCellItem label={'Edit'} icon={<EditIcon sx={{ color: green[300] }} />} />
						</Link>,
					];
					console.log(params.row.createdById, params.row.enterpriseId);
					if (params.row.createdById == params.row.enterpriseId)
						actions.push(
							// @ts-ignore

							<GridActionsCellItem
								onClick={() => deleteEmployee(params.row)}
								label={'Delete'}
								icon={<DeleteForeverIcon sx={{ color: red[300] }} />}
							/>,
						);
					return actions;
				},
				flex: 1,
			},
		];
	}, [i18n?.language, user]);

	const handleCreateProfileClicked = useCallback(() => {
		if (enterprise?.products?.some(({ ownerID, activated }) => !activated && !ownerID)) {
			navigate(CreateProfilePage.generatePath());
		} else {
			showErrorMessage(t('employees:actions.create.guards.noAvailableProducts.message'));
		}
	}, [enterprise, showErrorMessage]);
	return (
		<>
			<Dialog open={loading}>
				<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
					<CircularProgress />
				</Box>
			</Dialog>
			<Title labelKey={EmployeesPage.labelKey ?? EmployeesPage.fallbackLabel ?? ''} />

			<LoadingPaper isLoading={query.isLoading}>
				<div className={'pt-10 h-full gap-2 flex flex-col items-stretch justify-start'}>
					<div>
						<Button
							startIcon={<PersonAddAlt1Rounded />}
							onClick={handleCreateProfileClicked}
							sx={{ paddingY: 1, paddingX: 3 }}>
							{t('employees:actions.create.label')}
						</Button>
					</div>
					{Array.isArray((enterprise as any)?.employees) && (
						<>
							<Box sx={{ minHeight: 400, height: '80%', width: '100%' }}>
								<DataGrid
									rowHeight={96}
									rows={(query?.data?.data as any)?.employees as any}
									columns={columns}
									initialState={{
										pagination: {
											paginationModel: {
												pageSize: 20,
											},
										},
									}}
									pageSizeOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
									// checkboxSelection
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

EmployeesPage.icon = <BadgeIcon />;
EmployeesPage.labelKey = 'employees';
EmployeesPage.fallbackLabel = 'Employees';

EmployeesPage.route = '/enterprise/employees';
EmployeesPage.generatePath = generatePath(EmployeesPage.route);
