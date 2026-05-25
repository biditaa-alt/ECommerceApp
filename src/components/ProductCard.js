import React from 'react';
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';

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

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#ffffff',
		borderRadius: 12,
		elevation: 2,
		marginBottom: 12,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	image: {
		height: 140,
		width: '100%',
	},
	content: {
		padding: 12,
	},
	title: {
		color: '#111827',
		fontSize: 16,
		fontWeight: '600',
		marginBottom: 8,
	},
	meta: {
		color: '#374151',
		fontSize: 14,
		marginTop: 2,
	},
});

export default ProductCard;
