import { CartAction, CartActions, Movie } from "../model";

export function addToCart(movies: Movie[]): CartAction {
	return {
		type: CartActions.ADD_TO_CART,
		payload: movies,
	};
}

export function clearCart(): CartAction {
	return {
		type: CartActions.CLEAR_CART,
		payload: [],
	};
}

// Async Function expample with redux-thunk
// export function completeTodo(todoId: number) {
// 	// here you could do API eg

// 	return (dispatch: Function, getState: Function) => {
// 		dispatch({ type: TodoActions.COMPLETE_TODO, payload: todoId });
// 	};
// }

// export function uncompleteTodo(todoId: number): TodoAction {
// 	return {
// 		type: TodoActions.UNCOMPLETE_TODO,
// 		payload: todoId,
// 	};
// }

// export function deleteTodo(todoId: number): TodoAction {
// 	return {
// 		type: TodoActions.DELETE_TODO,
// 		payload: todoId,
// 	};
// }
