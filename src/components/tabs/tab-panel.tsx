import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';

export function TabPanel<T>(props: TabPanelProps<T>) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ paddingY: 3, paddingX: 0, display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

export type TabPanelProps<T> = {
	children: ReactNode;
	index: T;
	value: T;
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
