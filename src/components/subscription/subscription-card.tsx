import { Alert, Button, Card, CardContent, CircularProgress, Dialog, Typography } from '@mui/material';
import moment from 'moment';
import { SubscriptionEntity, User } from '../../api/models';
import React, { useCallback, useMemo, useState } from 'react';
// import arLocale from 'time-delta/locales/ar';
import { Trans, useTranslation } from 'react-i18next';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import { distributorsRenewSubscription } from '../../api/distributors/distributors';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { PAYMENT_DEFAULT_IFRAME, PaymentIframes } from '@utils/payment';
import QrListPage from '@pages/distributor/qr/qr-list.page';
import { useNavigate } from 'react-router-dom';
const SUBSCRIPTION_PRICE = '00.00';

type SubscriptionCardProps = {
	subscription: SubscriptionEntity;
	user: User;
};
const SubscriptionCard = ({ subscription, user }: SubscriptionCardProps) => {
	const { t, i18n } = useTranslation(['subscription']);
	const remainingDuration = useMemo(
		() => Math.ceil((moment(subscription.endDate).toDate().getTime() - new Date().getTime()) / (24 * 3600_000)),
		[subscription],
	);

	return (
		<div className="my-6 container mx-auto p-4">
			<Typography variant="h5" gutterBottom color="primary">
				{t('subscription:pages.manage-subscription.title')}
			</Typography>

			<Card className="mb-4" variant={'outlined'}>
				<CardContent>
					<Typography variant="h6" color="primary">
						{t('subscription:sections.remaining-days.title')}
					</Typography>
					<Typography>
						<strong>{t('subscription:sections.remaining-days.fields.remaining-days.label')}:</strong>{' '}
						{remainingDuration} days
					</Typography>
				</CardContent>
			</Card>

			<Card className="mb-4" variant={'outlined'}>
				<CardContent>
					<Typography variant="h6" color="primary" gutterBottom>
						{t('subscription:sections.details.title')}:
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.id.label')}:</strong> {subscription.id}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.created-at.label')}:</strong>{' '}
						{moment(subscription.createdAt).format('YYYY-MM-DD')}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.duration.label')}:</strong>{' '}
						{subscription.duration}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.active.label')}:</strong>{' '}
						{subscription.active ? 'Yes' : 'No'}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.price.label')}:</strong>
						{subscription.price === 0 ? t('currency:free') : <>{subscription.price} EGP</>}
					</Typography>
					<Typography variant="body1" gutterBottom>
						<strong>{t('subscription:sections.details.fields.payment-id.label')}:</strong>{' '}
						{subscription.paymentId}
					</Typography>
				</CardContent>
			</Card>
			<SubscriptionActivationAlert subscription={subscription} user={user} />
		</div>
	);
};

type SubscriptionActivationAlertProps = SubscriptionCardProps & {
	showOnlyIfExpired?: boolean;
};

export function SubscriptionActivationAlert({
	subscription,
	user,
	showOnlyIfExpired,
}: SubscriptionActivationAlertProps) {
	const remainingDuration = useMemo(
		() => Math.ceil((moment(subscription.endDate).toDate().getTime() - new Date().getTime()) / (24 * 3600_000)),
		[subscription],
	);
	const { t, i18n } = useTranslation(['subscription']);

	const activationAlert = useMemo(() => {
		if (remainingDuration > 3) {
			return <></>;
			return (
				<Alert severity="info" className="mt-2 mb-4">
					Activate your subscription now for early activation.
				</Alert>
			);
		} else if (remainingDuration <= 3 && remainingDuration > 0) {
			return (
				<Alert severity="warning" className="mt-2 mb-4">
					{t('subscription:alerts.expiring-soon.message', { duration: remainingDuration })}
				</Alert>
			);
		} else {
			return (
				<Alert severity="error" className="mt-2 mb-4">
					{t('subscription:alerts.expired.message')}
				</Alert>
			);
		}
	}, [subscription]);

	const [paymentKey, setPaymentKey] = useState<string>();
	const [loading, setLoading] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const navigate = useNavigate();

	const handleActivate = useCallback(
		async function () {
			setConfirm(true);
		},
		[subscription, user],
	);
	const handleConfirm = useCallback(
		async function () {
			if (!user?.distributorId) {
				showErrorMessage('No ID');
				return;
			}

			setConfirm(false);
			setLoading(true);
			const res: any = await distributorsRenewSubscription(user?.distributorId);
			if (res.data.paymentFinalized) {
				showSuccessMessage('Success');
				navigate(QrListPage.generatePath());
			} else {
				setPaymentKey(res.data.paymentKey);
				setLoading(false);
			}

			// showErrorMessage(t('subscription:alerts.expired.message'));
		},
		[subscription, user],
	);

	if ((showOnlyIfExpired && remainingDuration > 0) || remainingDuration > 3) {
		return <></>;
	}
	return (
		<>
			<Dialog
				open={loading || !!paymentKey || confirm}
				onClose={confirm ? () => setConfirm(false) : undefined}
				fullWidth={!!paymentKey}
				classes={{ paper: clsx(!!paymentKey && '!max-w-screen-2xl !w-full !min-w-screen-lg') }}>
				{loading && (
					<Box display={'grid'} gridRow={1} gridColumn={1} p={10}>
						<CircularProgress />
					</Box>
				)}

				{confirm && (
					<>
						<div className={'flex-col flex gap-4 justify-start items-stretch p-10 w-full '}>
							<div className={'text-lg font-medium text-gray-900 '}>
								{t('subscription:sections.activation.explanation.message')}
								<br />
								<br />
								<Trans
									i18nKey="subscription:sections.activation.confirm.total-price.message"
									values={{
										price: t('currency:free'), //SUBSCRIPTION_PRICE,
										currency: '', // t('currency:egp'),
									}}
									components={{ 1: <span className={'underline font-medium text-green-700'} /> }}
								/>
								{', '}
								<Trans
									i18nKey="subscription:sections.activation.confirm.limited-time-offer.message"
									values={{
										price: t('currency:free'), //SUBSCRIPTION_PRICE,
										currency: '', //t('currency:egp'),
									}}
									components={{ 1: <span className={'line-through text-red-700 font-medium'} /> }}
								/>
							</div>
							<Button variant={'outlined'} onClick={handleConfirm}>
								{t('subscription:sections.activation.cta.activate-now')}
							</Button>
						</div>
					</>
				)}

				{paymentKey && (
					<iframe
						height={900}
						width={'100%'}
						src={PaymentIframes[PAYMENT_DEFAULT_IFRAME].generateUrl({ paymentKey })}
					/>
				)}
			</Dialog>

			<Card variant={'outlined'}>
				<CardContent>
					<Typography variant="h6" color="primary">
						{t('subscription:sections.activation.title')}
					</Typography>
					<div className={'flex flex-row justify-between items-center'}>
						{activationAlert}
						{remainingDuration <= 0 && (
							<LoadingButton variant="outlined" color="primary" onClick={handleActivate}>
								{t('subscription:sections.activation.cta.activate-now')}
							</LoadingButton>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
}

export default SubscriptionCard;
