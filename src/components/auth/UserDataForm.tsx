import React, { useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import capitalize from '@mui/utils/capitalize';
import { FormikConfig, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { Link, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import moment from 'moment';

export type UserDataFormik = {
	firstName: string;
	lastName: string;
	email: string;
	birthday: Date;
};
export type UserDataFormProps = { userCreateCallback: FormikConfig<UserDataFormik>['onSubmit']; email?: string };
export const UserDataForm = ({ userCreateCallback, email = '' }: UserDataFormProps) => {
	const { t } = useTranslation(['main']);

	const validationSchema = useMemo(
		() =>
			yup.object({
				firstName: yup.string().required(),
				lastName: yup.string().required(),
				birthday: yup.date().required(),
				email: yup.string().email().notRequired(),
			}),
		[t],
	);

	const { values, errors, submitCount, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
		onSubmit: userCreateCallback,
		initialValues: {
			firstName: '',
			lastName: '',
			email,
			birthday: moment().subtract('16', 'years').toDate(),
		},
		validationSchema,
	});

	return (
		<>
			<form autoComplete="on" className={'flex flex-col gap-2'}>
				{[{ name: 'firstName' }, { name: 'lastName' }, { name: 'email', required: false }].map(
					({
						name,
						label,
						labelKey,
						Component = TextField,
						required = true,
					}: {
						name;
						label?;
						labelKey?;
						Component?;
						required?: boolean;
					}) => (
						<Component
							key={name}
							name={name}
							id={name}
							variant={'outlined'}
							value={values[name]}
							label={label || t(labelKey || name)}
							error={Boolean(submitCount && errors[name])}
							helperText={submitCount && errors[name] ? errors[name] : ' '}
							onChange={handleChange(name)}
							onBlur={handleBlur(name)}
							required={required}
						/>
					),
				)}

				<LoadingButton
					variant={'contained'}
					loading={isSubmitting}
					disabled={isSubmitting}
					onClick={() => handleSubmit()}>
					{t('completeSignUp.submit')}
				</LoadingButton>
			</form>
		</>
	);
};

export default UserDataForm;
