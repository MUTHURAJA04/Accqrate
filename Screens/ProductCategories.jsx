import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Search } from 'lucide-react-native';

const ProductCategories = ({ route }) => {
  const navigation = useNavigation();
  // Use ref to persist data across remounts
  const categoryDataRef = useRef([]);
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize state from ref on mount (in case component was remounted)
  React.useEffect(() => {
    if (categoryDataRef.current.length > 0) {
      setCategoryData(categoryDataRef.current);
    }
  }, []);
  
  // Keep ref in sync with state
  React.useEffect(() => {
    categoryDataRef.current = categoryData;
  }, [categoryData]);

  // Listen for new/updated category data when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.newCategory) {
        const newCategory = route.params.newCategory;
        console.log('Received category data:', newCategory);
        console.log('Is Edit:', newCategory.isEdit);
        console.log('Category ID:', newCategory.id);
        console.log('Current categoryDataRef:', categoryDataRef.current);
        
        if (newCategory.isEdit && newCategory.id) {
          // Update existing category - preserve all fields and update with new data
          setCategoryData(prev => {
            // Use ref's current value if prev is empty (component was remounted)
            const currentList = Array.isArray(prev) && prev.length > 0 
              ? prev 
              : (Array.isArray(categoryDataRef.current) ? categoryDataRef.current : []);
            console.log('Current category list:', currentList);
            console.log('Looking for category with ID:', newCategory.id);
            
            const categoryIndex = currentList.findIndex(category => {
              const match = category.id === newCategory.id || category.id?.toString() === newCategory.id?.toString();
              return match;
            });
            
            console.log('Category index found:', categoryIndex);
            
            if (categoryIndex !== -1) {
              // Category found, update it
              const updatedCategories = [...currentList];
              updatedCategories[categoryIndex] = {
                ...currentList[categoryIndex], // Keep all existing fields
                ...newCategory, // Override with updated form data
                id: newCategory.id, // Ensure ID is preserved
                categoryName: newCategory.categoryName || currentList[categoryIndex].categoryName,
                status: newCategory.status !== undefined ? newCategory.status : currentList[categoryIndex].status,
              };
              console.log('Updated category:', updatedCategories[categoryIndex]);
              // Update ref immediately
              categoryDataRef.current = updatedCategories;
              return updatedCategories;
            } else {
              // Category not found by ID - add it as new category to prevent data loss
              console.warn('Category with ID not found, adding as new category:', newCategory.id);
              const categoryCard = {
                id: newCategory.id,
                categoryName: newCategory.categoryName || 'N/A',
                status: newCategory.status || false,
              };
              const newList = [categoryCard, ...currentList];
              // Update ref immediately
              categoryDataRef.current = newList;
              return newList;
            }
          });
        } else {
          // Add new category to the list
          const categoryCard = {
            id: newCategory.id || Date.now().toString(), // Generate unique ID if not provided
            categoryName: newCategory.categoryName || 'N/A',
            status: newCategory.status || false,
          };
          console.log('Adding new category:', categoryCard);
          console.log('Current categoryData before update:', categoryData);
          console.log('Current categoryDataRef before update:', categoryDataRef.current);
          setCategoryData(prev => {
            // Use ref's current value if prev is empty (component was remounted)
            const prevArray = Array.isArray(prev) && prev.length > 0 
              ? prev 
              : (Array.isArray(categoryDataRef.current) ? categoryDataRef.current : []);
            console.log('Previous state in setCategoryData:', prevArray);
            console.log('Previous state length:', prevArray.length);
            // Check if category with this ID already exists
            const exists = prevArray.some(cat => 
              cat.id === categoryCard.id || 
              cat.id?.toString() === categoryCard.id?.toString()
            );
            if (exists) {
              console.log('Category already exists, skipping:', categoryCard.id);
              return prevArray; // Return existing state without changes
            }
            const newList = [categoryCard, ...prevArray];
            console.log('New category list after update:', newList);
            console.log('New list length:', newList.length);
            // Update ref immediately
            categoryDataRef.current = newList;
            return newList;
          });
        }
        
        // Clear the params to avoid adding duplicate on next focus
        setTimeout(() => {
          navigation.setParams({ newCategory: undefined });
        }, 100);
      }
    }, [route?.params?.newCategory, navigation])
  );

  const handleNewProductCategories = () => {
    console.log('Store Button Pressed');
    navigation.navigate("NewProductCategorie");
  };

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoryData;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return categoryData.filter(category => {
      const categoryName = (category.categoryName || '').toLowerCase();
      return categoryName.includes(query);
    });
  }, [categoryData, searchQuery]);

  const CategoryCard = ({ category }) => (
    <View
      className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
    >
      {/* Vertical Blue Bar */}
      <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />
      
      {/* Card Content */}
      <View className="pl-4 pr-4 pt-4 pb-4">
        {/* Category name */}
        <Text className="text-lg font-bold text-gray-900 mb-2">
          {category.categoryName}
        </Text>
      </View>
    </View>
  );

  // Debug: Log category data whenever it changes
  React.useEffect(() => {
    console.log('Category data updated, count:', categoryData.length);
    console.log('Category IDs:', categoryData.map(c => c.id));
  }, [categoryData]);

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
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search categories..."
            placeholderTextColor="#9CA3AF"
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
        {filteredCategories.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">
              {searchQuery.trim() ? 'No categories found' : 'No categories added yet'}
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
              {searchQuery.trim() ? 'Try a different search term' : 'Tap the + Store button to add one'}
            </Text>
          </View>
        ) : (
          filteredCategories.map((category) => (
            <CategoryCard key={category.id || `category-${category.categoryName}`} category={category} />
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-blue-600 rounded-full px-5 py-3 shadow-lg"
        onPress={handleNewProductCategories}
        activeOpacity={0.7}
      >
        <Text className="text-white font-semibold">+ Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCategories;
