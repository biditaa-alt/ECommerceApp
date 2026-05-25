import React, { useState } from 'react';
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginScreen({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '' });

	const validate = () => {
		const nextErrors = { email: '', password: '' };

		if (!email.trim()) {
			nextErrors.email = 'Email is required.';
		} else if (!emailRegex.test(email.trim())) {
			nextErrors.email = 'Please enter a valid email address.';
		}

		if (!password.trim()) {
			nextErrors.password = 'Password is required.';
		}

		setErrors(nextErrors);
		return !nextErrors.email && !nextErrors.password;
	};

	const handleLogin = async () => {
		if (!validate()) {
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

const styles = StyleSheet.create({
	root: {
		alignItems: 'center',
		backgroundColor: '#f3f4f6',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	card: {
		backgroundColor: '#ffffff',
		borderRadius: 12,
		padding: 20,
		width: '100%',
	},
	title: {
		color: '#111827',
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 8,
	},
	subtitle: {
		color: '#6b7280',
		marginBottom: 16,
	},
	input: {
		backgroundColor: '#f9fafb',
		borderColor: '#d1d5db',
		borderRadius: 8,
		borderWidth: 1,
		marginTop: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	error: {
		color: '#dc2626',
		fontSize: 12,
		marginTop: 4,
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#111827',
		borderRadius: 8,
		marginTop: 18,
		paddingVertical: 12,
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: '600',
	},
});

export default LoginScreen;
