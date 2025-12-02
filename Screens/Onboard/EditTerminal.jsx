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

const EditTerminal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editDevice = route?.params?.editDevice;

  // State for all form fields
  const [formData, setFormData] = useState({
    deviceNo: '',
    deviceName: '',
    commonName: '',
    serialNo: '',
    taxNo: '',
    location: '',
    industry: '',
    organizationName: '',
    tinNumber: '',
    otp: '',
    buildingNo: '',
    street: '',
    city: '',
    district: '',
    postalCode: '',
    additionalNo: '',
    additionalStreet: '',
    stateProvince: '',
    neighborhood: '',
    note: '',
  });

  // Pre-fill form with device data
  useEffect(() => {
    if (editDevice) {
      setFormData({
        deviceNo: editDevice.deviceNo || '',
        deviceName: editDevice.deviceName || '',
        commonName: editDevice.commonName || '',
        serialNo: editDevice.serialNo || '',
        taxNo: editDevice.taxNo || '',
        location: editDevice.location || '',
        industry: editDevice.industry || '',
        organizationName: editDevice.organizationName || '',
        tinNumber: editDevice.tinNumber || '',
        otp: editDevice.otp || '',
        buildingNo: editDevice.buildingNo || '',
        street: editDevice.street || '',
        city: editDevice.city || '',
        district: editDevice.district || '',
        postalCode: editDevice.postalCode || '',
        additionalNo: editDevice.additionalNo || '',
        additionalStreet: editDevice.additionalStreet || '',
        stateProvince: editDevice.stateProvince || '',
        neighborhood: editDevice.neighborhood || '',
        note: editDevice.note || '',
      });
    }
  }, [editDevice]);

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
    if (!formData.deviceNo || !formData.deviceName || !formData.location) {
      Alert.alert(
        'Validation Error',
        'Please fill in Device No, Device Name, and Location fields',
        [{ text: 'OK' }]
      );
      return;
    }

    // Log all form data to console
    console.log('Form Data Updated:', formData);
    console.log('Edit Device:', editDevice);
    console.log('Edit Device ID:', editDevice?.id);
    
    // Ensure we have a valid ID - if not, generate one
    const deviceId = editDevice?.id || Date.now().toString();
    
    if (!editDevice) {
      Alert.alert(
        'Error',
        'Device data is missing. Cannot update device.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Prepare updated device data
    const updatedDevice = {
      ...formData, // All form fields with updated values
      id: deviceId, // Preserve or generate ID
      isEdit: true, // Flag to indicate edit mode
      // Preserve existing status and invoice data
      hasCSID: editDevice?.hasCSID !== undefined ? editDevice.hasCSID : false,
      hasEndPoint: editDevice?.hasEndPoint !== undefined ? editDevice.hasEndPoint : false,
      lastInvoiceNo: editDevice?.lastInvoiceNo || 'N/A',
      lastInvoiceDate: editDevice?.lastInvoiceDate || new Date().toISOString().split('T')[0],
    };
    
    console.log('Navigating with updated device:', updatedDevice);
    
    // Navigate back to BoardingTerminal with the updated device data FIRST
    navigation.navigate('boardingTerminal', {
      newDevice: updatedDevice
    });
    
    // Show success message after navigation (useFocusEffect will handle the update)
    // Delay to ensure navigation completes
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Device data has been updated successfully',
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
        {/* Device Section */}
        <Input        
          placeholder="Enter device number" 
          value={formData.deviceNo}
          onChangeText={(text) => handleInputChange('deviceNo', text)}
        />
        <Input        
          placeholder="Enter device name" 
          value={formData.deviceName}
          onChangeText={(text) => handleInputChange('deviceName', text)}
        />
        <Input  
          placeholder="Enter common name" 
          value={formData.commonName}
          onChangeText={(text) => handleInputChange('commonName', text)}
        />
        <Input 
          placeholder="Enter serial number" 
          value={formData.serialNo}
          onChangeText={(text) => handleInputChange('serialNo', text)}
        />
        <Input   
          placeholder="Enter tax number" 
          value={formData.taxNo}
          onChangeText={(text) => handleInputChange('taxNo', text)}
        />

        {/* Location Section */}
        <Input 
          placeholder="Enter location" 
          value={formData.location}
          onChangeText={(text) => handleInputChange('location', text)}
        />
        <Input 
          placeholder="Enter industry" 
          value={formData.industry}
          onChangeText={(text) => handleInputChange('industry', text)}
        />
        <Input 
          placeholder="Enter organization name" 
          value={formData.organizationName}
          onChangeText={(text) => handleInputChange('organizationName', text)}
        />
        <Input 
          placeholder="Enter TIN number" 
          value={formData.tinNumber}
          onChangeText={(text) => handleInputChange('tinNumber', text)}
        />
        <Input 
          placeholder="Enter OTP" 
          value={formData.otp}
          onChangeText={(text) => handleInputChange('otp', text)}
        />

        {/* Address Section */}
        <Input 
          placeholder="Enter building no." 
          value={formData.buildingNo}
          onChangeText={(text) => handleInputChange('buildingNo', text)}
        />
        <Input 
          placeholder="Enter street" 
          value={formData.street}
          onChangeText={(text) => handleInputChange('street', text)}
        />
        <Input 
          placeholder="Enter city" 
          value={formData.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />
        <Input 
          placeholder="Enter district" 
          value={formData.district}
          onChangeText={(text) => handleInputChange('district', text)}
        />
        <Input 
          placeholder="Enter postal code" 
          value={formData.postalCode}
          onChangeText={(text) => handleInputChange('postalCode', text)}
          keyboardType="numeric"
        />
        <Input 
          placeholder="Enter additional no." 
          value={formData.additionalNo}
          onChangeText={(text) => handleInputChange('additionalNo', text)}
        />
        <Input 
          placeholder="Enter additional street" 
          value={formData.additionalStreet}
          onChangeText={(text) => handleInputChange('additionalStreet', text)}
        />
        <Input 
          placeholder="Enter state/province" 
          value={formData.stateProvince}
          onChangeText={(text) => handleInputChange('stateProvince', text)}
        />
        <Input 
          placeholder="Enter neighborhood" 
          value={formData.neighborhood}
          onChangeText={(text) => handleInputChange('neighborhood', text)}
        />
        <Input 
          placeholder="Enter note" 
          multiline 
          value={formData.note}
          onChangeText={(text) => handleInputChange('note', text)}
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

export default EditTerminal;
