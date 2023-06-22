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
import AuthPage from '@pages/auth/auth.page';
import CurrentCartPage from '@pages/customer/carts/current';
import PreviousCartsPage from '@pages/customer/carts/previous';
import RentRequestsPage from '@pages/customer/requests/rent';
import SearchPage from '@pages/customer/offers/search';
import OfferDetailsPage from '@pages/customer/offers/[offerType]/[id]';
import Layout from '@components/layout/_layout';
import { EmployeesPage } from '@pages/enterprise/employees/employees.page';
import { ProductsPage } from '@pages/enterprise/products/prodcuts.page';
import { AnnouncementsPage } from '@pages/announcements';
import { NewAnnouncementPage } from '@pages/announcements/new-announcement';
import { EditProfilePage } from '@pages/enterprise/employees/edit-profile.page';
import { SignInPage } from '@pages/auth/sign-in';
import { Dashboard } from '@mui/icons-material';
import { AccountSettingsPage } from '@pages/dashboard/account';
import { CreateProfilePage } from '@pages/enterprise/employees/create-profile.page';
import QrListPage from '@pages/distributor/qr/qr-list.page';
import GenerateQrPage from '@pages/distributor/qr/generate/generate-qr.page';
import Home from '@pages/home.page';
import PaymentPage from '@pages/payment.page';
import ManageSubscriptionPage from '@pages/dashboard/account/manage-subscription.page';
import ManageDistributorProfilePage from '@pages/distributor/manage-distributor-profile';
import { DistributorsManagementPage } from '@pages/admin/distributors.page';
import { DistributorsProductsManagementPage } from '@pages/admin/distributors-products.page';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: PaymentPage.route,
		element: <PaymentPage />,
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
			// {path: AnnouncementsPage.path() ,element:<AnnouncementsPage />},
			// {path: NewAnnouncementPage.path() ,element:<NewAnnouncementPage />},
			// {path: EditEmployeePage.route ,element:<EditEmployeePage />},
			// {path: SignInPage.route ,element:<SignInPage />},
			{ path: ManageSubscriptionPage.route, element: <ManageSubscriptionPage /> },
			{
				path: AccountSettingsPage.route,
				element: <AccountSettingsPage />,
				children: [
					{
						loader: () => {
							throw redirect(ManageAuthenticationPage.route);
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
		path: '/enterprise',
		element: (
			<Layout key={'enterprise-layout'}>
				<Outlet />
			</Layout>
		),
		children: [
			{ path: EmployeesPage.route, element: <EmployeesPage /> },
			{ path: EditProfilePage.route, element: <EditProfilePage /> },
			{ path: CreateProfilePage.route, element: <CreateProfilePage /> },
			{ path: ProductsPage.route, element: <ProductsPage /> },
		],
	},
	{
		path: '/admin',
		element: (
			<Layout key={'admin-layout'}>
				<Outlet />
			</Layout>
		),
		children: [
			{ path: DistributorsManagementPage.route, element: <DistributorsManagementPage /> },
			{ path: DistributorsProductsManagementPage.route, element: <DistributorsProductsManagementPage /> },
		],
	},
	{
		path: '/distributor',
		element: (
			<Layout key={'distributor-layout'}>
				<Outlet />
			</Layout>
		),
		children: [
			{ path: QrListPage.route, element: <QrListPage /> },
			{ path: GenerateQrPage.route, element: <GenerateQrPage /> },
			{ path: ManageDistributorProfilePage.route, element: <ManageDistributorProfilePage /> },
		],
	},
	{
		path: AuthPage.route,
		element: <AuthPage></AuthPage>,
	},
]);
