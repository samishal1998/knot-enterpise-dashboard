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
import {
	useDistributorsFindAll,
	useDistributorsFindAllProductsByAllDistributors,
} from '../../api/distributors/distributors';
import { Distributor, Product } from '../../api/models';
import { getDistributorLogoUrl } from '../../helpers/distributor/get-distributor-logo';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { productShortId } from '@pages/distributor/qr/qr-list.page';

const StyledBooleanIcon = ({ value }) =>
	value ? <CheckCircleRounded sx={{ color: green[300] }} /> : <CancelRounded sx={{ color: red[300] }} />;
const StyledBooleanGridCell = (params) => (
	<>
		<StyledBooleanIcon value={params.value} />
	</>
);
export const DistributorsProductsManagementPage: DrawerPage = () => {
	const { user } = useGuard({
		guardType: GuardType.ADMIN_ONLY,
		defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }),
	});

	const { t, i18n } = useTranslation(['main', 'admin']);

	const query = useDistributorsFindAllProductsByAllDistributors();

	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const columns: GridColDef<Product>[] = useMemo(() => {
		return [
			{
				field: 'id',
				headerName: t('admin:products.tables.main.columns.id.title'),
				minWidth: 100,
				flex: 1,
				editable: true,
			},
			{
				field: 'qr',
				headerName: t('admin:products.tables.main.columns.serial-number.title'),
				minWidth: 100,
				flex: 2,
				valueGetter: (params: GridValueGetterParams) => productShortId(params.row),
			},
			{
				field: 'generatedById',
				headerName: t('admin:products.tables.main.columns.distributor-id.title'),
				minWidth: 100,
				flex: 2,
			},
			{
				field: 'label',
				headerName: t('admin:products.tables.main.columns.label.title'),
				type: 'string',
				minWidth: 200,
				flex: 2,
			},

			{
				field: 'paymentFinalized',
				headerName: t('admin:products.tables.main.columns.paid.title'),
				type: 'boolean',
				renderCell: StyledBooleanGridCell,
				minWidth: 50,
				flex: 1,
			},
		];
	}, [i18n?.language, user]);

	return (
		<>
			<Dialog open={loading}>
				<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
					<CircularProgress />
				</Box>
			</Dialog>
			<Title
				labelKey={
					DistributorsProductsManagementPage.labelKey ??
					DistributorsProductsManagementPage.fallbackLabel ??
					''
				}
			/>

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

DistributorsProductsManagementPage.icon = <ShoppingBagIcon />;
DistributorsProductsManagementPage.labelKey = 'products';
DistributorsProductsManagementPage.fallbackLabel = 'Products';

DistributorsProductsManagementPage.route = '/admin/products';
DistributorsProductsManagementPage.generatePath = generatePath(DistributorsProductsManagementPage.route);
