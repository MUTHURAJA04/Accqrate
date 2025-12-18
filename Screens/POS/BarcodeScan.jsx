import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import Input from "../../components/CustomInput";
import { useNavigation, useRoute } from "@react-navigation/native";

const BarcodeScan = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { code: scannedCode = "", initialData, onSaveProduct, isEdit = false } = route?.params || {};

  const [code, setCode] = useState(initialData?.code || scannedCode || "");
  const [productDesc, setProductDesc] = useState(initialData?.productDesc || "");
  const [quantity, setQuantity] = useState(initialData?.quantity?.toString() || "1");
  const [unitPrice, setUnitPrice] = useState(initialData?.unitPrice?.toString() || "");
  const [uom, setUOM] = useState(initialData?.uom || "pcs");
  const [discountAmount, setDiscountAmount] = useState(initialData?.discountAmount?.toString() || "0");
  const [discountPercent, setDiscountPercent] = useState(initialData?.discountPercent?.toString() || "0");
  const [taxPercent, setTaxPercent] = useState(initialData?.taxPercent?.toString() || "0");

  const calculateTotal = () => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(unitPrice) || 0;
    const discAmt = parseFloat(discountAmount) || 0;
    const discPct = parseFloat(discountPercent) || 0;
    const tax = parseFloat(taxPercent) || 0;

    let baseAmount = q * p;
    let discount = discAmt;
    if (discPct > 0) {
      discount += (baseAmount * discPct) / 100;
    }
    let total = baseAmount - discount;
    if (tax > 0) {
      total += (total * tax) / 100;
    }
    return total > 0 ? total.toFixed(2) : "0.00";
  };

  const onSavePress = () => {
    if (!code.trim()) {
      Alert.alert("Error", "Product code is required");
      return;
    }
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(unitPrice) || 0;
    const amount = (q * p).toFixed(2);

    const product = {
      code: code.trim(),
      productDesc: productDesc.trim(),
      quantity: Number(quantity) || 0,
      unitPrice: Number(unitPrice) || 0,
      uom: uom.trim(),
      amount: Number(amount),
      discountAmount: Number(discountAmount) || 0,
      discountPercent: Number(discountPercent) || 0,
      taxPercent: Number(taxPercent) || 0,
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    if (onSaveProduct) {
      // Direct callback - Invoice passed it
      onSaveProduct(product);
      navigation.goBack();
    } else {
      // No callback - navigate back to Invoice with product in params
      // Invoice will pick it up via useFocusEffect
      navigation.navigate("Invoice", { savedProduct: product });
    }
  };

  const total = calculateTotal();
  const amount = ((parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0)).toFixed(2);

  return (
    <ScrollView
      className="bg-white px-6 py-8 flex-1"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text className="text-2xl font-bold mb-6">
        {isEdit ? "Edit Product" : "Add Product"}
      </Text>

      <View className="space-y-4">
        <Input
          placeholder="Enter barcode"
          value={code}
          onChangeText={setCode}
          autoFocus={!code}
        />

        <Input
          placeholder="Product description"
          value={productDesc}
          onChangeText={setProductDesc}
        />

        <View className="flex-row space-x-2">
          <View className="flex-1">
            <Input
              placeholder="Quantity"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
          <View className="flex-1">
            <Input
              placeholder="Price"
              keyboardType="numeric"
              value={unitPrice}
              onChangeText={setUnitPrice}
            />
          </View>
          <View className="flex-1">
            <Input
              placeholder="UOM"
              value={uom}
              onChangeText={setUOM}
            />
          </View>
        </View>

        <View className="space-y-3">
          <Input
            placeholder="Discount Amount"
            keyboardType="numeric"
            value={discountAmount}
            onChangeText={setDiscountAmount}
          />
          <Input
            placeholder="Discount %"
            keyboardType="numeric"
            value={discountPercent}
            onChangeText={setDiscountPercent}
          />
          <Input
            placeholder="Tax %"
            keyboardType="numeric"
            value={taxPercent}
            onChangeText={setTaxPercent}
          />
        </View>
      </View>

      <View className="mt-8 p-4 bg-gray-50 rounded-xl">
        <Text className="text-lg font-bold mb-2">Calculation</Text>
        <View className="space-y-1">
          <View className="flex-row justify-between">
            <Text>Subtotal:</Text>
            <Text>₹{amount}</Text>
          </View>
          {(Number(discountAmount) > 0 || Number(discountPercent) > 0) && (
            <View className="flex-row justify-between">
              <Text>Discount:</Text>
              <Text className="text-red-600">
                - ₹{(parseFloat(discountAmount) + (parseFloat(amount) * parseFloat(discountPercent) / 100)).toFixed(2)}
              </Text>
            </View>
          )}
          {Number(taxPercent) > 0 && (
            <View className="flex-row justify-between">
              <Text>Tax:</Text>
              <Text className="text-green-600">
                + ₹{((parseFloat(total) * parseFloat(taxPercent)) / 100).toFixed(2)}
              </Text>
            </View>
          )}
          <View className="border-t border-gray-300 mt-2 pt-2 flex-row justify-between">
            <Text className="font-bold">Total:</Text>
            <Text className="text-xl font-bold">₹{total}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={onSavePress}
        className="bg-blue-600 py-4 rounded-xl mt-8"
      >
        <Text className="text-white text-center text-lg font-semibold">
          {isEdit ? "Update" : "Save Product"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="py-3 rounded-xl mt-2"
      >
        <Text className="text-gray-600 text-center">Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BarcodeScan;
