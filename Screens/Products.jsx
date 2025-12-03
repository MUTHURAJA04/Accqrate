import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Search } from 'lucide-react-native';

const Products = ({ route }) => {
  const navigation = useNavigation();
  const [productData, setProductData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Listen for new/updated product data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newProduct) {
        const newProduct = route.params.newProduct;
        console.log('Received product data:', newProduct);
        console.log('Is Edit:', newProduct.isEdit);
        console.log('Product ID:', newProduct.id);
        
        if (newProduct.isEdit && newProduct.id) {
          // Update existing product - preserve all fields and update with new data
          setProductData(prev => {
            console.log('Current product list:', prev);
            console.log('Looking for product with ID:', newProduct.id);
            
            const productIndex = prev.findIndex(product => {
              const match = product.id === newProduct.id || product.id?.toString() === newProduct.id?.toString();
              return match;
            });
            
            console.log('Product index found:', productIndex);
            
            if (productIndex !== -1) {
              // Product found, update it
              const updatedProducts = [...prev];
              updatedProducts[productIndex] = {
                ...prev[productIndex], // Keep all existing fields
                ...newProduct, // Override with updated form data
                id: newProduct.id, // Ensure ID is preserved
                productCode: newProduct.productCode || prev[productIndex].productCode,
                productDesc: newProduct.productDesc || prev[productIndex].productDesc,
                materialType: newProduct.materialType || prev[productIndex].materialType,
                category: newProduct.category || prev[productIndex].category,
                salesPrice: newProduct.salesPrice || prev[productIndex].salesPrice,
              };
              console.log('Updated product:', updatedProducts[productIndex]);
              return updatedProducts;
            } else {
              // Product not found by ID - add it as new product to prevent data loss
              console.warn('Product with ID not found, adding as new product:', newProduct.id);
              const productCard = {
                id: newProduct.id,
                productCode: newProduct.productCode || 'N/A',
                productDesc: newProduct.productDesc || 'N/A',
                materialType: newProduct.materialType || 'N/A',
                category: newProduct.category || 'N/A',
                salesPrice: newProduct.salesPrice || 'N/A',
              };
              return [productCard, ...prev];
            }
          });
        } else {
          // Add new product to the list
          const productCard = {
            id: newProduct.id || Date.now().toString(), // Generate unique ID if not provided
            productCode: newProduct.productCode || 'N/A',
            productDesc: newProduct.productDesc || 'N/A',
            materialType: newProduct.materialType || 'N/A',
            category: newProduct.category || 'N/A',
            salesPrice: newProduct.salesPrice || 'N/A',
            productDescArabic: newProduct.productDescArabic || '',
            uom: newProduct.uom || '',
            costPurchase: newProduct.costPurchase || '',
            barcode: newProduct.barcode || '',
            taxType: newProduct.taxType || 'inclusive',
            taxPercent: newProduct.taxPercent || '',
            image: newProduct.image || null,
          };
          console.log('Adding new product:', productCard);
          setProductData(prev => {
            const newList = [productCard, ...prev];
            console.log('New product list:', newList);
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newProduct: undefined });
        }, 100);
      }
    }, [route?.params?.newProduct, navigation])
  );

  const handleNewProduct = () => {
    console.log('Product Button Pressed');
    navigation.navigate("NewProduct");
  };

  const handleEditProduct = (product) => {
    navigation.navigate('EditProduct', {
      editProduct: product,
    });
  };

  // Filter products based on search query
  const filteredProducts = productData.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.productCode?.toLowerCase().includes(query) ||
      product.productDesc?.toLowerCase().includes(query) ||
      product.materialType?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  const ProductCard = ({ product }) => (
    <TouchableOpacity
      className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
      onPress={() => handleEditProduct(product)}
      activeOpacity={0.7}
    >
      {/* Vertical Blue Bar */}
      <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      
      {/* Card Content */}
      <View className="pl-4 pr-4 pt-4 pb-4">
        {/* Material no | Material description */}
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {product.productCode} | {product.productDesc}
        </Text>
        
        {/* Material Type, Material Group */}
        <Text className="text-sm text-gray-600 mb-1">
          {product.materialType}, {product.category}
        </Text>
        
        {/* Sales price */}
        <Text className="text-sm text-gray-600">
          Sales price: {product.salesPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Debug: Log product data whenever it changes
  React.useEffect(() => {
    console.log('Product data updated, count:', productData.length);
    console.log('Product IDs:', productData.map(p => p.id));
  }, [productData]);

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
            placeholder="Search material..."
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

      <ScrollView className="flex-1 px-6">
        {filteredProducts.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">
              {searchQuery ? 'No products found' : 'No products added yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {searchQuery ? 'Try a different search term' : 'Tap the + Products button to add one'}
            </Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id || `product-${product.productCode}`} product={product} />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewProduct}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Products</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Products;