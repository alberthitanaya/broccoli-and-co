import { CartAction, CartActions, Movie } from "../model";
import createReducer from "./createReducer";

export const cart = createReducer<Movie[]>([], {
	[CartActions.ADD_TO_CART](state: Movie[], action: CartAction) {
		return [...state, ...action.payload];
	},
	[CartActions.CLEAR_CART](state: Movie[], action: CartAction) {
		// search after todo item with the given id and set completed to true
		return [];
	},
	// 	[TodoActions.UNCOMPLETE_TODO](state: Todo[], action: TodoAction) {
	// 		// search after todo item with the given id and set completed to false
	// 		return state.map((t) =>
	// 			t.id === action.payload ? { ...t, completed: false } : t
	// 		);
	// 	},
	// 	[TodoActions.DELETE_TODO](state: Todo[], action: TodoAction) {
	// 		// remove all todos with the given id
	// 		return state.filter((t) => t.id !== action.payload);
	// 	},
});
