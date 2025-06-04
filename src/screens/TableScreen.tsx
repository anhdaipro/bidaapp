import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import TableItem from '../components/Table/TableItem';
import Header from '../components/common/Header';
import FabButton from '../components/common/FabButton';
import { globalStyles } from '@styles/globalStyles';

const TablesScreen = ({ navigation }) => {
  const [tables, setTables] = useState([
    { id: 1, status: 'playing', customer: 'Phan Du', startTime: '10:30', duration: '1h 12m' },
    { id: 2, status: 'empty', customer: '', startTime: '', duration: '' },
    { id: 3, status: 'playing', customer: 'Nguyen Van A', startTime: '11:45', duration: '0h 45m' },
    { id: 4, status: 'reserved', customer: 'Tran Thi B', startTime: '13:00', duration: '' },
  ]);

  const handleStartGame = (tableId) => {
    // Logic bắt đầu trò chơi
    navigation.navigate('OrderForm', { tableId });
  };

  const handleEndGame = (tableId) => {
    // Logic kết thúc trò chơi và tạo hóa đơn
    navigation.navigate('BillDetail', { tableId });
  };

  return (
    <View style={globalStyles.container}>
      <Header title="Quản lý bàn" />
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Tổng số bàn</Text>
          <Text style={styles.statValue}>4</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Đang chơi</Text>
          <Text style={styles.statValue}>2</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statTitle}>Trống</Text>
          <Text style={styles.statValue}>1</Text>
        </View>
      </View>

      <FlatList
        data={tables}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TableItem 
            table={item} 
            onStart={handleStartGame}
            onEnd={handleEndGame}
          />
        )}
      />

      <FabButton 
        icon="plus" 
        onPress={() => navigation.navigate('AddTable')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
    elevation: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f95dc',
  },
});

export default TablesScreen;