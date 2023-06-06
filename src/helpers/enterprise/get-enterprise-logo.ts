import {getPublicImageUrlFromPath} from "@utils/firebase/storage-helpers";

export function getEnterpriseLogoUrl(id){
    return getPublicImageUrlFromPath(getEnterpriseLogoPath(id))

}
export function getEnterpriseLogoPath(id){
    return `enterprise/${id}/logo`
}
