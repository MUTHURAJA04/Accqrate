import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PosQuickActions from "../components/PosQuickActions";
import { Menu } from "lucide-react-native";


const dummySalesData = [
  { id: 1, TerminalNo: "T001", TerminalName: "Karaikudi Branch", lastUpdated: "2 hours ago" },
  { id: 2, TerminalNo: "T002", TerminalName: "Madurai Branch", lastUpdated: "Yesterday" },
  { id: 3, TerminalNo: "T003", TerminalName: "Chennai HQ", lastUpdated: "3 days ago" },
  { id: 4, TerminalNo: "T004", TerminalName: "Coimbatore Central", lastUpdated: "5 hours ago" },
  { id: 5, TerminalNo: "T005", TerminalName: "Trichy Downtown", lastUpdated: "1 day ago" },
  { id: 6, TerminalNo: "T006", TerminalName: "Salem Market", lastUpdated: "Just now" },
  { id: 7, TerminalNo: "T007", TerminalName: "Erode Plaza", lastUpdated: "4 hours ago" },
  { id: 8, TerminalNo: "T008", TerminalName: "Bangalore South", lastUpdated: "2 days ago" },
  { id: 9, TerminalNo: "T009", TerminalName: "Hyderabad Tech Park", lastUpdated: "1 week ago" },
  { id: 10, TerminalNo: "T010", TerminalName: "Kochi Harbor", lastUpdated: "3 hours ago" },
  { id: 11, TerminalNo: "T011", TerminalName: "Pondicherry Beach", lastUpdated: "Yesterday" },
  { id: 12, TerminalNo: "T012", TerminalName: "Mysore Palace", lastUpdated: "6 days ago" },
  { id: 13, TerminalNo: "T013", TerminalName: "Delhi North", lastUpdated: "Just now" },
  { id: 14, TerminalNo: "T014", TerminalName: "Mumbai West", lastUpdated: "2 hours ago" },
  { id: 15, TerminalNo: "T015", TerminalName: "Kolkata East", lastUpdated: "Yesterday" },
];

const Sales = ({ navigation }) => {
  const [selectedTerminalId, setSelectedTerminalId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onFabPress = () => {
    if (selectedTerminalId !== null) {
      setModalVisible(true);
    }
  };

 const handleQuickActionSelect = (action) => {
  console.log("Selected quick action:", action);
  navigation.navigate(action.screen);
  setModalVisible(false);
};


  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {dummySalesData.map((item) => {
          const isSelected = selectedTerminalId === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelectedTerminalId(item.id)}
              activeOpacity={0.7}
              style={{
                backgroundColor: isSelected ? "#dbeafe" : "#f9fafb",
                borderColor: isSelected ? "#3b82f6" : "#e5e7eb",
                borderWidth: 1,
                borderRadius: 12,
                marginBottom: 14,
                padding: 16,
                position: "relative",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 6,
                  backgroundColor: isSelected ? "#3b82f6" : "#2563eb",
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}
              />

              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                  color: isSelected ? "#1e40af" : "#111827",
                  marginBottom: 4,
                }}
              >
                {item.TerminalNo} | {item.TerminalName}
              </Text>

              <Text style={{ color: isSelected ? "#2563eb" : "#6b7280" }}>
                Last updated {item.lastUpdated}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Show FAB only if terminal selected */}
      {selectedTerminalId !== null && (
        <TouchableOpacity
          onPress={onFabPress}
          activeOpacity={0.85}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            backgroundColor: "#2563eb",
            width: 64,
            height: 64,
            borderRadius: 32,
            justifyContent: "center",
            alignItems: "center",
            elevation: 15,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
          }}
          accessibilityLabel="Open quick actions"
        >
          <Menu size={30} color="white" />
        </TouchableOpacity>
      )}

      <PosQuickActions
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleQuickActionSelect}
      />
    </View>
  );
};

export default Sales;
