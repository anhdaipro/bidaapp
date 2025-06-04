import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';
interface HeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
}
const Header:React.FC<HeaderProps> = ({ title, showBack = false, showMenu = true }) => {
  const navigation = useNavigation<any>()
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBack && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
        {showMenu && !showBack && (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.centerSection}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {/* Có thể thêm các icon khác như thông báo, tìm kiếm */}
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2f95dc',
    paddingVertical: 15,
    paddingHorizontal: 15,
    elevation: 4,
  },
  leftSection: {
    width: 40,
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Header;