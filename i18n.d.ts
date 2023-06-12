import main from 'public/locales/en/main.json';
import employees from 'public/locales/en/employees.json';
import linkSection from 'public/locales/en/linkSection.json';
import link from 'public/locales/en/link.json';
import metafield from 'public/locales/en/metafield.json';
import auth from 'public/locales/en/auth.json';
import landing from 'public/locales/en/landing.json';
import qr from 'public/locales/en/qr.json';

// import the original type declarations
import 'react-i18next';

// export default i18next;
export type namespace = 'main' | 'employees' | 'link' | 'linkSection' | 'metafield' | 'auth' | 'landing'|'qr'
export declare module 'react-i18next' {
	// Extend CustomTypeOptions
	export interface CustomTypeOptions {
		// custom namespace type, if you changed it
		defaultNS: 'main';
		// ns: namespace | namespace[] | readonly namespace[];
		// custom resources type
		resources: {
			main: typeof main;
			employees: typeof employees;
			link: typeof link;
			linkSection: typeof linkSection;
			metafield: typeof metafield;
			auth: typeof auth;
			landing: typeof landing;
			qr: typeof qr;
		};
		// other
	}
}

