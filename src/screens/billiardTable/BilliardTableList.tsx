import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBilliardTables } from '@hook/query/useBilliardTable';
import { useAuthStore } from '@store/useUserStore';

import { STATUS_LABELS, TYPE_LABELS } from '@form/billiardTable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatNumber } from '@utils/format';
import { ROLE_ADMIN } from '@form/user';

const BilliardTableList: React.FC = () => {
  const navigation = useNavigation<any>();
  const user = useAuthStore(state => state.user);
  const { data: tables, isLoading } = useBilliardTables() as {
    data: {
      id: number;
      tableNumber: string;
      status: number;
      type: number;
      hourlyRate: number;
    }[];
    isLoading: boolean;
  };

  const handleUpdate = (id: number) => {
    navigation.navigate('UpdateBilliardTable', { id });
  };

  const handleDelete = (id: number) => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn xóa bàn này?', [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Xóa', style: 'destructive', onPress: () => console.log('Deleting', id) },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Số bàn:</Text>
        <Text style={styles.value}>Bàn {item.tableNumber}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Trạng thái:</Text>
        <Text style={styles.value}>{STATUS_LABELS[item.status]}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Loại bàn:</Text>
        <Text style={styles.value}>{TYPE_LABELS[item.type]}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Giá/giờ:</Text>
        <Text style={styles.value}>{formatNumber(item.hourlyRate)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonEdit} onPress={() => handleUpdate(item.id)}>
          <Icon name="edit" size={18} color="#fff" />
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={18} color="#fff" />
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user?.roleId === ROLE_ADMIN && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateBilliardTable')}
        >
          <Icon name="add" size={20} color="#fff" />
          <Text style={styles.buttonText}>Tạo mới</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={tables}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default BilliardTableList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  buttonEdit: {
    flexDirection: 'row',
    backgroundColor: '#1976d2',
    padding: 6,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
  },
  buttonDelete: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    padding: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 4,
  },
  createButton: {
    flexDirection: 'row',
    backgroundColor: '#388e3c',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
