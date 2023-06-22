import React from 'react';

export type BasePageType<T = {}> = (React.FC | typeof React.Component) & {
	route: string;
	generatePath: (params?: Partial<T>) => string;
};

export type DrawerListItem<T = {}> = {
	icon: React.ReactNode;
	labelKey?: string;
	fallbackLabel?: string;
} & (
	| ({
			type?: 'page';
	  } & BasePageType<T>)
	| { type: 'action'; action: Function }
	| { type: 'href'; href: string }
);

export type DrawerPage<T = {}> = Extract<DrawerListItem<T>, { type?: 'page' }>;
export const generatePath =
	<T>(route) =>
	(params?: Partial<T>) => {
		let output = route;
		Object.entries(params ?? {}).forEach(([k, v]) => {
			output = output.replace(new RegExp(`:${k}[\?]*`), v);
		});
		return output;
	};
