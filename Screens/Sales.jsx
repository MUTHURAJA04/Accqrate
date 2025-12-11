import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import PosQuickActions from "../components/PosQuickActions.jsx";

const dummySalesData = [
  {
    id: 1,
    TerminalNo: "T001",
    TerminalName: "Karaikudi Branch",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    TerminalNo: "T002",
    TerminalName: "Madurai Branch",
    lastUpdated: "Yesterday",
  },
  {
    id: 3,
    TerminalNo: "T003",
    TerminalName: "Chennai HQ",
    lastUpdated: "3 days ago",
  },
];

const Sales = () => {
  const [selectedTerminal, setSelectedTerminal] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedTerminal(null);
    }, [])
  );

  const handleQuickAction = (actionId) => {
    console.log("Selected:", actionId);
    setSelectedTerminal(null); // hides actions after selection
  };

  return (
    <View className="p-4">
      {dummySalesData.map((item) => {
        const card = (
          <TouchableOpacity
            key={item.id}
            className="bg-gray-50 border border-gray-200 rounded-lg mb-4 overflow-hidden"
            activeOpacity={0.7}
            onPress={() => setSelectedTerminal(item.id)}
          >
            <View className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600" />

            <View className="p-4">
              <Text className="text-lg font-bold text-gray-900 mb-2">
                {item.TerminalNo} | {item.TerminalName}
              </Text>

              <Text className="text-sm text-gray-600">
                Last updated {item.lastUpdated}
              </Text>
            </View>
          </TouchableOpacity>
        );

        // If card is selected, wrap with PosQuickActions
        if (selectedTerminal === item.id) {
          return (
            <PosQuickActions
              key={item.id}
              onSelect={handleQuickAction}
              onSwipeClose={() => setSelectedTerminal(null)}
            >
              {card}
            </PosQuickActions>
          );
        }

        return card;
      })}
    </View>
  );
};

export default Sales;
