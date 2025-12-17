import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScanBarcode, Hand } from "lucide-react-native"; // icons
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const SetupPos = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-white px-5 pt-4">

      {/* Barcode Scan */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        onPress={() => navigation.navigate("Invoice")}
      >
        {/* Icon */}
        <View className="mr-5">
          <ScanBarcode size={36} color="#000" strokeWidth={1.5} />
        </View>

        {/* Text */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Barcode Scan
          </Text>
          <Text className="text-sm text-gray-700 leading-5">
            If you have given barcodes for your products, you can scan them easily.
          </Text>
        </View>
      </TouchableOpacity>

      {/* Manual Selection */}
      <TouchableOpacity
        activeOpacity={0.85}
        className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        onPress={() => navigation.navigate("ManualSelection")}
      >
        {/* Icon */}
        <View className="mr-5">
          <Hand size={36} color="#000" strokeWidth={1.5} />
        </View>

        {/* Text */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            Manual Selection
          </Text>
          <Text className="text-sm text-gray-700 leading-5">
            If you have no barcodes, you can choose materials manually.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SetupPos;
