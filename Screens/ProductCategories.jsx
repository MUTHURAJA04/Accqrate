import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductCategories = () => {
  const navigation = useNavigation();

  const handleNewProductCategories = () => {
    console.log('Store Button Pressed');
    navigation.navigate("NewProductCategorie");
  };

  return (
    <View className="flex-1 bg-white">
      {/* <Text className="text-xl font-semibold p-4">Product Categories</Text> */}

      {/* Card */}
      <TouchableOpacity
        className="bg-gray-50 border border-gray-200 rounded-lg mx-4 mb-4 overflow-hidden"
        activeOpacity={0.7}
        onPress={() => console.log("Category Pressed")}
      >
        {/* Vertical Blue Bar */}
        <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

        {/* Card Content */}
        <View className="pl-4 pr-4 pt-4 pb-4">
          <Text className="text-gray-800">Category Name</Text>
        </View>
      </TouchableOpacity>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewProductCategories}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCategories;
