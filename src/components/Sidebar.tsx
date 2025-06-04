import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const Sidebar = ({  }) => {
    const navigation = useNavigation<any>()
  const menuItems = [
    { label: 'Quản lý bàn', icon: 'md-home', screen: 'Tables' },
    { label: 'Sản phẩm', icon: 'md-cafe', screen: 'Products' },
    { label: 'Phiên chơi', icon: 'md-time', screen: 'Sessions' },
    { label: 'Nhân viên', icon: 'md-people', screen: 'Staff' },
    { label: 'Lịch làm việc', icon: 'md-calendar', screen: 'Schedule' },
    { label: 'Thống kê', icon: 'md-stats', screen: 'Stats' },
    { label: 'Giao dịch', icon: 'md-cash', screen: 'Transactions' },
    { label: 'Khách hàng', icon: 'md-person', screen: 'Customers' },
    { label: 'Cài đặt', icon: 'md-settings', screen: 'Settings' },
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
