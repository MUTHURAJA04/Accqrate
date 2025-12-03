import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Input from '../../components/CustomInput';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const NewProduct = () => {
  const navigation = useNavigation();

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

  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      res => {
        if (res?.assets?.[0]) {
          setForm(prev => ({ ...prev, image: res.assets[0] }));
        }
      }
    );
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.productCode || !form.productDesc) {
      Alert.alert('Validation Error', 'Please fill in Product Code and Product Description');
      return;
    }

    const productData = {
      ...form,
      id: Date.now().toString(),
      isEdit: false,
    };

    navigation.navigate('Products', {
      newProduct: productData,
    });
    
    setTimeout(() => {
      Alert.alert('Success', 'Product data saved successfully');
    }, 300);
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
          <Input placeholder="Sales Price" keyboardType="numeric" value={form.salesPrice} onChangeText={v => handleChange('salesPrice', v)} />
          <Input placeholder="Cost of Purchase" keyboardType="numeric" value={form.costPurchase} onChangeText={v => handleChange('costPurchase', v)} />
          <Input placeholder="Barcode" value={form.barcode} onChangeText={v => handleChange('barcode', v)} />

          {/* Tax Type - Styled as Input */}
          <View className="mb-4 w-full">
            <View className="flex-row items-center border-2 border-gray-300 rounded-xl px-3 bg-white">
              <View className="flex-row flex-1 bg-gray-100 rounded-lg p-1">
                <View className="absolute left-3 -top-2 bg-white px-1 z-10">
                <Text className="text-xs text-gray-500 font-medium">Tax Type</Text>
              </View>
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

          <View className="mt-3">
            <Input
              placeholder="Tax %"
              keyboardType="numeric"
              value={form.taxPercent}
              onChangeText={v => handleChange('taxPercent', v)}
            />
          </View>

          <Input placeholder="Category" value={form.category} onChangeText={v => handleChange('category', v)} />

          <Text className="text-sm font-medium mt-5 mb-2">Product Image</Text>
          <TouchableOpacity
            onPress={pickImage}
            className="bg-gray-200 rounded-lg p-4 items-center justify-center"
          >
            <Text>Select Image</Text>
          </TouchableOpacity>

          {form.image && (
            <Image
              source={{ uri: form.image.uri }}
              className="w-32 h-32 rounded-lg mt-3 self-center"
            />
          )}

          <TouchableOpacity
            onPress={handleSave}
            className="bg-blue-600 p-4 rounded-xl mt-8 mb-10"
          >
            <Text className="text-center text-white font-semibold text-base">
              Create Product
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewProduct;
