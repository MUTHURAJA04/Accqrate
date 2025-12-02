import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Check } from 'lucide-react-native';

const Customers = ({ route }) => {
  const navigation = useNavigation();
  const [customerData, setCustomerData] = useState([]);

  // Listen for new/updated customer data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newCustomer) {
        const newCustomer = route.params.newCustomer;
        console.log('Received customer data:', newCustomer);
        console.log('Is Edit:', newCustomer.isEdit);
        console.log('Customer ID:', newCustomer.id);
        
        if (newCustomer.isEdit && newCustomer.id) {
          // Update existing customer - preserve all fields and update with new data
          setCustomerData(prev => {
            console.log('Current customer list:', prev);
            console.log('Looking for customer with ID:', newCustomer.id);
            
            const customerIndex = prev.findIndex(customer => {
              const match = customer.id === newCustomer.id || customer.id?.toString() === newCustomer.id?.toString();
              return match;
            });
            
            console.log('Customer index found:', customerIndex);
            
            if (customerIndex !== -1) {
              // Customer found, update it
              const updatedCustomers = [...prev];
              updatedCustomers[customerIndex] = {
                ...prev[customerIndex], // Keep all existing fields
                ...newCustomer, // Override with updated form data
                id: newCustomer.id, // Ensure ID is preserved
                customerCode: newCustomer.customerCode || prev[customerIndex].customerCode,
                customerName: newCustomer.customerName || prev[customerIndex].customerName,
                vatNo: newCustomer.vatNo || prev[customerIndex].vatNo,
                currency: newCustomer.currency || prev[customerIndex].currency,
                status: newCustomer.status !== undefined ? newCustomer.status : prev[customerIndex].status,
              };
              console.log('Updated customer:', updatedCustomers[customerIndex]);
              return updatedCustomers;
            } else {
              // Customer not found by ID - add it as new customer to prevent data loss
              console.warn('Customer with ID not found, adding as new customer:', newCustomer.id);
              const customerCard = {
                id: newCustomer.id,
                customerCode: newCustomer.customerCode || 'N/A',
                customerName: newCustomer.customerName || 'N/A',
                vatNo: newCustomer.vatNo || 'N/A',
                currency: newCustomer.currency || 'N/A',
                status: newCustomer.status || false,
              };
              return [customerCard, ...prev];
            }
          });
        } else {
          // Add new customer to the list
          const customerCard = {
            id: newCustomer.id || Date.now().toString(), // Generate unique ID if not provided
            customerCode: newCustomer.customerCode || 'N/A',
            customerName: newCustomer.customerName || 'N/A',
            vatNo: newCustomer.vatNo || 'N/A',
            currency: newCustomer.currency || 'N/A',
            status: newCustomer.status || false,
            notes: newCustomer.notes || '',
            payTerm: newCustomer.payTerm || '',
            state: newCustomer.state || '',
            country: newCustomer.country || '',
            postalCode: newCustomer.postalCode || '',
            city: newCustomer.city || '',
            street: newCustomer.street || '',
            buildingNo: newCustomer.buildingNo || '',
            crNo: newCustomer.crNo || '',
          };
          console.log('Adding new customer:', customerCard);
          setCustomerData(prev => {
            const newList = [customerCard, ...prev];
            console.log('New customer list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newCustomer: undefined });
        }, 100);
      }
    }, [route?.params?.newCustomer, navigation])
  );

  const handleNewCustomer = () => {
    console.log('Customer Button Pressed');
    navigation.navigate('NewCustomer');
  };

  const handleEditCustomer = (customer) => {
    navigation.navigate('EditCustomer', {
      editCustomer: customer,
    });
  };

  const CustomerCard = ({ customer }) => (
    <TouchableOpacity
      className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
      onPress={() => handleEditCustomer(customer)}
      activeOpacity={0.7}
    >
      {/* Vertical Blue Bar */}
      <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      
      {/* Card Content */}
      <View className="pl-4 pr-4 pt-4 pb-4">
        {/* Customer code | Customer name */}
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {customer.customerCode} | {customer.customerName}
        </Text>
        
        {/* VAT No */}
        {customer.vatNo && customer.vatNo !== 'N/A' && (
          <Text className="text-sm text-gray-600 mb-1">
            Tax no.: {customer.vatNo}
          </Text>
        )}
        
        {/* Currency */}
        {customer.currency && customer.currency !== 'N/A' && (
          <Text className="text-sm text-gray-600 mb-1">
            Currency: {customer.currency}
          </Text>
        )}
        
        {/* Status */}
        <View className="flex-row items-center mt-2">
          <View className="w-5 h-5 bg-gray-200 rounded mr-2 items-center justify-center">
            {customer.status && (
              <Check size={14} color="#4ADE80" strokeWidth={3} />
            )}
          </View>
          <Text className="text-sm text-gray-600">Status</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Debug: Log customer data whenever it changes
  React.useEffect(() => {
    console.log('Customer data updated, count:', customerData.length);
    console.log('Customer IDs:', customerData.map(c => c.id));
  }, [customerData]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        {customerData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No customers added yet</Text>
            <Text className="text-gray-400 text-sm mt-2">Tap the + Customer button to add one</Text>
          </View>
        ) : (
          customerData.map((customer) => (
            <CustomerCard key={customer.id || `customer-${customer.customerCode}`} customer={customer} />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewCustomer}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Customer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Customers;
