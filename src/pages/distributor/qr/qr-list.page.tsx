import { DrawerPage, generatePath } from '@components/base-page.type';
import {
	ArrowDownwardRounded,
	Download,
	ExpandMoreRounded,
	PersonAddAlt1Rounded,
	PriceChangeRounded,
	PriceCheckRounded,
	QrCodeRounded,
	QrCodeScannerRounded,
	ShoppingCart,
} from '@mui/icons-material';
import { ProductsPage } from '@pages/enterprise/products/prodcuts.page';
import clsx from 'clsx';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Button,
	Card,
	CircularProgress,
	Dialog,
	Link,
	ListItemAvatar,
	TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { GuardType, useGuard } from '@hooks/useUser';
import { LoadingButton } from '@mui/lab';
import {
	distributorsPayProduct,
	useDistributorsGetGeneratedProducts,
	useDistributorsGetMe,
} from '../../../api/distributors/distributors';
import { DataGrid, GridActionsCell, GridActionsCellItem, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useCallback, useMemo, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import { EditProfilePage } from '@pages/enterprise/employees/edit-profile.page';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import ListItemText from '@mui/material/ListItemText';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { amber, blue, green, red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import { Title } from '@components/title';
import { LoadingPaper } from '@components/LoadingContent';
import { Product } from '../../../api/models';
import _ from 'lodash';
import { GridActionsCellItemProps } from '@mui/x-data-grid/components/cell/GridActionsCellItem';

import { addLocaleToGrid } from '@utils/i18n/add-locale-to-grid';
import { Qr } from '@components/Qr';
import GenerateQrPage, { PrintingInstructionsSection } from '@pages/distributor/qr/generate/generate-qr.page';
import { useNavigate } from 'react-router-dom';
import { SubscriptionActivationAlert } from '@components/subscription/subscription-card';
import { PAYMENT_DEFAULT_IFRAME, PaymentIframes } from '@utils/payment';

export function productShortId(product: Product) {
	return (
		'P' +
		_.chunk(product.qr?.shortId?.toString(16).padStart(12, '0'), 4)
			.map((a) => a.join(''))
			.join('-')
	);
}
type FormData = Partial<{
	label: string;
}>;
const QrListPage: DrawerPage = () => {
	const { user } = useGuard({
		guardType: GuardType.DISTRIBUTOR_ONLY,
	});
	const [loading, setLoading] = useState(false);
	const [downloadQr, setDownloadQr] = useState<{ content: string; name: string }>();
	const { t, i18n } = useTranslation(['qr', 'main']);
	const distributorQuery = useDistributorsGetMe({
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorQuery?.data?.data, [distributorQuery.data?.data]);
	const subscriptions = useMemo(() => distributor?.subscriptions, [distributor?.subscriptions]);
	const activeSubscription = useMemo(() => subscriptions?.[0], [subscriptions]);
	const query = useDistributorsGetGeneratedProducts(user?.distributorId ?? '', {
		query: {
			enabled: !!user?.distributorId,
		},
	});

	const [paymentKey, setPaymentKey] = useState(undefined);

	const columns: GridColDef<Product>[] = useMemo(() => {
		return [
			{
				field: 'id',
				headerName: t('qr:tables.main.columns.id.title'),
				minWidth: 100,
				valueGetter: (params) => productShortId(params.row),

				flex: 1,
			},
			{
				field: 'source',
				headerName: t('qr:tables.main.columns.source.title'),
				type: 'string',
				valueGetter: (params) =>
					t(
						params.row.type === 'EXTERNAL'
							? 'qr:tables.main.columns.source.values.external'
							: 'qr:tables.main.columns.source.values.from-knot',
					),
				minWidth: 200,
				flex: 2,
			},
			{
				field: 'label',
				headerName: t('qr:tables.main.columns.label.title'),
				type: 'string',
				minWidth: 200,
				flex: 2,
			},
			{
				field: 'paymentFinalized',
				headerName: t('qr:tables.main.columns.payment-status.title'),
				type: 'string',
				minWidth: 200,
				valueGetter: (params: GridValueGetterParams) => {
					return t(
						params.row.paymentFinalized
							? 'qr:tables.main.columns.payment-status.values.paid'
							: 'qr:tables.main.columns.payment-status.values.pending',
					);
				},

				flex: 1,
			},
			{
				field: 'paymentId',
				headerName: t('qr:tables.main.columns.payment-id.title'),
				type: 'string',
				editable: true,
				valueGetter: (params: GridValueGetterParams) => params.value,
				minWidth: 200,
				flex: 1,
			},

			{
				field: 'actions',
				headerName: t('qr:tables.main.columns.actions.title'),
				type: 'actions',
				minWidth: 100,
				getActions(params) {
					const actions: React.ReactElement<GridActionsCellItemProps>[] = [];
					if (params.row.paymentFinalized) {
						actions.push(
							// @ts-ignore

							<GridActionsCellItem
								label={t('qr:tables.main.columns.actions.download')}
								title={t('qr:tables.main.columns.actions.download')}
								size={'large'}
								sx={{ height: 48, width: 48 }}
								onClick={() =>
									setDownloadQr({
										content: `https://app.myknot.co/p/qr/${params.row.qrUuid}`,
										name: productShortId(params.row),
									})
								}
								icon={<Download sx={{ color: blue[300], height: 32, width: 32 }} />}
							/>,
						);
					} else {
						actions.push(
							<GridActionsCellItem
								label={t('qr:tables.main.columns.actions.pay')}
								title={t('qr:tables.main.columns.actions.pay')}
								size={'large'}
								sx={{ height: 48, width: 48 }}
								icon={<PriceCheckRounded sx={{ color: green[300], height: 32, width: 32 }} />}
								onClick={(e) => {
									if (user?.distributorId && params.row?.id) {
										setLoading(true);
										distributorsPayProduct(user?.distributorId, params.row.id)
											.then((res: any) => {
												console.log({ res });
												setPaymentKey(res.data.paymentKey);
											})
											.finally(() => {
												setLoading(false);
											});
									}
								}}
							/>,
						);
					}
					return actions;
				},
				flex: 1,
			},
		];
	}, [i18n?.language, user?.distributorId]);

	const { values, handleSubmit, handleBlur, handleChange, isSubmitting } = useFormik<FormData>({
		initialValues: {},
		onSubmit() {},
	});

	const handleRequestProducts = useCallback(() => {
		window.open(
			'https://myknot.co/products/plain-plastic-card', //'https://wa.me/201064944985?text=I%27m%20interested%20in%20buying%20more%20product%20for%20printing',
		);
	}, []);

	const navigate = useNavigate();
	return (
		<div className={clsx('max-w-screen-2xl mx-auto h-full')}>
			<>
				<Dialog
					open={loading || !!downloadQr || !!paymentKey}
					fullWidth={!!paymentKey || !!downloadQr}
					classes={{ paper: clsx((!!paymentKey || !!downloadQr) && '!max-w-screen-2xl !w-full') }}
					onClose={
						loading
							? undefined
							: () => {
									setDownloadQr(undefined);
							  }
					}>
					{loading && (
						<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
							<CircularProgress />
						</Box>
					)}
					{downloadQr && (
						<div className={'p-10 flex flex-col items-center justify-center'}>
							<Qr {...downloadQr} />
							<Accordion
								variant={'outlined'}
								sx={{ borderRadius: 1, '::before': { display: 'none' } }}
								disableGutters={true}>
								<AccordionSummary expandIcon={<ExpandMoreRounded />}>
									<h2 className={'text-gray-500 text-2xl font-semibold py-2'}>
										{t('qr:sections.printing-instructions.header')}
									</h2>
								</AccordionSummary>
								<AccordionDetails>
									<PrintingInstructionsSection showHeader={false} />
								</AccordionDetails>
							</Accordion>
						</div>
					)}
					{paymentKey && (
						<iframe
							height={900}
							width={'100%'}
							src={PaymentIframes[PAYMENT_DEFAULT_IFRAME].generateUrl({ paymentKey })}
						/>
					)}
				</Dialog>
				<Title labelKey={QrListPage.labelKey ?? QrListPage.fallbackLabel ?? ''} />

				<LoadingPaper isLoading={query.isLoading}>
					<div className={'pt-10 h-full gap-2 flex flex-col items-stretch justify-start'}>
						{activeSubscription && user && (
							<div className={'w-full py-5 '}>
								<SubscriptionActivationAlert
									subscription={activeSubscription}
									user={{ ...user, distributor }}
									showOnlyIfExpired
								/>
							</div>
						)}
						<div>
							<Button
								startIcon={<QrCodeScannerRounded />}
								onClick={() => navigate(GenerateQrPage.generatePath())}
								size={'large'}
								sx={{ paddingY: 1, paddingX: 3 }}>
								{t('qr:actions.generate.label')}
							</Button>
							<Button
								startIcon={<ShoppingCart />}
								onClick={handleRequestProducts}
								size={'large'}
								sx={{ paddingY: 1, paddingX: 3 }}>
								{t('qr:actions.request-products.label')}
							</Button>
						</div>
						{!!query.data?.data && Array.isArray(query.data?.data as any) && (
							<>
								<Box sx={{ minHeight: 400, height: '80%', width: '100%' }}>
									<DataGrid
										{...addLocaleToGrid(i18n.language)}
										rows={query?.data?.data as any}
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
		</div>
	);
};

QrListPage.route = '/distributor/qr';
QrListPage.icon = <QrCodeScannerRounded />;
QrListPage.labelKey = 'main:pages.qr-list.title';
QrListPage.fallbackLabel = 'QR List';
QrListPage.generatePath = generatePath(QrListPage.route);
export default QrListPage;
