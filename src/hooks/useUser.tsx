import React, { useCallback, useDebugValue, useEffect, useState } from 'react';

import { useFirebaseUser } from '@hooks/useFirebaseUser';

import { useTranslation } from 'react-i18next';
import AuthPage, { AuthPageOptions } from '../pages/auth';
import { User } from '../api/models';
import { useSnackbar } from 'react-mui-snackbar-helper';
import { useNavigate } from 'react-router-dom';
import {
	getUsersFindOneByFirebaseUidQueryKey,
	usersFindOneByFirebaseUid,
	usersFindOneIncludeAllByFirebaseUid,
	useUsersFindOneByFirebaseUid,
	useUsersFindOneIncludeAllByFirebaseUid,
} from '../api/users/users';
import { fireAuth } from '@utils/firebase';
import Axios from 'axios';

export const useCurrentUser = () => {
	const [user, setUser] = useState<User | null>();
	const [fetchCompleted, setFetchCompleted] = useState<boolean>(false);
	useDebugValue({ user, fetchCompleted });
	const { fireUser, authCompleted } = useFirebaseUser();

	const query = useUsersFindOneByFirebaseUid(
		fireUser?.uid ?? '',
		{
			include: JSON.stringify({
				enterpriseAccess: {
					include: { enterprise: true },
				},
			}),
		},
		{
			query: {
				enabled: !!fireUser?.uid,
				onError: () => {
					setUser(null);
				},
				onSuccess: (data) => {
					setUser(data.data as any);
				},
				onSettled: (data) => {
					setFetchCompleted(true);
				},
				queryKey: ['useCurrentUserHook'],
				// queryFn: ({ signal }) => usersFindOneIncludeAllByFirebaseUid(fireAuth.currentUser?.uid ?? "", { signal, })
			},
		},
	);
	useEffect(() => {
		if (fireUser) {
			// fireUser.getIdToken().then((token) => {
			// 	if (token) {
			// 		setToken(token);
			// 		Axios.defaults.headers.Authorization = `Bearer ${token}`;
			// 	}
			// });
		} else if (authCompleted && !fireUser) {
			setUser(undefined);
			setFetchCompleted(true);
		}
	}, [authCompleted]);

	return { user, fireUser, authCompleted, fetchCompleted, query };
};

export enum GuardType {
	CUSTOMER_ONLY,
	SUPPLIER_ONLY,
	DISTRIBUTOR_ONLY,
	USER_ONLY,
	GUEST_ONLY,
}

export const useGuard = (
	{ guardType = GuardType.USER_ONLY, defaultRedirect = '/' }: { guardType?: GuardType; defaultRedirect?: string },
	preventRendering = true,
) => {
	const { user, fireUser, authCompleted, fetchCompleted } = useCurrentUser();
	const { showWarningMessage } = useSnackbar();
	const { t } = useTranslation('main');
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(true);

	const userOnlyGuard = useCallback(() => {
		if (fetchCompleted && !user) {
			if (fireUser) {
				showWarningMessage(t('guard/missingUserData'));
				navigate(AuthPage.generatePath({ page: AuthPageOptions.COMPLETE_SIGN_UP }));
				return false;
			}
			showWarningMessage(t('guard/adminOnly'));
			navigate(defaultRedirect);
			return false;
		}
		return fetchCompleted;
	}, [fetchCompleted, user, fireUser, showWarningMessage, defaultRedirect, t]);

	useEffect(() => {
		switch (guardType) {
			case GuardType.SUPPLIER_ONLY:
				if (userOnlyGuard()) {
					if ((user?.userType as any) !== 'SUPPLIER') {
						//TODO!!!!!
						showWarningMessage(t('guard/supplierOnly'));
						navigate(-1);
					} else {
						setLoading(false);
					}
				}
				break;
			case GuardType.CUSTOMER_ONLY:
			case GuardType.USER_ONLY:
				setLoading(!userOnlyGuard());
				break;
			case GuardType.GUEST_ONLY:
				if (fetchCompleted && user) {
					navigate(defaultRedirect);
				} else {
					setLoading(!fetchCompleted);
				}

				break;
		}
	}, [user, fireUser, authCompleted, fetchCompleted]);

	return { shouldRender: !(preventRendering && loading), user, fireUser, authCompleted, fetchCompleted };
};
