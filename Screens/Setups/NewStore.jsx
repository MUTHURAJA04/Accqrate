import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const NewStore = () => {
  const navigation = useNavigation();
  const [storeNo, setStoreNo] = useState('');
  const [storeDesc, setStoreDesc] = useState('');

  const handleSubmit = () => {
    // Validate required fields
    if (!storeNo || !storeDesc) {
      Alert.alert(
        'Validation Error',
        'Please fill in Store No and Store Description fields',
        [{ text: 'OK' }]
      );
      return;
    }

    // Log all form data to console
    console.log('Form Data Submitted:', {
      storeNo,
      storeDesc
    });
    
    // Navigate back to MyStores with the store data
    navigation.navigate('Mystores', {
      newStore: {
        storeNo,
        storeDesc,
        id: Date.now().toString(), // Generate ID for new stores
        isEdit: false, // Flag to indicate new store
      }
    });
    
    // Show success message
    Alert.alert(
      'Success',
      'Store data has been saved successfully',
      [{ text: 'OK' }]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-6">

          <View>
            <Input
              placeholder="Store No"
              value={storeNo}
              onChangeText={setStoreNo}
            />

            <Input
              placeholder="Store Description"
              value={storeDesc}
              onChangeText={setStoreDesc}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-600 py-4 rounded-2xl mt-8"
              activeOpacity={0.85}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Create Store
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewStore;
