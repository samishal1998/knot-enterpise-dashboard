import {useUsersFindAll} from "../../api/users/users";
import Box from '@mui/material/Box';
import {DataGrid, GridActionsCellItem, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {useEffect} from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import {amber, blue, green, red} from "@mui/material/colors";
import {Title} from 'react-admin';
import {Button, IconButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {NewAnnouncementPage} from "./new-announcement";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        minWidth: 100,
        flex: .5,
    },
    {
        field: 'from',
        headerName: 'From',
        minWidth: 200,
        flex: 1,
    },
    // {
    //     field: 'receiver',
    //     headerName: 'To',
    //     minWidth: 200,
    //     flex: 1,
    // },
    {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        minWidth: 200,
        flex: 1,
    },
    {
        field: 'content',
        headerName: 'Content',
        type: 'string',
        editable: true,
        renderCell: (params) => <IconButton><ReadMoreIcon sx={{color:blue[500]}}/></IconButton>,
        minWidth: 100,
        flex: 0.25,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: "actions",
        minWidth: 100,
        getActions(params) {
            return (
                [
                    <GridActionsCellItem label={"Delete"} icon={<DeleteForeverIcon sx={{color: red[300]}}/>}/>,
                    <GridActionsCellItem label={"Edit"} icon={<EditIcon sx={{color: green[300]}}/>}/>,
                ]
            )
        },
        flex: 1,
    },
];

const rows = [
    {id:0, from: "Knot Ventures", date: new Date("2023-04-19T14:52:55.121Z")},
    {id:1, from: "Tech Department", date: new Date("2023-04-10T14:52:55.121Z")},
    {id:2, from: "HR Department", date: new Date("2023-03-20T14:52:55.121Z")},
    {id:3, from: "CEO", date: new Date("2023-03-03T14:52:55.121Z")},
    {id:4, from: "Payroll", date: new Date("2023-03-01T14:52:55.121Z")},
    {id:5, from: "Knot Ventures", date: new Date("2023-02-19T14:52:55.121Z")},
    {id:6, from: "Knot Ventures", date: new Date("2023-02-06T14:52:55.121Z")},
    {id:7, from: "Knot Ventures", date: new Date("2023-01-05T14:52:55.121Z")},
    {id:8, from: "CEO", date: new Date("2023-01-03T14:52:55.121Z")},
    {id:9, from: "HR Department", date: new Date("2023-01-02T14:52:55.121Z")},
    {id:10, from: "Knot Ventures", date: new Date("2022-12-25T14:52:55.121Z")},
    {id:11, from: "CEO", date: new Date("2022-12-25T14:52:55.121Z")},
    {id:12, from: "HR Department", date: new Date("2022-12-25T14:52:55.121Z")},
]
export const AnnouncementsPage = () => {


    return (
        <Box pt={10} px={5} height={"100%"}>
            <Title title="Announcements"/>
            <Button variant="outlined" href={"#"+NewAnnouncementPage.path()}
                    sx={{fontSize:'1.1rem',fontWeight:600, borderRadius:'1rem',borderWidth:2.5, "&:hover":{
                            borderWidth:2.5,
                        } }}
            >
                <AddIcon/> Add New Announcement
            </Button>


               <Box sx={{minHeight: 400, height: "80%", width: '100%', pt: 10}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 20,
                                },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15, 20, 25, 50, 75, 100]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
        </Box>
    )
}

AnnouncementsPage.path = (options?: any) => ("/announcements")