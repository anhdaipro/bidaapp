import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '@navigation/AppNavigation'; // Điều chỉnh path nếu cần

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

const Sidebar: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation<NavigationProp>();

  const menuItems = [
    { label: 'Quản lý bàn', icon: 'md-home', screen: 'Tables' as keyof DrawerParamList },
    { label: 'Sản phẩm', icon: 'md-cafe', screen: 'Products' as keyof DrawerParamList },
    { label: 'Phiên chơi', icon: 'md-time', screen: 'Sessions' as keyof DrawerParamList },
    { label: 'Nhân viên', icon: 'md-people', screen: 'Staff' as keyof DrawerParamList },
    { label: 'Lịch làm việc', icon: 'md-calendar', screen: 'Schedule' as keyof DrawerParamList },
    { label: 'Thống kê', icon: 'md-stats', screen: 'Stats' as keyof DrawerParamList },
    { label: 'Giao dịch', icon: 'md-cash', screen: 'Transactions' as keyof DrawerParamList },
    { label: 'Khách hàng', icon: 'md-person', screen: 'Customers' as keyof DrawerParamList },
    { label: 'Cài đặt', icon: 'md-settings', screen: 'Settings' as keyof DrawerParamList },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.screen}
          style={styles.item}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons name={item.icon} size={24} color="#444" style={styles.icon} />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  icon: {
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});
