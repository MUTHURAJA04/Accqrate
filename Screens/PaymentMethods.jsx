import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search, Power } from 'lucide-react-native';

const paymentMethodsData = [
  { id: '1', name: 'Visa', isActive: true },
  { id: '2', name: 'Credit Card', isActive: false },
  { id: '3', name: 'Debit Card', isActive: true },
  { id: '4', name: 'Google Pay', isActive: false },
];

const PaymentMethods = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNewTerminals = () => {
    // Placeholder function for Add button
    console.log('Add new terminal clicked');
  };

  // Filter payment methods based on search query
  const filteredMethods = paymentMethodsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="px-6 pt-6 pb-4">
        <View className="flex-row items-center border-2 border-gray-300 rounded-xl px-3 bg-white">
          <View className="mr-3">
            <Search size={20} color="#6B7280" />
          </View>

          <TextInput
            className="flex-1 text-black py-4 pr-2 rounded-xl"
            placeholder="Search Payment Methods..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              fontSize: 16,
              paddingVertical: 12,
              includeFontPadding: false,
              textAlignVertical: 'center',
            }}
          />
        </View>
      </View>

      {/* Scrollable List of Payment Method Cards */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 80 }}>
        {filteredMethods.map((item) => (
         <TouchableOpacity
  key={item.id}
  className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
  activeOpacity={0.7}
  onPress={() => {
    console.log('Clicked:', item.name);
  }}
>
  {/* Left Blue Strip */}
  <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

  {/* Card Content */}
  <View className="pl-4 pr-4 pt-4 pb-4">
    <Text className="text-lg font-bold text-gray-900">
      {item.name}
    </Text>
  </View>
</TouchableOpacity>

        ))}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewTerminals}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ PaymentMethods</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethods;
