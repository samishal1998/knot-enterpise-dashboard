// in src/MyLayout.js
import * as React from 'react';
import {Layout, LayoutProps} from 'react-admin';
import MyAppBar from "./app-bar";
import {MyMenu} from "./menu";


const MyLayout = (props: JSX.IntrinsicAttributes & LayoutProps) => {
    return <Layout {...props} appBar={MyAppBar} sx={{
        marginTop: '0px !important',
        "& .RaLayout-appFrame": {marginTop: '0px !important'}
    }} menu={MyMenu}/>
};

export default MyLayout;