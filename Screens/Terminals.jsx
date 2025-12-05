import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Search, Power } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Terminals = ({ route }) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [terminalsData, setTerminalsData] = useState([]);

  // Listen for new/updated terminal data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newTerminal) {
        const newTerminal = route.params.newTerminal;
        console.log('Received terminal data:', newTerminal);
        console.log('Is Edit:', newTerminal.isEdit);
        console.log('Terminal ID:', newTerminal.id);
        
        if (newTerminal.isEdit && newTerminal.id) {
          // Update existing terminal - preserve all fields and update with new data
          setTerminalsData(prev => {
            console.log('Current terminal list:', prev);
            console.log('Looking for terminal with ID:', newTerminal.id);
            
            const terminalIndex = prev.findIndex(terminal => {
              const match = terminal.id === newTerminal.id || terminal.id?.toString() === newTerminal.id?.toString();
              return match;
            });
            
            console.log('Terminal index found:', terminalIndex);
            
            if (terminalIndex !== -1) {
              // Terminal found, update it
              const updatedTerminals = [...prev];
              updatedTerminals[terminalIndex] = {
                ...prev[terminalIndex], // Keep all existing fields
                ...newTerminal, // Override with updated form data
                id: newTerminal.id, // Ensure ID is preserved
                terminalCode: newTerminal.terminalCode || prev[terminalIndex].terminalCode,
                terminalName: newTerminal.terminalName || prev[terminalIndex].terminalName,
                storeName: newTerminal.storeName || prev[terminalIndex].storeName,
                instantPrinting: newTerminal.instantPrinting !== undefined ? newTerminal.instantPrinting : prev[terminalIndex].instantPrinting,
              };
              console.log('Updated terminal:', updatedTerminals[terminalIndex]);
              return updatedTerminals;
            } else {
              // Terminal not found by ID - add it as new terminal to prevent data loss
              console.warn('Terminal with ID not found, adding as new terminal:', newTerminal.id);
              const terminalCard = {
                id: newTerminal.id,
                TerminalsCode: newTerminal.terminalCode || 'N/A',
                TerminalsName: newTerminal.terminalName || 'N/A',
                TerminalsDesc: newTerminal.terminalName || 'N/A',
                storeName: newTerminal.storeName || 'N/A',
                lastLoggedIn: newTerminal.lastLoggedIn || 'Never',
              };
              return [terminalCard, ...prev];
            }
          });
        } else {
          // Add new terminal to the list
          const terminalCard = {
            id: newTerminal.id || Date.now().toString(), // Generate unique ID if not provided
            TerminalsCode: newTerminal.terminalCode || 'N/A',
            TerminalsName: newTerminal.terminalName || 'N/A',
            TerminalsDesc: newTerminal.terminalName || 'N/A',
            storeName: newTerminal.storeName || 'N/A',
            instantPrinting: newTerminal.instantPrinting || false,
            invoiceTransmission: newTerminal.invoiceTransmission || '',
            linkDevice: newTerminal.linkDevice || '',
            lastLoggedIn: 'Never',
          };
          console.log('Adding new terminal:', terminalCard);
          setTerminalsData(prev => {
            const newList = [terminalCard, ...prev];
            console.log('New terminal list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newTerminal: undefined });
        }, 100);
      }
    }, [route?.params?.newTerminal, navigation])
  );

  const handleEditTerminals = (item) => {
    console.log('Edit Terminal:', item);
    navigation.navigate("SetupEditTerminal", {
      editTerminal: item,
    });
  };

  const handleNewTerminals = () => {
    console.log('Create New Terminal');
    navigation.navigate("SetupNewTerminal");
  };

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
            placeholder="Search Terminals..."
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
        {terminalsData.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">
              {searchQuery ? 'No terminals found' : 'No terminals added yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {searchQuery ? 'Try a different search term' : 'Tap the + Terminals button to add one'}
            </Text>
          </View>
        ) : (
          terminalsData
            .filter((item) =>
              item.TerminalsName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.TerminalsDesc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.TerminalsCode?.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
                onPress={() => handleEditTerminals(item)}
                activeOpacity={0.7}
              >
                {/* Left Blue Strip */}
                <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

                {/* Card Content */}
                <View className="pl-4 pr-4 pt-4 pb-4">
                  <Text className="text-lg font-bold text-gray-900 mb-2">
                    {item.TerminalsCode} | {item.TerminalsName}
                  </Text>

                  {/* Last logged in with power button */}
                  <View className="flex-row items-center mt-1 justify-between">
                    <Text className="text-sm text-gray-600">
                      Last logged in {item.lastLoggedIn || 'Never'}
                    </Text>
                    <TouchableOpacity
                      className="bg-gray-200 rounded-lg px-2 py-1.5"
                      activeOpacity={0.7}
                      onPress={() => {
                        // Handle power button press if needed
                        console.log('Power button pressed for terminal:', item.id);
                      }}
                    >
                      <Power size={16} color="#374151" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewTerminals}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Terminals</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Terminals;