import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/CustomInput';
import * as ImagePicker from 'react-native-image-picker';

const NewService = () => {
  const [form, setForm] = useState({
    serviceCode: '',
    serviceDesc: '',
    serviceDescArabic: '',
    unit: '',
    unitPrice: '',
    currency: '',
    taxPercent: '',
    barcode: '',
    taxType: 'inclusive',
    category: '',
    image: null,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleImageUpload = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (!response.didCancel && response.assets?.length > 0) {
          handleChange('image', response.assets[0]);
        }
      }
    );
  };

  const handleCreateService = () => {
    console.log("Service Created:", form);
    // TODO: API call here
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 py-4">


      {/* Service Code */}
      <Input
        placeholder="Service Code"
        value={form.serviceCode}
        onChangeText={(v) => handleChange('serviceCode', v)}
      />

      {/* Service Desc */}
      <Input
        placeholder="Service Description"
        value={form.serviceDesc}
        onChangeText={(v) => handleChange('serviceDesc', v)}
      />

      {/* Service Desc Arabic */}
      <Input
        placeholder="Service Description (Arabic)"
        value={form.serviceDescArabic}
        onChangeText={(v) => handleChange('serviceDescArabic', v)}
      />

      {/* Unit */}
      <Input
        placeholder="Unit"
        value={form.unit}
        onChangeText={(v) => handleChange('unit', v)}
      />

      {/* Unit Price */}
      <Input
        placeholder="Unit Price"
        keyboardType="numeric"
        value={form.unitPrice}
        onChangeText={(v) => handleChange('unitPrice', v)}
      />

      {/* Currency */}
      <Input
        placeholder="Currency"
        value={form.currency}
        onChangeText={(v) => handleChange('currency', v)}
      />

      {/* Tax % */}
      <Input
        placeholder="Tax %"
        keyboardType="numeric"
        value={form.taxPercent}
        onChangeText={(v) => handleChange('taxPercent', v)}
      />

      {/* Barcode */}
      <Input
        placeholder="Barcode"
        value={form.barcode}
        onChangeText={(v) => handleChange('barcode', v)}
      />

      {/* Category */}
      <Input
        placeholder="Category"
        value={form.category}
        onChangeText={(v) => handleChange('category', v)}
      />

      {/* Tax Type */}
      <View className="mb-4 w-full">
        <View className="flex-row items-center border-2 border-gray-300 rounded-xl px-3 bg-white relative">
          <View className="flex-row flex-1 bg-gray-100 rounded-lg p-1 mt-3 mb-1">

            {/* Floating placeholder */}
            <View className="absolute left-3 -top-2 bg-white px-1 z-10">
              <Text className="text-xs text-gray-500 font-medium">Tax Type</Text>
            </View>

            {/* Inclusive */}
            <TouchableOpacity
              onPress={() => handleChange('taxType', 'inclusive')}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: form.taxType === 'inclusive' ? '#FFFFFF' : 'transparent',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: form.taxType === 'inclusive' ? '600' : '400',
                  color: form.taxType === 'inclusive' ? '#000000' : '#6B7280',
                }}
              >
                Inclusive
              </Text>
            </TouchableOpacity>

            {/* Exclusive */}
            <TouchableOpacity
              onPress={() => handleChange('taxType', 'exclusive')}
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                backgroundColor: form.taxType === 'exclusive' ? '#FFFFFF' : 'transparent',
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: form.taxType === 'exclusive' ? '600' : '400',
                  color: form.taxType === 'exclusive' ? '#000000' : '#6B7280',
                }}
              >
                Exclusive
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Upload Image */}
      <TouchableOpacity
        onPress={handleImageUpload}
        className="border-2 border-gray-300 rounded-xl items-center justify-center py-4 mb-4"
      >
        <Text className="text-gray-600">
          {form.image ? "Change Image" : "Upload Image"}
        </Text>
      </TouchableOpacity>

      {/* Preview Image */}
      {form.image && (
        <Image
          source={{ uri: form.image.uri }}
          className="w-full h-48 rounded-xl mb-4"
          resizeMode="cover"
        />
      )}

      {/* Create Service Button */}
      <TouchableOpacity
        onPress={handleCreateService}
        className="bg-blue-600 rounded-xl py-4 mt-4 mb-10"
        activeOpacity={0.8}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Create Service
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewService;
