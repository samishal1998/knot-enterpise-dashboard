import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';

export function getDistributorLogoUrl(id) {
	return getPublicImageUrlFromPath(getDistributorLogoPath(id));
}
export function getDistributorLogoPath(id) {
	return `distributor/${id}/logo`;
}
