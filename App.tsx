import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '@screens/LoginScreen';
import AppNavigator from '@navigation/AppNavigation';
import { navigationRef, resetToLogin } from '@navigation/RootNavigation';
import { useAuthStore } from '@store/useUserStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
const App: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const [isNavReady, setIsNavReady] = useState(false);

  useEffect(() => {
    if (user == null && isNavReady) {
      resetToLogin();
    }
  }, [user, isNavReady]);

  return (
    <QueryClientProvider client={queryClient}>
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setIsNavReady(true)}
    >
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AppNavigator" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
