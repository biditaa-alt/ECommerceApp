import React from 'react';
import {
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	decrementQuantity,
	incrementQuantity,
	removeFromCart,
	selectCartItems,
	selectCartTotal,
} from '../redux/cartSlice';

function CartScreen() {
	const dispatch = useDispatch();
	const items = useSelector(selectCartItems);
	const total = useSelector(selectCartTotal);

	if (!items.length) {
		return (
			<View style={styles.emptyContainer}>
				<Text style={styles.emptyText}>Your cart is empty</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.listContent}
				data={items}
				keyExtractor={item => String(item.id)}
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Image source={{ uri: item.thumbnail }} style={styles.image} />
						<View style={styles.content}>
							<Text style={styles.title} numberOfLines={2}>
								{item.title}
							</Text>
							<Text style={styles.price}>${item.price}</Text>
							<View style={styles.qtyRow}>
								<Pressable
									onPress={() => dispatch(decrementQuantity(item.id))}
									style={styles.qtyButton}
								>
									<Text style={styles.qtyButtonText}>-</Text>
								</Pressable>
								<Text style={styles.qtyText}>{item.quantity}</Text>
								<Pressable
									onPress={() => dispatch(incrementQuantity(item.id))}
									style={styles.qtyButton}
								>
									<Text style={styles.qtyButtonText}>+</Text>
								</Pressable>

								<Pressable
									onPress={() => dispatch(removeFromCart(item.id))}
									style={styles.removeButton}
								>
									<Text style={styles.removeButtonText}>Remove</Text>
								</Pressable>
							</View>
						</View>
					</View>
				)}
			/>

			<View style={styles.footer}>
				<Text style={styles.totalLabel}>Total</Text>
				<Text style={styles.totalValue}>${total.toFixed(2)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f3f4f6',
		flex: 1,
		padding: 12,
	},
	listContent: {
		paddingBottom: 90,
	},
	card: {
		backgroundColor: '#ffffff',
		borderRadius: 12,
		flexDirection: 'row',
		marginBottom: 12,
		overflow: 'hidden',
	},
	image: {
		height: 110,
		width: 100,
	},
	content: {
		flex: 1,
		padding: 10,
	},
	title: {
		color: '#111827',
		fontSize: 15,
		fontWeight: '600',
	},
	price: {
		color: '#374151',
		marginTop: 6,
	},
	qtyRow: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
	},
	qtyButton: {
		alignItems: 'center',
		backgroundColor: '#e5e7eb',
		borderRadius: 6,
		height: 28,
		justifyContent: 'center',
		width: 28,
	},
	qtyButtonText: {
		color: '#111827',
		fontSize: 18,
		fontWeight: '600',
	},
	qtyText: {
		color: '#111827',
		fontWeight: '600',
		marginHorizontal: 12,
		minWidth: 20,
		textAlign: 'center',
	},
	removeButton: {
		marginLeft: 'auto',
	},
	removeButtonText: {
		color: '#dc2626',
		fontWeight: '600',
	},
	footer: {
		alignItems: 'center',
		backgroundColor: '#111827',
		borderRadius: 10,
		bottom: 14,
		flexDirection: 'row',
		justifyContent: 'space-between',
		left: 12,
		paddingHorizontal: 16,
		paddingVertical: 14,
		position: 'absolute',
		right: 12,
	},
	totalLabel: {
		color: '#d1d5db',
		fontSize: 14,
		fontWeight: '500',
	},
	totalValue: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '700',
	},
	emptyContainer: {
		alignItems: 'center',
		backgroundColor: '#f3f4f6',
		flex: 1,
		justifyContent: 'center',
	},
	emptyText: {
		color: '#4b5563',
		fontSize: 16,
	},
});

export default CartScreen;
