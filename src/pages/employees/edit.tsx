import {useUsersFindAll, useUsersFindOne, useUsersFindOneByUsername} from "../../api/users/users";
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useEffect} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import {amber, green, red} from "@mui/material/colors";
import {Title} from 'react-admin';
import {Avatar, Button, TextField} from "@mui/material";
import {FormikHelpers, useFormik} from "formik";
import {User} from "../../api/models";
import {useParams} from "react-router-dom";
import {BasePageType, generatePath} from "@components/base-page.type";


// export const EditEmployeePage = ({id = "639f2359c6e0331e3a1b3279"}: { id?: string }) => {
// export const EditEmployeePage = ({id = "63bb34375c7cbd7c8e5f8f4d"}: { id?: string }) => {

export type EditEmployeePageRouteParams = {
    id: string,
}
export const EditEmployeePage: BasePageType<EditEmployeePageRouteParams> = () => {

    const {id} = useParams()
    const query = useUsersFindOne(id ?? "", {query: {enabled: !!id}});


    const {values, handleChange, setValues} = useFormik<User>({
        initialValues: {},
        onReset(values: User, formikHelpers: FormikHelpers<User>): void {
        },
        onSubmit(values: User, formikHelpers: FormikHelpers<User>): void | Promise<any> {
            return undefined;
        },
    })

    useEffect(() => {
        console.log(query.data);
        if (query.data?.data)
            setValues(query.data!.data as any)
    }, [query])
    return (
        <Box sx={{height: "100%", width: "80%", mx: "auto"}}>
            <Title title="Edit Employee"/>
            {query.isLoading && <>Loading ...</>}
            {query.data?.status == 200 &&
                <><Box sx={{minHeight: 400, height: "80%", width: '60%', pt: 15, mx: "auto"}} display={'flex'}
                       flexDirection={"column"} justifyContent={"center"} alignItems={'stretch'} gap={2}>

                    <Box sx={{}} position={"relative"} display={'flex'}
                         flexDirection={"column"} justifyContent={"top"} alignItems={'center'}>
                        <img
                            src={`https://firebasestorage.googleapis.com/v0/b/knot-k6789.appspot.com/o/${encodeURIComponent(`users/${id}/cover`)}?alt=media&token=${encodeURIComponent("E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z")}`}
                            alt={"Cover"}
                            style={{width: "100%", borderRadius: "1rem", height: "80%"}}
                        />
                        <img style={{
                            position: 'absolute',
                            bottom: 0,
                            left: "calc(50% - (30% / 2) )",
                            borderRadius: "100%",
                            width: '30%',
                            zIndex: 10
                        }}
                             src={`https://firebasestorage.googleapis.com/v0/b/knot-k6789.appspot.com/o/${encodeURIComponent(`users/${id}/profile`)}?alt=media&token=${encodeURIComponent("E)H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z")}`}/>
                    </Box>

                    <TextField
                        label={"Full Name"}
                        variant={"outlined"}
                        value={values['fullName']}
                        sx={{mx: 10}}
                    />
                    <TextField
                        label={"Email Address"}
                        variant={"outlined"}
                        value={values['primaryEmail']}
                        sx={{mx: 10}}


                    />
                    <TextField
                        label={"Phone Number"}
                        variant={"outlined"}
                        value={values['primaryPhone']}
                        sx={{mx: 10}}

                    />
                    <TextField
                        label={"Bio"}
                        variant={"outlined"}
                        value={values['bio']}
                        sx={{mx: 10}}

                        multiline={true}
                        minRows={4}
                    />
                    <TextField
                        label={"Position"}
                        variant={"outlined"}
                        value={values.workInfo?.['position']}
                        sx={{mx: 10}}

                    />

                    <Button variant={"contained"} sx={{mx: 10, color: 'white', fontWeight: 600}}
                    >Save </Button>
                </Box></>}
        </Box>
    )
}

EditEmployeePage.route = ("/dashboard/employees/:id/edit")
EditEmployeePage.subRoute = ("/:id/edit")
EditEmployeePage.generatePath = generatePath(EditEmployeePage.route)