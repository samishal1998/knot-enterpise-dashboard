import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import * as queryString from 'querystring';

export const Reset = ({ resetCallback }) => {
	let [emailError, setEmailError] = useState(null);
	let [passError, setPassError] = useState(null);
	let [confirmPassError, setConfirmPassError] = useState(null);
	let [loading, setLoading] = useState(null);

	const handleReset = (e) => {
		e.preventDefault();
	};

	const handleUpdatePass = (e) => {
		e.preventDefault();
	};

	const queryStr = queryString.parse(location.search);

	if (queryStr.token) {
		return (
			<>
				<form autoComplete="on" onSubmit={handleUpdatePass}>
					<input
						type="password"
						id="password"
						name="password"
						className="mq-form-control"
						placeholder="New Password"
						required
					/>
					{passError ? <div className="form-error">{passError}</div> : <></>}
					<input
						type="password"
						id="confirmpass"
						name="confirmpass"
						className="inputPassword mq-form-control"
						placeholder="Confirm New Password"
						required
					/>
					{confirmPassError ? <div className="form-error">{confirmPassError}</div> : <></>}

					<button
						type="submit"
						className={'btn btn-lg btn-primary btn-block fl_btn ' + (loading ? 'ld-btn' : '')}>
						{loading ? (
							<>
								{/*// @ts-ignore*/}

								<FontAwesomeIcon icon={faCircleNotch} spin={true} /> loading
							</>
						) : (
							'Update Password'
						)}
					</button>
				</form>
			</>
		);
	}

	return (
		<>
			<form autoComplete="on" onSubmit={handleReset}>
				<input
					type="email"
					id="email"
					name="email"
					className="inputEmail mq-form-control"
					placeholder="Email address"
					required
				/>
				<button
					type="submit"
					className={'btn btn-lg btn-primary btn-block fl_btn ' + (loading ? 'ld-btn' : '')}>
					{loading ? (
						<>
							{/*// @ts-ignore*/}

							<FontAwesomeIcon icon={faCircleNotch} spin={true} /> loading
						</>
					) : (
						'Reset'
					)}
				</button>
				<h2 className="fl_a mt-3 mb-0 font-weight-normal">
					Don’t have an account?{' '}
					<a href={'/signup'} className="a2">
						Sign up
					</a>
				</h2>
			</form>
		</>
	);
};
