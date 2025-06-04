import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { Controller, useForm ,SubmitHandler} from 'react-hook-form';
import { launchImageLibrary, Asset,ImagePickerResponse } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import { CATEGORY_LABELS, STATUS_LABEL } from '@form/product'; // Chuyển sang định dạng array cho React Native
import { formatNumber } from '@utils/format'; // cần viết lại hàm formatNumber nếu cần
import { useCreateProduct, useUpdateProduct } from '@hook/query/useProducts';
import { Product, ProductForm } from '../../types/model/Product';
interface Props {
    product: Product;
  }
const FormScreen:React.FC<Props> =({ product })=>{
  const isEdit = !!product?.id;
  const navigation = useNavigation<any>();
  const [image, setImage] = useState<{
    uri: string;
    name: string;
    type: string;
  } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { mutate: addProduct, error: errorCreate, isPending: isPendingCreate } = useCreateProduct();
  const { mutate: updateProduct, error: errorUpdate, isPending: isPendingUpdate } = useUpdateProduct();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    values: { ...product, image: null },
  });

  useEffect(() => {
    if (product?.image) {
      setPreview(product.image);
    }
  }, [product]);

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      const asset: Asset = result.assets[0];
      if (asset.uri && asset.fileName && asset.type) {
        setImage({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
        });
        setPreview(asset.uri);
      } else {
        console.warn('Missing required fields in selected asset');
      }
    }
  };

  const onSubmit:SubmitHandler<ProductForm> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('categoryId', data.categoryId.toString());
    formData.append('status', data.status.toString());
    if (image) {
      formData.append('image', {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });
    }
    handleRequest(formData);
  };
  const handleRequest = (formData: FormData) => {
    if (product.id) {
      const id = product.id;
      updateProduct(
        { id, formData },
        {
          onSuccess: () => {
            navigation.navigate('Product' ,{});
          },
          onError: (error: any) => {
          },
        }
      );
    } else {
      addProduct(formData, {
        onSuccess: () => {
        },
        onError: (error: any) => {
          
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEdit ? 'Cập nhật' : 'Tạo mới'} sản phẩm</Text>

      {/* Tên sản phẩm */}
      <Text style={styles.label}>Tên sản phẩm *</Text>
      <Controller
        control={control}
        name="name"
        rules={{
          required: 'Tên không để trống',
          minLength: { value: 5, message: 'Tối thiểu 5 ký tự' },
          maxLength: { value: 50, message: 'Tối đa 50 ký tự' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="Nhập tên sản phẩm"
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Giá sản phẩm */}
      <Text style={styles.label}>Giá sản phẩm *</Text>
      <Controller
        control={control}
        name="price"
        rules={{
          required: 'Giá không để trống',
          validate: value => value > 0 || 'Giá phải lớn hơn 0',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(value)}
            onChangeText={text => onChange(text.replace(/[^0-9]/g, ''))}
            placeholder="Nhập giá"
          />
        )}
      />
      {errors.price && <Text style={styles.error}>{errors.price.message}</Text>}

      {/* Loại sản phẩm */}
      <Text style={styles.label}>Loại sản phẩm *</Text>
      <Controller
        control={control}
        name="categoryId"
        rules={{ required: 'Vui lòng chọn loại' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={String(value)}
            placeholder="Nhập mã loại (ví dụ 1, 2...)"
            onChangeText={onChange}
          />
        )}
      />
      {errors.categoryId && <Text style={styles.error}>{errors.categoryId.message}</Text>}

      {/* Trạng thái */}
      <Text style={styles.label}>Trạng thái *</Text>
      <Controller
        control={control}
        name="status"
        rules={{ required: 'Vui lòng chọn trạng thái' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={String(value)}
            placeholder="Nhập mã trạng thái (ví dụ 1, 2...)"
            onChangeText={onChange}
          />
        )}
      />
      {errors.status && <Text style={styles.error}>{errors.status.message}</Text>}

      {/* Image Picker */}
      <Text style={styles.label}>Ảnh sản phẩm</Text>
      <Button title="Chọn ảnh" onPress={pickImage} />
      {preview && (
        <Image source={{ uri: preview }} style={styles.imagePreview} />
      )}

      {/* Gửi */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{isEdit ? 'Cập nhật' : 'Tạo mới'}</Text>}
      </TouchableOpacity>
    </View>
  );
}
export default FormScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    label: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 6,
      padding: 10,
      marginTop: 4,
    },
    error: {
      color: 'red',
      fontSize: 13,
      marginTop: 2,
    },
    imagePreview: {
      width: 100,
      height: 100,
      marginTop: 10,
      borderRadius: 8,
      resizeMode: 'cover',
    },
    button: {
      marginTop: 24,
      backgroundColor: '#1976d2',
      padding: 14,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
  