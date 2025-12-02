import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const NewProductCategorie = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    categoryName: '',
    status: false,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.categoryName) {
      Alert.alert('Validation Error', 'Please fill in Category Name');
      return;
    }

    console.log('Form Data Submitted:', form);

    // Generate unique ID with timestamp and random number
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Save form data before resetting
    const categoryData = {
      categoryName: form.categoryName,
      status: form.status,
      id: uniqueId,
      isEdit: false,
    };

    // Reset form
    setForm({
      categoryName: '',
      status: false,
    });

    // Navigate back with the new category data
    // Use navigate to pass params, then the useFocusEffect will handle it
    navigation.navigate('ProductCategories', {
      newCategory: categoryData,
    });

    // Show success message after a brief delay to ensure navigation happens
    setTimeout(() => {
      Alert.alert('Success', 'Category data saved successfully');
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* All Inputs */}
          <View className="space-y-4">
            <Input
              placeholder="Category Name"
              value={form.categoryName}
              onChangeText={(v) => handleChange('categoryName', v)}
            />

            {/* Status Toggle */}
            <View className="flex-row items-center justify-between py-4 border-2 border-gray-300 rounded-xl px-4 bg-white">
              <Text className="text-gray-700 text-base">Status</Text>
              <Switch
                value={form.status}
                onValueChange={(value) => handleChange('status', value)}
                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                thumbColor={form.status ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 py-4 rounded-2xl mt-8 mb-10"
            activeOpacity={0.85}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Create Category
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewProductCategorie;