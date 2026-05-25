import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const product = action.payload;
			const existing = state.items.find(item => item.id === product.id);

			if (existing) {
				existing.quantity += 1;
			} else {
				state.items.push({
					id: product.id,
					title: product.title,
					price: product.price,
					thumbnail: product.thumbnail,
					quantity: 1,
				});
			}
		},
		incrementQuantity: (state, action) => {
			const existing = state.items.find(item => item.id === action.payload);
			if (existing) {
				existing.quantity += 1;
			}
		},
		decrementQuantity: (state, action) => {
			const existing = state.items.find(item => item.id === action.payload);
			if (existing && existing.quantity > 1) {
				existing.quantity -= 1;
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		clearCart: state => {
			state.items = [];
		},
	},
});

export const {
	addToCart,
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
	clearCart,
} = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectCartCount = state =>
	state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = state =>
	state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
