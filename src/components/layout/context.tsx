import { createContext, createRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useStateLogger } from '@hooks/useStateLogger';
import * as React from 'react';

const LayoutContext = createContext<LayoutContextType>({
	closeDrawer() {
		throw 'Context Uninitialised';
	},
	openDrawer() {
		throw 'Context Uninitialised';
	},
	open: false,
	setTitle() {
		throw 'Context Uninitialised';
	},
});
export type LayoutContextType = {
	title?: string;
	setTitle: Dispatch<SetStateAction<string | undefined>>;
	open: boolean;
	openDrawer: () => void;
	closeDrawer: () => void;
};

const LayoutProvider = ({ defaultOpen = false, children }) => {
	const [title, setTitle] = useState<string>();
	const [open, setOpen] = React.useState(defaultOpen);

	const openDrawer = () => {
		setOpen(true);
	};
	const closeDrawer = () => {
		setOpen(false);
	};
	return (
		<LayoutContext.Provider value={{ title, setTitle, open, openDrawer, closeDrawer }}>
			{children}
		</LayoutContext.Provider>
	);
};

function useLayout() {
	const context = React.useContext(LayoutContext);
	if (!context) {
		throw new Error(`Layout cannot be used outside the LayoutContext`);
	}
	return context;
}

function useLayoutTitleEffect(title) {
	const { setTitle } = useLayout();
	useEffect(() => {
		setTitle(title);
	}, []);
}

export default LayoutProvider;
export { useLayout, LayoutProvider, useLayoutTitleEffect };
export const LayoutConsumer = LayoutContext.Consumer;
