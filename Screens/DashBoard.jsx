// Screens/DashBoard.js
import React from "react";
import { View, Text, StatusBar } from "react-native";
import SwipeableQuickActions from "../components/SwipeableQuickActions";

const DashBoard = () => {
  return (
    <>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="dark-content" 
      />
      <SwipeableQuickActions>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5F5F5",
            marginTop: StatusBar.currentHeight, // This pushes content down
          }}
        >
          <Text style={{ fontSize: 24 }}>DashBoard</Text>
          <Text style={{ marginTop: 10, color: "#666" }}>
            Swipe Right to open Quick Actions
          </Text>
        </View>
      </SwipeableQuickActions>
    </>
  );
};

export default DashBoard;