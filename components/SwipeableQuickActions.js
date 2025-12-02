import React, { useState } from "react";
import { Animated, View, StatusBar, Platform, Text, TouchableOpacity } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";
import { User, ArrowRight, Settings, Bell, CreditCard, Shield } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const SwipeableQuickActions = ({ children }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [translateX] = useState(new Animated.Value(-280));

  const openPanel = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.spring(translateX, {
      toValue: -280,
      useNativeDriver: true,
    }).start();
  };

  const statusBarHeight = StatusBar.currentHeight || (Platform.OS === "ios" ? 44 : 0);

  const quickActions = [
    { icon: User, label: t("quickActions.profile"), screen: "Profile" },
    { icon: Settings, label: t("quickActions.onboard"), screen: "Onboarding" },
    { icon: Bell, label: t("quickActions.setup"), screen: "Setup" },
    { icon: CreditCard, label: t("quickActions.sales"), screen: "Sales" },
    { icon: Shield, label: t("quickActions.subscription"), screen: "Subscription" },
  ];

  const handleActionPress = (action) => {
    closePanel();
    setTimeout(() => {
      if (action.screen) navigation.navigate(action.screen);
    }, 300);
  };

  return (
    <GestureRecognizer onSwipeRight={openPanel} onSwipeLeft={closePanel} className="flex-1">
      {/* PANEL */}
      <Animated.View
        className="absolute left-0 top-0 bottom-0 w-72 rounded-r-3xl bg-white shadow-xl z-50 overflow-hidden"
        style={{
          transform: [{ translateX }],
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 0 },
          shadowOpacity: 0.18,
          shadowRadius: 15,
          elevation: 20,
        }}
      >
        {/* Smooth White → Light Blue Gradient Header */}
        <LinearGradient
          colors={["#FFFFFF", "#F0F6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            paddingTop: statusBarHeight + 10,
            paddingHorizontal: 22,
            paddingBottom: 20,
          }}
        >
          <Text className="text-gray-900 text-2xl font-bold mb-1">
            {t("quickActions.title")}
          </Text>
          <View className="w-14 h-1 bg-blue-300 rounded-full" />
        </LinearGradient>

        {/* ACTION LIST */}
        <View className="flex-1 px-3 mt-2">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleActionPress(action)}
                activeOpacity={0.8}
                className="flex-row items-center justify-between py-3 px-4 rounded-xl mb-2 bg-gray-100"
              >
                <View className="flex-row items-center">
                  <View className="w-10 h-10 rounded-xl bg-blue-50 justify-center items-center mr-3">
                    <Icon size={22} color="#1E40AF" />
                  </View>
                  <Text className="text-gray-800 text-base font-semibold">
                    {action.label}
                  </Text>
                </View>

                <ArrowRight size={20} color="#64748B" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* FOOTER */}
        <View className="items-center pb-4">
          <Text className="text-gray-400 text-xs">
            {t("quickActions.swipeToClose")}
          </Text>
        </View>
      </Animated.View>

      {/* MAIN CONTENT */}
      <View className="flex-1 bg-gray-50">{children}</View>
    </GestureRecognizer>
  );
};

export default SwipeableQuickActions;
