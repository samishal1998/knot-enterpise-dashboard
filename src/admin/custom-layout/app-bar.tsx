// in src/MyAppBar.js
import * as React from 'react';
import {AppBar, defaultTheme, LocalesMenuButton, RefreshIconButton, TitlePortal, ToggleThemeButton} from 'react-admin';
import Box from '@mui/material/Box';
import {KNOT_COMPANY_DASHBOARD_THEME} from "../../theme";
import AppIcon from "../../assets/app_icon.png";
import {Typography} from "@mui/material";


const MyAppBar = () => (
    <AppBar sx={{height:80,justifyContent:"center"}} position={"sticky"} toolbar={
        <>
            <LocalesMenuButton />
            <ToggleThemeButton lightTheme={KNOT_COMPANY_DASHBOARD_THEME({mode:'light'})} darkTheme={KNOT_COMPANY_DASHBOARD_THEME({mode:'dark'})} />
            <RefreshIconButton />
        </>
    }>
        <Box flex={1} />
        <Box  sx={{height:"100%",alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"row"}} >

            <img src={AppIcon} style={{height:"80%", marginRight:5,marginLeft:5}}/>
            <Typography
                flex="1"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                variant="h5"
                color="inherit"
                id="react-admin-title"
                sx={{fontSize:'1.25rem',fontWeight:"600"}}
            />

        </Box>


        <Box flex={1} />
    </AppBar>
);

export default MyAppBar;