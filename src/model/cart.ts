export interface Movie {
	imdbID: string;
	Poster: string;
	Title: string;
	Year: string;
	Type: string;
}

export enum CartActions {
	ADD_TO_CART = "ADD_TO_CART",
	CLEAR_CART = "CLEAR_CART",
}

interface CartActionType<T, P> {
	type: T;
	payload: P;
}

export type CartAction =
	| CartActionType<typeof CartActions.ADD_TO_CART, Movie[]>
	| CartActionType<typeof CartActions.CLEAR_CART, Movie[]>;
// | CartActionType<typeof CartActions.DELETE_FROM_CART, number>
// | CartActionType<typeof CartActions.CHECKOUT_CART, number>;
