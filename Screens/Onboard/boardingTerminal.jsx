import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Check } from 'lucide-react-native';

const BoardingTerminal = ({ route }) => {
  const navigation = useNavigation();
  const [deviceData, setDeviceData] = useState([]);

  // Listen for new/updated device data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newDevice) {
        const newDevice = route.params.newDevice;
        console.log('Received device data:', newDevice);
        console.log('Is Edit:', newDevice.isEdit);
        console.log('Device ID:', newDevice.id);
        
        if (newDevice.isEdit && newDevice.id) {
          // Update existing device - preserve all fields and update with new data
          setDeviceData(prev => {
            console.log('Current device list:', prev);
            console.log('Looking for device with ID:', newDevice.id);
            
            const deviceIndex = prev.findIndex(device => {
              const match = device.id === newDevice.id || device.id?.toString() === newDevice.id?.toString();
              return match;
            });
            
            console.log('Device index found:', deviceIndex);
            
            if (deviceIndex !== -1) {
              // Device found, update it
              const updatedDevices = [...prev];
              updatedDevices[deviceIndex] = {
                ...prev[deviceIndex], // Keep all existing fields
                ...newDevice, // Override with updated form data
                id: newDevice.id, // Ensure ID is preserved
                deviceNo: newDevice.deviceNo || prev[deviceIndex].deviceNo,
                deviceName: newDevice.deviceName || prev[deviceIndex].deviceName,
                location: newDevice.location || prev[deviceIndex].location,
                // Preserve status and invoice fields if not provided
                hasCSID: newDevice.hasCSID !== undefined ? newDevice.hasCSID : prev[deviceIndex].hasCSID,
                hasEndPoint: newDevice.hasEndPoint !== undefined ? newDevice.hasEndPoint : prev[deviceIndex].hasEndPoint,
                lastInvoiceNo: newDevice.lastInvoiceNo || prev[deviceIndex].lastInvoiceNo,
                lastInvoiceDate: newDevice.lastInvoiceDate || prev[deviceIndex].lastInvoiceDate,
              };
              console.log('Updated device:', updatedDevices[deviceIndex]);
              return updatedDevices;
            } else {
              // Device not found by ID - add it as new device to prevent data loss
              console.warn('Device with ID not found, adding as new device:', newDevice.id);
              const deviceCard = {
                id: newDevice.id,
                deviceNo: newDevice.deviceNo || 'N/A',
                deviceName: newDevice.deviceName || 'N/A',
                location: newDevice.location || 'N/A',
                lastInvoiceNo: newDevice.lastInvoiceNo || 'N/A',
                lastInvoiceDate: newDevice.lastInvoiceDate || new Date().toISOString().split('T')[0],
                hasCSID: newDevice.hasCSID || false,
                hasEndPoint: newDevice.hasEndPoint || false,
                commonName: newDevice.commonName || '',
                serialNo: newDevice.serialNo || '',
                taxNo: newDevice.taxNo || '',
                industry: newDevice.industry || '',
                organizationName: newDevice.organizationName || '',
                tinNumber: newDevice.tinNumber || '',
                otp: newDevice.otp || '',
                buildingNo: newDevice.buildingNo || '',
                street: newDevice.street || '',
                city: newDevice.city || '',
                district: newDevice.district || '',
                postalCode: newDevice.postalCode || '',
                additionalNo: newDevice.additionalNo || '',
                additionalStreet: newDevice.additionalStreet || '',
                stateProvince: newDevice.stateProvince || '',
                neighborhood: newDevice.neighborhood || '',
                note: newDevice.note || '',
              };
              return [deviceCard, ...prev];
            }
          });
        } else {
          // Add new device to the list
          const deviceCard = {
            id: newDevice.id || Date.now().toString(), // Generate unique ID if not provided
            deviceNo: newDevice.deviceNo || 'N/A',
            deviceName: newDevice.deviceName || 'N/A',
            location: newDevice.location || 'N/A',
            lastInvoiceNo: newDevice.lastInvoiceNo || 'N/A',
            lastInvoiceDate: newDevice.lastInvoiceDate || new Date().toISOString().split('T')[0],
            hasCSID: newDevice.hasCSID || false,
            hasEndPoint: newDevice.hasEndPoint || false,
            // Include all other form fields for editing
            commonName: newDevice.commonName || '',
            serialNo: newDevice.serialNo || '',
            taxNo: newDevice.taxNo || '',
            industry: newDevice.industry || '',
            organizationName: newDevice.organizationName || '',
            tinNumber: newDevice.tinNumber || '',
            otp: newDevice.otp || '',
            buildingNo: newDevice.buildingNo || '',
            street: newDevice.street || '',
            city: newDevice.city || '',
            district: newDevice.district || '',
            postalCode: newDevice.postalCode || '',
            additionalNo: newDevice.additionalNo || '',
            additionalStreet: newDevice.additionalStreet || '',
            stateProvince: newDevice.stateProvince || '',
            neighborhood: newDevice.neighborhood || '',
            note: newDevice.note || '',
          };
          console.log('Adding new device:', deviceCard);
          setDeviceData(prev => {
            const newList = [deviceCard, ...prev];
            console.log('New device list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newDevice: undefined });
        }, 100);
      }
    }, [route?.params?.newDevice, navigation])
  );

  const handleNewTerminal = () => {
    console.log('Terminal Button Pressed');
    navigation.navigate('NewTerminal');
  };

  const handleEditDevice = (device) => {
    navigation.navigate('EditTerminal', {
      editDevice: device,
    });
  };

  const DeviceCard = ({ device }) => (
    <TouchableOpacity
      className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
      onPress={() => handleEditDevice(device)}
      activeOpacity={0.7}
    >
      {/* Vertical Blue Bar */}
      <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      
      {/* Card Content */}
      <View className="pl-4 pr-4 pt-4 pb-4">
        {/* Device no | Device name */}
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {device.deviceNo} | {device.deviceName}
        </Text>
        
        {/* Location */}
        <Text className="text-sm text-gray-600 mb-1">
          {device.location}
        </Text>
        
        {/* Last invoice no. */}
        <Text className="text-sm text-gray-600 mb-1">
          Last invoice no.: {device.lastInvoiceNo}
        </Text>
        
        {/* Last Invoice date */}
        <Text className="text-sm text-gray-600 mb-3">
          Last Invoice date: {device.lastInvoiceDate}
        </Text>
        
        {/* Status Indicators */}
        <View className="flex-row items-center gap-4">
          {/* CSID */}
          <View className="flex-row items-center">
            <View className="w-5 h-5 bg-gray-200 rounded mr-2 items-center justify-center">
              {device.hasCSID && (
                <Check size={14} color="#4ADE80" strokeWidth={3} />
              )}
            </View>
            <Text className="text-sm text-gray-600">CSID</Text>
          </View>
          
          {/* End point */}
          <View className="flex-row items-center">
            <View className="w-5 h-5 bg-gray-200 rounded mr-2 items-center justify-center">
              {device.hasEndPoint && (
                <Check size={14} color="#4ADE80" strokeWidth={3} />
              )}
            </View>
            <Text className="text-sm text-gray-600">End point</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Debug: Log device data whenever it changes
  React.useEffect(() => {
    console.log('Device data updated, count:', deviceData.length);
    console.log('Device IDs:', deviceData.map(d => d.id));
  }, [deviceData]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        {deviceData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No terminals added yet</Text>
            <Text className="text-gray-400 text-sm mt-2">Tap the + Terminal button to add one</Text>
          </View>
        ) : (
          deviceData.map((device) => (
            <DeviceCard key={device.id || `device-${device.deviceNo}`} device={device} />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewTerminal}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Terminal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BoardingTerminal;
