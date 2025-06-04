import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const ProductItem = ({ product }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.id}>{product.id}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.type}>{product.type}</Text>
        <View style={[
          styles.status,
          product.status === 'active' ? styles.active : styles.inactive
        ]}>
          <Text style={styles.statusText}>
            {product.status === 'active' ? 'Đang bán' : 'Ngừng bán'}
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.info}>Người tạo: {product.createdBy}</Text>
        <Text style={styles.info}>Ngày: {product.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  id: {
    fontWeight: 'bold',
    color: '#555',
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  price: {
    color: '#2f95dc',
    fontWeight: 'bold',
  },
  type: {
    color: '#666',
    fontStyle: 'italic',
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  active: {
    backgroundColor: '#4CAF50',
  },
  inactive: {
    backgroundColor: '#F44336',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
  info: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProductItem;