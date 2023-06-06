import { Link } from '../../api/models';
import { getPublicImageUrlFromPath } from '@utils/firebase/storage-helpers';
import { R } from '@assets/resourses';

export type GetIconParams =
	| {
			linkType: Omit<string, 'CUSTOM'>;
	  }
	| { linkType: 'CUSTOM'; userId: string; linkId: string; link: Link };
export namespace Links {
	export function getIcon({ linkType, ...params }: GetIconParams) {
		if (linkType)
			switch (linkType) {
				case 'CUSTOM':
					const { link, userId, linkId } = params as Extract<GetIconParams, { linkType: 'CUSTOM' }>;
					if (link?.icon) return getPublicImageUrlFromPath(`users/${userId}/links/${linkId}`);
					else return R.knot_svg;
				default:
					return R[linkType.toLowerCase() + '_svg'];
			}
		else return R.knot_svg;
	}
	export const Categories = {
		CUSTOM: { links: [] },

		SOCIAL_MEDIA: {
			links: [
				'FACEBOOK',
				'WHATSAPP',
				'TELEGRAM',
				'TWITTER',
				'INSTAGRAM',
				'TIKTOK',
				'SNAPCHAT',
				'DISCORD',
				'TWITCH',
				'MESSENGER',
				'SKYPE',
				'SLACK',
				'REDDIT',
			],
		},
		BUSINESS: { links: ['AMAZON', 'LINKEDIN', 'PAYPAL', 'YELP'] },
		GET_INSPIRED: { links: ['DRIBBBLE', 'BEHANCE', 'PINTEREST', 'POCKET'] },
		MUSIC: { links: ['SPOTIFY', 'YOUTUBE', 'SOUNDCLOUD', 'ANGHAMI', 'APPLE_MUSIC', 'YOUTUBE_MUSIC'] },
	};
}
