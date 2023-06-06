// in src/admin/index.tsx
import { Admin, Resource, ListGuesser, CustomRoutes } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { KNOT_COMPANY_DASHBOARD_THEME } from '../theme';
import MyLayout from './custom-layout/layout';
import React from 'react';
import { Route } from 'react-router-dom';
import { EmployeesPage } from '../pages/employees';
import Axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductsPage } from '../pages/products';
import { AnnouncementsPage } from '../pages/announcements';
import { NewAnnouncementPage } from '../pages/announcements/new-announcement';
import { EditProfilePage } from '@pages/employees/edit-profile.page';
import { SignInPage } from '../pages/auth/sign-in';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
Axios.defaults.baseURL = 'http://localhost:3000';
const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<Admin dataProvider={dataProvider} layout={MyLayout} theme={KNOT_COMPANY_DASHBOARD_THEME()}>
			<Resource name="posts" list={ListGuesser} />
			<Resource name="comments" list={ListGuesser} />

			{/*<CustomRoutes>*/}
			{/*    <Route path={EmployeesPage.route} element={<EmployeesPage />}  />*/}
			{/*    <Route path={ProductsPage.path()} element={<ProductsPage />} />*/}
			{/*    <Route path={AnnouncementsPage.path()} element={<AnnouncementsPage />} />*/}
			{/*    <Route path={NewAnnouncementPage.path()} element={<NewAnnouncementPage />} />*/}
			{/*    <Route path={EditEmployeePage.route} element={<EditEmployeePage />} />*/}
			{/*    <Route path={SignInPage.route} element={<SignInPage />} />*/}
			{/*</CustomRoutes>*/}
		</Admin>
	</QueryClientProvider>
);

export default App;
