import { Formik, FormikContext, FormikProvider, useFormik, useFormikContext } from 'formik';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Dialog, DialogContent, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Links } from '../../helpers/links/links';
import Box from '@mui/material/Box';

export type SelectLinkTypeDialogRef = {
	open: Function;
	close: Function;
};
export type SelectLinkTypeDialogProps = {
	onLinkTypeSelected: (linkType: string) => void;
};
export const SelectLinkTypeDialog = forwardRef<SelectLinkTypeDialogRef, SelectLinkTypeDialogProps>((props, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation(['link']);
	const close = useCallback(() => setIsOpen(false), []);
	const open = useCallback(() => setIsOpen(true), []);

	useImperativeHandle(
		ref,
		() => {
			return {
				open,
				close,
			};
		},
		[],
	);

	return (
		<Dialog open={isOpen} onClose={close} maxWidth={'md'} fullWidth>
			<DialogContent className={' flex flex-col justify-start items-stretch gap-4 w-full no-scrollbar'}>
				{Object.entries(Links.Categories).map(([key, { links }]: [keyof typeof Links.Categories, any]) => {
					const lowerCaseKey = key.toLowerCase() as Lowercase<typeof key>;
					const title = `link:presets.categories.${lowerCaseKey}.title` as const;
					if (key == 'CUSTOM') {
						const linkType = 'CUSTOM';
						return (
							<>
								<h4 className={'text-xl font-semibold text-green-950 '}>{t(title)}</h4>
								<Box className={'grid auto-rows-auto sm:grid-cols-1 md:grid-cols-3 w-full gap-3'}>
									<Box
										className={
											'rounded-lg bg-green-50 p-3 flex flex-row justify-start gap-2 items-center cursor-pointer hover:bg-green-100 hover:ring-2 ring-green-500'
										}
										onClick={() => props.onLinkTypeSelected(linkType)}>
										<img className={'h-10 w-10 '} src={Links.getIcon({ linkType })} />
										<span> {t(`link:presets.${linkType.toLowerCase()}` as any) as string}</span>
									</Box>
								</Box>
							</>
						);
					}
					return (
						<>
							<h4 className={'text-xl font-semibold text-green-950 '}>{t(title)}</h4>
							<Box className={'grid auto-rows-auto sm:grid-cols-1 md:grid-cols-3 w-full gap-3'}>
								{links.map((linkType) => {
									return (
										<Box
											className={
												'rounded-lg bg-green-50 p-3 flex flex-row justify-start gap-2 items-center cursor-pointer hover:bg-green-100 hover:ring-2 ring-green-500'
											}
											onClick={() => props.onLinkTypeSelected(linkType)}>
											<img className={'h-10 w-10 '} src={Links.getIcon({ linkType })} />
											<span> {t(`link:presets.${linkType.toLowerCase()}` as any) as string}</span>
										</Box>
									);
								})}
							</Box>
						</>
					);
				})}
			</DialogContent>
		</Dialog>
	);
});
