import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Sidebar from '@components/Sidebar';
import ProductsScreen from '@screens/product/ProductsScreen';
import Header from '@components/Header';

// Import các màn hình khác...

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Tables"
        drawerContent={(props) => <Sidebar  />}
        screenOptions={{
          header: ({ navigation, route }) => (
            <Header 
              title={'Sản phẩm'}
              showBack={route.name !== 'Tables'}
            />
          ),
          drawerType: 'front',
          drawerStyle: {
            width: 280,
          },
        }}
      >
        
        <Drawer.Screen name="Products" component={ProductsScreen} />
        {/* Thêm các màn hình khác */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;