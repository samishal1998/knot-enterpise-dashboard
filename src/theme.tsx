
import {green,common} from "@mui/material/colors";
import {RaThemeOptions, warning,defaultTheme} from "react-admin";
import {createTheme} from "@mui/material/styles";
import {appBarHeight} from "@components/layout/toolbar";

export function KNOT_COMPANY_DASHBOARD_THEME(options?:any) {
    return createTheme({
    // return ({
    //     ...defaultTheme,
        typography:{
            fontFamily:"Raleway"
        },
        palette:{
            mode: options?.mode ?? "light",
            // ...defaultTheme.palette,
            primary: {...green,main:green[500]},
            secondary:green,
        },shape:{
            borderRadius:16,
        },
        mixins:{
          toolbar:{
              height:appBarHeight
          }
        },
        components:{
            // ...defaultTheme.components,
            MuiAppBar:{
                styleOverrides:{
                    colorPrimary: common.white,
                    colorInherit: common.white,
                    colorDefault: common.white,
                    colorSecondary:common.white,
                    colorTransparent:common.white,
                    root:{
                        color:green[700],
                        backgroundColor: common.white,
                    }

                }
            },

        }
    })
}