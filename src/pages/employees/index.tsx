import {useUsersFindAll} from "../../api/users/users";
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import React, {useEffect, useState} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import {amber, green, red} from "@mui/material/colors";
import {DrawerPage, generatePath} from "@components/base-page.type";
import BadgeIcon from "@mui/icons-material/Badge";
import {useGuard} from "@hooks/useUser";
import AuthPage, {AuthPageOptions} from "@pages/auth";
import {useLayout, useLayoutTitleEffect} from "@components/layout/context";
import {useEnterprisesFindOne} from "../../api/enterprises/enterprises";
import {useStateLogger} from "@hooks/useStateLogger";
import {EditEmployeePage} from "@pages/employees/edit";
import {useTranslation} from "react-i18next";
import { Helmet } from 'react-helmet';
import {Title} from "@components/title";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        minWidth: 100,
        flex: 1,
    },
    {
        field: 'fullName',
        headerName: 'Full name',

        editable: true,
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'primaryEmail',
        headerName: 'Email',
        type: 'string',
        editable: true,
        valueGetter: (params: GridValueGetterParams) => params.value,
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'primaryPhone',
        headerName: 'Phone',
        type: 'string',
        editable: true,
        valueGetter: (params: GridValueGetterParams) => params.value,
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'workInfo',
        headerName: 'Position',
        type: 'string',

        editable: true,
        valueGetter: (params: GridValueGetterParams) => params.row.workInfo?.position,
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'bio',
        headerName: 'Bio',
        type: 'string',

        editable: true,
        valueGetter: (params: GridValueGetterParams) => params.value,
        minWidth: 400,
        flex: 1,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: "actions",
        minWidth: 100,
        getActions(params) {
            return (
                [
                    // <GridActionsCellItem label={"Delete"} icon={<DeleteForeverIcon sx={{color: red[300]}}/>}/>,
                    <GridActionsCellItem label={"Unlink"} icon={<LinkOffIcon sx={{color: amber[300]}}/>}/>,
                    // @ts-ignore
                    <GridActionsCellItem label={"Edit"} href={EditEmployeePage.generatePath({id: params.id.toString()})} icon={<EditIcon sx={{color: green[300]}}/>}/>,
                ]
            )
        },
        flex: 1,
    },
];


export const EmployeesPage: DrawerPage = () => {

    const {user,} = useGuard({defaultRedirect: AuthPage.generatePath({page: AuthPageOptions.SIGN_IN})})
    const query = useEnterprisesFindOne(user?.enterpriseAccess?.enterpriseId ?? "", {include: '{"all":true}'}, {query: {enabled: !!user?.enterpriseAccess?.enterpriseId}})

    const {t} = useTranslation(['main'])




    return (


        <>
            <Title labelKey={EmployeesPage.labelKey ?? EmployeesPage.fallbackLabel ?? ""}/>

            {query.isLoading && <>Loading ...</>}
            {Array.isArray((query?.data?.data as any)?.employees) &&
                <><Box sx={{minHeight: 400, height: "80%", width: '100%', pt: 10}}>
                    <DataGrid
                        rows={(query?.data?.data as any)?.employees as any}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 20,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
                        // checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box></>}
        </>
    )
}

EmployeesPage.icon = <BadgeIcon/>
EmployeesPage.labelKey = "employees"
EmployeesPage.fallbackLabel = "Employees"

EmployeesPage.route = "/dashboard/employees"
EmployeesPage.subRoute = "/employees"
EmployeesPage.generatePath = generatePath(EmployeesPage.route)
