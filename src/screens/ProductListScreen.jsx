import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import {
	loadProducts,
	selectProductError,
	selectProductItems,
	selectProductStatus,
} from '../redux/productSlice';
import styles from './ProductListScreen.styles';

function LoadingState() {
	return (
		<View style={styles.centered}>
			<ActivityIndicator size="large" color="#111827" />
			<Text style={styles.infoText}>Loading products...</Text>
		</View>
	);
}

function ErrorState({ message, onRetry }) {
	return (
		<View style={styles.centered}>
			<Text style={styles.errorText}>{message}</Text>
			<Pressable style={styles.retryButton} onPress={onRetry}>
				<Text style={styles.retryButtonText}>Retry</Text>
			</Pressable>
		</View>
	);
}

const buildProductPressHandler = navigation => product => () =>
	navigation.navigate('ProductDetail', { product });

const buildRenderItem = onProductPress => ({ item }) => (
	<ProductCard product={item} onPress={onProductPress(item)} />
);

function ProductListScreen({ navigation }) {
	const dispatch = useDispatch();
	const products = useSelector(selectProductItems);
	const status = useSelector(selectProductStatus);
	const error = useSelector(selectProductError);
	const [search, setSearch] = useState('');

	const handleProductPress = buildProductPressHandler(navigation);
	const renderItem = buildRenderItem(handleProductPress);

	useEffect(() => {
		dispatch(loadProducts());
	}, [dispatch]);

	const filteredProducts = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) {
			return products;
		}
		return products.filter(item => item.title.toLowerCase().includes(term));
	}, [products, search]);

	if (status === 'loading') {
		return <LoadingState />;
	}

	if (status === 'failed') {
		return <ErrorState message={error} onRetry={() => dispatch(loadProducts())} />;
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
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</View>
	);
}

export default ProductListScreen;
