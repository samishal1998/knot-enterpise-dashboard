import {GridActionsCellItem} from "@mui/x-data-grid";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {amber} from "@mui/material/colors";
import {userProductsUnlinkProduct} from "../../api/user-products/user-products";
import React, {useCallback, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useSnackbar} from "react-mui-snackbar-helper";
import {LoadingContent} from "@components/LoadingContent";

export function UnlinkProductActionCell({row}) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false)
    const {showSuccessMessage, showErrorMessage} = useSnackbar()
    const handleUnlink = useCallback(async () => {
        setLoading(true)
        try {
            await userProductsUnlinkProduct(row?.ownerID, {productUuid: row.id})
            await queryClient.invalidateQueries({queryKey: [`/enterprises/${row.enterpriseId}`]})
            showSuccessMessage("Success")
        } catch (e) {
            showErrorMessage("Error")

        } finally {
            setLoading(false)
        }


    }, [])
    return <>
        <LoadingContent
            isLoading={loading}>
            <GridActionsCellItem label={"Unlink"} icon={<LinkOffIcon sx={{color: amber[300]}}/>}
                                 onClick={handleUnlink}/>


        </LoadingContent>


    </>
}