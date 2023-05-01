import React from 'react'
import ReactDOM from 'react-dom/client'
import EnterpriseDashboardApp from './App'
import './index.css'
import './styles/firebaseui-styling.global.css'

import '../i18n';
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
    <EnterpriseDashboardApp />
  // </React.StrictMode>,
)
