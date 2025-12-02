import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  Switch
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const EditCustomer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editCustomer = route?.params?.editCustomer;

  // State for form fields
  const [formData, setFormData] = useState({
    customerCode: '',
    customerName: '',
    notes: '',
    payTerm: '',
    state: '',
    country: '',
    postalCode: '',
    city: '',
    street: '',
    buildingNo: '',
    crNo: '',
    vatNo: '',
    currency: '',
    status: false,
  });

  // Pre-fill form with customer data
  useEffect(() => {
    if (editCustomer) {
      setFormData({
        customerCode: editCustomer.customerCode || '',
        customerName: editCustomer.customerName || '',
        notes: editCustomer.notes || '',
        payTerm: editCustomer.payTerm || '',
        state: editCustomer.state || '',
        country: editCustomer.country || '',
        postalCode: editCustomer.postalCode || '',
        city: editCustomer.city || '',
        street: editCustomer.street || '',
        buildingNo: editCustomer.buildingNo || '',
        crNo: editCustomer.crNo || '',
        vatNo: editCustomer.vatNo || '',
        currency: editCustomer.currency || '',
        status: editCustomer.status || false,
      });
    }
  }, [editCustomer]);

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
    if (!formData.customerCode || !formData.customerName) {
      Alert.alert(
        'Validation Error',
        'Please fill in Customer Code and Customer Name fields',
        [{ text: 'OK' }]
      );
      return;
    }

    // Log all form data to console
    console.log('Form Data Updated:', formData);
    console.log('Edit Customer:', editCustomer);
    console.log('Edit Customer ID:', editCustomer?.id);
    
    // Ensure we have a valid ID - if not, generate one
    const customerId = editCustomer?.id || Date.now().toString();
    
    if (!editCustomer) {
      Alert.alert(
        'Error',
        'Customer data is missing. Cannot update customer.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Prepare updated customer data
    const updatedCustomer = {
      ...formData, // All form fields with updated values
      id: customerId, // Preserve or generate ID
      isEdit: true, // Flag to indicate edit mode
    };
    
    console.log('Navigating with updated customer:', updatedCustomer);
    
    // Navigate back to Customers with the updated customer data FIRST
    navigation.navigate('Customers', {
      newCustomer: updatedCustomer
    });
    
    // Show success message after navigation (useFocusEffect will handle the update)
    // Delay to ensure navigation completes
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Customer data has been updated successfully',
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
        {/* Customer Code */}
        <Input        
          placeholder="Customer Code" 
          value={formData.customerCode}
          onChangeText={(text) => handleInputChange('customerCode', text)}
        />
        
        {/* Customer Name */}
        <Input        
          placeholder="Customer Name" 
          value={formData.customerName}
          onChangeText={(text) => handleInputChange('customerName', text)}
          
        />
        
        {/* Notes */}
        <Input        
          placeholder="Notes" 
          value={formData.notes}
          onChangeText={(text) => handleInputChange('notes', text)}
          
        />
        
        {/* Pay Term */}
        <Input        
          placeholder="Payterm (days)" 
          value={formData.payTerm}
          onChangeText={(text) => handleInputChange('payTerm', text)}
          
          keyboardType="numeric"
        />
        
        {/* State / Province */}
        <Input        
          placeholder="State / Province" 
          value={formData.state}
          onChangeText={(text) => handleInputChange('state', text)}
          
        />
        
        {/* Country */}
        <Input        
          placeholder="Country" 
          value={formData.country}
          onChangeText={(text) => handleInputChange('country', text)}
          
        />
        
        {/* Postal Code */}
        <Input        
          placeholder="Postal Code" 
          value={formData.postalCode}
          onChangeText={(text) => handleInputChange('postalCode', text)}
          
          keyboardType="numeric"
        />
        
        {/* City */}
        <Input        
          placeholder="City" 
          value={formData.city}
          onChangeText={(text) => handleInputChange('city', text)}
          
        />
        
        {/* Street */}
        <Input        
          placeholder="Street" 
          value={formData.street}
          onChangeText={(text) => handleInputChange('street', text)}
          
        />
        
        {/* Building No */}
        <Input        
          placeholder="Building No." 
          value={formData.buildingNo}
          onChangeText={(text) => handleInputChange('buildingNo', text)}
          
        />
        
        {/* CR No */}
        <Input        
          placeholder="CR No." 
          value={formData.crNo}
          onChangeText={(text) => handleInputChange('crNo', text)}
          
        />
        
        {/* VAT No */}
        <Input        
          placeholder="VAT No." 
          value={formData.vatNo}
          onChangeText={(text) => handleInputChange('vatNo', text)}
          
        />
        
        {/* Currency */}
        <Input        
          placeholder="Currency" 
          value={formData.currency}
          onChangeText={(text) => handleInputChange('currency', text)}
          
        />
        
        {/* Status Toggle */}
        <View className="flex-row items-center justify-between py-4 border-2 border-gray-300 rounded-xl px-4 bg-white mt-4">
          <Text className="text-gray-700 text-base">Status</Text>
          <Switch
            value={formData.status}
            onValueChange={(value) => handleInputChange('status', value)}
            trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
            thumbColor={formData.status ? '#FFFFFF' : '#F3F4F6'}
          />
        </View>

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

export default EditCustomer;
