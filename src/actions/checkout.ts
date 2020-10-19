import { CheckoutAction, CheckoutActions, Movie } from "../model";

export function addToCheckout(movies: Movie[]): CheckoutAction {
	return {
		type: CheckoutActions.ADD_TO_CHECKOUT,
		payload: movies,
	};
}

export function clearCheckout(movies: Movie[]): CheckoutAction {
	return {
		type: CheckoutActions.CLEAR_CHECKOUT,
		payload: movies,
	};
}
