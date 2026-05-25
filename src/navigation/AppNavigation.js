/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { selectCartCount } from '../redux/cartSlice';

const Stack = createNativeStackNavigator();
const AUTH_KEY = 'auth_credentials';

function HeaderActions({ onLogout, onGoToCart, cartCount }) {
	return (
		<View style={styles.headerActions}>
			<Pressable onPress={onGoToCart} style={styles.cartBadge}>
				<Text style={styles.cartBadgeText}>Cart {cartCount}</Text>
			</Pressable>
			<Pressable onPress={onLogout} style={styles.logoutButton}>
				<Text style={styles.logoutText}>Logout</Text>
			</Pressable>
		</View>
	);
}

function AppNavigation() {
	const [authLoading, setAuthLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const cartCount = useSelector(selectCartCount);

	useEffect(() => {
		const loadAuth = async () => {
			try {
				const raw = await AsyncStorage.getItem(AUTH_KEY);
				const saved = raw ? JSON.parse(raw) : null;
				if (saved?.email && saved?.password) {
					setIsAuthenticated(true);
				}
			} finally {
				setAuthLoading(false);
			}
		};

		loadAuth();
	}, []);

	const handleLogin = async credentials => {
		await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(credentials));
		setIsAuthenticated(true);
	};

	const handleLogout = async () => {
		await AsyncStorage.removeItem(AUTH_KEY);
		setIsAuthenticated(false);
	};

	if (authLoading) {
		return (
			<View style={styles.loaderContainer}>
				<ActivityIndicator size="large" color="#111827" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{!isAuthenticated ? (
					<Stack.Screen name="Login" options={{ headerShown: false }}>
						{() => <LoginScreen onLogin={handleLogin} />}
					</Stack.Screen>
				) : (
					<>
						<Stack.Screen
							name="ProductList"
							options={({ navigation }) => ({
								title: 'Products',
								headerRight: () => (
									<HeaderActions
										cartCount={cartCount}
										onGoToCart={() => navigation.navigate('Cart')}
										onLogout={handleLogout}
									/>
								),
							})}
							component={ProductListScreen}
						/>
						<Stack.Screen
							name="ProductDetail"
							component={ProductDetailScreen}
							options={({ navigation }) => ({
								title: 'Product Details',
								headerRight: () => (
									<Pressable onPress={() => navigation.navigate('Cart')}>
										<Text style={styles.detailCartText}>Cart {cartCount}</Text>
									</Pressable>
								),
							})}
						/>
						<Stack.Screen
							name="Cart"
							component={CartScreen}
							options={{ title: 'My Cart' }}
						/>
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	loaderContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	headerActions: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	cartBadge: {
		backgroundColor: '#111827',
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	cartBadgeText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '700',
	},
	logoutButton: {
		paddingHorizontal: 4,
		paddingVertical: 3,
	},
	logoutText: {
		color: '#b91c1c',
		fontSize: 13,
		fontWeight: '600',
	},
	detailCartText: {
		color: '#111827',
		fontSize: 14,
		fontWeight: '700',
	},
});

export default AppNavigation;
