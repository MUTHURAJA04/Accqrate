import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import Input from '../../components/CustomInput';
import * as ImagePicker from 'react-native-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';

const EditProduct = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const editProduct = route?.params?.editProduct;

  const [form, setForm] = useState({
    productCode: '',
    productDesc: '',
    productDescArabic: '',
    materialType: '',
    uom: '',
    salesPrice: '',
    costPurchase: '',
    barcode: '',
    taxType: 'inclusive',
    taxPercent: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    if (editProduct) {
      setForm({
        productCode: editProduct.productCode || '',
        productDesc: editProduct.productDesc || '',
        productDescArabic: editProduct.productDescArabic || '',
        materialType: editProduct.materialType || '',
        uom: editProduct.uom || '',
        salesPrice: editProduct.salesPrice || '',
        costPurchase: editProduct.costPurchase || '',
        barcode: editProduct.barcode || '',
        taxType: editProduct.taxType || 'inclusive',
        taxPercent: editProduct.taxPercent || '',
        category: editProduct.category || '',
        image: editProduct.image || null,
      });
    }
  }, [editProduct]);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, res => {
      if (res?.assets?.[0]) {
        setForm(prev => ({ ...prev, image: res.assets[0] }));
      }
    });
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
  };

  const handleUpdate = () => {
    if (!form.productCode || !form.productDesc) {
      Alert.alert(
        'Validation Error',
        'Please fill in Product Code and Product Description fields',
        [{ text: 'OK' }]
      );
      return;
    }

    const productId = editProduct?.id || Date.now().toString();
    
    if (!editProduct) {
      Alert.alert(
        'Error',
        'Product data is missing. Cannot update product.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    const updatedProduct = {
      ...form,
      id: productId,
      isEdit: true,
    };
    
    navigation.navigate('Products', {
      newProduct: updatedProduct
    });
    
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Product data has been updated successfully',
        [{ text: 'OK' }]
      );
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-white p-4">
          <Input placeholder="Product Code" value={form.productCode} onChangeText={v => handleChange('productCode', v)} />
          <Input placeholder="Product Description" value={form.productDesc} onChangeText={v => handleChange('productDesc', v)} />
          <Input placeholder="Product Description (Arabic)" value={form.productDescArabic} onChangeText={v => handleChange('productDescArabic', v)} />
          <Input placeholder="Material Type" value={form.materialType} onChangeText={v => handleChange('materialType', v)} />
          <Input placeholder="Unit of Measurement" value={form.uom} onChangeText={v => handleChange('uom', v)} />
          <Input placeholder="Sales Price" value={form.salesPrice} keyboardType="numeric" onChangeText={v => handleChange('salesPrice', v)} />
          <Input placeholder="Cost of Purchase" value={form.costPurchase} keyboardType="numeric" onChangeText={v => handleChange('costPurchase', v)} />
          <Input placeholder="Barcode" value={form.barcode} onChangeText={v => handleChange('barcode', v)} />

          {/* Tax Type - Styled as Input */}
          <View className="mb-4 w-full">
            <View className="flex-row items-center border-2 border-gray-300 rounded-xl px-3 bg-white">
              <View className="flex-row flex-1 bg-gray-100 rounded-lg p-1">
                <TouchableOpacity
                  onPress={() => handleChange('taxType', 'inclusive')}
                  style={{ flex: 1, padding: 8, borderRadius: 6, backgroundColor: form.taxType === 'inclusive' ? '#FFFFFF' : 'transparent' }}
                >
                  <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: form.taxType === 'inclusive' ? '600' : '400', color: form.taxType === 'inclusive' ? '#000000' : '#6B7280' }}>
                    Inclusive
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleChange('taxType', 'exclusive')}
                  style={{ flex: 1, padding: 8, borderRadius: 6, backgroundColor: form.taxType === 'exclusive' ? '#FFFFFF' : 'transparent' }}
                >
                  <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: form.taxType === 'exclusive' ? '600' : '400', color: form.taxType === 'exclusive' ? '#000000' : '#6B7280' }}>
                    Exclusive
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <Input placeholder="Tax %" value={form.taxPercent} keyboardType="numeric" onChangeText={v => handleChange('taxPercent', v)} />
          <Input placeholder="Category" value={form.category} onChangeText={v => handleChange('category', v)} />

          <Text className="text-sm font-medium mt-4 mb-1">Product Image</Text>
          <TouchableOpacity onPress={pickImage} className="bg-gray-200 rounded-lg p-4 items-center">
            <Text>Select Image</Text>
          </TouchableOpacity>

          {form.image && (
            <Image source={{ uri: form.image.uri }} className="w-32 h-32 mt-3 rounded-lg" />
          )}

          <TouchableOpacity onPress={handleUpdate} className="bg-blue-600 p-4 rounded-xl mt-6 mb-10">
            <Text className="text-center text-white font-semibold">Update Product</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default EditProduct;
