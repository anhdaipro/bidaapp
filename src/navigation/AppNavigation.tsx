import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerNavigationOptions } from '@react-navigation/drawer';
import Sidebar from '@components/Sidebar';
import ProductsScreen from '@screens/product/ProductsScreen';
import Header from '@components/Header';

// Định nghĩa các route name và param (nếu có)
export type DrawerParamList = {
  Products: undefined;
  // Thêm các màn hình khác, ví dụ:
  // Settings: undefined;
  // Profile: { userId: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppNavigator: React.FC = () => {
  return (
   
      <Drawer.Navigator
        initialRouteName="Products"
        drawerContent={(props: DrawerContentComponentProps) => <Sidebar {...props} />}
        screenOptions={({ navigation, route }): DrawerNavigationOptions => ({
          header: () => (
            <Header 
              title={'Sản phẩm'}
              showBack={route.name !== 'Products'}
            />
          ),
          drawerType: 'front',
          drawerStyle: {
            width: 280,
          },
        })}
      >
        <Drawer.Screen name="Products" component={ProductsScreen} />
        {/* Thêm các màn hình khác */}
      </Drawer.Navigator>
   
  );
};

export default AppNavigator;
