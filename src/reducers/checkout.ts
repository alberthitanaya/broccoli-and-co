import { CheckoutAction, CheckoutActions, Movie } from "../model";
import createReducer from "./createReducer";

export const checkout = createReducer<Movie[]>([], {
	[CheckoutActions.ADD_TO_CHECKOUT](
		state: Movie[][],
		action: CheckoutAction
	) {
		return [...state, action.payload];
	},

	// 	[TodoActions.UNCOMPLETE_TODO](state: Todo[], action: TodoAction) {
	// 		// search after todo item with the given id and set completed to false
	// 		return state.map((t) =>
	// 			t.id === action.payload ? { ...t, completed: false } : t
	// 		);
	// 	},
	[CheckoutActions.CLEAR_CHECKOUT](state: Movie[][], action: CheckoutAction) {
		// remove all todos with the given id
		return [];
	},
});
