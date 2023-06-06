import Box from '@mui/material/Box';
import React, { useEffect, useMemo, useState } from 'react';
import { Title } from 'react-admin';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Select, TextField } from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { CreateProfileDto, PrismaConnect } from '../../api/models';
import { useNavigate, useParams } from 'react-router-dom';
import { BasePageType, generatePath } from '@components/base-page.type';
import { LoadingButton } from '@mui/lab';
import { resolve } from '@utils/helpers';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { CameraAltRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { putFilesInFireStorage } from '@utils/firebase/storage-helpers';
import { useTranslation } from 'react-i18next';
import { useGuard } from '@hooks/useUser';
import AuthPage, { AuthPageOptions } from '@pages/auth';
import {
	employeesCreateProfile,
	useEnterprisesFindOne,
	useEnterprisesUnlinkEmployee,
} from '../../api/enterprises/enterprises';
import { LoadingContent } from '@components/LoadingContent';
import { FileImage } from '@components/forms/file-image';
import { bindFileInputElement, useFileInput } from '@components/forms/fields';
import MenuItem from '@mui/material/MenuItem';

import * as yup from 'yup';
import 'yup-phone';
import { EmployeesPage } from '@pages/employees/index';

export type FormModelType = Partial<CreateProfileDto> & { product?: string };

export type CreateProfilePageRouteParams = {
	id: string;
};
export const CreateProfilePage: BasePageType<CreateProfilePageRouteParams> = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const { user } = useGuard({ defaultRedirect: AuthPage.generatePath({ page: AuthPageOptions.SIGN_IN }) });

	const [status, setStatus] = useState<string>('checking');
	const query = useEnterprisesFindOne(
		user?.enterpriseAccess?.enterpriseId ?? '',
		{ include: '{"all":true}' },
		{ query: { enabled: !!user?.enterpriseAccess?.enterpriseId } },
	);

	const enterprise = useMemo(() => query.data?.data, [query.data]);
	const { mutateAsync, isLoading } = useEnterprisesUnlinkEmployee();

	const { t, i18n } = useTranslation(['main', 'employees']);

	useEffect(() => {
		if (enterprise) {
			if (enterprise?.products?.some(({ ownerID, activated }) => !activated && !ownerID)) {
				setStatus('clear');
			} else {
				setStatus('not-allowed');
			}
		}
	}, [enterprise, showErrorMessage]);

	return (
		<Box sx={{ height: '100%', mx: 'auto', mt: 4 }}>
			<Title title="Edit Employee" />
			{status === 'clear' && (
				<LoadingContent isLoading={query.isLoading}>
					<>
						<Box
							className={
								// 'flex flex-row justify-evenly items-center flex-wrap gap-2 mx-auto w-full max-w-screen-xl py-5'
								'grid justify-stretch items-center gap-10 mx-auto w-full max-w-screen-xl py-5'
							}>
							<UserDataForm enterprise={enterprise} />
						</Box>
					</>
				</LoadingContent>
			)}
			{status === 'not-allowed' && (
				<Box className={'max-w-screen-lg mx-auto whitespace-pre-line'}>
					<h1 className={'text-4xl text-green-700 text-center py-4'}>
						{t('employees:actions.create.guards.noAvailableProducts.title')}
					</h1>
					<h5 className={'text-xl text-gray-600 text-center'}>
						{' '}
						{t('employees:actions.create.guards.noAvailableProducts.detailedMessage')}
					</h5>
				</Box>
			)}
		</Box>
	);
};

export function UserDataForm({ enterprise }) {
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const { t } = useTranslation(['employees']);

	const navigate = useNavigate();
	const validationSchema = useMemo(
		() =>
			yup.object<FormModelType>({
				email: yup.string().email().required().label(t('employees:forms.create.fields.email.label')),
				phone: yup.string().label(t('employees:forms.create.fields.phone.label')),
				fullName: yup.string().required().label(t('employees:forms.create.fields.fullname.label')),
				bio: yup.string().label(t('employees:forms.create.fields.bio.label')),
				password: yup.string().required().label(t('employees:forms.create.fields.password.label')),
				product: yup
					.string()
					.oneOf(enterprise.products.map((p) => p.id))
					.required()
					.label(t('employees:forms.create.fields.product.label')),
			}),
		[t],
	);
	const {
		values,
		handleSubmit,
		setFieldValue,
		handleReset,
		resetForm,
		handleChange,
		setValues,
		isSubmitting,
		errors,
		submitCount,
	} = useFormik<FormModelType>({
		initialValues: {},
		validationSchema,
		onReset(values: FormModelType, { setValues }: FormikHelpers<FormModelType>): void {},
		async onSubmit(values: FormModelType, formikHelpers: FormikHelpers<FormModelType>): Promise<any> {
			const [res, error] = await resolve(
				employeesCreateProfile(enterprise.id, {
					fullName: values['fullName'],
					bio: values['bio'],
					email: values['email'],
					phone: values['phone'],
					password: values['password']!,
					products: { connect: { id: values['product']! } },
				}),
			);
			const user = res?.data;

			if (error || !user) {
				showErrorMessage(t('employees:forms.create.actions.submit.request.failure.message'));
			} else {
				const files: File[] = [];
				const paths: string[] = [];

				if (coverImageFileInput.selectedFiles[0]) {
					files.push(coverImageFileInput.selectedFiles[0]);
					paths.push(`/users/${user.id}/cover`);
				}
				if (profileImageFileInput.selectedFiles[0]) {
					files.push(profileImageFileInput.selectedFiles[0]);
					paths.push(`/users/${user.id}/profile`);
				}
				await putFilesInFireStorage(files, paths);
				showSuccessMessage(t('employees:forms.create.actions.submit.request.success.message'));
				setTimeout(() => navigate(EmployeesPage.generatePath()), 1500);
			}
		},
	});

	const profileImageFileInput = useFileInput({ single: true, mimeType: 'image/png, image/jpeg' });
	const coverImageFileInput = useFileInput({ single: true, mimeType: 'image/png, image/jpeg' });
	return (
		<Box className={'flex flex-col justify-start items-stretch  gap-5 mx-auto w-full max-w-screen-md'}>
			<Box className={'flex flex-col justify-start items-center relative h-[25rem]'}>
				<Box className={'bg-green-100 rounded-md w-full h-80 overflow-hidden relative'}>
					{!!coverImageFileInput.selectedFiles[0] && (
						<FileImage
							className={' w-full h-full  object-cover'}
							source={coverImageFileInput.selectedFiles[0]}
							alt={'Cover'}
						/>
					)}
					<Box className={'absolute top-0 z-10 w-full h-full grid justify-center items-center'}>
						<IconButton className={'w-20 h-20 '} onClick={coverImageFileInput.openInput}>
							<CameraAltRounded className={'!w-4/5 !h-4/5'} />
						</IconButton>
					</Box>
				</Box>

				<Box
					className={
						'bg-green-200 rounded-full aspect-square w-40 h-40 overflow-hidden absolute bottom-0 z-10 left-[calc(50% - (10rem / 2) )] '
					}>
					{!!profileImageFileInput.selectedFiles[0] && (
						<FileImage
							className={' w-full h-full object-cover'}
							source={profileImageFileInput.selectedFiles[0]}
						/>
					)}
					<Box className={'absolute top-0 z-10 w-full h-full grid justify-center items-center'}>
						<IconButton className={'w-14 h-14 '} onClick={profileImageFileInput.openInput}>
							<CameraAltRounded className={'!w-4/5 !h-4/5'} />
						</IconButton>
					</Box>
				</Box>
			</Box>

			<input {...bindFileInputElement(coverImageFileInput)} />
			<input {...bindFileInputElement(profileImageFileInput)} />
			<TextField
				label={t('employees:forms.create.fields.fullname.label')}
				variant={'outlined'}
				value={values['fullName']}
				onChange={handleChange('fullName')}
				fullWidth
			/>

			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor={`email-address-1`}>{t('employees:forms.create.fields.email.label')}</InputLabel>
				<OutlinedInput
					id={`email-address-1`}
					value={values['email']}
					onChange={handleChange(`email`)}
					label={t('employees:forms.create.fields.email.label')}
				/>
			</FormControl>
			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor="password">{t('employees:forms.create.fields.password.label')}</InputLabel>
				<OutlinedInput
					id="password"
					value={values['password']}
					onChange={handleChange(`password`)}
					type={values['showPassword'] ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position="end">
							<IconButton onClick={(_) => setFieldValue('showPassword', !values['showPassword'])}>
								{!values['showPassword'] ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
					label={t('employees:forms.create.fields.password.label')}
				/>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel id="select-product-label">{t('employees:forms.create.fields.product.label')}</InputLabel>
				<Select
					labelId="select-product-label"
					id="select-product"
					value={values['product']}
					label={t('employees:forms.create.fields.product.label')}
					onChange={handleChange('product') as any}>
					{enterprise.products
						.filter((product) => !product.ownerID)
						.map((product) => (
							<MenuItem value={product.id}>
								<img
									style={{ width: '3rem', height: '3rem' }}
									src={`/assets/products/${product.type.toLowerCase()}.png`}
								/>
								{product.QR?.number
									? 'P' + product.QR?.number.toString(16).padStart(4, '0')
									: product.id}
							</MenuItem>
						))}
				</Select>
			</FormControl>

			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor="phone">{t('employees:forms.create.fields.phone.label')}</InputLabel>
				<OutlinedInput
					id="phone-number-1"
					value={values['phone']}
					onChange={handleChange(`phone`)}
					label={t('employees:forms.create.fields.phone.label')}
				/>
			</FormControl>

			<TextField
				label={t('employees:forms.create.fields.bio.label')}
				variant={'outlined'}
				value={values['bio']}
				onChange={handleChange('bio')}
				multiline={true}
				fullWidth
				minRows={4}
			/>
			<LoadingButton
				fullWidth
				loading={isSubmitting}
				variant={'contained'}
				onClick={handleSubmit as any}
				sx={{ color: 'white', fontWeight: 600 }}>
				{t('employees:forms.create.actions.submit.label')}
			</LoadingButton>
		</Box>
	);
}

CreateProfilePage.route = '/dashboard/employees/create';
CreateProfilePage.generatePath = generatePath(CreateProfilePage.route);
