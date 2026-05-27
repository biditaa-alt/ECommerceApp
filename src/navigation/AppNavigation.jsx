/* eslint-disable react/no-unstable-nested-components */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductListScreen from '../screens/ProductListScreen';
import { selectCartCount } from '../redux/cartSlice';
import styles from './AppNavigation.styles';

const Stack = createNativeStackNavigator();
const AUTH_KEY = 'auth_credentials';

function AppLoader() {
	return (
		<View style={styles.loaderContainer}>
			<ActivityIndicator size="large" color="#111827" />
		</View>
	);
}

function HeaderActions({ onLogout, onGoToCart, cartCount }) {
	return (
		<View style={styles.headerActions}>
			<Pressable style={styles.cartBadge} onPress={onGoToCart}>
				<Text style={styles.cartBadgeText}>Cart {cartCount}</Text>
			</Pressable>
			<Pressable style={[styles.logoutButton, styles.headerActionSpacing]} onPress={onLogout}>
				<Text style={styles.logoutText}>Logout</Text>
			</Pressable>
		</View>
	);
}

function CartHeaderButton({ onPress, cartCount }) {
	return (
		<Pressable onPress={onPress}>
			<Text style={styles.detailCartText}>Cart {cartCount}</Text>
		</Pressable>
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
		return <AppLoader />;
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
									<CartHeaderButton
										cartCount={cartCount}
										onPress={() => navigation.navigate('Cart')}
									/>
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

export default AppNavigation;
