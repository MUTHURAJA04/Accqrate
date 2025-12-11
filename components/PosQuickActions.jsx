import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
import { FileText, Receipt, History } from "lucide-react-native";

const PosQuickActions = ({ onSelect, onSwipeClose, children }) => {
  const actions = [
    { id: "invoice", label: "Invoice", icon: FileText },
    { id: "credit-note", label: "Credit Note", icon: Receipt },
    { id: "bills-history", label: "Bills History", icon: History },
  ];

  // Swipe Config — prevents oversensitivity
  const swipeConfig = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeClose}
      onSwipeRight={onSwipeClose}
      config={swipeConfig}
      style={styles.wrapper}
    >
      {/* Quick Actions Panel */}
      <View style={styles.actionContainer}>
        <Text style={styles.title}>POS Quick Actions</Text>

        <View style={styles.row}>
          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onSelect(item.id)}
                style={styles.actionButton}
                activeOpacity={0.8}
              >
                <Icon size={26} color="#0077CC" />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Render Terminal Card */}
      <View>{children}</View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  actionContainer: {
    backgroundColor: "#E5F3FF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    width: "30%",
    borderRadius: 14,
    alignItems: "center",
    elevation: 2, // fixes Android shadow
  },
  label: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
    textAlign: "center",
  },
});

export default PosQuickActions;
