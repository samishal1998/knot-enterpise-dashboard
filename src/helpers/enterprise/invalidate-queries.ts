import {getUsersFindOneByFirebaseUidQueryKey} from "../../api/users/users";
import {QueryClient} from "@tanstack/react-query";
import {fireAuth} from "@utils/firebase";

export  async function invalidateFindOneByFireUidQuery(queryClient: QueryClient){
    const queryKey = getUsersFindOneByFirebaseUidQueryKey(fireAuth.currentUser?.uid ?? "",{include:JSON.stringify(
            {
                enterpriseAccess:{
                    include:{enterprise:true},
                }
            }
        )})
    console.log(`invalidating :: ${queryKey}`)
    console.log({queryKey})
    return queryClient.invalidateQueries(queryKey)
}
export  async function invalidateUseCurrentUserHookQuery(queryClient: QueryClient){
    const queryKey = ['useCurrentUserHook']
    // queryClient.refetchQueries({queryKey})
    return queryClient.invalidateQueries(queryKey)
}