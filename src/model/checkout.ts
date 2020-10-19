interface Movie {
	imdbID: string;
	Poster: string;
	Title: string;
	Year: string;
	Type: string;
}

export enum CheckoutActions {
	ADD_TO_CHECKOUT = "ADD_TO_CHECKOUT",
	CLEAR_CHECKOUT = "CLEAR_CHECKOUT",
}

interface CheckoutActionType<T, P> {
	type: T;
	payload: P;
}

export type CheckoutAction =
	| CheckoutActionType<typeof CheckoutActions.ADD_TO_CHECKOUT, Movie[]>
	| CheckoutActionType<typeof CheckoutActions.CLEAR_CHECKOUT, Movie[]>;
// | CheckoutActionType<typeof CheckoutActions.DELETE_FROM_CHECKOUT, Movie[]>;
// | CartActionType<typeof CartActions.DELETE_FROM_CART, number>
// | CartActionType<typeof CartActions.CHECKOUT_CART, number>;
