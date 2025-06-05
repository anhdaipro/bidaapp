import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLogin } from '@hook/query/useUser';
import { useAuthStore } from '../store/useUserStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: login, isPending } = useLogin();

//   useEffect(() => {
//     if (user) {
//       navigation.replace('AppNavigator'); // hoặc navigation.navigate('Home')
//     }
//   }, [user]);

  const handleSubmit = () => {
    login({ identifier, password }, {
      onSuccess:async  (data:any) => {
        setUser(data.user);
        await AsyncStorage.setItem('token', data.accessToken);
        await AsyncStorage.setItem('refreshToken', data.refreshToken);
        navigation.replace('AppNavigator');
      },
      onError: (err: any) => {
        Alert.alert('Lỗi đăng nhập', err?.message || 'Thông tin đăng nhập không hợp lệ');
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập hoặc SĐT"
        value={identifier}
        onChangeText={setIdentifier}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="username"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoComplete="password"
      />

      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text style={styles.buttonText}>
          {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
