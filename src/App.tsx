import MyAdmin from "./admin";
import Layout from "./components/layout";
import {KNOT_COMPANY_DASHBOARD_THEME} from "./theme";
import {ThemeProvider} from "@mui/material/styles";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {router} from "./router";
import jsonServerProvider from "ra-data-json-server";
import Axios from "axios";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useTranslation} from "react-i18next";
import {useEffect, useMemo} from "react";
import MomentUtils from '@date-io/moment';
import {LocalizationProvider,} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment/min/moment-with-locales';
import rtlPlugin from 'stylis-plugin-rtl';
import {jssPreset, StylesProvider} from '@mui/styles';
import {create} from 'jss';
import rtl from 'jss-rtl';


import {setLocale,} from 'yup';
import {ar} from 'yup-locales';
import {CacheProvider} from "@emotion/react";
import createCache from '@emotion/cache';
import {SnackbarProvider} from "react-mui-snackbar-helper";

Axios.defaults.baseURL = 'http://localhost:3000';
export const queryClient = new QueryClient()


// Configure JSS
const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
});

// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [rtlPlugin],
});

function App() {

    let {i18n} = useTranslation();
    const direction = useMemo(() => (i18n.language === 'ar' ? 'rtl' : 'ltr'), [i18n.language]);

    useEffect(() => {
        const body = document.querySelector('body')
        body?.setAttribute('dir', direction)
        body?.setAttribute('lang', i18n.language)

        moment.locale(i18n.language);
        if (i18n.language === 'ar') setLocale(ar);


    }, [i18n.language]);
    return (
        <>
            <RTL>
                <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language} utils={MomentUtils}>

                    <ThemeProvider theme={KNOT_COMPANY_DASHBOARD_THEME()}>
                        <QueryClientProvider client={queryClient}>
                            <SnackbarProvider>
                                <RouterProvider router={router}/>
                            </SnackbarProvider>
                        </QueryClientProvider>
                    </ThemeProvider>
                </LocalizationProvider>
            </RTL>
        </>
    )
        ;
}

export default App;

function RTL(props) {
    let {i18n} = useTranslation();
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    if (direction == 'rtl') {
        return (
            <StylesProvider jss={jss}>
                <CacheProvider value={cacheRtl}>
                    {/*<StyleSheetManager stylisPlugins={[rtlPlugin]}>*/}
                    {props.children}
                    {/*</StyleSheetManager>*/}
                </CacheProvider>
            </StylesProvider>
        );
    } else {
        return props.children;
    }
}

