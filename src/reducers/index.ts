import { History } from "history";
import { combineReducers } from "redux";
import { Movie, Todo } from "../model";
import * as cartReducer from "./cart";
import * as checkoutReducer from "./checkout";
import * as todoReducer from "./todo";

export interface RootState {
	todoList: Todo[];
	cart: Movie[];
	checkout: Movie[][];
}

export default (history: History) =>
	combineReducers({
		...todoReducer,
		...checkoutReducer,
		...cartReducer,
	});
