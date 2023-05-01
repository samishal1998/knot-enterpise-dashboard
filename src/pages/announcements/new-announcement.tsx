import {useUsersFindAll} from "../../api/users/users";
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import React, {useEffect} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import {amber, green, red} from "@mui/material/colors";
import {Title} from 'react-admin';
import {Button, Paper, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import {FormikHelpers, useFormik} from "formik";
import MUIRichTextEditor from "mui-rte";
import {ThemeProvider} from "@mui/styles";
import {KNOT_COMPANY_DASHBOARD_THEME} from "../../theme";
import {draftToMarkdown, markdownToDraft} from 'markdown-draft-js';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';

export const NewAnnouncementPage = () => {

    const {values, handleChange} = useFormik<any>({
        onReset(values: any, formikHelpers: FormikHelpers<any>): void {
        },
        onSubmit(values: any, formikHelpers: FormikHelpers<any>): void | Promise<any> {
            return undefined;
        },
        initialValues: {
            announcement: null,
        }
    });

    useEffect(() => {
        if (values.announcement) console.log(draftToMarkdown(JSON.parse(values.announcement)))
    }, [values]);

    return (
        <>
            <Title title="New Announcement"/>
            <Box flexDirection="column" display={"flex"} height={"100%"} pt={10} gap={2} px={5}>
                <TextField id="outlined-basic" label="From" variant="outlined"/>
                <TextField id="outlined-basic" label="To" variant="outlined"/>
                <ThemeProvider theme={KNOT_COMPANY_DASHBOARD_THEME()}>
                    <Paper sx={{px: 5, pb: 5}}>
                        <MUIRichTextEditor
                            label="Start typing..."
                            inlineToolbar={true}
                            toolbar={true}
                            defaultValue={JSON.stringify(markdownToDraft(`# Hi
## Hya
### HOHOHO
                            `))}
                            // onChange={(data)=> handleChange('announcement')(data.getCurrentContent().)}
                            onSave={handleChange('announcement')}
                        />
                    </Paper>
                </ThemeProvider>
            </Box>

        </>
    )
}

NewAnnouncementPage.path = (options?: any) => ("/new-announcement")