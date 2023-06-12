import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useMemo } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { amber, blue, green, red } from '@mui/material/colors';
import { useProductsFindAll } from '../../api/products/products';
import LinkIcon from '@mui/icons-material/Link';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DrawerPage, generatePath } from '@components/base-page.type';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useLayout, useLayoutTitleEffect } from '@components/layout/context';
import { useGuard } from '@hooks/useUser';
import AuthPage, { AuthPageOptions } from '@pages/auth';
import { useEnterprisesFindOne } from '../../api/enterprises/enterprises';
import { userProductsUnlinkProduct } from '../../api/user-products/user-products';
import { UnlinkProductActionCell } from '@components/products/unlink-product-action-cell';
import { useTranslation } from 'react-i18next';

import Helmet from 'react-helmet';
import { Title } from '@components/title';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { Avatar, IconButton, ListItemAvatar } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import { EditProfilePage } from '@pages/employees/edit-profile.page';
import _ from 'lodash';
import { productShortId } from '@pages/distributor/qr/qr-list.page';

export const ProductsPage: DrawerPage = () => {
	const { user } = useGuard({ defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }) });
	const query = useEnterprisesFindOne(
		user?.enterpriseAccess?.enterpriseId ?? '',
		{ include: JSON.stringify({ products: { include: { owner: true, QR: true } } }) },
		{ query: { enabled: !!user?.enterpriseAccess?.enterpriseId } },
	);

	const { showSuccessMessage, showErrorMessage } = useSnackbar();
	const { t, i18n } = useTranslation(['main']);

	const columns: GridColDef[] = useMemo(() => {
		return [
			{
				field: 'QR',
				headerName: t('product_number'),
				minWidth: 100,
				flex: 2,
				valueGetter: (params: GridValueGetterParams) => productShortId(params.row),
			},
			{
				field: 'id',
				headerName: t('id'),
				minWidth: 200,
				flex: 2,
			},

			{
				field: 'type',
				headerName: t('productType'),
				type: 'string',
				valueGetter: (params: GridValueGetterParams) => t(params.value) + ' ' + params.value,
				minWidth: 200,
				flex: 3,
				renderCell: (params) => (
					<>
						{' '}
						<img
							style={{ width: '3rem', height: '3rem' }}
							src={`/assets/products/${params.row.type.toLowerCase()}.png`}
						/>{' '}
						{t(params.row.type)}{' '}
					</>
				),
			},
			{
				field: 'state',
				headerName: t('productState'),
				type: 'string',
				valueGetter: (params: GridValueGetterParams) =>
					params.row?.ownerID ? `linked ${t('linked')}` : `notLinked ${t('notLinked')}`,
				renderCell: (params) =>
					params.row?.ownerID ? (
						<>
							<LinkIcon sx={{ color: green[300] }} /> {t('linked')}{' '}
						</>
					) : (
						<>
							<LinkOffIcon sx={{ color: red[300] }} /> {t('notLinked')}
						</>
					),
				minWidth: 150,
				flex: 3,
			},
			{
				field: 'owner',
				headerName: t('linkedEmployee'),
				type: 'string',
				renderCell: (params) => {
					if (params.row.owner) {
						const { owner } = params.row;
						return (
							<ListItem component={'a'} href={EditProfilePage.generatePath({ id: owner.id })}>
								<ListItemAvatar>
									<Avatar src={getPublicImageUrlFromPath(`users/${owner.id}/profile`)}>
										{owner.fullName
											.split(/\s+/)
											.map((s) => s.charAt(0))
											.join('')}
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={params.row.owner.fullName} />
							</ListItem>
						);
					} else {
						return <></>;
					}
				},
				minWidth: 150,
				flex: 3,
			},

			{
				field: 'url',
				headerName: t('url'),
				valueGetter: (params: GridValueGetterParams) => `https://app.myknot.co/p/${params.row.id}`,
				renderCell: (params) => (
					<>
						<a href={params.value}>
							{' '}
							<ArrowOutwardIcon sx={{ color: blue[500] }} />
						</a>
						<IconButton
							href={params.value}
							onClick={(e) => {
								e.preventDefault();
								navigator.clipboard.writeText(params.value).then((r) => {
									showSuccessMessage(t('copiedSuccessfully'));
								});
							}}>
							{' '}
							<ContentCopyIcon sx={{ color: amber[500] }} />
						</IconButton>
					</>
				),
				minWidth: 100,
				flex: 2,
			},
			{
				field: 'actions',
				headerName: t('actions'),
				type: 'actions',
				minWidth: 100,
				flex: 2,
				getActions(params) {
					const actions: any[] = [];
					if (params.row?.ownerID) actions.push(<UnlinkProductActionCell row={params.row} />);
					return actions;
				},
			},
		];
	}, [i18n.language]);

	return (
		<>
			<Title labelKey={ProductsPage.labelKey ?? ProductsPage.fallbackLabel ?? ''} />
			<Helmet>
				<title>
					{t(ProductsPage.labelKey as any)} | {t('knot')}
				</title>
			</Helmet>

			{query.isLoading && <>Loading ...</>}
			{Array.isArray((query?.data?.data as any)?.products) && (
				<>
					<Box sx={{ minHeight: 400, height: '80%', width: '100%', pt: 10 }}>
						<DataGrid
							rows={(query?.data?.data as any)?.products as any}
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
		</>
	);
};

ProductsPage.icon = <ShoppingBagIcon />;
ProductsPage.labelKey = 'products';
ProductsPage.fallbackLabel = 'Products';
ProductsPage.route = '/dashboard/products';
ProductsPage.generatePath = generatePath(ProductsPage.route);
