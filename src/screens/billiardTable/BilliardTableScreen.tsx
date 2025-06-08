import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BilliardTableList from './BilliardTableList';
import CreateBilliardTable from './CreateBilliardTable';
import UpdateBilliardTable from './UpdateBilliardTable';
const Stack = createNativeStackNavigator();
const BilliardTableScreen = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="BilliardTableList" component={BilliardTableList} options={{ headerShown: false }} />
        <Stack.Screen name="BilliardTableCreate" component={CreateBilliardTable} options={{ headerShown: false }} />
        <Stack.Screen name="BilliardTableUpdate" component={UpdateBilliardTable} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
};

export default BilliardTableScreen;