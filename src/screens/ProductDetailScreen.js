import React from 'react';
import {
	Alert,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function ProductDetailScreen({ route, navigation }) {
	const { product } = route.params;
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart(product));
		Alert.alert('Added', 'Product added to cart.');
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Image source={{ uri: product.thumbnail }} style={styles.image} />

			<Text style={styles.title}>{product.title}</Text>
			<Text style={styles.description}>{product.description}</Text>

			<View style={styles.row}>
				<Text style={styles.label}>Price:</Text>
				<Text style={styles.value}>${product.price}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Rating:</Text>
				<Text style={styles.value}>{product.rating}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Stock:</Text>
				<Text style={styles.value}>{product.stock}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Brand:</Text>
				<Text style={styles.value}>{product.brand || 'N/A'}</Text>
			</View>
			<View style={styles.row}>
				<Text style={styles.label}>Category:</Text>
				<Text style={styles.value}>{product.category}</Text>
			</View>

			<Pressable style={styles.cartButton} onPress={handleAddToCart}>
				<Text style={styles.cartButtonText}>Add to Cart</Text>
			</Pressable>

			<Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Cart')}>
				<Text style={styles.secondaryButtonText}>Go to Cart</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9fafb',
		padding: 16,
	},
	image: {
		borderRadius: 12,
		height: 240,
		marginBottom: 16,
		width: '100%',
	},
	title: {
		color: '#111827',
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 8,
	},
	description: {
		color: '#374151',
		fontSize: 15,
		lineHeight: 22,
		marginBottom: 14,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	label: {
		color: '#6b7280',
		fontWeight: '600',
	},
	value: {
		color: '#111827',
		fontWeight: '500',
	},
	cartButton: {
		alignItems: 'center',
		backgroundColor: '#111827',
		borderRadius: 10,
		marginTop: 20,
		paddingVertical: 12,
	},
	cartButtonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '700',
	},
	secondaryButton: {
		alignItems: 'center',
		borderColor: '#111827',
		borderRadius: 10,
		borderWidth: 1,
		marginTop: 10,
		paddingVertical: 12,
	},
	secondaryButtonText: {
		color: '#111827',
		fontSize: 15,
		fontWeight: '600',
	},
});

export default ProductDetailScreen;
