import { BasePageType, generatePath } from '@components/base-page.type';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDistributorsConfirmPayment } from '../api/distributors/distributors';
import { entries } from 'lodash';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';
import { AxiosResponse } from 'axios';
import QrListPage from '@pages/distributor/qr/qr-list.page';

const PaymentPage: BasePageType = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const params = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams]);

	const { mutateAsync, isLoading, data, error } = useDistributorsConfirmPayment();

	const navigate = useNavigate();
	useEffect(() => {
		if (Object.keys(params).length) {
			mutateAsync({ data: params }).finally(() => {
				setTimeout(() => {
					navigate(QrListPage.generatePath());
				}, 2000);
			});
		}
	}, [params]);

	return (
		<div
			className={clsx(
				'max-w-screen-lg mx-auto flex flex-col items-start justify-center pt-5 pb-20 text-black text-3xl font-semibold',
			)}>
			{isLoading && (
				<>
					<h3>يتم اجراء المعاملة</h3>
					<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
						<CircularProgress />
					</Box>
				</>
			)}

			{(data?.data as any)?.ok && <h3>تم اجراء المعاملة بنجاح</h3>}

			{((data?.data as any)?.ok === false || error) && <h3>فشل اجراء المعاملة</h3>}
		</div>
	);
};

PaymentPage.route = '/payment';
PaymentPage.generatePath = generatePath(PaymentPage.route);
export default PaymentPage;

const test = {
	id: '111858010',
	pending: 'false',
	amount_cents: '2000',
	success: 'false',
	is_auth: 'false',
	is_capture: 'false',
	is_standalone_payment: 'true',
	is_voided: 'false',
	is_refunded: 'false',
	is_3d_secure: 'false',
	integration_id: '3824081',
	profile_id: '794807',
	has_parent_transaction: 'false',
	order: '128463699',
	created_at: '2023-06-11T14:02:13.360727',
	currency: 'EGP',
	merchant_commission: '0',
	discount_details: '[]',
	is_void: 'false',
	is_refund: 'false',
	error_occured: 'true',
	refunded_amount_cents: '0',
	captured_amount: '0',
	updated_at: '2023-06-11T14:02:16.402966',
	is_settled: 'false',
	bill_balanced: 'false',
	is_bill: 'false',
	owner: '1376972',
	'data.message': '3DS Authentication Failure',
	'source_data.type': 'card',
	'source_data.pan': '2345',
	'source_data.sub_type': 'MasterCard',
	acq_response_code: '-1',
	txn_response_code: '-1',
	hmac: 'c6c0036fe602efd72c2b6b6022cdd1320af5be41e99716cc052284cbdb84977da76f341a992af7fa104c351551467bc7b90eef8510b7384105d9605cd923618a',
};
