import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './ProductListScreen';
import FormScreen from './FormScreen';
import CreateScreen from './CreateScreen';
import UpdateScreen from './UpdateScreen';
const Stack = createNativeStackNavigator();
const ProductsScreen = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Index" component={ProductListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductCreate" component={CreateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductUpdate" component={UpdateScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
};

export default ProductsScreen;