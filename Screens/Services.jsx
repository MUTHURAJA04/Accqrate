import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react-native';

const Services = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  // LOAD SERVICES (API or static)
  useEffect(() => {
    // TODO: Replace this with your API data
    const exampleServices = [
      { id: 1, ServiceNo: "001", ServiceDesc: "Plumbing", Unit: "Unit 1", salesPrice: "150" },
      { id: 2, ServiceNo: "002", ServiceDesc: "Cleaning", Unit: "Unit 2", salesPrice: "200" },
    ];

    setServices(exampleServices);
    setFilteredServices(exampleServices);
  }, []);

  // SEARCH FILTER
  useEffect(() => {
    if (!searchQuery) {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((item) =>
        item.ServiceDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ServiceNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  const handleEditService = (service) => {
    navigation.navigate("EditService", { service });
  };

  const handleNewService = () => {
    navigation.navigate("NewService");
  };

  return (
    <View className="flex-1 bg-white">

      {/* Title */}
      <Text className="px-6 pt-6 pb-2 text-2xl font-bold text-gray-900">Services</Text>

      {/* Search Bar */}
      <View className="px-6 pt-2 pb-4">
        <View className="flex-row items-center border-2 border-gray-300 rounded-xl px-3 bg-white">
          <Search size={20} color="#6B7280" className="mr-3" />
          <TextInput
            className="flex-1 text-black py-3"
            placeholder="Search Service..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{
              fontSize: 16,
              includeFontPadding: false,
              textAlignVertical: 'center',
            }}
          />
        </View>
      </View>

      {/* Services List */}
      <ScrollView className="flex-1 px-6">
        {filteredServices.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">
              {searchQuery ? 'No Service found' : 'No Service added yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {searchQuery ? 'Try a different search term' : 'Tap the + Service button to add one'}
            </Text>
          </View>
        ) : (
          filteredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
              onPress={() => handleEditService(service)}
              activeOpacity={0.7}
            >
              {/* Left Blue Bar */}
              <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

              <View className="pl-4 pr-4 pt-4 pb-4">
                <Text className="text-lg font-bold text-gray-900 mb-2">
                  {service.ServiceNo} | {service.ServiceDesc}
                </Text>

                <Text className="text-sm text-gray-600 mb-1">
                  {service.Unit}
                </Text>

                <Text className="text-sm text-gray-600">
                  Sales price: {service.salesPrice}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewService}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Service</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Services;
