import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Check } from 'lucide-react-native';

const MyStores = ({ route }) => {
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState([]);

  // Listen for new/updated store data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newStore) {
        const newStore = route.params.newStore;
        console.log('Received store data:', newStore);
        console.log('Is Edit:', newStore.isEdit);
        console.log('Store ID:', newStore.id);
        
        if (newStore.isEdit && newStore.id) {
          // Update existing store - preserve all fields and update with new data
          setStoreData(prev => {
            console.log('Current store list:', prev);
            console.log('Looking for store with ID:', newStore.id);
            
            const storeIndex = prev.findIndex(store => {
              const match = store.id === newStore.id || store.id?.toString() === newStore.id?.toString();
              return match;
            });
            
            console.log('Store index found:', storeIndex);
            
            if (storeIndex !== -1) {
              // Store found, update it
              const updatedStores = [...prev];
              updatedStores[storeIndex] = {
                ...prev[storeIndex], // Keep all existing fields
                ...newStore, // Override with updated form data
                id: newStore.id, // Ensure ID is preserved
                storeNo: newStore.storeNo || prev[storeIndex].storeNo,
                storeDesc: newStore.storeDesc || prev[storeIndex].storeDesc,
              };
              console.log('Updated store:', updatedStores[storeIndex]);
              return updatedStores;
            } else {
              // Store not found by ID - add it as new store to prevent data loss
              console.warn('Store with ID not found, adding as new store:', newStore.id);
              const storeCard = {
                id: newStore.id,
                storeNo: newStore.storeNo || 'N/A',
                storeDesc: newStore.storeDesc || 'N/A',
              };
              return [storeCard, ...prev];
            }
          });
        } else {
          // Add new store to the list
          const storeCard = {
            id: newStore.id || Date.now().toString(), // Generate unique ID if not provided
            storeNo: newStore.storeNo || 'N/A',
            storeDesc: newStore.storeDesc || 'N/A',
          };
          console.log('Adding new store:', storeCard);
          setStoreData(prev => {
            const newList = [storeCard, ...prev];
            console.log('New store list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newStore: undefined });
        }, 100);
      }
    }, [route?.params?.newStore, navigation])
  );

  const handleNewStore = () => {
    console.log('Store Button Pressed');
    navigation.navigate('NewStore');
  };

  const handleEditStore = (store) => {
    navigation.navigate('EditStore', {
      editStore: store,
    });
  };

  const StoreCard = ({ store }) => (
    <TouchableOpacity
      className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
      onPress={() => handleEditStore(store)}
      activeOpacity={0.7}
    >
      {/* Vertical Blue Bar */}
      <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      
      {/* Card Content */}
      <View className="pl-4 pr-4 pt-4 pb-4">
        {/* Store no | Store description */}
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {store.storeNo} | {store.storeDesc}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Debug: Log store data whenever it changes
  React.useEffect(() => {
    console.log('Store data updated, count:', storeData.length);
    console.log('Store IDs:', storeData.map(s => s.id));
  }, [storeData]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">
        {storeData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No stores added yet</Text>
            <Text className="text-gray-400 text-sm mt-2">Tap the + Store button to add one</Text>
          </View>
        ) : (
          storeData.map((store) => (
            <StoreCard key={store.id || `store-${store.storeNo}`} store={store} />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewStore}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyStores;