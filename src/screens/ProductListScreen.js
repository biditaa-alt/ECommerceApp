import React, { useEffect, useMemo, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';

function ProductListScreen({ navigation }) {
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const loadProducts = async () => {
		setLoading(true);
		setError('');

		try {
			const result = await fetchProducts();
			setProducts(result);
		} catch (apiError) {
			setError(apiError.message || 'Something went wrong while loading products.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadProducts();
	}, []);

	const filteredProducts = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) {
			return products;
		}
		return products.filter(item => item.title.toLowerCase().includes(term));
	}, [products, search]);

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#111827" />
				<Text style={styles.infoText}>Loading products...</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.centered}>
				<Text style={styles.errorText}>{error}</Text>
				<Pressable style={styles.retryButton} onPress={loadProducts}>
					<Text style={styles.retryButtonText}>Retry</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TextInput
				onChangeText={setSearch}
				placeholder="Search product by name"
				style={styles.searchInput}
				value={search}
			/>

			{filteredProducts.length === 0 ? (
				<View style={styles.centered}>
					<Text style={styles.infoText}>No products found</Text>
				</View>
			) : (
				<FlatList
					contentContainerStyle={styles.listContent}
					data={filteredProducts}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<ProductCard
							onPress={() => navigation.navigate('ProductDetail', { product: item })}
							product={item}
						/>
					)}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f3f4f6',
		flex: 1,
		padding: 12,
	},
	searchInput: {
		backgroundColor: '#ffffff',
		borderColor: '#d1d5db',
		borderRadius: 10,
		borderWidth: 1,
		marginBottom: 12,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	listContent: {
		paddingBottom: 12,
	},
	centered: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		paddingHorizontal: 24,
	},
	infoText: {
		color: '#374151',
		marginTop: 12,
	},
	errorText: {
		color: '#b91c1c',
		fontSize: 15,
		textAlign: 'center',
	},
	retryButton: {
		backgroundColor: '#111827',
		borderRadius: 8,
		marginTop: 14,
		paddingHorizontal: 18,
		paddingVertical: 10,
	},
	retryButtonText: {
		color: '#ffffff',
		fontWeight: '600',
	},
});

export default ProductListScreen;
