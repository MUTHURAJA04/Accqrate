import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { FileText, Receipt, History, X } from "lucide-react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FULL_ROUND_RADIUS = 40;

const PosQuickActions = ({ visible, onClose, onSelect }) => {
  const slideAnim = useRef(new Animated.Value(300)).current; // initial offscreen

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 280,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const actions = [
    { id: "Invoice", label: "Invoice", icon: FileText, screen: "SetupPos"},
    { id: "CreditNote", label: "Credit Note", icon: Receipt, screen: "CreditNote"},
    { id: "BillsHistory", label: "Bills History", icon: History, screen: "BillsHistory"},
  ];

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Blur background */}
      <TouchableWithoutFeedback onPress={onClose}>
        <BlurView
          blurType="light"
          blurAmount={18}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.15)",
          }}
        />
      </TouchableWithoutFeedback>

      {/* Sliding panel */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          width: SCREEN_WIDTH,
          borderTopLeftRadius: FULL_ROUND_RADIUS,
          borderTopRightRadius: FULL_ROUND_RADIUS,
          overflow: "hidden",
          transform: [{ translateY: slideAnim }],
          backgroundColor: "rgba(255, 255, 255, 0.98)",
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: -4 },
          shadowRadius: 12,
          elevation: 20,
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 28,
          minHeight: 220,          // minHeight so it can grow if needed but no extra space
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "800", color: "#0077CC" }}>
            Quick Actions
          </Text>
          <TouchableOpacity onPress={onClose} accessibilityLabel="Close quick actions">
            <X size={24} color="#0077CC" />
          </TouchableOpacity>
        </View>

        {/* Actions */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  {actions.map((action) => {
    const Icon = action.icon;
    return (
      <TouchableOpacity
        key={action.id}
        onPress={() => {
          onSelect(action); // pass full action object
          onClose();
        }}
        activeOpacity={0.85}
        style={{
          backgroundColor: "white",
          width: "30%",
          paddingVertical: 18,
          borderRadius: 24,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 6,
          elevation: 10,
        }}
        accessibilityLabel={`Quick action ${action.label}`}
      >
        <Icon size={30} color="#0077CC" />
        <Text
          style={{
            marginTop: 10,
            fontSize: 16,
            fontWeight: "700",
            color: "#0077CC",
            textAlign: "center",
          }}
        >
          {action.label}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>

      </Animated.View>
    </Modal>
  );
};

export default PosQuickActions;
