import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const SalesPerson = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [salesPersonData, setSalesPersonData] = useState([]);

  // Listen for new/updated sales person data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newSalesPerson) {
        const newSalesPerson = route.params.newSalesPerson;
        console.log('Received sales person data:', newSalesPerson);
        console.log('Is Edit:', newSalesPerson.isEdit);
        console.log('Sales Person ID:', newSalesPerson.id);
        
        if (newSalesPerson.isEdit && newSalesPerson.id) {
          // Update existing sales person - preserve all fields and update with new data
          setSalesPersonData(prev => {
            console.log('Current sales person list:', prev);
            console.log('Looking for sales person with ID:', newSalesPerson.id);
            
            const salesPersonIndex = prev.findIndex(sp => {
              const match = sp.id === newSalesPerson.id || sp.id?.toString() === newSalesPerson.id?.toString();
              return match;
            });
            
            console.log('Sales person index found:', salesPersonIndex);
            
            if (salesPersonIndex !== -1) {
              // Sales person found, update it
              const updatedSalesPersons = [...prev];
              updatedSalesPersons[salesPersonIndex] = {
                ...prev[salesPersonIndex], // Keep all existing fields
                ...newSalesPerson, // Override with updated form data
                id: newSalesPerson.id, // Ensure ID is preserved
                firstName: newSalesPerson.firstName || prev[salesPersonIndex].firstName,
                lastName: newSalesPerson.lastName || prev[salesPersonIndex].lastName,
                phone: newSalesPerson.phone || prev[salesPersonIndex].phone,
                commission: newSalesPerson.commission || prev[salesPersonIndex].commission,
              };
              console.log('Updated sales person:', updatedSalesPersons[salesPersonIndex]);
              return updatedSalesPersons;
            } else {
              // Sales person not found by ID - add it as new to prevent data loss
              console.warn('Sales person with ID not found, adding as new:', newSalesPerson.id);
              const salesPersonCard = {
                id: newSalesPerson.id,
                firstName: newSalesPerson.firstName || 'N/A',
                lastName: newSalesPerson.lastName || 'N/A',
                phone: newSalesPerson.phone || 'N/A',
                commission: newSalesPerson.commission || 'N/A',
              };
              return [salesPersonCard, ...prev];
            }
          });
        } else {
          // Add new sales person to the list
          const salesPersonCard = {
            id: newSalesPerson.id || Date.now().toString(), // Generate unique ID if not provided
            firstName: newSalesPerson.firstName || 'N/A',
            lastName: newSalesPerson.lastName || 'N/A',
            phone: newSalesPerson.phone || 'N/A',
            commission: newSalesPerson.commission || 'N/A',
          };
          console.log('Adding new sales person:', salesPersonCard);
          setSalesPersonData(prev => {
            const newList = [salesPersonCard, ...prev];
            console.log('New sales person list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newSalesPerson: undefined });
        }, 100);
      }
    }, [route?.params?.newSalesPerson, navigation])
  );

  const handleEditSalesPerson = (item) => {
    console.log('Edit Sales Person:', item);
    navigation.navigate("EditSalesPerson", {
      editSalesPerson: item,
    });
  };

  const handleNewSalesPerson = () => {
    console.log("Add New SalesPerson");
    navigation.navigate("NewSalesPerson");
  };

  // Filter sales persons based on search query
  const filteredSalesPersons = salesPersonData.filter(sp => {
    const query = searchQuery.toLowerCase();
    return (
      sp.firstName?.toLowerCase().includes(query) ||
      sp.lastName?.toLowerCase().includes(query) ||
      sp.phone?.toLowerCase().includes(query)
    );
  });

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
            placeholder="Search SalesPerson..."
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

      {/* List */}
      <ScrollView className="px-6 pb-24">
        {salesPersonData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">
              {searchQuery ? 'No sales persons found' : 'No sales persons added yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {searchQuery ? 'Try a different search term' : 'Tap the + SalesPerson button to add one'}
            </Text>
          </View>
        ) : (
          filteredSalesPersons.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
              onPress={() => handleEditSalesPerson(item)}
              activeOpacity={0.7}
            >
              {/* Left Blue Strip */}
              <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

              {/* Card Content */}
              <View className="pl-4 pr-4 pt-4 pb-4">
                <Text className="text-lg font-bold text-gray-900 mb-2">
                  {item.firstName} {item.lastName}
                </Text>

                <View className="flex-row items-center mt-1 justify-between">
                  <Text className="text-sm text-gray-600">
                    Commission: {item.commission}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewSalesPerson}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ SalesPerson</Text>
      </TouchableOpacity>

    </View>
  );
};

export default SalesPerson;
