import { AddLinkDto, EditLinkDto, Link } from '../../api/models';
import { Dialog, DialogContent, IconButton, TextField } from '@mui/material';
import React, { useCallback, useImperativeHandle, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { Links } from '../../helpers/links/links';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import { FormikHelpers, useFormik } from 'formik';
import { userLinksAddLink, userLinksEditLink } from '../../api/user-links/user-links';
import { resolve } from '@utils/helpers';
import { CameraAltRounded, CancelRounded } from '@mui/icons-material';
import { useSnackbar } from 'react-mui-snackbar-helper';
import * as uuid from 'uuid';
import { useQueryClient } from '@tanstack/react-query';
import { bindFileInputElement, useFileInput } from '@components/forms/fields';
import { Simulate } from 'react-dom/test-utils';
import select = Simulate.select;
import { uploadBytes } from 'firebase/storage';
import { putFileInFireStorage } from '@utils/firebase/storage-helpers';
import { FileImage } from '@components/forms/file-image';
import * as yup from 'yup';
export type EditLinkDialogProps = {
	// userId: string;
	// linkId?: string;
	// sectionId: string;
	// link?: Link;
	// linkType: string;
};

export type EditLinkDialogParams = (
	| {
			linkId: string;
			link: Link;
			operation: 'edit';
	  }
	| {
			linkType: string;
			operation: 'add';
	  }
) & {
	userId: string;
	sectionId: string;
};
export type EditLinkDialogRef = {
	editLink: (userId: string, linkId: string, sectionId: string, link: Link) => void;
	addLink: (userId: string, sectionId: string, linkType: string) => void;
	close: Function;
};

export const EditLinkDialog = React.forwardRef<EditLinkDialogRef, EditLinkDialogProps>(
	({}: EditLinkDialogProps, ref) => {
		const [open, setOpen] = useState(false);
		const { t } = useTranslation(['main', 'link']);
		const queryClient = useQueryClient();

		const fileInput = useFileInput({ single: true, mimeType: 'image/jpeg,image/png' });

		const { selectedFiles } = fileInput;
		const [params, setParams] = useState<EditLinkDialogParams>();
		const { userId, sectionId, operation } = params ?? {};
		const { linkType } = (params as Extract<EditLinkDialogParams, { operation: 'add' }> | undefined) ?? {};
		const { linkId, link } = (params as Extract<EditLinkDialogParams, { operation: 'edit' }> | undefined) ?? {};
		const finalLinkType = useMemo(() => linkType ?? link?.type, [linkType, link]);

		const validationSchema = useMemo(
			() =>
				yup.object({
					value: yup
						.string()
						.required()
						.label(t(`link:forms.${operation ?? 'add'}Link.fields.url.label` as const)),
					labels: yup.object({
						default: yup
							.string()
							.label(t(`link:forms.${operation ?? 'add'}Link.fields.label.label` as const))
							.when((values, schema, options) =>
								finalLinkType && finalLinkType !== 'CUSTOM' ? schema.optional() : schema.required(),
							),
					}),
				}),
			[t, finalLinkType],
		);
		const { showErrorMessage, showSuccessMessage } = useSnackbar();
		const {
			setValues,
			values,
			handleSubmit,
			handleChange,
			handleBlur,
			errors,
			submitCount,
			isSubmitting,
			resetForm,
		} = useFormik<Partial<EditLinkDto | AddLinkDto>>({
			initialValues: {},
			validationSchema,
			onReset(
				values: EditLinkDto | AddLinkDto | {},
				formikHelpers: FormikHelpers<EditLinkDto | AddLinkDto | {}>,
			): void {},
			async onSubmit(
				values: EditLinkDto | AddLinkDto | {},
				formikHelpers: FormikHelpers<EditLinkDto | AddLinkDto | {}>,
			): Promise<any> {
				// console.log({ values });
				// return;
				//@ts-ignore
				const appId = values?.appId ?? uuid.v1();

				let icon = false;
				if (selectedFiles[0]) {
					await putFileInFireStorage(selectedFiles[0], `/users/${userId}/links/${appId}`);
					icon = true;
				}
				if (operation === undefined || !userId) return;
				const [response, error] = await resolve<any>(
					operation === 'edit'
						? userLinksEditLink(userId, { ...values, icon } as EditLinkDto)
						: userLinksAddLink(userId, { ...values, appId, icon } as AddLinkDto),
				);

				if (error) {
					showErrorMessage(t(`link:forms.${operation}Link.request.failure.message`));
				} else {
					await queryClient.invalidateQueries([`/user/${userId}/links`]);

					showSuccessMessage(t(`link:forms.${operation}Link.request.success.message`));
					close();
				}
			},
		});
		const close = useCallback(() => {
			setOpen(false);
			setParams(undefined);
			setValues({});
			fileInput.clear();
			resetForm({ submitCount: 0, values: {}, errors: {} });
		}, []);

		useImperativeHandle(
			ref,
			() => {
				return {
					editLink: (userId, linkId, sectionId, link) => {
						setParams({
							userId,
							linkId,
							link,
							sectionId,
							operation: 'edit',
						});

						setValues({
							...link,
							appId: linkId,
							categoryId: sectionId,
						});
						setOpen(true);
					},
					addLink: (userId, sectionId, linkType) => {
						setParams({
							userId,
							sectionId,
							linkType,
							operation: 'add',
						});
						setValues({
							type: linkType,
							categoryId: sectionId,
						});
						setOpen(true);
					},
					close,
				};
			},
			[],
		);

		const shouldShowErrors = submitCount > 0;
		// console.log({ errors, 'labels.default': errors['labels.default'] });
		return (
			<Dialog
				open={open}
				className={''}
				fullWidth={true}
				maxWidth={'md'}
				onClose={isSubmitting ? undefined : close}>
				<DialogContent>
					{userId && operation && finalLinkType && (
						<Box className={'grid auto-rows-auto  gap-5 max-w-screen-sm mx-auto'}>
							<Box className={' absolute top-5 right-5 '}>
								<IconButton onClick={isSubmitting ? undefined : close}>
									<CancelRounded />
								</IconButton>
							</Box>
							<Box className={'rows-span-1 h-48 w-48 mx-auto relative rounded-full overflow-hidden'}>
								<FileImage
									className={'w-full h-full'}
									source={
										selectedFiles[0] ??
										Links.getIcon({
											userId,
											linkId,
											linkType: finalLinkType ?? '',
											link,
										} as any)
									}></FileImage>

								{finalLinkType === 'CUSTOM' && (
									<Box
										className={
											'absolute bottom-0 w-full items-center justify-center grid bg-[#FFFFFF90] py-1'
										}>
										<IconButton onClick={() => fileInput.openInput()}>
											<CameraAltRounded />
										</IconButton>
									</Box>
								)}
								<input {...bindFileInputElement(fileInput)} />
							</Box>

							<TextField
								className={'rows-span-1 '}
								value={values.labels?.default}
								onChange={handleChange('labels.default')}
								onBlur={handleBlur('labels.default')}
								error={shouldShowErrors && !!errors['labels']?.['default']}
								placeholder={link?.type || linkType}
								helperText={shouldShowErrors ? errors['labels']?.['default'] || '' : ''}
								fullWidth
								label={t(`link:forms.${operation}Link.fields.label.label`)}
							/>
							<TextField
								className={'rows-span-1 '}
								value={values.value}
								onChange={handleChange('value')}
								onBlur={handleBlur('value')}
								error={shouldShowErrors && !!errors['value']}
								helperText={shouldShowErrors ? errors['value'] || '' : ''}
								fullWidth
								label={t(`link:forms.${operation}Link.fields.url.label`)}
							/>

							<LoadingButton
								variant={'contained'}
								className={'rows-span-1'}
								fullWidth
								loading={isSubmitting}
								sx={{ color: 'white', fontWeight: 700 }}
								onClick={handleSubmit as any}
								title={t(`link:forms.${operation}Link.buttons.submit.label`)}>
								{t(`link:forms.${operation}Link.buttons.submit.label`)}
							</LoadingButton>
						</Box>
					)}
				</DialogContent>
			</Dialog>
		);
	},
);
