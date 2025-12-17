import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import Input from "../../components/CustomInput";
import { useNavigation } from "@react-navigation/native";

const BarcodeScan = ({ route }) => {
  const navigation = useNavigation();
  const { code: scannedCode = "" } = route?.params || {};

  const [code, setCode] = useState(scannedCode);
  const [productDesc, setProductDesc] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [uom, setUOM] = useState("");
  const [amount, setAmount] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [taxPercent, setTaxPercent] = useState("");

  const calculateTotal = () => {
    const q = parseFloat(quantity) || 0;
    const p = parseFloat(unitPrice) || 0;
    const disc = parseFloat(discountAmount) || 0;
    const tax = parseFloat(taxPercent) || 0;

    let total = q * p - disc;
    total = total + (total * tax) / 100;
    return total.toFixed(2);
  };

  const onUpdatePress = () => {
    console.log("Barcode updated:", code);

    // Go back and request rescan
    navigation.navigate("Invoice", { rescan: true });
  };

  return (
    <ScrollView className="bg-white px-6 py-8">
      <Input placeholder="Product Code" value={code} onChangeText={setCode} />
      <Input placeholder="Product Description" value={productDesc} onChangeText={setProductDesc} />
      <Input placeholder="Quantity" keyboardType="numeric" value={quantity} onChangeText={setQuantity} />
      <Input placeholder="Unit Price" keyboardType="numeric" value={unitPrice} onChangeText={setUnitPrice} />
      <Input placeholder="UOM" value={uom} onChangeText={setUOM} />
      <Input placeholder="Amount" keyboardType="numeric" value={amount} onChangeText={setAmount} />
      <Input placeholder="Discount Amount" keyboardType="numeric" value={discountAmount} onChangeText={setDiscountAmount} />
      <Input placeholder="Discount %" keyboardType="numeric" value={discountPercent} onChangeText={setDiscountPercent} />
      <Input placeholder="Tax %" keyboardType="numeric" value={taxPercent} onChangeText={setTaxPercent} />

      <View className="mt-6 border-t pt-4">
        <Text className="text-lg font-semibold">TOTAL: {calculateTotal()}</Text>
      </View>

      <TouchableOpacity
        onPress={onUpdatePress}
        className="bg-blue-600 py-4 rounded-2xl mt-8"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Update
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BarcodeScan;
