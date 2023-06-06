import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		defaultNS: 'main',
		ns: ['main', 'employees', 'link', 'linkSection', 'metafield'],
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		interpolation: {
			escapeValue: false,
		},
		fallbackLng: 'en',
	});
