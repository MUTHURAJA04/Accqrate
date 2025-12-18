import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { PRODUCTS } from "../../DATA/products";

const ManualSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSaveProduct } = route?.params || {};

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  // Build categories dynamically
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(PRODUCTS.map(p => p.category || "General")),
    ];
    setCategories(["All", ...uniqueCategories]);
  }, []);

  // Filter products
  const filteredProducts = PRODUCTS.filter(item => {
    const matchesSearch =
      item.code.toLowerCase().includes(search.toLowerCase()) ||
      item.productDesc.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      (item.category || "General") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 🔥 MAIN FIXED FLOW
  // ManualSelection passes the onSaveProduct callback to BarcodeScan
  // This ensures products are added correctly without losing existing products
  const onSelectProduct = product => {
    navigation.navigate("BarcodeScan", {
      initialData: {
        code: product.code,
        productDesc: product.productDesc,
        unitPrice: product.unitPrice,
        quantity: 1,
        uom: product.uom || "pcs",
        taxPercent: product.taxPercent || 0,
      },
      isEdit: false, // ✅ ADD MODE
      onSaveProduct: onSaveProduct, // Pass the callback from Invoice
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onSelectProduct(item)}
      className="w-[48%] bg-white rounded-xl p-3 mb-4 shadow-md"
    >
      <Image
        source={{ uri: item.image }}
        className="h-28 w-full rounded-lg mb-2"
        resizeMode="cover"
      />

      <Text className="font-semibold text-sm mb-1" numberOfLines={2}>
        {item.productDesc}
      </Text>

      <Text className="text-gray-500 text-xs">Code: {item.code}</Text>

      <Text className="text-blue-600 font-bold mt-2">
        ₹{item.unitPrice}
      </Text>

      <Text className="text-xs text-gray-400 mt-1">
        {item.category || "General"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Search */}
      <View className="px-4 pt-4">
        <TextInput
          placeholder="Search by Code or Product Name..."
          value={search}
          onChangeText={setSearch}
          className="bg-white border border-gray-300 px-4 py-3 rounded-xl mb-3 shadow-sm"
        />
      </View>

      {/* Categories */}
      <View className="px-4 mb-3">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-2 px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-blue-600"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product Grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.code}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ManualSelection;
