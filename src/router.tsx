// @ts-nocheck

import { Routes, Route, BrowserRouter, createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import ManageProfilePage from '@pages/dashboard/account/manage-profile';
import ManageAuthenticationPage from '@pages/dashboard/account/manage-authentication';
import React from 'react';
import BecomePartner from '@pages/supplier/become-a-partner';
import SupplierOffersPage from '@pages/supplier/dashboard/offers';
import SupplierRequestsPage from '@pages/supplier/dashboard/requests';
import EditRentOffer from '@pages/supplier/rent-offers/[action]/[id]';
import EditSaleOffer from '@pages/supplier/sale-offers/[action]/[id]';
import AuthPage from '@pages/auth';
import CurrentCartPage from '@pages/customer/carts/current';
import PreviousCartsPage from '@pages/customer/carts/previous';
import RentRequestsPage from '@pages/customer/requests/rent';
import SearchPage from '@pages/customer/offers/search';
import OfferDetailsPage from '@pages/customer/offers/[offerType]/[id]';
import Layout from '@components/layout';
import { EmployeesPage } from '@pages/employees';
import { ProductsPage } from '@pages/products';
import { AnnouncementsPage } from '@pages/announcements';
import { NewAnnouncementPage } from '@pages/announcements/new-announcement';
import { EditProfilePage } from '@pages/employees/edit-profile.page';
import { SignInPage } from '@pages/auth/sign-in';
import { Dashboard } from '@mui/icons-material';
import { AccountSettingsPage } from '@pages/dashboard/account';
import { CreateProfilePage } from '@pages/employees/create-profile.page';

export const router = createBrowserRouter([
	{
		path: '/',
		loader() {
			throw redirect(EmployeesPage.route);
		},
	},
	{
		path: '/dashboard',
		element: (
			<Layout key={'dashboard-layout'}>
				<Outlet />
			</Layout>
		),
		children: [
			// {path: DashboardPage.path() ,element:<DashboardPage />,index:true},
			{ path: EmployeesPage.route, element: <EmployeesPage /> },
			{ path: EditProfilePage.route, element: <EditProfilePage /> },
			{ path: CreateProfilePage.route, element: <CreateProfilePage /> },
			{ path: ProductsPage.route, element: <ProductsPage /> },
			// {path: AnnouncementsPage.path() ,element:<AnnouncementsPage />},
			// {path: NewAnnouncementPage.path() ,element:<NewAnnouncementPage />},
			// {path: EditEmployeePage.route ,element:<EditEmployeePage />},
			// {path: SignInPage.route ,element:<SignInPage />},
			{
				path: AccountSettingsPage.route,
				element: <AccountSettingsPage />,
				children: [
					{
						loader: () => {
							throw redirect(ManageProfilePage.route);
						},
						index: true,
					},
					{ path: ManageProfilePage.route, element: <ManageProfilePage />, index: true },
					{ path: ManageAuthenticationPage.route, element: <ManageAuthenticationPage /> },
				],
			},
		],
	},
	{
		path: AuthPage.route,
		element: <AuthPage></AuthPage>,
	},
]);
