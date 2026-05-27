import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import styles from './ProductDetailScreen.styles';

const buildGoToCart = navigation => () => navigation.navigate('Cart');

function ProductDetailScreen({ route, navigation }) {
	const { product } = route.params;
	const dispatch = useDispatch();
	const handleGoToCart = buildGoToCart(navigation);

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

			<Pressable style={styles.secondaryButton} onPress={handleGoToCart}>
				<Text style={styles.secondaryButtonText}>Go to Cart</Text>
			</Pressable>
		</ScrollView>
	);
}

export default ProductDetailScreen;
