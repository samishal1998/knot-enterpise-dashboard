import * as timeDelta from 'time-delta';
import * as numerous from 'numerous';

// Importing locales that you want to use
import enLocale from 'time-delta/locales/en';
import arEgLocale from 'time-delta/locales/ar_eg';
import arLocale from 'time-delta/locales/ar';

import enLocaleNumerous from 'numerous/locales/en';
import arLocaleNumerous from 'numerous/locales/ar';
timeDelta.addLocale([enLocale, arLocale]);




// Or register multiple locales at the same time
numerous.addLocale([
	enLocaleNumerous,
	arLocaleNumerous,
]);
// Creating an instance
export const TimeDelta = (locale = 'en') => {

	return timeDelta.create({
		locale, // default
		autoloadLocales:false,
	});
}
export function getDurationText(start, end, locale = 'en') {
	return TimeDelta(locale).format(start, end);
}
export function DurationToText(duration: number, locale = 'en') {
	let start = new Date();
	let end = new Date(start.getTime() + duration);
	return TimeDelta(locale).format(start, end);
}
