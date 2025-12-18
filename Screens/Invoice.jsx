import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, Linking, ScrollView } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Smartphone, X, Trash2 } from "lucide-react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";

const TAX_RATE = 0.15; // 15%

const Invoice = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scannedProducts, setScannedProducts] = useState([]);

  const device = useCameraDevice("back");

  const openCamera = async () => {
    let permission = await Camera.getCameraPermissionStatus();
    if (permission !== "granted") {
      permission = await Camera.requestCameraPermission();
    }

    if (permission !== "granted") {
      Alert.alert(
        "Camera Permission Required",
        "Please allow camera access",
        [{ text: "Open Settings", onPress: () => Linking.openSettings() }]
      );
      return;
    }

    setCameraOpen(true);
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.rescan) {
        setCameraOpen(true);
        navigation.setParams({ rescan: false });
      }
      
      // Handle product saved from BarcodeScan (fallback when no callback)
      if (route?.params?.savedProduct) {
        handleSaveProduct(route.params.savedProduct);
        navigation.setParams({ savedProduct: null });
      }
    }, [route?.params?.rescan, route?.params?.savedProduct, navigation])
  );

  // Memoize handleSaveProduct to ensure stable reference
  const handleSaveProduct = useCallback((product) => {
    setScannedProducts((prev) => {
      const existingIndex = prev.findIndex(p => p.code === product.code);

      if (existingIndex >= 0) {
        // Update existing product
        const updated = [...prev];
        updated[existingIndex] = product;
        return updated;
      } else {
        // Add new product - this preserves all previous products
        return [...prev, product];
      }
    });
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "code-128"],
    onCodeScanned: (codes) => {
      if (!codes.length) return;

      const value = codes[0].value;
      setCameraOpen(false);

      const existingProduct = scannedProducts.find(p => p.code === value);

      navigation.navigate("BarcodeScan", {
        code: value,
        initialData: existingProduct,
        onSaveProduct: handleSaveProduct,
        isEdit: !!existingProduct, // Set isEdit if product exists (for editing)
        fromInvoice: true, // Flag to indicate coming from Invoice (scanning)
      });
    },
  });

  const onFinishedAllPress = () => {
    if (scannedProducts.length === 0) {
      Alert.alert("No Products Scanned", "Please scan at least one product before finishing.");
      return;
    }

    Alert.alert(
      "Finish Scanning",
      `Are you sure you have finished scanning all ${scannedProducts.length} item(s)?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            setCameraOpen(false);

            // Delay navigation slightly to allow camera to close and avoid black screen
            setTimeout(() => {
              console.log("✅ FINAL POS PRODUCTS:", scannedProducts);
              const totalAmount = scannedProducts.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);
              console.log("Total amount: ₹", totalAmount.toFixed(2));
              navigation.navigate("Checkout", { scannedProducts, totalAmount });
            }, 300);
          },
        },
      ]
    );
  };

  const removeProduct = (productCode) => {
    Alert.alert(
      "Remove Product",
      "Are you sure you want to remove this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setScannedProducts(prev => prev.filter(p => p.code !== productCode));
          },
        },
      ]
    );
  };

  const clearAllProducts = () => {
    if (scannedProducts.length === 0) return;

    Alert.alert(
      "Clear All Products",
      `Are you sure you want to remove all ${scannedProducts.length} products?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => setScannedProducts([]),
        },
      ]
    );
  };

  if (cameraOpen) {
    if (!device) {
      return (
        <View className="flex-1 justify-center items-center bg-black">
          <Text className="text-white text-base">Camera not available</Text>
        </View>
      );
    }

    return (
      <View className="flex-1 bg-black">
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive={cameraOpen}
          codeScanner={codeScanner}
        />

        <View className="absolute top-[25%] left-[10%] w-[80%] h-[35%] border-2 border-green-500 rounded-2xl" />

        <TouchableOpacity
          onPress={() => setCameraOpen(false)}
          className="absolute top-12 right-5 bg-black/70 p-3 rounded-full"
        >
          <X size={24} color="white" />
        </TouchableOpacity>

        <View className="absolute bottom-6 left-6 right-6">
          <TouchableOpacity
            onPress={onFinishedAllPress}
            className="bg-blue-600 py-4 rounded-2xl items-center"
          >
            <Text className="text-white text-lg font-semibold">Done Scanning</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Total amount for all products
  const totalAmount = scannedProducts.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);
  // Total tax amount for all products
  const totalTax = scannedProducts.reduce((sum, p) => sum + (parseFloat(p.total || 0) * TAX_RATE), 0);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-12 pb-4 border-b border-gray-200">
        <Text className="text-3xl font-bold text-gray-900">Invoice</Text>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-lg font-semibold text-gray-600">
            Products: {scannedProducts.length}
          </Text>
          {scannedProducts.length > 0 && (
            <TouchableOpacity onPress={clearAllProducts}>
              <Text className="text-red-600 font-semibold">Clear All</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Products List or Empty */}
      {scannedProducts.length > 0 ? (
        <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator>
          {scannedProducts.map((product, index) => {
            const productTax = (parseFloat(product.total || 0) * TAX_RATE).toFixed(3);
            return (
              <TouchableOpacity
                key={`${product.code}-${index}`}
                onPress={() => {
                  // Edit product - navigate to BarcodeScan with edit mode
                  navigation.navigate("BarcodeScan", {
                    code: product.code,
                    initialData: product,
                    isEdit: true,
                    onSaveProduct: handleSaveProduct,
                    fromInvoice: true, // Flag to indicate coming from Invoice
                  });
                }}
                activeOpacity={0.7}
                className="bg-gray-50 p-4 rounded-xl mb-3 flex-row justify-between items-center"
              >
                <View className="flex-1 pr-3">
                  <Text className="font-bold text-gray-900 text-base">
                    {product.productDesc || `Product ${index + 1}`}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">Code: {product.code}</Text>
                  <View className="flex-row space-x-6 mt-2 max-w-[280px]">
                    <Text className="text-gray-600 text-xs">Qty: {product.quantity}</Text>
                    <Text className="text-gray-600 text-xs">Price: ₹{product.unitPrice}</Text>
                    <Text className="text-gray-600 text-xs">UOM: {product.uom}</Text>
                  </View>
                  {/* TAX display */}
                  <Text className="text-green-600 text-xs mt-1 font-semibold">
                    Tax 15% = ₹{productTax}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-gray-900 text-lg">₹{product.total}</Text>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent triggering parent TouchableOpacity
                      removeProduct(product.code);
                    }}
                    className="mt-2 p-1"
                  >
                    <Trash2 size={18} color="#dc2626" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-gray-100 rounded-3xl p-10 items-center">
            <Smartphone size={64} color="#9ca3af" />
            <Text className="mt-6 text-gray-600 text-center">
              Scan products using your camera
            </Text>
            <Text className="mt-2 text-gray-400 text-center text-sm">
              No products added yet
            </Text>
          </View>
        </View>
      )}

      {/* Bottom bar */}
      <View className="px-6 py-5 border-t border-gray-200">
        {scannedProducts.length > 0 && (
          <>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold text-gray-900">Total:</Text>
              <Text className="text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-green-700 font-semibold text-base">Total Tax (15%):</Text>
              <Text className="text-green-700 font-semibold text-base">₹{totalTax.toFixed(3)}</Text>
            </View>
          </>
        )}

        <View className="flex flex-col gap-y-3">
          <TouchableOpacity
            onPress={openCamera}
            className="bg-blue-600 py-4 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-semibold">
              {scannedProducts.length > 0 ? "Scan More Items" : "Start Scanning"}
            </Text>
          </TouchableOpacity>

          {scannedProducts.length > 0 && (
            <TouchableOpacity
              onPress={onFinishedAllPress}
              className="bg-green-400 py-4 rounded-xl items-center"
            >
              <Text className="text-white text-lg font-semibold">Finished all?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("ManualSelection", { onSaveProduct: handleSaveProduct })}
            className="border border-blue-600 py-3 rounded-xl items-center"
          >
            <Text className="text-blue-600 text-lg font-medium">Enter Product Manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Invoice;
