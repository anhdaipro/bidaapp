import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  useWindowDimensions,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProducts, useUpdateStatusProduct } from '@hook/query/useProducts';
import { CATEGORY_LABELS, STATUS_ACTIVE, STATUS_INACTIVE, STATUS_LABEL } from '@form/product';
import { formatDate, formatNumber } from '@utils/format';
import { useAuthStore } from '../../store/useUserStore';
import { ROLE_ADMIN } from '@form/user';
// import Search from './Search';
import { ProductFormSearch, ProductIndex } from '@typesModel/Product';

const ProductListScreen = () => {
  const navigation = useNavigation<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [formData, setFormData] = useState<ProductFormSearch>({
    status: '',
    categoryId: '',
    name: '',
    dateFrom: '',
    dateTo: '',
    uidLogin: '',
  });
  
  const { data, isLoading } = useProducts(currentPage, itemsPerPage, formData);
  const user = useAuthStore((state) => state.user);
  const { mutate: updateStatus } = useUpdateStatusProduct();
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Adjust breakpoint as needed

  if (isLoading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  const products = data.data;
  const totalPages = data.pagination.totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleUpdate = (id: number, statusCurrent: number) => {
    const status = statusCurrent === STATUS_ACTIVE ? STATUS_INACTIVE : STATUS_ACTIVE;
    updateStatus({ id, status });
  };

  const setFormSearch = (data: ProductFormSearch) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderMobileItem = ({ item, index }: { item: ProductIndex, index: number }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardCategory}>{CATEGORY_LABELS[item.categoryId]}</Text>
          <Text style={styles.cardPrice}>{formatNumber(item.price)} đ</Text>
          <View style={[
            styles.statusBadge,
            item.status === STATUS_ACTIVE ? styles.activeBadge : styles.inactiveBadge
          ]}>
            <Text style={styles.statusText}>{STATUS_LABEL[item.status]}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <Text style={styles.cardDate}>Ngày tạo: {formatDate(item.createdAt)}</Text>
        <Text style={styles.cardCreator}>Người tạo: {item.rUidLogin?.name || 'N/A'}</Text>
      </View>
      
      {user.roleId === ROLE_ADMIN && (
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() =>navigation.navigate('Products', {
                screen: 'ProductUpdate',
                params: { id: item.id },
                })}
          >
            <Text style={styles.buttonText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statusButton}
            onPress={() => handleUpdate(item.id, item.status)}
          >
            <Text style={styles.buttonText}>Trạng thái</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderDesktopItem = ({ item, index }: { item: ProductIndex, index: number }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{(currentPage - 1) * itemsPerPage + index + 1}</Text>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{CATEGORY_LABELS[item.categoryId]}</Text>
      <Text style={[styles.tableCell, styles.priceCell]}>{formatNumber(item.price)}</Text>
      <Text style={styles.tableCell}>{STATUS_LABEL[item.status]}</Text>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.tableCell}>
        <Text>{formatDate(item.createdAt)}</Text>
        <Text>{item.rUidLogin?.name}</Text>
      </View>
      {user.roleId === ROLE_ADMIN && (
        <View style={styles.actionCell}>
          <TouchableOpacity 
            style={styles.smallButton}
            onPress={() => navigation.navigate('Products', {screen: 'Update' ,id: item.id })}
          >
            <Text style={styles.smallButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.smallButton, styles.statusButton]}
            onPress={() => handleUpdate(item.id, item.status)}
          >
            <Text style={styles.smallButtonText}>Cập nhật trạng thái</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search form */}
      {/* <View style={styles.searchContainer}>
        <Search setFormSearch={setFormSearch} form={formData} />
      </View> */}

      {/* Header */}
      {user?.roleId === ROLE_ADMIN && (
        <View style={styles.header}>
          <Text style={styles.title}>Danh sách sản phẩm</Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('ProductCreate')}
          >
            <Icon name="add" size={20} color="#fff" />
            <Text style={styles.createButtonText}>Tạo mới</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Product List */}
      {isMobile ? (
        <FlatList
          data={products}
          renderItem={renderMobileItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <ScrollView horizontal>
          <View>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>STT</Text>
              <Text style={styles.headerCell}>Tên sản phẩm</Text>
              <Text style={styles.headerCell}>Loại</Text>
              <Text style={styles.headerCell}>Giá</Text>
              <Text style={styles.headerCell}>Trạng thái</Text>
              <Text style={styles.headerCell}>Hình</Text>
              <Text style={styles.headerCell}>Ngày tạo</Text>
              <Text style={styles.headerCell}>Hành động</Text>
            </View>
            {/* Table Body */}
            <FlatList
              data={products}
              renderItem={renderDesktopItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </ScrollView>
      )}

      {/* Pagination */}
      <View style={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              page === currentPage && styles.activePageButton
            ]}
            onPress={() => handlePageChange(page)}
          >
            <Text style={[
              styles.pageText,
              page === currentPage && styles.activePageText
            ]}>
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#1976d2',
  },
  searchContainer: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  createButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  activeBadge: {
    backgroundColor: '#e8f5e9',
  },
  inactiveBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
  },
  cardFooter: {
    marginBottom: 12,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
  },
  cardCreator: {
    fontSize: 12,
    color: '#666',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1976d2',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
  },
  statusButton: {
    flex: 1,
    backgroundColor: '#1976d2',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  statusButtonText: {
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    minWidth: 100,
    paddingHorizontal: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 8,
  },
  priceCell: {
    textAlign: 'right',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  actionCell: {
    flex: 1,
    minWidth: 150,
    paddingHorizontal: 8,
  },
  smallButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1976d2',
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    flexWrap: 'wrap',
  },
  pageButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activePageButton: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  pageText: {
    color: '#333',
  },
  activePageText: {
    color: '#fff',
  },
});

export default ProductListScreen;