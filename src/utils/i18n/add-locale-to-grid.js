import { arSD } from '@mui/x-data-grid';

export const addLocaleToGrid = (lang) => {
	if (lang === 'ar') return { localeText: arSD.components.MuiDataGrid.defaultProps.localeText };

	return {};
};
