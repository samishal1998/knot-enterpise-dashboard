import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ManageProfilePage from '@pages/dashboard/account/manage-profile';
import ManageAuthenticationPage from '@pages/dashboard/account/manage-authentication';

export const AccountTabs = ({ page, navigate, user, ...props }) => {
	const { t, i18n } = useTranslation(['main']);
	return (
		<>
			<Tabs
				onChange={(_, value) => navigate(value)}
				value={page}
				variant="fullWidth"
				scrollButtons={'auto'}
				allowScrollButtonsMobile
				aria-label="scrollable tabs account"
				centered
				sx={{
					'& .Mui-disabled': {
						opacity: 0.3,
					},
				}}
				{...props}>
				{!!user?.distributorId || (
					<LinkTab
						value={ManageProfilePage.generatePath()}
						label={t('profile')}
						href={ManageProfilePage.generatePath()}
					/>
				)}
				<LinkTab
					value={ManageAuthenticationPage.generatePath()}
					label={t('authentication')}
					href={ManageAuthenticationPage.generatePath()}
				/>
			</Tabs>
		</>
	);
};
export const LinkTab = (props) => {
	return (
		<Tab
			component="a"
			onClick={(event) => {
				event.preventDefault();
			}}
			{...props}
		/>
	);
};
