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
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BasePageType, DrawerPage, generatePath } from '@components/base-page.type';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { getPublicImageUrlFromPath, putFileInFireStorage } from '@utils/firebase/storage-helpers';
import { Check as CheckIcon, Cancel as CancelIcon, AccountCircleRounded } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';
import { invalidateUseCurrentUserHookQuery } from '../../helpers/enterprise/invalidate-queries';
import { getDistributorLogoPath, getDistributorLogoUrl } from '../../helpers/distributor/get-distributor-logo';
import { distributorsUpdate, useDistributorsGetMe } from '../../api/distributors/distributors';

let validationSchema = (t) => {
	return yup.object().shape({
		name: yup.string().required().label(t('name')),
	});
};

export const ManageDistributorProfilePage: DrawerPage = () => {
	const { shouldRender, user, fireUser } = useGuard({ guardType: GuardType.USER_ONLY });
	const navigate = useNavigate();
	const { t, i18n } = useTranslation(['main']);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const fileInputData = useFileInput({ single: true, mimeType: 'images/*' });
	const [uploadingImage, setUploadingImage] = useState(false);
	const queryClient = useQueryClient();

	const distributorQuery = useDistributorsGetMe({
		query: { enabled: !!user?.distributorId },
	});
	const distributor = useMemo(() => distributorQuery?.data?.data, [distributorQuery.data?.data]);

	const handleSetProfileImage = useCallback(async () => {
		try {
			if (distributor?.id) {
				setUploadingImage(true);
				console.log({ fileInputData });
				await setDistributorImage(distributor?.id, fileInputData.selectedFiles[0]);
				showSuccessMessage(t('main:submittedRequestSuccessfully'));
				fileInputData.clear();
			} else throw 'Error';
		} catch (e) {
			showErrorMessage(t('main:failedToSubmitRequest'));
		} finally {
			setUploadingImage(false);
		}
	}, [user, t, fileInputData, distributor]);

	const onSubmit = useCallback(
		async (values, helpers: FormikHelpers<any>) => {
			// console.log({ values }, values.firstName, values.lastName, Timestamp.fromDate(values.birthday.toDate()));
			try {
				if (distributor?.id) {
					await distributorsUpdate(distributor.id, {
						name: values['name'],
					});
					showSuccessMessage(t('main:submittedRequestSuccessfully'));
					const x = await invalidateUseCurrentUserHookQuery(queryClient);
					console.log({ x });
				} else throw 'Error';
			} catch (e) {
				showErrorMessage(t('main:failedToSubmitRequest'));
			} finally {
				helpers.setSubmitting(false);
				// helpers.resetForm({})
			}
		},
		[user, t, showErrorMessage, showSuccessMessage],
	);

	let initialValues = useMemo(
		() => ({
			name: distributor?.name ?? ' ',
		}),
		[distributor],
	);

	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		submitCount,
		setSubmitting,
		isSubmitting,
		handleSubmit,
	} = useFormik<any>({
		initialValues,
		enableReinitialize: true,
		onSubmit,

		validationSchema: validationSchema(t),
	});

	let submitted = useMemo(() => submitCount >= 1, [submitCount]);

	const shouldAllowSubmit = useCallback(() => {
		let output = values.name.trim() !== distributor?.name;

		return output;
	}, []);

	return (
		<>
			<Helmet>
				<title>
					{t('main:manageProfile')} | {t('Knot')}
				</title>
			</Helmet>
			<LoadingPaper isLoading={!shouldRender}>
				{/*<button id="test-btn" className="rounded-lg p-3 bg-green-400 hover:bg-green-600">*/}
				{/*	Ripple*/}
				{/*</button>*/}
				<div className={'grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-3 mt-10 max-w-screen-xl mx-auto'}>
					<div
						className={
							'col-span-1 border rounded-xl py-5 md:pb-10 flex flex-col items-center justify-center'
						}>
						{
							<div
								className={'w-full px-5 flex flex-row justify-between'}
								style={{ visibility: fileInputData.selectedFiles[0] ? 'visible' : 'hidden' }}>
								<IconButton onClickCapture={handleSetProfileImage} disabled={uploadingImage}>
									<CheckIcon sx={{ color: green[400] }} />
								</IconButton>
								{uploadingImage && <CircularProgress />}
								<IconButton onClick={fileInputData.clear} disabled={uploadingImage}>
									<CancelIcon sx={{ color: red[400] }} />
								</IconButton>
							</div>
						}
						{Boolean(user) && (
							<FileImage
								className={
									'rounded-full object-cover border-4 border-green-600 hover:border-green-700 hover:border-8'
								}
								source={fileInputData.selectedFiles[0] ?? getDistributorLogoUrl(distributor?.id)}
								style={{
									width: 'clamp(12rem,25vw,15rem)',
									height: 'clamp(12rem,25vw,15rem)',
									marginBottom: '3rem',
								}}
							/>
						)}
						<input {...bindFileInputElement(fileInputData)} />
						<Button variant={'text'} onClickCapture={fileInputData.openInput} disabled={uploadingImage}>
							{t('main:changeProfilePicture')}
						</Button>
					</div>
					<div
						className={
							'col-span-1 md:col-span-2 grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2 py-5 mb-auto md:mt-5 h-full auto-rows-min'
						}>
						<TextField
							name="name"
							variant={'outlined'}
							label={t('main:name')}
							onChange={handleChange('name')}
							onBlur={handleBlur('name')}
							required={true}
							error={Boolean((touched['name'] || submitted) && errors['name'])}
							helperText={(((touched['name'] || submitted) && errors['name']) as string) || ' '}
							fullWidth
							className={'col-span-2'}
							value={values['name']}
						/>

						<div className={'col-span-full flex flex-row justify-end pt-5 md:mt-28'}>
							<Button
								className={'w-full md:w-2/12'}
								type={'submit'}
								disabled={isSubmitting || !shouldAllowSubmit()}
								onClick={() => handleSubmit()}
								variant={'contained'}>
								{t('main:submit')}
							</Button>
						</div>
					</div>
				</div>
			</LoadingPaper>
		</>
	);
};
ManageDistributorProfilePage.route = '/distributor/profile';
ManageDistributorProfilePage.generatePath = generatePath(ManageDistributorProfilePage.route);
ManageDistributorProfilePage.icon = <AccountCircleRounded />;
ManageDistributorProfilePage.labelKey = 'main:manageProfile';
ManageDistributorProfilePage.fallbackLabel = 'Manage Profile';
export default ManageDistributorProfilePage;

async function setDistributorImage(id, image: File | Blob) {
	try {
		await putFileInFireStorage(image, getDistributorLogoPath(id));
	} catch (e) {
		throw e;
	}
}
