import {LoadingPaper} from '@components/LoadingContent';
import {AccountTabs} from '@components/account/account-tabs';
import {bindFileInputElement, useFileInput} from '@components/forms/fields';
import {FileImage} from '@components/forms/file-image';
import {GuardType, useGuard} from '@hooks/useUser';
import {Button, CircularProgress, IconButton, TextField} from '@mui/material';
import {green, red} from '@mui/material/colors';
import {FormikHelpers, useFormik} from 'formik';
import moment from 'moment/min/moment-with-locales';
import {Helmet} from 'react-helmet';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import {BasePageType, generatePath} from "@components/base-page.type";
import {useSnackbar} from "react-mui-snackbar-helper";
import {getPublicImageUrlFromPath, putFileInFireStorage} from "@utils/firebase/storage-helpers";
import {Check as CheckIcon, Cancel as CancelIcon,} from "@mui/icons-material"
import {enterprisesUpdate} from "../../../api/enterprises/enterprises";

let validationSchema = (t) => {
    return yup.object().shape({
        fullName: yup.string().required().label(t('fullName')),
        //firstName: yup.string().required().label(t('firstName')),
        // lastName: yup.string().required().label(t('lastName')),
        // birthday: yup.date().required().label(t('birthday')),
    });
};

export const ManageProfilePage: BasePageType = () => {
    const {shouldRender, user, fireUser} = useGuard({guardType: GuardType.USER_ONLY});
    const navigate = useNavigate();
    const {t, i18n} = useTranslation(['main']);
    const {showErrorMessage, showSuccessMessage} = useSnackbar();
    const fileInputData = useFileInput({single: true, mimeType: 'images/*'});
    const [uploadingImage, setUploadingImage] = useState(false);

    const handleSetProfileImage = useCallback(async () => {
        try {
            if (user) {
                setUploadingImage(true);
                await setProfileImage(user?.id, fileInputData.selectedFiles[0]);
                showSuccessMessage(t('submittedRequestSuccessfully'));

                fileInputData.clear();
            } else throw 'Error';
        } catch (e) {
            showErrorMessage(t('failedToSubmitRequest'));
        } finally {
            setUploadingImage(false);
        }
    }, [user, t, showErrorMessage, showSuccessMessage, setUploadingImage]);

    const onSubmit = useCallback(
        async (values, helpers: FormikHelpers<any>) => {
            // console.log({ values }, values.firstName, values.lastName, Timestamp.fromDate(values.birthday.toDate()));
            try {
                if (user?.enterpriseAccess?.enterpriseId) {
                    await enterprisesUpdate(user.enterpriseAccess.enterpriseId, {
                      fullName:values['fullName']
                    });
                    showSuccessMessage(t('submittedRequestSuccessfully'));
                } else throw 'Error';
            } catch (e) {
                showErrorMessage(t('failedToSubmitRequest'));
            } finally {
                helpers.setSubmitting(false);
                // helpers.resetForm({})
            }
        },
        [user, t, showErrorMessage, showSuccessMessage],
    );
    let initialValues = useMemo(
        () => ({
            fullName: user?.fullName ?? ' ',
            // firstName: user?.firstName ?? ' ',
            // lastName: user?.lastName ?? ' ',
            // birthday: moment(user?.birthday ?? new Date()),
        }),
        [user],
    );
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        submitCount,
        setSubmitting,
        isSubmitting,
        handleSubmit,
    } = useFormik<any>({
        initialValues,
        enableReinitialize: true,
        onSubmit,

        validationSchema: validationSchema(t),
    });

    let submitted = useMemo(() => submitCount >= 1, [submitCount]);

    const shouldAllowSubmit = useCallback(() => {
        let output =
            values.fullName.trim() !== user?.fullName
            // || moment(user?.birthday ?? undefined).toDate()?.getTime() !== values.birthday.toDate().getTime();

        return output;
    }, []);



    return (<>
            <Helmet>
                <title>
                    {t('manageProfile')} | {t('Knot')}
                </title>
            </Helmet>
            <LoadingPaper isLoading={!shouldRender}>

                <div className={'grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-3 mt-10'}>
                    <div
                        className={
                            'col-span-1 border rounded-xl py-5 md:pb-10 flex flex-col items-center justify-center'
                        }>
                        {
                            <div
                                className={'w-full px-5 flex flex-row justify-between'}
                                style={{visibility: fileInputData.selectedFiles[0] ? 'visible' : 'hidden'}}>
                                <IconButton onClickCapture={handleSetProfileImage} disabled={uploadingImage}>
                                    <CheckIcon sx={{color: green[400]}}/>
                                </IconButton>
                                {uploadingImage && <CircularProgress/>}
                                <IconButton onClick={fileInputData.clear} disabled={uploadingImage}>
                                    <CancelIcon sx={{color: red[400]}}/>
                                </IconButton>
                            </div>
                        }
                        {Boolean(user) && (
                            <FileImage
                                className={
                                    'rounded-full object-cover border-4 border-green-600 hover:border-green-700 hover:border-8'
                                }
                                source={
                                    fileInputData.selectedFiles[0] ??
                                    getPublicImageUrlFromPath(`profiles/${user?.id}/image`)
                                }
                                style={{
                                    width: 'clamp(12rem,25vw,15rem)',
                                    height: 'clamp(12rem,25vw,15rem)',
                                    marginBottom: '3rem',
                                }}
                            />
                        )}
                        <input {...bindFileInputElement(fileInputData)} />
                        <Button variant={'text'} onClickCapture={fileInputData.openInput} disabled={uploadingImage}>
                            {t('changeProfilePicture')}
                        </Button>
                    </div>
                    <div
                        className={
                            'col-span-1 md:col-span-2 grid gap-x-4 gap-y-2 grid-cols-1 md:grid-cols-2 py-5 mb-auto md:mt-5 h-full auto-rows-min'
                        }>
                        <TextField
                            name="fullName"
                            variant={'outlined'}
                            label={t('companyName')}
                            onChange={handleChange('fullName')}
                            onBlur={handleBlur('fullName')}
                            required={true}
                            error={Boolean((touched['fullName'] || submitted) && errors['fullName'])}
                            helperText={
                                (((touched['fullName'] || submitted) && errors['fullName']) as string) || ' '
                            }
                            fullWidth
                            className={'col-span-1'}
                            value={values['fullName']}
                        />

                        <div className={'col-span-full flex flex-row justify-end pt-5 md:mt-28'}>
                            <Button
                                className={'w-full md:w-2/12'}
                                type={'submit'}
                                disabled={isSubmitting || !shouldAllowSubmit()}
                                onClick={() => handleSubmit()}
                                variant={'contained'}>
                                {t('submit')}
                            </Button>
                        </div>
                    </div>
                </div>
            </LoadingPaper>
        </>

    );
};
ManageProfilePage.route = '/dashboard/account/manage-profile';
ManageProfilePage.subRoute = '/manage-profile';
ManageProfilePage.generatePath = generatePath(ManageProfilePage.route);
export default ManageProfilePage;


async function setProfileImage(id, image: File | Blob) {
    try {
        await putFileInFireStorage(image, `/profiles/${id}/image`); // TODO!!!
    } catch (e) {
        throw e;
    }
}

