// Screens/DashBoard.js
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useTranslation } from 'react-i18next';
import SwipeableQuickActions from "../components/SwipeableQuickActions";

const DashBoard = () => {
  const { t } = useTranslation();

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
          <Text style={{ fontSize: 24 }}>{t("dashboard.title")}</Text>
          <Text style={{ marginTop: 10, color: "#666" }}>
            {t("dashboard.swipeHint")}
          </Text>
        </View>
      </SwipeableQuickActions>
    </>
  );
};

export default DashBoard;