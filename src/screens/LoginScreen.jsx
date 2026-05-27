import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { EMAIL_REGEX } from '../constants/validationPatterns';
import styles from './LoginScreen.styles';

export function getLoginValidationErrors(email, password) {
	const nextErrors = { email: '', password: '' };

	if (!email.trim()) {
		nextErrors.email = 'Email is required.';
	} else if (!EMAIL_REGEX.test(email.trim())) {
		nextErrors.email = 'Please enter a valid email address.';
	}

	if (!password.trim()) {
		nextErrors.password = 'Password is required.';
	}

	return nextErrors;
}

function LoginScreen({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '' });

	const handleLogin = async () => {
		const nextErrors = getLoginValidationErrors(email, password);
		setErrors(nextErrors);

		if (nextErrors.email || nextErrors.password) {
			return;
		}

		try {
			await onLogin({ email: email.trim(), password: password.trim() });
		} catch (error) {
			Alert.alert('Login Failed', 'Unable to login right now. Please try again.');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={styles.root}
		>
			<View style={styles.card}>
				<Text style={styles.title}>Welcome Back</Text>
				<Text style={styles.subtitle}>Login to continue shopping</Text>

				<TextInput
					autoCapitalize="none"
					keyboardType="email-address"
					onChangeText={setEmail}
					placeholder="Email"
					style={styles.input}
					value={email}
				/>
				{!!errors.email && <Text style={styles.error}>{errors.email}</Text>}

				<TextInput
					onChangeText={setPassword}
					placeholder="Password"
					secureTextEntry
					style={styles.input}
					value={password}
				/>
				{!!errors.password && <Text style={styles.error}>{errors.password}</Text>}

				<Pressable style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	);
}

export default LoginScreen;
