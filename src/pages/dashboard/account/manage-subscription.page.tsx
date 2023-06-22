import { LoadingPaper } from '@components/LoadingContent';
import { AccountTabs } from '@components/account/account-tabs';
import { bindFileInputElement, useFileInput } from '@components/forms/fields';
import { FileImage } from '@components/forms/file-image';
import { GuardType, useGuard } from '@hooks/useUser';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { FormikHelpers, useFormik } from 'formik';
import moment from 'moment/min/moment-with-locales';
import { Helmet } from 'react-helmet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BasePageType, DrawerPage, generatePath } from '@components/base-page.type';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { getPublicImageUrlFromPath, putFileInFireStorage } from '@utils/firebase/storage-helpers';
import {
	Check as CheckIcon,
	Cancel as CancelIcon,
	QrCodeRounded,
	SupervisedUserCircleRounded,
} from '@mui/icons-material';
import { enterprisesUpdate } from '../../../api/enterprises/enterprises';
import { useQueryClient } from '@tanstack/react-query';
import { getUsersFindOneByFirebaseUidQueryKey } from '../../../api/users/users';
import {
	invalidateFindOneByFireUidQuery,
	invalidateUseCurrentUserHookQuery,
} from '../../../helpers/enterprise/invalidate-queries';
import { getEnterpriseLogoPath, getEnterpriseLogoUrl } from '../../../helpers/enterprise/get-enterprise-logo';
import { useDistributorsGetMe } from '../../../api/distributors/distributors';
import SubscriptionCard from '@components/subscription/subscription-card';
import GenerateQrPage from '@pages/distributor/qr/generate/generate-qr.page';

let validationSchema = (t) => {
	return yup.object().shape({
		name: yup.string().required().label(t('name')),
		url: yup.string().url().label(t('url')),
	});
};

export const ManageSubscriptionPage: DrawerPage = () => {
	const { shouldRender, user, fireUser } = useGuard({ guardType: GuardType.USER_ONLY });
	const navigate = useNavigate();
	const distributorQuery = useDistributorsGetMe({
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorQuery?.data?.data, [distributorQuery.data?.data]);
	const subscriptions = useMemo(() => distributor?.subscriptions, [distributor?.subscriptions]);
	const activeSubscription = useMemo(() => subscriptions?.[0], [subscriptions]);

	const { t, i18n } = useTranslation(['main']);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();

	const queryClient = useQueryClient();

	return (
		<>
			<Helmet>
				<title>
					{t('manage-subscription')} | {t('Knot')}
				</title>
			</Helmet>
			<LoadingPaper isLoading={!shouldRender && distributorQuery.isLoading}>
				{!activeSubscription ? (
					<>
						<h2 className={'text-xl text-center font-semibold'}>
							You Have no active subscription please contact support
						</h2>
					</>
				) : (
					<>{!!user && <SubscriptionCard subscription={activeSubscription} user={user} />}</>
				)}
			</LoadingPaper>
		</>
	);
};
ManageSubscriptionPage.route = '/dashboard/subscription';
ManageSubscriptionPage.generatePath = generatePath(ManageSubscriptionPage.route);
ManageSubscriptionPage.icon = <SupervisedUserCircleRounded />;
ManageSubscriptionPage.labelKey = 'main:subscriptions';
ManageSubscriptionPage.fallbackLabel = 'Manage Subscription';
export default ManageSubscriptionPage;
