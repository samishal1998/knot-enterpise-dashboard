import { LoadingPaper } from '@components/LoadingContent';
import { AccountTabs } from '@components/account/account-tabs';
import { bindFileInputElement, useFileInput } from '@components/forms/fields';
import { FileImage } from '@components/forms/file-image';
import { GuardType, useGuard } from '@hooks/useUser';
import { Button, CircularProgress, FormControl, IconButton, InputLabel, Select, TextField } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { FormikHelpers, useFormik } from 'formik';
import moment from 'moment/min/moment-with-locales';
import { Helmet } from 'react-helmet';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { BasePageType, generatePath } from '@components/base-page.type';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { getPublicImageUrlFromPath, putFileInFireStorage } from '@utils/firebase/storage-helpers';
import { Check as CheckIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { enterprisesUpdate } from '../../../api/enterprises/enterprises';
import { useQueryClient } from '@tanstack/react-query';
import { getUsersFindOneByFirebaseUidQueryKey } from '../../../api/users/users';
import {
	invalidateFindOneByFireUidQuery,
	invalidateUseCurrentUserHookQuery,
} from '../../../helpers/enterprise/invalidate-queries';
import { getEnterpriseLogoPath, getEnterpriseLogoUrl } from '../../../helpers/enterprise/get-enterprise-logo';
import MenuItem from '@mui/material/MenuItem';

export const DeclareMetafield: BasePageType = () => {
	const { shouldRender, user, fireUser } = useGuard({ guardType: GuardType.USER_ONLY });
	const navigate = useNavigate();
	const { t, i18n } = useTranslation(['metafield']);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const fileInputData = useFileInput({ single: true, mimeType: 'images/*' });
	const [uploadingImage, setUploadingImage] = useState(false);
	const queryClient = useQueryClient();

	const validationSchema = useMemo(
		() =>
			yup.object().shape({
				name: yup.string().required().label(t('metafield:forms.declare-metafield.fields.name.label')),
				type: yup.string().required().label(t('metafield:forms.declare-metafield.fields.type.label')),
				location: yup.string().required().label(t('metafield:forms.declare-metafield.fields.location.label')),
			}),
		[i18n.language],
	);
	const onSubmit = useCallback(
		async (values, helpers: FormikHelpers<any>) => {},
		[user, t, showErrorMessage, showSuccessMessage],
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
		initialValues: {},
		enableReinitialize: true,
		onSubmit,
		validationSchema,
	});

	let submitted = useMemo(() => submitCount >= 1, [submitCount]);

	const shouldAllowSubmit = useCallback(() => {
		let output =
			values.name.trim() !== user?.enterpriseAccess?.enterprise?.name ||
			values.url.trim() !== user?.enterpriseAccess?.enterprise?.url;
		// || moment(user?.birthday ?? undefined).toDate()?.getTime() !== values.birthday.toDate().getTime();

		return output;
	}, []);

	return (
		<>
			<Helmet>
				<title>
					{t('metafield:pages.declare-metafield.title')} | {t('Knot')}
				</title>
			</Helmet>
			<LoadingPaper isLoading={!shouldRender}>
				<div className={'grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-3 mt-10'}>
					<TextField
						label={t('metafield:forms.declare-metafield.fields.name.label')}
						value={values['name']}
						onChange={handleChange('name')}
						onBlur={handleBlur('name')}
						error={!!errors['name']}
						helperText={!!errors['name'] && submitCount > 0 ? errors['name'].toString() : ''}
						required={true}
					/>

					<FormControl fullWidth>
						<InputLabel id="select-location-label">
							{t('metafield:forms.declare-metafield.fields.type.label')}
						</InputLabel>
						<Select
							labelId="select-location-label"
							id="select-location"
							value={values['location']}
							label={t('metafield:forms.declare-metafield.fields.location.label')}
							onChange={handleChange('location') as any}>
							{['user' as const, 'product' as const].map((option) => {
								const label =
									`metafield:forms.declare-metafield.fields.location.options.${option}.label` as const;
								return <MenuItem value={option}>{t(label)}</MenuItem>;
							})}
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id="select-metafield-type-label">
							{t('metafield:forms.declare-metafield.fields.type.label')}
						</InputLabel>
						<Select
							labelId="select-metafield-type-label"
							id="select-metafield-type"
							value={values['type']}
							label={t('metafield:forms.declare-metafield.fields.type.label')}
							onChange={handleChange('type') as any}>
							{[
								'text' as const,
								'tel' as const,
								'number' as const,
								'email' as const,
								'url' as const,
								'date' as const,
								'checkbox' as const,
							].map((option) => {
								const label =
									`metafield:forms.declare-metafield.fields.type.options.${option}.label` as const;
								return <MenuItem value={option}>{t(label)}</MenuItem>;
							})}
						</Select>
					</FormControl>
				</div>
			</LoadingPaper>
		</>
	);
};
DeclareMetafield.route = '/dashboard/metafields/declare';
DeclareMetafield.generatePath = generatePath(DeclareMetafield.route);
export default DeclareMetafield;
