import { IconButton, Link } from '@mui/material';
import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import Box from '@mui/material/Box';
import { green, grey } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { Translate as TranslateIcon } from '@mui/icons-material';

import Color from 'color';
import { useTranslation } from 'react-i18next';

export function LanguageDropDown() {
	const { t, i18n } = useTranslation(['main']);
	const langPopupState = usePopupState({ variant: 'popper', popupId: 'language' });

	return (
		<div>
			<IconButton
				size="large"
				aria-label="language"
				aria-controls="menu-appbar"
				// aria-haspopup="true"
				color="inherit"
				{...bindTrigger(langPopupState)}>
				<Box
					sx={{
						background: Color(green[400]).alpha(0.3).hsl().toString(),
						height: '3.0rem',
						width: '3.0rem',
						borderRadius: '100%',
						display: 'flex',
						'&:hover': {
							background: Color(green[400]).alpha(0.6).hsl().toString(),
							color: grey[200],
						},
					}}>
					{/*<img className={'m-auto'} src="/assets/lang.svg" style={{height:'1.5rem',width:'1.5rem',color:'white',}}/>*/}
					<TranslateIcon
						className={'m-auto'}
						sx={{ color: green[600], height: '1.75rem', width: '1.75rem' }}
					/>
				</Box>
			</IconButton>
			<Menu {...bindMenu(langPopupState)}>
				<MenuItem
					selected={i18n.language == 'en'}
					onClick={() => {
						langPopupState.close;
						i18n.changeLanguage('en');
					}}>
					<a>{t('english')}</a>
				</MenuItem>
				<MenuItem
					selected={i18n.language == 'ar'}
					onClick={() => {
						langPopupState.close;
						i18n.changeLanguage('ar');
					}}>
					<a>{t('arabic')}</a>
				</MenuItem>
			</Menu>
		</div>
	);
}
