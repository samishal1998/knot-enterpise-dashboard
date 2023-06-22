import { Menu } from 'react-admin';
import LabelIcon from '@mui/icons-material/Label';
import { Logout } from '@mui/icons-material';

import React from 'react';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AppIcon from '../../assets/app_icon.png';
import { grey } from '@mui/material/colors';
import { EmployeesPage } from '@pages/enterprise/employees/employees.page';
import { ProductsPage } from '@pages/enterprise/products/prodcuts.page';
import BadgeIcon from '@mui/icons-material/Badge';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { AnnouncementsPage } from '../../pages/announcements';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

const name = 'Knot Ventures';
export const MyMenu = () => (
	<Menu>
		<Box
			className={'show-open-hide-closed'}
			sx={{
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				display: 'flex',
				flexDirection: 'column',
				p: 1,
				mb: 5,
			}}>
			<img
				src={AppIcon}
				style={{ height: '80%', width: '100%', marginRight: 5, marginLeft: 5, borderRadius: '100%' }}
			/>
			<Typography
				flex="1"
				textOverflow="ellipsis"
				whiteSpace="nowrap"
				overflow="hidden"
				variant="h6"
				color="inherit"
				id="react-admin-title"
				sx={{ fontSize: '1.5rem', fontWeight: '400', color: grey[700], my: 2 }}>
				{name}
			</Typography>
		</Box>

		<Menu.DashboardItem />
		{/*<Menu.ResourceItem name="posts"/>*/}
		{/*<Menu.ResourceItem name="comments"/>*/}
		{/*<Menu.ResourceItem name="users"/>*/}
		<Menu.Item to={EmployeesPage.generatePath()} primaryText="Employees" leftIcon={<BadgeIcon />} />
		<Menu.Item to={ProductsPage.generatePath()} primaryText="Products" leftIcon={<ShoppingBagIcon />} />
		<Menu.Item to={AnnouncementsPage.path()} primaryText="Announcements" leftIcon={<CampaignRoundedIcon />} />
		<Divider />
		<Menu.Item
			to={''}
			primaryText="Logout"
			leftIcon={<Logout />}
			onClick={(event) => {
				event.preventDefault();

				alert('Hey Why are you hitting me?!!');
			}}
		/>
	</Menu>
);
