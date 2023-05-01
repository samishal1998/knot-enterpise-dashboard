import React, { ReactElement } from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { Skeleton } from '@mui/lab';
import {useTheme} from "@mui/material/styles";
import {green} from "@mui/material/colors";

export type LoadingContentProps = {
	children;
	isLoading;
	loadingView?: ReactElement;
	loadingProps?: any;
	color?: string;
};
export type LoadingPaperProps = {
	children;
	isLoading;
	loadingProps?: any;
	color?: string;
	description?: string;
	subtle?: boolean;
};
export const LoadingContent = ({
	children,
	isLoading,
	loadingView,
	loadingProps,
	color = green[500],
}: LoadingContentProps) => {

	if (isLoading)
		return (
			loadingView ?? (
				<>
					{' '}
					<CircularProgress sx={{ color }} size={'1.5em'} {...(loadingProps ?? {})} /> Loading{' '}
				</>
			)
		);
	else return children;
};
export const LoadingPaper = ({ children, isLoading, loadingProps, description, subtle = true }: LoadingPaperProps) => {
	return (
		<LoadingContent
			isLoading={isLoading}
			loadingView={
				subtle ? (
					<CircularProgress {...(loadingProps ?? {})} />
				) : (
					<div className={'flex justify-center items-center h-screen p-5 bg-green-50'}>
						<Paper
							className={'flex flex-col gap-5 justify-center items-center w-full max-w-lg h-full py-6'}
							elevation={3}>
							<CircularProgress size={'5rem'} {...(loadingProps ?? {})} />
							{Boolean(description) && <Typography variant={'h6'}>{description}</Typography>}
						</Paper>
					</div>
				)
			}>
			{children}
		</LoadingContent>
	);
};
