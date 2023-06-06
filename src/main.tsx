import React from 'react';
import ReactDOM from 'react-dom/client';
import EnterpriseDashboardApp from './App';
import './index.css';
import './styles/firebaseui-styling.global.css';

import '../i18n';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';
import { ExampleLoaderComponent } from './dev/palette';
// declare global {
//     interface Window {
//         global: any;
//     }
// }
//
// if (typeof window !== "undefined") {
//     window.global = window;
// }
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
		<>
			<EnterpriseDashboardApp />
			<ExampleLoaderComponent />
		</>
	</DevSupport>,
	// </React.StrictMode>,
);
