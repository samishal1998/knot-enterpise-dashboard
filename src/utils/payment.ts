export const PAYMENT_DEFAULT_IFRAME = 760828;

export const PaymentIframes = {
	760828: {
		generateUrl({ paymentKey }) {
			return `https://accept.paymob.com/api/acceptance/iframes/760828?payment_token=${paymentKey}`;
		},
	},
	760829: {
		generateUrl({ paymentKey }) {
			return `https://accept.paymob.com/api/acceptance/iframes/760829?payment_token=${paymentKey}`;
		},
	},
};
