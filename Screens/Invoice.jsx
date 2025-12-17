import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import { Camera, useCameraDevice, useCodeScanner } from "react-native-vision-camera";
import { Camera as CameraIcon, Smartphone, X } from "lucide-react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Invoice = ({ route }) => {
  const navigation = useNavigation();
  const [cameraOpen, setCameraOpen] = useState(false);
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

  // 🔁 Auto reopen camera after Update
  useFocusEffect(
    useCallback(() => {
      if (route?.params?.rescan) {
        setCameraOpen(true);

        // clear flag to avoid loop
        navigation.setParams({ rescan: false });
      }
    }, [route?.params?.rescan])
  );

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13", "code-128"],
    onCodeScanned: (codes) => {
      if (!codes.length) return;

      const value = codes[0].value;
      setCameraOpen(false);
      navigation.navigate("BarcodeScan", { code: value });
    },
  });

if (cameraOpen) {
  if (!device) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-white">Camera not available</Text>
      </View>
    );
  }
const onFinishedAllPress = () => {
  Alert.alert(
    "Finish Scanning",
    "Are you sure you have finished scanning all items?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setCameraOpen(false);
        },
      },
    ]
  );
};

  return (
    <View className="flex-1 bg-black">
      {/* Camera */}
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={cameraOpen}
        codeScanner={codeScanner}
      />

      {/* Scan box */}
      <View className="absolute top-[25%] left-[10%] w-[80%] h-[35%] border-2 border-green-500 rounded-2xl" />

      {/* Close icon */}
      <TouchableOpacity
        onPress={() => setCameraOpen(false)}
        className="absolute top-12 right-5 bg-black/70 p-3 rounded-full"
      >
        <X size={24} color="white" />
      </TouchableOpacity>

      {/* Finished All Button */}
      <View className="absolute bottom-6 left-0 right-0 px-6">
        <TouchableOpacity
          onPress={onFinishedAllPress}
          className="bg-red-600 py-4 rounded-2xl"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Finished All
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


  return (
    <View className="flex-1 bg-white px-6 pt-12">
      <Text className="text-3xl font-bold mb-10">Scan</Text>

      <View className="bg-gray-50 rounded-3xl p-6 items-center mb-10">
        <TouchableOpacity onPress={openCamera} className="bg-white p-6 rounded-3xl">
          <Smartphone size={48} color="#9CA3AF" />
          <View className="absolute top-2 right-2 bg-blue-100 p-1 rounded-full">
            <CameraIcon size={18} color="#2563eb" />
          </View>
        </TouchableOpacity>
        <Text className="mt-4">Scan barcode using your camera</Text>
      </View>

      <TouchableOpacity
        onPress={openCamera}
        className="bg-blue-600 py-4 rounded-2xl mb-6"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Open Camera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("BarcodeScan")}>
        <Text className="text-center font-semibold">
          Enter code manually
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Invoice;
