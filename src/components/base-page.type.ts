export type BasePageType<T = {}> = (React.FC | React.Component) & {
	route: string;
	subRoute: string;
	generatePath: (params?: Partial<T>) => string;
};

export type DrawerPage<T={}> = BasePageType<T> & {
	icon:React.ReactNode,
	labelKey?: string,
	fallbackLabel?:string,
}
export const generatePath =
	<T>(route) =>
	(params?: Partial<T>) => {
		let output = route;
		// console.log({ output, k: Object.entries(params ?? {}) });
		Object.entries(params ?? {}).forEach(([k, v]) => {

			output = output.replace(new RegExp(`:${k}[\?]*`), v);
		});
		// console.log({ output });
		return output;
	};
