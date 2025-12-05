import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const EditStore = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editStore = route?.params?.editStore;

  // State for form fields
  const [formData, setFormData] = useState({
    storeNo: '',
    storeDesc: '',
  });

  // Pre-fill form with store data
  useEffect(() => {
    if (editStore) {
      setFormData({
        storeNo: editStore.storeNo || '',
        storeDesc: editStore.storeDesc || '',
      });
    }
  }, [editStore]);

  // Handle input changes
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Handle update button press
  const handleUpdate = () => {
    // Validate required fields
    if (!formData.storeNo || !formData.storeDesc) {
      Alert.alert(
        'Validation Error',
        'Please fill in Store No and Store Description fields',
        [{ text: 'OK' }]
      );
      return;
    }

    // Log all form data to console
    console.log('Form Data Updated:', formData);
    console.log('Edit Store:', editStore);
    console.log('Edit Store ID:', editStore?.id);
    
    // Ensure we have a valid ID - if not, generate one
    const storeId = editStore?.id || Date.now().toString();
    
    if (!editStore) {
      Alert.alert(
        'Error',
        'Store data is missing. Cannot update store.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Prepare updated store data
    const updatedStore = {
      ...formData, // All form fields with updated values
      id: storeId, // Preserve or generate ID
      isEdit: true, // Flag to indicate edit mode
    };
    
    console.log('Navigating with updated store:', updatedStore);
    
    // Navigate back to MyStores with the updated store data FIRST
    navigation.navigate('Mystores', {
      newStore: updatedStore
    });
    
    // Show success message after navigation (useFocusEffect will handle the update)
    // Delay to ensure navigation completes
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Store data has been updated successfully',
        [{ text: 'OK' }]
      );
    }, 500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        className="p-4" 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Store Section */}
        <Input        
          placeholder="Store No" 
          value={formData.storeNo}
          onChangeText={(text) => handleInputChange('storeNo', text)}
        />
        <Input        
          placeholder="Store Description" 
          value={formData.storeDesc}
          onChangeText={(text) => handleInputChange('storeDesc', text)}
          className="mt-4"
        />

        {/* Update Button */}
        <TouchableOpacity 
          className="bg-blue-600 py-4 rounded-xl mt-6 mb-10"
          onPress={handleUpdate}
          activeOpacity={0.8}
        >
          <Text className="text-center text-white font-semibold text-lg">
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditStore;





