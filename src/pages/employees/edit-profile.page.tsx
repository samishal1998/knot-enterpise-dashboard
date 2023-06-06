import { usersUpdate, useUsersFindOne } from '../../api/users/users';
import Box from '@mui/material/Box';
import React, { ChangeEvent, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { amber, green, red } from '@mui/material/colors';
import { Title } from 'react-admin';
import {
	Button,
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Switch,
	TextField,
	Typography,
} from '@mui/material';
import { FormikHelpers, useFormik } from 'formik';
import { Link, LinkCategory, User, UserLinksCategories } from '../../api/models';
import { useParams } from 'react-router-dom';
import { BasePageType, generatePath } from '@components/base-page.type';
import { LoadingButton } from '@mui/lab';
import { resolve } from '@utils/helpers';
import { useSnackbar } from 'react-mui-snackbar-helper';
import {
	AddLinkRounded,
	CameraAltRounded,
	CancelRounded,
	Check,
	DragHandle,
	EditNoteRounded,
	LockOpenRounded,
	LockRounded,
	Rotate90DegreesCcw,
} from '@mui/icons-material';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'react-i18next';

import { userLinksDeleteLink, userLinksDisableLink, userLinksEnableLink } from '../../api/user-links/user-links';
import { useQueryClient } from '@tanstack/react-query';

import ReactFitText from 'react-fittext';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Links } from '../../helpers/links/links';
import { EditLinkDialog, EditLinkDialogRef } from '@components/links/edit-link-dialog';
import { SelectLinkTypeDialog, SelectLinkTypeDialogRef } from '@components/links/select-link-type-dialog';

import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	Droppable,
	DropResult,
} from 'react-beautiful-dnd';
import clsx from 'clsx';
import _ from 'lodash';
import {
	userLinkCategoriesReorderLinksCategory,
	useUserLinkCategoriesReorderLinksCategory,
} from '../../api/user-link-categories/user-link-categories';
import { FileImage } from '@components/forms/file-image';
import { useFileInput } from '@components/forms/fields';

export type FormModelType = Omit<User, 'lockedProperties'> & {
	lockedProperties: Set<string>;
};
export type EditEmployeePageRouteParams = {
	id: string;
};
export const EditProfilePage: BasePageType<EditEmployeePageRouteParams> = () => {
	const { t } = useTranslation();
	const { id } = useParams();
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const query = useUsersFindOne<AxiosResponse<User, any>>(
		id ?? '',
		{},
		{ query: { enabled: !!id, queryKey: [`/user/${id}/links`] } },
	);

	return (
		<Box sx={{ height: '100%', mx: 'auto', mt: 4 }}>
			<Title title="Edit Employee" />
			{query.isLoading && <>Loading ...</>}
			{query.data?.status == 200 && (
				<>
					<Box
						className={
							// 'flex flex-row justify-evenly items-center flex-wrap gap-2 mx-auto w-full max-w-screen-xl py-5'
							'grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto w-full max-w-screen-xl py-5'
						}>
						<UserDataForm query={query} />
						<UserLinks user={query.data?.data} />
					</Box>
				</>
			)}
		</Box>
	);
};

export function UserLinks({ user }: { user: User }) {
	const { t } = useTranslation(['main', 'linkSection', 'link']);
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const [orderingMode, setOrderingMode] = useState(false);
	const [sections, setSections] = useState<UserLinksCategories>();
	useEffect(() => {
		setSections(_.cloneDeep(user.linksCategories));
	}, [user.linksCategories]);
	const queryClient = useQueryClient();

	const handleToggleLink = useCallback(async (linkId, link, event) => {
		const [res, error] = await resolve(
			link.enabled ? userLinksDisableLink(user.id!, linkId, {}) : userLinksEnableLink(user.id!, linkId, {}),
		);

		if (error) {
			showErrorMessage(t('link:toggle.request.failure.message'));
		} else {
			await queryClient.invalidateQueries([`/user/${user.id}/links`]);
			showSuccessMessage(t('link:toggle.request.success.message'));
		}
	}, []);

	const handleDeleteLink = useCallback(async (linkId, link, event) => {
		const [res, error] = await resolve(userLinksDeleteLink(user.id!, linkId, {}));

		if (error) {
			showErrorMessage(t('link:delete.request.failure.message'));
		} else {
			await queryClient.invalidateQueries([`/user/${user.id}/links`]);
			showSuccessMessage(t('link:delete.request.success.message'));
		}
	}, []);

	const handleEditLink = useCallback(
		async (linkId, link, sectionId, event) => {
			editLinkDialog.current?.editLink(user.id!, linkId, sectionId, link);
		},
		[user.id],
	);

	const handleAddLink = useCallback(
		(linkType, sectionId, event) => {
			editLinkDialog.current?.addLink(user.id!, linkType, sectionId);
		},
		[user.id],
	);

	const editLinkDialog = useRef<EditLinkDialogRef>(null);
	const selectLinkTypeDialog = useRef<SelectLinkTypeDialogRef>(null);
	const selectedSection = useRef<string>(null);
	const reorderLinks = async (result: DropResult) => {
		if (result.destination && sections) {
			sections[result.source.droppableId]!.links?.splice(result.source.index, 1);
			sections[result.destination.droppableId]!.links?.splice(result.destination.index, 0, result.draggableId);
			setSections({ ...sections });
			setOrderingMode(true);
		}
	};

	const reorderLinkSections = useUserLinkCategoriesReorderLinksCategory();
	const saveOrder = useCallback(async () => {
		if (!user?.id) return;

		const body = _.mapValues(sections, (section) => section.links ?? []);

		const [res, error] = await resolve(reorderLinkSections.mutateAsync({ uid: user.id, data: body }));
		if (error) {
			showErrorMessage(t('linkSection:actions.order.save.request.failure.message'));
		} else {
			showSuccessMessage(t('linkSection:actions.order.save.request.success.message'));
			setOrderingMode(false);
		}
	}, [sections, user]);
	const resetOrder = useCallback(async () => {
		setSections(_.cloneDeep(user.linksCategories));
	}, [user.linksCategories]);
	const cancelReorder = useCallback(async () => {
		resetOrder();
		setOrderingMode(false);
	}, [resetOrder]);

	return (
		<Box className={'w-full mx-auto  max-w-screen-md'}>
			<EditLinkDialog ref={editLinkDialog} />
			<SelectLinkTypeDialog
				ref={selectLinkTypeDialog}
				onLinkTypeSelected={(linkType) => {
					if (selectedSection.current) {
						editLinkDialog.current?.addLink(user.id!, selectedSection.current, linkType);
						selectLinkTypeDialog.current?.close();
					}
				}}
			/>

			<div
				className={clsx('transition-[max-height padding] ease-in-out overflow-hidden ', {
					'max-h-0  duration-[1500ms]': !orderingMode,
					'max-h-96  duration-[3000ms] py-4': orderingMode,
				})}>
				<LoadingButton
					loading={reorderLinkSections.isLoading}
					variant={'text'}
					onClick={saveOrder}
					title={t('linkSection:actions.order.save.label')}>
					<Check /> {t('linkSection:actions.order.save.label')}
				</LoadingButton>

				<Button
					variant={'text'}
					sx={{ color: amber[500], '&:hover': { bgcolor: amber[50] } }}
					disabled={reorderLinkSections.isLoading}
					onClick={resetOrder}
					title={t('linkSection:actions.order.reset.label')}>
					<Rotate90DegreesCcw /> {t('linkSection:actions.order.reset.label')}
				</Button>

				<Button
					variant={'text'}
					color={'error'}
					disabled={reorderLinkSections.isLoading}
					onClick={cancelReorder}
					title={t('linkSection:actions.order.cancel.label')}>
					<CancelRounded /> {t('linkSection:actions.order.cancel.label')}
				</Button>
			</div>

			<Box className={'w-full flex flex-col justify-start items-stretch gap-5'}>
				<DragDropContext onDragEnd={reorderLinks}>
					{Object.entries((sections ?? {}) as Record<string, LinkCategory>).map(
						([sectionId, linkCategory], sectionIndex) => {
							const linksIds = linkCategory.links?.filter((key) => user?.links?.[key]) ?? [];
							return (
								<Droppable droppableId={sectionId ?? sectionIndex.toString()}>
									{(provided) => (
										<Box
											{...provided.droppableProps}
											ref={provided.innerRef}
											className={
												'w-full flex flex-col justify-start items-stretch bg-green-100 gap-2 rounded-lg pt-3 pb-5 px-5'
											}>
											<ListItem>
												<ListItemText>
													<Typography variant={'h5'}>
														{linkCategory.labels?.default}
													</Typography>
												</ListItemText>
												<Button
													variant={'text'}
													onClick={(event) => {
														// @ts-ignore
														selectedSection.current = sectionId;
														selectLinkTypeDialog.current?.open();
													}}
													title={t('linkSection:actions.addLink.label')}>
													<AddLinkRounded /> {t('linkSection:actions.addLink.label')}
												</Button>
											</ListItem>

											{Boolean(user.links) && linksIds.length ? (
												linksIds.map((key, i) => {
													return (
														<Draggable draggableId={key} key={key} index={i}>
															{(draggableProvided, snapshot) => (
																<LinkTile
																	link={user.links![key]}
																	linkId={key}
																	userId={user.id!}
																	onToggleLink={handleToggleLink}
																	onDeleteLink={handleDeleteLink}
																	draggableProvided={draggableProvided}
																	snapshot={snapshot}
																	onEditLink={(linkId, link, event) =>
																		handleEditLink(linkId, link, sectionId, event)
																	}
																/>
															)}
														</Draggable>
													);
												})
											) : (
												<Box
													className={
														'text-center p-4 bg-white ring-1 ring-green-500 hover:ring-2 shadow-sm rounded-xl' +
														' grid gap-2'
													}>
													<h5 className={'text-center font-semibold text-xl'}>
														{t('linkSection:noLinks.title')}
													</h5>
													<h6 className={'text-center text-md'}>
														{t('linkSection:noLinks.subtitle')}
													</h6>
												</Box>
											)}
											{provided.placeholder}
										</Box>
									)}
								</Droppable>
							);
						},
					)}
				</DragDropContext>
			</Box>
		</Box>
	);
}

type onToggleLinkCallback = (linkId: string, link: Link, event: ChangeEvent<HTMLInputElement>) => void;
type onDeleteLinkCallback = (linkId: string, link: Link, event: MouseEvent<HTMLButtonElement>) => void;
type onEditLinkCallback = (linkId: string, link: Link, event: MouseEvent<HTMLButtonElement>) => void;

export function LinkTile({
	userId,
	linkId,
	link,
	onToggleLink,
	onDeleteLink,
	onEditLink,
	draggableProvided,
	snapshot,
}: {
	userId: string;
	linkId: string;
	link: Link;
	onToggleLink: onToggleLinkCallback;
	onDeleteLink?: onDeleteLinkCallback;
	onEditLink?: onEditLinkCallback;
	draggableProvided?: DraggableProvided;
	snapshot?: DraggableStateSnapshot;
}) {
	return (
		<Box
			{...draggableProvided?.draggableProps}
			ref={draggableProvided?.innerRef}
			className={clsx('p-2   hover:ring-2 rounded-xl grid grid-cols-12 grid-flow-col auto-rows-auto gap-2', {
				'ring-1 ring-green-400 bg-white shadow-sm': !snapshot?.isDragging,
				'ring-4 ring-red-200 bg-red-50 shadow-xl': snapshot?.isDragging,
			})}>
			{/*<Box className={'col-span-2 row-span-full flex-row flex justify-center items-center '}>*/}
			<Box className={'col-span-3 row-span-full flex-row flex justify-start items-center '}>
				<IconButton {...draggableProvided?.dragHandleProps}>
					<DragHandle />
				</IconButton>
				<img
					className={'rounded-full bg-white ring-1 ring-green-500 w-16 aspect-square'}
					src={Links.getIcon({ userId, linkId, link, linkType: link.type as any })}
					alt={link.labels?.default}
				/>
			</Box>

			{/*<Box className={'col-start-3 col-end-11 overflow-hidden'}>*/}
			<Box className={'col-start-4 col-end-11 overflow-hidden'}>
				<Typography variant={'h6'}>{link.type == 'CUSTOM' ? link.labels?.default : link.type}</Typography>
				<ReactFitText maxFontSize={20} minFontSize={0} compressor={2.75}>
					<Typography className="overflow-ellipsis whitespace-nowrap">{link.value}</Typography>
				</ReactFitText>
			</Box>
			<Box className={'col-span-2 row-span-full grid justify-center content-center'}>
				<Grid container justifyContent={'center'}>
					<Grid item>
						<Switch
							checked={link.enabled}
							onChange={(event) => {
								onToggleLink(linkId, link, event);
							}}
						/>
					</Grid>
					<Grid item>
						<IconButton onClick={(event) => onDeleteLink?.(linkId, link, event)}>
							<DeleteForeverIcon sx={{ color: red[400] }} />
						</IconButton>
						<IconButton onClick={(event) => onEditLink?.(linkId, link, event)}>
							<EditNoteRounded sx={{ color: green[400] }} />
						</IconButton>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export function UserDataForm({ query }) {
	const { showErrorMessage, showSuccessMessage } = useSnackbar();
	const { t } = useTranslation('main');

	const { values, handleSubmit, handleReset, resetForm, handleChange, setValues, isSubmitting, errors, submitCount } =
		useFormik<FormModelType>({
			initialValues: {
				lockedProperties: new Set<string>(),
			},
			onReset(values: FormModelType, { setValues }: FormikHelpers<FormModelType>): void {
				setValues({
					...(query.data?.data ?? {}),
					lockedProperties: new Set<string>(query.data?.data?.lockedProperties ?? []),
				} as any);
			},
			async onSubmit(values: FormModelType, formikHelpers: FormikHelpers<FormModelType>): Promise<any> {
				if (values.id) {
					const [res, error] = await resolve(
						usersUpdate(values.id, {
							fullName: values['fullName'],
							bio: values['bio'],
							primaryEmail: values['primaryEmail'],
							primaryPhone: values['primaryPhone'],

							primaryEmailEnabled: values['primaryEmailEnabled'],
							primaryPhoneEnabled: values['primaryPhoneEnabled'],
							emails: values['emails'],
							phones: values['phones'],
							workInfo: values['workInfo'],
							lockedProperties: Array.from(values.lockedProperties),
						}),
					);
					if (error) showErrorMessage(t('employeeUpdate.failure.message'));
					else showSuccessMessage(t('employeeUpdate.success.message'));
				} else {
					throw 'no-id';
				}
			},
		});

	useEffect(() => {
		console.log(query.data);
		if (query.data?.data) {
			setValues({
				...(query.data?.data ?? {}),
				lockedProperties: new Set<string>(query.data?.data?.lockedProperties ?? []),
			} as any);
		}
	}, [query.status]);
	const profileImageFileInput = useFileInput({ single: true, mimeType: 'image/png, image/jpeg' });
	const coverImageFileInput = useFileInput({ single: true, mimeType: 'image/png, image/jpeg' });
	return (
		<Box className={'flex flex-col justify-start items-stretch  gap-5 mx-auto w-full max-w-screen-md'}>
			<Box className={'flex flex-col justify-start items-center relative h-[25rem]'}>
				<Box className={'bg-green-100 rounded-md w-full h-80 overflow-hidden relative'}>
					{/*{!!coverImageFileInput.selectedFiles[0] && (*/}
					<FileImage
						className={' w-full h-full  object-cover'}
						source={
							getPublicImageUrlFromPath(`users/${values.id}/cover`) ??
							coverImageFileInput.selectedFiles[0]
						}
						alt={'Cover'}
					/>
					{/* )}*/}
					{/*<Box className={'absolute top-0 z-10 w-full h-full grid justify-center items-center'}>*/}
					{/*	<IconButton className={'w-20 h-20 '} onClick={coverImageFileInput.openInput}>*/}
					{/*		<CameraAltRounded className={'!w-4/5 !h-4/5'} />*/}
					{/*	</IconButton>*/}
					{/*</Box>*/}
				</Box>

				<Box
					className={
						'bg-green-200 rounded-full aspect-square w-40 h-40 overflow-hidden absolute bottom-0 z-10 left-[calc(50% - (10rem / 2) )] '
					}>
					{/*{!!profileImageFileInput.selectedFiles[0] && (*/}
					<FileImage
						className={' w-full h-full object-cover'}
						source={
							getPublicImageUrlFromPath(`users/${values.id}/profile`) ??
							profileImageFileInput.selectedFiles[0]
						}
					/>
					{/*)}*/}
					{/*<Box className={'absolute top-0 z-10 w-full h-full grid justify-center items-center'}>*/}
					{/*	<IconButton className={'w-14 h-14 '} onClick={profileImageFileInput.openInput}>*/}
					{/*		<CameraAltRounded className={'!w-4/5 !h-4/5'} />*/}
					{/*	</IconButton>*/}
					{/*</Box>*/}
				</Box>
			</Box>

			<TextField
				label={'Full Name'}
				variant={'outlined'}
				value={values['fullName']}
				onChange={handleChange('fullName')}
				fullWidth
			/>

			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor={`email-address-1`}>{`Email Address 1`}</InputLabel>
				<OutlinedInput
					id={`email-address-1`}
					value={values['primaryEmail']}
					onChange={handleChange(`primaryEmail`)}
					endAdornment={
						<InputAdornment position="end">
							<Switch
								checked={values.primaryEmailEnabled}
								onChange={(_, checked) => handleChange(`primaryEmailEnabled`)(_)}
							/>
						</InputAdornment>
					}
					label={`Email Address 1`}
				/>
			</FormControl>
			{Array.isArray(values['emails']) &&
				Boolean(values.emails?.length) &&
				values.emails.map(({ value, enabled }, index) => {
					return (
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor={`email-address-${index + 2}`}>{`Email Address ${
								index + 2
							}`}</InputLabel>
							<OutlinedInput
								id={`email-address-${index + 2}`}
								value={value}
								onChange={handleChange(`emails[${index}].value`)}
								endAdornment={
									<InputAdornment position="end">
										<Switch
											checked={enabled}
											onChange={(_, checked) => handleChange(`emails[${index}].enabled`)(_)}
										/>
									</InputAdornment>
								}
								label={`Email Address ${index + 2}`}
							/>
						</FormControl>
					);
				})}

			<FormControl fullWidth variant="outlined">
				<InputLabel htmlFor="phone-number-1">{`Phone Number 1`}</InputLabel>
				<OutlinedInput
					id="phone-number-1"
					value={values['primaryPhone']}
					onChange={handleChange(`primaryPhone`)}
					endAdornment={
						<InputAdornment position="end">
							<Switch
								checked={values.primaryPhoneEnabled}
								onChange={(_, checked) => handleChange(`primaryPhoneEnabled`)(_)}
							/>
						</InputAdornment>
					}
					label={`Phone Number 1`}
				/>
			</FormControl>
			{Array.isArray(values['phones']) &&
				Boolean(values.phones?.length) &&
				values.phones.map(({ value, enabled }, index) => {
					return (
						<FormControl fullWidth variant="outlined">
							<InputLabel htmlFor={`phone-number-${index + 2}`}>{`Phone Number ${index + 2}`}</InputLabel>
							<OutlinedInput
								id={`phone-number-${index + 2}`}
								value={value}
								onChange={handleChange(`phones[${index}].value`)}
								endAdornment={
									<InputAdornment position="end">
										<Switch
											checked={enabled}
											onChange={(_, checked) => handleChange(`phones[${index}].enabled`)(_)}
										/>
									</InputAdornment>
								}
								label={`Phone Number ${index + 2}`}
							/>
						</FormControl>
					);
				})}

			<TextField
				label={'Bio'}
				variant={'outlined'}
				value={values['bio']}
				onChange={handleChange('bio')}
				multiline={true}
				fullWidth
				minRows={4}
			/>
			<TextField
				label={'Position'}
				variant={'outlined'}
				value={values.workInfo?.['position']}
				onChange={handleChange('workInfo.position')}
				fullWidth
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							{values?.lockedProperties?.has('workInfo.position') ? (
								<IconButton
									onClick={() => {
										values.lockedProperties.delete('workInfo.position');
										handleChange('lockedProperties')({
											target: { value: values.lockedProperties },
										} as any);
									}}>
									<LockRounded sx={{ color: red[400] }} />
								</IconButton>
							) : (
								<IconButton
									onClick={() => {
										values.lockedProperties.add('workInfo.position');
										handleChange('lockedProperties')({
											target: { value: values.lockedProperties },
										} as any);
									}}>
									<LockOpenRounded sx={{ color: green[400] }} />
								</IconButton>
							)}
						</InputAdornment>
					),
				}}
			/>

			<LoadingButton
				fullWidth
				loading={isSubmitting}
				variant={'contained'}
				onClick={handleSubmit as any}
				sx={{ color: 'white', fontWeight: 600 }}>
				Save
			</LoadingButton>
		</Box>
	);
}

EditProfilePage.route = '/dashboard/employees/:id/edit';
EditProfilePage.generatePath = generatePath(EditProfilePage.route);
