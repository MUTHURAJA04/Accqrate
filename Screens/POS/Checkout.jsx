import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Trash2 } from "lucide-react-native";
import { saveInvoiceWithAutoNo } from  "../../utils/invoiceStorage";
const Checkout = () => {
  const route = useRoute();
  const navigation = useNavigation();
  
  // Initialize local state from route params
  const [scannedProducts, setScannedProducts] = useState(route.params?.scannedProducts || []);
  const [totalAmount, setTotalAmount] = useState(route.params?.totalAmount || 0);

  // Recalculate total tax when products change
  const totalTax = scannedProducts.reduce(
    (acc, product) => acc + (product.taxPercent / 100) * product.total,
    0,
  );

  // Recalculate total amount whenever products change
  useEffect(() => {
    const newTotal = scannedProducts.reduce((sum, p) => sum + parseFloat(p.total), 0);
    setTotalAmount(newTotal);
  }, [scannedProducts]);

  // Clear all products confirmation
  const handleClear = () => {
    if (scannedProducts.length === 0) {
      Alert.alert('Nothing to clear', 'Your cart is already empty.');
      return;
    }
    Alert.alert(
      'Clear All?',
      'Are you sure you want to clear all products?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Clear',
          style: 'destructive',
          onPress: () => {
            setScannedProducts([]);
            setTotalAmount(0);
          },
        },
      ]
    );
  };

  // Remove a single product
  const handleRemoveProduct = (code) => {
    Alert.alert(
      'Remove Product?',
      'Are you sure you want to remove this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const filtered = scannedProducts.filter(p => p.code !== code);
            setScannedProducts(filtered);
          },
        },
      ]
    );
  };

  // Proceed button handler
const handleProceed = async () => {
  if (scannedProducts.length === 0) {
    Alert.alert('No products', 'Please add products before proceeding.');
    return;
  }

  try {
    const invoiceNo = await saveInvoiceWithAutoNo(scannedProducts, totalAmount, totalTax);
    Alert.alert('Invoice saved', `Invoice Number: ${invoiceNo}`);

    navigation.navigate('Pospayment', { totalAmount: totalAmount + totalTax, invoiceNo });
  } catch {
    Alert.alert('Error', 'Failed to save invoice data. Please try again.');
  }
};
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-grow p-4"
        contentContainerStyle={{ paddingBottom: 310 }}
        showsVerticalScrollIndicator={false}
      >
        {scannedProducts.length === 0 ? (
          <Text className="text-center text-gray-500 mt-20 text-lg">
            No products to display
          </Text>
        ) : (
          scannedProducts.map((product, index) => (
            <View
              key={`${product.code}-${index}`}
              className="flex-row border-b border-gray-300 py-3 items-center"
            >
              <View className="w-16 h-16 bg-gray-200 rounded-md mr-3 flex items-center justify-center">
                <Text className="text-xs text-gray-400">Image</Text>
              </View>

              <View className="flex-1">
                <Text className="font-bold text-base">
                  {product.productDesc || `Product ${index + 1}`}
                </Text>
                <Text className="text-xs text-gray-600">
                  Tax {product.taxPercent}% = ₹
                  {((product.taxPercent / 100) * product.total).toFixed(3)} BHD
                </Text>
              </View>

              <View className="items-end space-y-1">
                <Text className="text-sm font-semibold">Qty: {product.quantity}</Text>
                <Text className="text-sm font-semibold">
                  Price: ₹{parseFloat(product.total).toFixed(3)} BHD
                </Text>
              </View>

              <TouchableOpacity
                className="ml-3"
                onPress={() => handleRemoveProduct(product.code)}
              >
                <Trash2 color="#ef4444" size={24} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <View className="absolute bottom-20 left-0 right-0 bg-gray-100 p-4 border-t border-gray-300">
        <View className="space-y-2">
          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-800">Total Amount</Text>
            <Text className="font-semibold text-gray-800">
              ₹{parseFloat(totalAmount).toFixed(3)} BHD
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-800">
              Total Line Discount / Charge
            </Text>
            <Text className="font-semibold text-gray-800">0.000 BHD</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-semibold text-gray-800">
              Total Doc Discount / Charge
            </Text>
            <Text className="font-semibold text-gray-800">0.000 BHD</Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-300 pt-2">
            <Text className="font-bold text-lg">Total Net</Text>
            <Text className="font-bold text-lg">
              ₹{parseFloat(totalAmount).toFixed(3)} BHD
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="font-bold text-lg">Total TAX</Text>
            <Text className="font-bold text-lg">
              ₹{totalTax.toFixed(3)} BHD
            </Text>
          </View>

          <View className="flex-row justify-between border-t border-gray-300 pt-2">
            <Text className="font-extrabold text-xl">Amount to be paid</Text>
            <Text className="font-extrabold text-xl">
              ₹{(parseFloat(totalAmount) + totalTax).toFixed(3)} BHD
            </Text>
          </View>

          <View className="mt-4 flex-row justify-end space-x-8">
            <TouchableOpacity
              className="border border-gray-400 rounded px-4 py-2 mr-1"
              onPress={() => Alert.alert('Doc Discount', 'Add doc discount logic here')}
            >
              <Text className="text-gray-800 font-semibold">+ DOC DISCOUNT</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border border-gray-400 rounded px-4 py-2"
              onPress={() => Alert.alert('Doc Charge', 'Add doc charge logic here')}
            >
              <Text className="text-gray-800 font-semibold">+ DOC CHARGE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-4">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="bg-blue-600 rounded px-6 py-3" onPress={handleClear}>
            <Text className="text-white font-bold text-lg">✖ Clear</Text>
          </TouchableOpacity>

          <Text className="text-2xl font-extrabold">
            ₹{(parseFloat(totalAmount) + totalTax).toFixed(3)} BHD
          </Text>

          <TouchableOpacity className="bg-green-600 rounded px-6 py-3" onPress={handleProceed}>
            <Text className="text-white font-bold text-lg">Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Checkout;
