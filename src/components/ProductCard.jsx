import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styles from './ProductCard.styles';

function ProductCard({ product, onPress }) {
	return (
		<Pressable style={styles.card} onPress={onPress}>
			<Image source={{ uri: product.thumbnail }} style={styles.image} />
			<View style={styles.content}>
				<Text style={styles.title} numberOfLines={2}>
					{product.title}
				</Text>
				<Text style={styles.meta}>${product.price}</Text>
				<Text style={styles.meta}>Rating: {product.rating}</Text>
			</View>
		</Pressable>
	);
}

export default ProductCard;
