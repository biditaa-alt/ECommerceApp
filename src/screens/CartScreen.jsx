import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	decrementQuantity,
	incrementQuantity,
	removeFromCart,
	selectCartItems,
	selectCartTotal,
} from '../redux/cartSlice';
import styles from './CartScreen.styles';

function EmptyCartState() {
	return (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Your cart is empty</Text>
		</View>
	);
}

function CartFooter({ total }) {
	return (
		<View style={styles.footer}>
			<Text style={styles.totalLabel}>Total</Text>
			<Text style={styles.totalValue}>${total.toFixed(2)}</Text>
		</View>
	);
}

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
	return (
		<View style={styles.card}>
			<Image source={{ uri: item.thumbnail }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{item.title}
				</Text>
				<Text style={styles.price}>${item.price}</Text>
				<View style={styles.qtyRow}>
					<Pressable onPress={onDecrement} style={styles.qtyButton}>
						<Text style={styles.qtyButtonText}>-</Text>
					</Pressable>
					<Text style={styles.qtyText}>{item.quantity}</Text>
					<Pressable onPress={onIncrement} style={styles.qtyButton}>
						<Text style={styles.qtyButtonText}>+</Text>
					</Pressable>
					<Pressable onPress={onRemove} style={styles.removeButton}>
						<Text style={styles.removeButtonText}>Remove</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const createQuantityHandler = (dispatch, actionCreator) => id => () =>
	dispatch(actionCreator(id));

const createCartItemRenderer = ({ onIncrement, onDecrement, onRemove }) => ({ item }) => (
	<CartItem
		item={item}
		onDecrement={onDecrement(item.id)}
		onIncrement={onIncrement(item.id)}
		onRemove={onRemove(item.id)}
	/>
);

function CartScreen() {
	const dispatch = useDispatch();
	const items = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);

	const handleIncrement = createQuantityHandler(dispatch, incrementQuantity);
	const handleDecrement = createQuantityHandler(dispatch, decrementQuantity);
	const handleRemove = createQuantityHandler(dispatch, removeFromCart);

	const renderItem = createCartItemRenderer({
		onIncrement: handleIncrement,
		onDecrement: handleDecrement,
		onRemove: handleRemove,
	});

	if (!items.length) {
		return <EmptyCartState />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.listContent}
				data={items}
				keyExtractor={item => String(item.id)}
				renderItem={renderItem}
			/>
			<CartFooter total={total} />
		</View>
	);
}

export default CartScreen;
