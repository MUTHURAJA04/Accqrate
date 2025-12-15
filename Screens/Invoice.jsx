import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Camera as CameraIcon, Smartphone, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const Invoice = () => {
  const navigation = useNavigation();
  const [cameraOpen, setCameraOpen] = useState(false);

  const device = useCameraDevice("back");

const openCamera = async () => {
  try {
    let permission = await Camera.getCameraPermissionStatus();
    console.log("Initial camera permission status:", permission);

    if (permission !== "granted") {
      permission = await Camera.requestCameraPermission();
      console.log("Permission status after request:", permission);
    }

    if (permission !== "granted") {
      console.warn("Permission denied, showing alert");
      Alert.alert(
        "Camera Permission Required",
        "Please allow camera access to scan barcodes",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    console.log("Permission granted, opening camera...");
    setCameraOpen(true);
  } catch (error) {
    console.error("Error during camera permission check/request:", error);
    Alert.alert("Error", "An unexpected error occurred while requesting camera permission.");
  }
};


  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "code-128"],
    onCodeScanned: (codes) => {
      if (!codes.length) return;

      const value = codes[0].value;
      console.log("Scanned code:", value);
      setCameraOpen(false);
      Alert.alert("Scanned Code", value);
    },
  });

  if (cameraOpen) {
    if (!device) {
      return (
        <View className="flex-1 items-center justify-center bg-black">
          <Text className="text-white text-lg">Camera not available</Text>
          <TouchableOpacity
            onPress={() => setCameraOpen(false)}
            className="mt-4 bg-blue-600 px-6 py-3 rounded"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
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

        <View className="absolute top-[30%] left-[10%] w-[80%] h-[40%] border-2 border-green-500 rounded-2xl" />

        <TouchableOpacity
          onPress={() => setCameraOpen(false)}
          className="absolute top-12 right-5 bg-black/70 p-3 rounded-full"
        >
          <X size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <View className="flex-row justify-between mb-10">
        <Text className="text-3xl font-bold">Scan</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-3xl text-gray-400">×</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-gray-50 rounded-3xl p-6 items-center mb-10">
        <TouchableOpacity
          onPress={openCamera}
          className="bg-white rounded-3xl p-6 relative"
        >
          <Smartphone size={48} color="#9CA3AF" />
          <View className="absolute top-2 right-2 bg-blue-100 p-1 rounded-full">
            <CameraIcon size={18} color="#2563eb" />
          </View>
        </TouchableOpacity>

        <Text className="mt-4 text-base">
          Scan barcode using your camera
        </Text>
      </View>

      <TouchableOpacity
        onPress={openCamera}
        className="bg-blue-600 py-4 rounded-2xl mb-6"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Open Camera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ManualEntry")}>
        <Text className="text-center font-semibold text-base">
          Enter code manually
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Invoice;
